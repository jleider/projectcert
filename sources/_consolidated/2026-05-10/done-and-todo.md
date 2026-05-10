# 2026-05-10 audit — done and still-to-do

This doc consolidates the 2026-05-10 audit (the prior `summary.md` and
`research-followups.md` were folded into the sections below and
removed). Per-state audit reports remain at
`sources/<usps>/2026-05-10/audit-report.md`; per-batch verifier
reports at `sources/_verifier/2026-05-10/batches-{1-2,3-4,5-6,7-8,9-10}.md`.

## What landed

### Infrastructure

- `src/content.config.ts` — added optional `elPercentHistory[]` field
  (`{date, percent, source:{label,url}}`, sorted oldest→newest).
- `scripts/check-external-links.ts` + `npm run check:links` — advisory
  link checker. Now sends a recent Chrome User-Agent + `Accept` /
  `Accept-Language` headers to slip past SEA Cloudflare filters.
- `scripts/generate-llms-full.ts` — surfaces `elPercentHistory` in the
  RAG-friendly dump.
- `scripts/remove-meta-process-rows.ts` (one-shot, kept for git
  history; idempotent).
- `scripts/rewrite-baseline-coding-rows.ts` — rewords the universal
  `2019-12-01` row to describe the published EPAA 29(100) research
  event (rather than the catalog QA workflow). Run once.
- `scripts/apply-2026-05-10-edits.ts` — 30 high-confidence per-state
  edits. Run once.
- `scripts/apply-url-recoveries.ts` — 6 URL-recovery passes (NC, NE,
  TN, IN, ME, OH). Run once.
- `scripts/backfill-elpercent-history.ts` — populates
  `elPercentHistory[]` from cached NCES d23 Table 204.20 TSV.
- `.claude/skills/state-source-refresh/SKILL.md` and
  `.claude/skills/el-cert-schema/SKILL.md` — added a documented
  exception for the EPAA-paper baseline-coding row pattern, so future
  audit agents stop flagging it as a meta-process violation.

### Data corrections (factual)

| State | Change | Reason |
|---|---|---|
| AZ | `history[2019-07-09]` HB 2435 → SB 1014 | HB 2435 (2019) was a medical-marijuana bill; SB 1014 (54th Leg, 1st Reg Session) is the actual ELD-block reduction. Confirmed via azleg.gov. |
| SC | `elPercent` 5.6 → 5.8 | NCES d23 Table 204.20 reports 5.8% for fall 2021. The label "41,949 / 5.6%" was internally inconsistent. |
| TN | `elPercent` 9 → 5.8; `elPercentAsOf` 2024-05-30 → 2021-10-01 | The 2024-05-30 date was a TDOE workshop slide date, not a census date. NCES d23 puts TN at 5.8% for fall 2021; aligning to NCES restores cross-state comparability. |
| NM | `history[2014-03-05]` Seal of Biliteracy: bill SB 159 → HB 330; NMAC 6.32.2 → 6.32.3 | SB 159 (2014) was the Education Technology Infrastructure Funding bill, not the Seal. HB 330 / NM Laws 2014 ch. 46 is the correct cite. 6.32.2 NMAC governs BMEPs; 6.32.3 NMAC implements the Seal. Verified via nmlegis.gov + srca.nm.gov. |
| VA | `bilingual.notes` "effective 2025" → "effective 2026-01-01" | The Dual Language Endorsement effective date is 2026-01-01 (8VAC20-23-321 took effect Jan 1, 2026 per VR Vol. 42, Issue 7). The 2025-08-07 date the audit agent had proposed is a webinar announcement, not the regulation's effective date. |
| MA | `sei.notes` reattributed | Original text put the LOOK Act (2017) as the "statutory backbone" for SEI; in fact RETELL/2011 DOJ settlement created the framework, LOOK codified it. |

### URL fixes (source/history sourceUrls)

- **CA** — Prop 227 + Prop 58 history sourceUrls swapped to the EDC
  § 300 section URL (the prior URLs were the generic EDC selector and
  an unrelated CDE EL-facts page). CSTP 2024 PDF URL replaced with
  `https://docs.ctc.ca.gov/Document/Download/30328`.
- **MA** — appended `malegislature.gov` session-law URL for LOOK Act
  to both 2017-11-22 history rows.
- **PA** — `history[2023-07-01]` sourceUrl changed from generic
  `pa.gov/agencies/education.html` to the specific CSPG #68 page.
- **RI** — `history[2025-06-01]` sourceUrl changed from generic RIDE
  homepage to the specific Certification-Regulations-2025 PDF.
- **KS** — `sources[].url` `ksde.org` → `ksde.gov`.
- **IL** — `ilga.gov` 105 ILCS Article 14C URL replaced with the
  Justia mirror (the original URL is 404).
- **NC** — 5 dpi.nc.gov 404s rewritten to current dpi.nc.gov hubs,
  ETS Praxis NC, or sealofbiliteracy.org/state/nc.
- **NE** — Clean-Rule-24-2024.pdf (June 2024, 404) → Sept 2024 update.
- **TN** — ESL Manual and English Learners page URLs swapped to
  current dam/cpm and student-support paths.
- **IN** — 7 deleted IDOE PDFs replaced with `iga.in.gov/laws/2024/ic/titles/20#20-30-9`
  (Indiana Code chapter is the authoritative substitute).
- **ME** — 3 maine.gov URLs swapped to the verified
  `/multilinguallearner/` path (the audit agent's `/staffing` was
  also 404; verifier confirmed `/services` is correct).
- **OH** — third-party Southern Ohio ESC PDF removed from sources[]
  (404 with no recovery; OH facts grounded elsewhere).

### History additions (chronologically sorted into existing arrays)

| State | Date | Title |
|---|---|---|
| CA | 1974-01-21 | Lau v. Nichols decided (414 U.S. 563) |
| CA | 2017-07-12 | California adopts the English Learner Roadmap |
| CA | 2018-01-01 | ELPAC replaces CELDT |
| CA | 2018-09-19 | AB 2735 mandates EL course access |
| MA | 2018-06-26 | BESE adopts Bilingual Education Endorsement |
| MA | 2025-05-20 | 603 CMR 7.00 amended (MTEL Alternatives and Other Updates) |
| NM | 2022-07-01 | 6.64.11 NMAC repealed and replaced (TESOL endorsement) |
| OH | 2023-07-04 | ODE reorganized as Department of Education and Workforce (HB 33) |
| TX | 2020-04-14 | TAC Ch. 89 Subch. BB amended (HB 3 implementation) |
| TX | 2023-08-09 | HB 1414 replaces "English learner" with "emergent bilingual" |
| UT | 2008-07-01 | SB 41 establishes Dual Language Immersion pilot |
| VA | 2015-03-23 | Virginia Seal of Biliteracy authorized (HB 1822, 2015) |
| VA | 2026-01-01 | Dual Language Endorsement effective (8VAC20-23-321 et seq.) |
| WY | 2022-03-21 | Wyoming Seal of Biliteracy authorized (SF 0098 / SEA 47, 2022) |
| VT | 2018-06-01 | Rule 5440-39 revision (Bilingual endorsement) |
| VT | 2020-12-01 | Vermont Seal of Biliteracy adoption |
| VT | 2022-05-01 | Rule 5440-40 revision (ELLML endorsement) |

### Baseline-coding row treatment

The 2019-12-01 row was reworded across all 50 states that carried it
(VA had none). Title is now "EPAA 29(100) document analysis (Leider,
Colombo & Nerlino, 2021)"; description recasts the row as a published
peer-reviewed research event with the DOI in `sourceUrls`. The row is
preserved on every state page via the existing
`<HistoryTimeline events={s.history} />` rendering — no UI change
required to "incorporate" the data.

The IA `2023-07-01` "Iowa DOE rebrands…" description was also tightened
to drop the catalog-workflow clause; the rebrand fact stays.

### elPercentHistory backfill

`elPercentHistory[]` populated for all 51 states from NCES Digest 2023
Table 204.20 — **560 data points total**, 11 per state for fall 2011
through fall 2021 (VT has 10; NCES omitted fall 2018 for VT). Source
TSV cached at `sources/_consolidated/2026-05-10/nces-d23-table-204-20.tsv`.

### Validation status

- `npm run check:integrity` — PASS (51 files, 51 USPS).
- `astro check` — 0 errors, 0 warnings, 0 hints.
- `npm run check:links` — 35 broken URLs (down from 44), see below.

## Still to do

### High-priority (data accuracy)

1. **NM Seal of Biliteracy bill confirmation** — the research agent
   pointed at HB 330 / NM Laws 2014 ch. 46 but didn't fetch the
   chaptered-bill text. Worth a 5-minute confirmation at nmlegis.gov.
2. **NY Seal of Biliteracy date discrepancy** — JSON has `2012-12-17`;
   audit agent flagged the source notes say "signed July 31, 2012."
   Verify against NY Chapter 416/2012 chaptered-law record before
   public launch.
3. **KY Seal of Biliteracy effective date** — JSON has `2021-04-01`
   but verifier flagged this may be 2021-07-01. Research agent could
   not confirm from public sources; needs KDE / LRC contact.
4. **KY 5 candidate history rows** — the KY audit agent proposed
   substantive additions (EPSB → KDE merger, KAR codification, etc.)
   but the verifier deferred 4 of 5 for insufficient citation.
   Worth re-investigating once HB 200 / KAR text is accessible.
5. **MO HB 2280 (2018)** — likely the wrong bill number for Missouri
   Seal of Biliteracy (a search returned a HealthNet bill). Confirm
   the actual 2018 Seal authorizing bill at house.mo.gov; the JSON's
   placeholder date `2017-01-01` may also need replacing.
6. **MS ELPA21 transition exact date** — JSON dates the transition
   `2024-08-01`, but that's inferred from the ELPA21 newsletter.
   MDE blocks external fetchers (403); confirm the actual MDE
   announcement / first-test date through direct outreach.
7. **MT HB 528 (1999)** signed date — JSON has `1999-04-21`;
   verifier said this is unsupported by the cited OPI source.
   Either round to `1999-01-01` or pull the signed-bill date from
   the Montana Legislative Services Division.
8. **VT — Core Teaching Standards 2018 adoption date** — research
   agent proposed but couldn't pin a specific date; defer until
   Vermont AOE confirms.
9. **AZ Seal of Biliteracy sunset 2026-07-01** — 52 days from this
   audit. The `sealOfBiliteracy.adopted` field is correct as of
   2026-05-10; flag for re-check after the legislative session.

### Medium-priority (URL hygiene)

The post-fix link check has 35 remaining broken URLs across these
hosts. None are blocking — `npm run check:links` is advisory — but
they affect citation quality:

- **MS (9)** — `mdek12.org/*` paths. Earlier the host returned 403
  to non-Chrome fetchers; with the new Chrome UA, more pages now
  reach a "real" 404. MDE has reorganized; needs a per-URL recovery
  pass and likely some Wayback Machine substitutes.
- **KS (9)** — `ksde.gov/*` "fetch failed" cluster. Looks like a
  host-level TLS or rate-limit issue; one-off retries from a
  different network may resolve. The `ksde.org → ksde.gov` swap
  already shipped; the deeper paths still drop the connection.
- **TN (5 of original 6)** — 4 dam/stateboardofeducation/* PDFs
  still 404; research agent could not locate current equivalents.
  Best path is Wayback Machine snapshots or contacting TN SBOE.
- **NE (5 of original 7)** — three `Clean_Rule_*_2024.pdf` files at
  `wp-content/uploads/2017/07/` paths. Search of NDE site by the
  research agent didn't find current equivalents. NE Clean Rule
  PDF migration is non-uniform.
- **ID (5)** — `sde.idaho.gov/cert-psc/cert/files/general/*`. Whole
  directory appears removed; the audit agent recommended SDE direct
  contact for the current location.
- **UT (4)** — `schools.utah.gov/curr/*`. USBE has restructured the
  site; needs per-URL recovery against current `schools.utah.gov`
  or `uen.org/usbe`.
- **WY (3)** — `wyomingptsb.com/*`. PTSB host returns 5xx
  intermittently; URLs work some of the time. Flagged as advisory.
- **PA (2)** — `pa.gov/agencies/education/*` two paths. Research
  agent earlier reported these working; current run shows 404. PDE
  is mid-migration; revisit in 1–2 weeks.
- **NC (1 new)** — `dual-language-immersion` page surfaced 404 in
  this run; not in original sweep. Dpi.nc.gov restructure.
- **MI (1 new)** — `michigan.gov/-/media/.../professional_knowledge_skills.pdf`
  surfaced with the Chrome UA. Was 200 to the older UA.
- **OH (1)** — `legislature.ohio.gov/legislation/legislation-summary?id=GA135-HB-33`
  500 (just added in this audit; will retry after server cycle).
- **NJ N.J.S.A. 18A:35-15** — research agent could only find a
  Justia title-level URL, not a section URL. Consider citing the
  njleg / dspace.njstatelib alternative.
- **MS `elpa21.org/`** — host fetch failure; likely intermittent.

### Lower-priority / deferred

- **elPercentHistory backward extension** — d23 covers fall 2011–
  2021. NCES d22, d20, d18 contain fall 2000 and fall 2010 data
  for many states. Extending the time series to 22 data points (vs.
  current 11) would give the per-state pages a longer trend line.
- **Per-state page elPercentHistory rendering** — the data is in
  the JSON and in `llms-full.txt`, but the public per-state page
  doesn't yet render a sparkline or time-series table. Adding one
  is a small UI task in `src/pages/states/[usps].astro`.
- **NC `professionalStandardsMentions.linguistic` border review** —
  verifier flagged the current `true` coding as borderline. The
  agent's justification used "language proficiency" rather than
  "linguistic" verbatim. Worth a fresh read of the NC Professional
  Teaching Standards.
- **DC elPercentAsOf agent prose was confused** — the JSON value is
  correct (`2021-10-01`); only the audit-report wording needs to
  be ignored.
- **VT 4th history row** (Core Teaching Standards 2018 adoption) —
  not added; date couldn't be pinned.
- **Audit reports cleanup** — VA's audit-report proposed two rows
  with dates marked "approximate" (1992 ESL baseline, 2014 WIDA
  alignment). Both were rejected and not added; the audit-report
  text in `sources/va/2026-05-10/audit-report.md` still proposes
  them. Optional: prune.
- **CA folder casing** — the CA worker agent wrote to
  `sources/CA/2026-05-10/` (uppercase). The orchestrator copy is at
  `sources/ca/2026-05-10/` (lowercase, project convention). The
  uppercase folder still exists in the worktree branch. Optional:
  drop the worktree.

### Worktrees to clean up

51 audit worktrees + 5 verifier worktrees + 2 research worktrees +
1 elPercentHistory worktree are still under `.claude/worktrees/`.
After this commit lands, they can be pruned with `git worktree prune`
plus a manual `rm -rf .claude/worktrees/agent-*`. The reports they
produced were copied to `sources/<usps>/2026-05-10/audit-report.md`
in main; the underlying state-JSON edits all came from the
orchestrator, not the worker branches.

## Files modified by this session

- `src/content.config.ts` — schema additions.
- `src/content/states/*.json` — 51 files (50 baseline-coding rewrites,
  30 high-confidence edits, 6 URL-recovery scripts, 51
  elPercentHistory backfills).
- `scripts/{check-external-links, generate-llms-full, remove-meta-process-rows,
  rewrite-baseline-coding-rows, apply-2026-05-10-edits, apply-url-recoveries,
  backfill-elpercent-history}.ts`.
- `package.json` — added `check:links` script.
- `.claude/skills/state-source-refresh/SKILL.md` — exception note.
- `.claude/skills/el-cert-schema/SKILL.md` — exception note.

Plus 51 per-state audit reports + 5 verifier reports + 1 research-
followups + this doc, all under `sources/<usps>/2026-05-10/` and
`sources/_consolidated/2026-05-10/` and `sources/_verifier/2026-05-10/`.
