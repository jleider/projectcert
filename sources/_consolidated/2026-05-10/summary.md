# Consolidated audit summary — 2026-05-10

51 state JSONs audited by 51 worker agents (Haiku tier, with Sonnet
escalation for the 6 dense-history states: CA, MA, NM, NY, TX, plus a
shared verifier model for cross-checks). Five Sonnet verifier passes
reviewed the worker reports, web-fetched citations, and reconciled
contradictions. Per-state audit reports are at
`sources/<usps>/2026-05-10/audit-report.md`; verifier reports at
`sources/_verifier/2026-05-10/batches-{1-2,3-4,5-6,7-8,9-10}.md`.

## Infrastructure changes already applied (no JSON data touched)

1. **Schema:** added optional `elPercentHistory[]` field to
   `src/content.config.ts` — `{date, percent, source:{label,url}}`,
   chronologically sorted, validated by Zod.
2. **`scripts/check-external-links.ts`** + `npm run check:links` —
   advisory script that walks every state JSON's URLs (sources,
   history, sealOfBiliteracy, elpAssessment, elPercentHistory) and
   classifies HEAD/GET responses. Not in default `npm run validate`
   (per CLAUDE.md drift policy). Baseline run: **44 broken URLs across
   13 states**.
3. **`scripts/generate-llms-full.ts`** — extended to surface
   `elPercentHistory` in the LLM-readable dump once the field is
   populated.

## Headline finding — a systemic data violation

**Every state file (50 of 51 — VA is the only one without a `history[]`
array) carries a 2019-12-01 row titled "Baseline coding (Leider, Colombo
& Nerlino, 2021)".** The state-source-refresh skill explicitly forbids
this row pattern: it describes the catalog's QA workflow, not an SEA
policy event. The audit trail belongs in the per-state
`changes-from-baseline.md`, not in the public `history[]` timeline.

A second meta-process row was found in IA only:

- **IA `history[2]` (2023-07-01, "Iowa DOE rebrands to educate.iowa.gov
  domain")** — description literally says "this refresh re-grounds
  field-level claims," explicit catalog-workflow language.

Recommendation: remove the 2019-12-01 row from all 50 states and remove
the IA 2023 rebrand row.

A sweep of all 2024+ history rows for hidden meta-process language
(`this refresh`, `re-grounds`, `verifies the snapshot`) found only the
IA 2023 row.

## elPercent — single confirmed correction

All 51 `elPercent` values were spot-verified against NCES Digest 2023
Table 204.20 (fall 2021). Two corrections are warranted:

- **SC: 5.6 → 5.8** (NCES d23 confirms 5.8% / 41,949 students; the
  current source label "41,949 / 5.6%" is internally inconsistent).
- **TN: `elPercentAsOf: "2024-05-30"` is a TDOE workshop slide date,
  not a census date.** TN's 9% figure derives from a May 30 2024 SBE
  workshop presentation. NCES d23 puts TN at **5.8%** for fall 2021.
  Two valid resolutions:
  (a) align to NCES: `elPercent: 5.8, elPercentAsOf: "2021-10-01"` like
  every other state, or
  (b) keep the TDOE 9% figure but pin to the actual census date the
  TDOE slide is reporting (which the verifier could not establish).
  Recommendation: option (a) for cross-state comparability.

All other states' `elPercent` values are exact against NCES d23.

## Per-state findings worth applying

Grouped by confidence. Each item has been verified by the Sonnet
verifier or by the orchestrator's direct lookup unless flagged "agent
claim, not yet verified."

### High confidence — apply

#### Universal (50 states)
- Remove the 2019-12-01 "Baseline coding" row from `history[]`.

#### AZ (Arizona)
- `history[5]` says "HB 2435 reduces daily SEI/ELD block from 4 to 2
  hours" but **HB 2435 is a 2019 medical-marijuana bill**. The 2019
  ELD-block reduction was **SB 1014** (54th Legislature, 1st Regular
  Session). Replace bill number in title and description; sourceUrl
  remains valid.
- (Advisory note for the project, not a data edit) Seal of Biliteracy
  authorizing statute § 41-3102(E) **sunsets 2026-07-01** unless
  reauthorized — 52 days from this audit. The `sealOfBiliteracy`
  field is correct as-of today; flag for mid-2026 review.

#### CA (California)
- Replace `history[1]` (Prop 227, 1998) sourceUrl from the generic EDC
  selector page to:
  `https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=EDC&sectionNum=300.`
- Replace `history[5]` (Prop 58, 2016) sourceUrl from the CDE "Facts
  About English Learners" page (which doesn't mention Prop 58) to the
  same EDC § 300 URL.
- Replace the broken CSTP 2024 source URL
  `ctc.ca.gov/educator-prep/standards/cstp-2024.pdf` (404) with a
  working CTC URL. The local PDF in `sources/CA/2026-05-07/2024-cstp.pdf`
  is authentic; orchestrator to find a stable replacement before launch.
- Add 4 new history rows (each with a verified citable URL):
  - **1974-01-21** Lau v. Nichols (oyez.org or law.cornell.edu)
  - **2017-07-12** EL Roadmap adoption (cde.ca.gov/sp/el/rm/)
  - **2018-01-01** ELPAC replaces CELDT (cde.ca.gov/ta/tg/ep/)
  - **2018** AB 2735 course-access mandate (leginfo)
- Note: Fold the existing CA agent's casing (`sources/CA/...`) to
  lowercase `sources/ca/` for consistency with the rest of the
  catalog (already copied to lowercase in main checkout).

#### IA (Iowa)
- Remove the 2023-07-01 "Domain rebrand" row (meta-process language).

#### IL (Illinois)
- Replace 404 sourceUrl in `history[0]`:
  `https://www.ilga.gov/legislation/ilcs/ilcs4.asp?DocName=010500050HArt%2E+14C&ActID=1005&ChapterID=17`
  with a working ILCS Article 14C URL (orchestrator to find).
- Reject the IL agent's proposal to upgrade
  `eld.requirements.languageProficiency: false → true` — verifier
  confirmed ISBE has no language-proficiency requirement for ESL/ENL.

#### MA (Massachusetts)
- Add 2 history rows:
  - **2018-06-26** BESE adopts Bilingual Education Endorsement (DESE
    page explicitly cites this date).
  - **2025-05-20** BESE amends 603 CMR 7.00 ("MTEL Alternatives and
    Other Updates"). Verifier confirmed the date; needs full text
    review before any credential-flag changes.
- Add `https://malegislature.gov/Laws/SessionLaws/Acts/2017/Chapter138`
  to the LOOK Act history rows' `sourceUrls` (currently cite only
  DESE regulatory pages).
- Tighten `sei.notes`: SEI endorsement framework was created by RETELL
  under the 2011 DOJ settlement; LOOK Act (2017) codified it. Current
  text incorrectly attributes the "statutory backbone" only to LOOK.

#### NM (New Mexico)
- Fix `history[1]` (2014 Seal of Biliteracy):
  - Remove the **wrong bill number** "Senate Bill 159" — SB 159 (2014)
    is an unrelated education-tech infrastructure bill (Ch. 28).
    Correct chapter is **NM Laws 2014, ch. 46** (bill number to be
    looked up at nmlegis.gov).
  - Fix the NMAC citation: **6.32.3 NMAC** (Seal), not 6.32.2 NMAC
    (BMEP).
- Add **2022-07-01** row: 6.64.11 NMAC repealed and replaced —
  introduces non-English-language coursework distribution requirement
  for the TESOL endorsement. Substantively confirmed via WebFetch.

#### NY (New York)
- Resolve the Seal of Biliteracy date discrepancy: JSON has
  `2012-12-17` but the source notes say signed July 31, 2012. Verify
  against NY Chapter 416/2012 chaptered-law record before launch. The
  `sealOfBiliteracy.year: 2013` (first awards) is independently
  defensible.

#### OH (Ohio)
- Add **2023-07-04** row: HB 33 (135th General Assembly) reorganizes
  ODE → ODEW. Structural change; no EL-credentialing impact.

#### PA (Pennsylvania)
- Replace `history[2]` (2023-07-01 CSPG #68) sourceUrl from the
  generic `pa.gov/agencies/education.html` to the specific CSPG #68
  page (already present in `sources[]`).

#### RI (Rhode Island)
- Replace 2025-06-01 history row sourceUrl from RIDE homepage to the
  specific Certification-Regulations-2025.pdf (already in `sources[]`).

#### TX (Texas)
- Add 2 history rows:
  - **2020-04-14** HB 3 (86th Leg, 2019) amendments to TAC Ch. 89
    Subch. BB — largest structural update since 1996.
  - **2023-08-09** HB 1414 (88th Leg) — replaces "English learner"
    with "emergent bilingual" throughout TEC Ch. 29.
- A third proposed row (TAC §74.4 ELPS adoption ~2008) is provisional
  pending TAC portal access; defer until a stable URL is found.

#### VA (Virginia)
- VA has zero history rows currently. Add 2 rows (high confidence):
  - **2015** Seal of Biliteracy adopted (HB 1822, codified
    Va. Code § 22.1-212.1).
  - **2026-01-01** Dual Language Endorsement effective (8VAC20-23-321
    et seq) — Virginia's first dedicated bilingual licensure track.
    *Note: agent proposed 2025-08-07 (a webinar date); verifier
    corrected to the regulation's actual effective date.*
- Reject 2 other proposed rows (1992 ESL baseline and 2014 WIDA-alignment)
  — both flagged as approximate dates with no primary source.
- Correct `bilingual.notes` text "effective 2025" → "effective 2026-01-01".

#### URL recoveries (apply replacements to `sources[]`)
- **NC (4 URLs)**: Both spot-checked recoveries return 200; full
  swap-list in `sources/nc/2026-05-10/audit-report.md`.
- **NE (6 URLs)**: 5 of 6 work at the new `/2024-05/` and `/2025-04/`
  paths; **the Clean-Rule-24-2024.pdf still 404s** (the load-bearing
  citation for Bilingual + ESL endorsement requirements). Local copy
  in `sources/NE/2026-05-08/`; need a working replacement.
- **ME (3 URLs)**: agent's proposed `/multilingual/staffing` is also
  404. Correct base path is `/multilinguallearner/`, with the staffing
  page at `/multilinguallearner/services` — not `/staffing`.
- **PA (2 URLs)**: confirmed live via current PDE site structure
  (no migration needed).
- **WY (3 PTSB URLs)**: all return 200 on re-check; the 5xx errors
  were intermittent. No fix needed.
- **OH (1 URL)**: third-party host (Southern Ohio ESC PDF) 404. The
  underlying credential facts are sourced elsewhere; remove the
  third-party citation.

### Medium confidence — apply with care

#### KY (Kentucky)
- Existing 2 history rows are correct.
- **Seal of Biliteracy date** in JSON is `2021-04-01` but KRS 158.6453
  effective date may be 2021-07-01 — needs confirmation against the
  signed-bill record.
- Agent proposed 5 new rows; **verifier deferred 4** for insufficient
  evidence (notably the EPSB → KDE merger claim — KDE site still
  shows EPSB as an active entity; HB 200 text was not confirmed).
  Apply only if independent confirmation lands.

#### TN (Tennessee)
- 6 broken tn.gov URLs need swap-list (per audit report).
- The May 30 2024 SBE workshop PDF is load-bearing for the WIDA →
  ELPA21 migration history row — must find a current location.

#### IN (Indiana)
- 7 of 9 broken IDOE PDFs are unrecoverable (the entire `/doe/files/`
  directory has been removed from in.gov with no redirects). Replace
  PDF citations with Indiana Code citations (IC 20-30-9 et seq) where
  possible; document missing originals in changes-from-baseline.

#### KS (Kansas)
- Domain rebrand: replace `ksde.org` → `ksde.gov` in `sources[0]`.
  Other 6 flagged URLs are accessible per agent re-check.

#### NJ (New Jersey)
- `history[0]` (1975 Bilingual Education Act) sourceUrl points to a
  generic Cornell NJAC index. Replace with a stable Justia or njleg
  citation for **N.J.S.A. 18A:35-15** (orchestrator to find).

#### MO (Missouri)
- Seal of Biliteracy `history[]` date `2017-01-01` is a year-level
  placeholder. DESE confirms "since 2017" but neither the bill number
  (HB 2280?) nor an effective date was independently verified. Either
  upgrade to a confirmed date or note explicitly as year-only.

#### MS (Mississippi)
- LAS Links → ELPA21 transition history row dates 2024-08-01 is
  inferred (newsletter says "newest partner state" 2024-25). MDE pages
  return 403 to external fetchers. Date is plausible but not directly
  cited.

#### MT (Montana)
- 1999 IEFA history row dated `1999-04-21` — date is unsupported by
  the cited OPI source. Either round to `1999-01-01` or find the
  signed-bill date for HB 528.

#### UT (Utah)
- Add **2008-07-01** row: SB 41 (2008 General Session) establishes
  Dual Language Immersion pilot. Verified live.
- Drop the SB 80 (2010) and HB 121 (2016) candidates the agent
  proposed — sources don't resolve. UT's existing `sealOfBiliteracy`
  field already captures the 2016 adoption.

#### WY (Wyoming)
- Add **2022-03-21** row: Senate Enrolled Act 47 (Seal of Biliteracy
  authorizing). Currently captured only in the `sealOfBiliteracy`
  field, not the timeline.

### Low confidence — do NOT apply without further work

- **AR linguistic flag**: agent proposed
  `professionalStandardsMentions.linguistic: true → false`. **Verifier
  rejected** the change — 2024 Arkansas Teaching Standards explicitly
  use "linguistic" in Standard #1. **Keep `linguistic: true`.**
- **NC linguistic flag**: agent's `true` justification uses "language
  proficiency" rather than "linguistic" verbatim. Borderline; verifier
  recommends orchestrator review of the NC Professional Teaching
  Standards before changing.
- **DC**: agent's summary line "elPercentAsOf correctly marked as
  verification date (2026-05-08)" is misframed — the JSON value is
  `2021-10-01` (correct) and `lastVerified: 2026-05-08` (correct). No
  data fix required; the agent's prose is just confused.
- **VT**: agent flagged 7 substantive policy moments captured in the
  changes-from-baseline.md but absent from `history[]`. Materially
  these need agent re-work before adding; defer.

## elPercentHistory backfill

The schema now supports an optional `elPercentHistory[]` time series.
**14 states had complete or partial proposed JSON data compiled by their
worker agents** (varying coverage from 1 point to 14 points). The
remaining 37 states either deferred ("not yet in schema") or were not
prompted to compile.

Strong proposals worth applying:
- **CA: 14 points** (fall 2000–2021), peak 25.2% (2005), trough 17.5%
  (2020). Most complete time series.
- **AZ: 11 points** (fall 2011–2021).
- **AK: 10 points** (fall 2000–2021), peak 15.4% (2005).
- **MA: 14 rows** (2000–2021), share doubled from 5.0% → 10.5%.
- **NM: 14 rows** (2000–2021), national maximum 21.4% in fall 2000.
- **TX: 11 points** (2011–2021), 14.9% → 20.2%.
- **NY: 11-row series** (2011–2021).
- **FL: 6 points** (2016–2021).
- Smaller series (≤5 points): AR, AL, KY, MD, DC, OH, NV, WI, NJ, GA,
  several others.

For the 37 states without proposals, the orchestrator can pull NCES
Table 204.20 across digests d18–d24 in a separate pass — this is a
mechanical data backfill, not an audit-judgment call. Recommendation:
defer the elPercentHistory backfill to a follow-up commit so this
audit-driven commit stays focused on factual corrections.

## What I am asking you to approve

For an "apply now" pass, I would commit:

1. Schema change + script + LLM export changes (already in working tree).
2. Remove 2019-12-01 baseline-coding rows from all 50 states.
3. Remove IA 2023-07-01 domain-rebrand row.
4. AZ HB 2435 → SB 1014 fix.
5. SC `elPercent: 5.6 → 5.8`.
6. TN `elPercent / elPercentAsOf` realignment to NCES (5.8% / 2021-10-01).
7. CA Prop 227 + Prop 58 source URL replacements.
8. CA + MA + NM + OH + TX + UT + VA + WY history additions (high
   confidence).
9. NM Seal of Biliteracy bill/NMAC fix.
10. URL replacements for NC, NE (5 of 6), PA, KS.
11. CA folder renamed lowercase `sources/ca/` (already done in main
    checkout).

Deferred for follow-up:
- elPercentHistory backfill (mechanical NCES pull).
- Medium-confidence date refinements (KY, MO, MS, MT) pending bill
  lookups.
- VT history additions pending agent re-work.
- KY Seal date and EPSB→KDE merger claim pending confirmation.
- IL ilga.gov URL replacement pending lookup.
- NE Clean-Rule-24-2024.pdf replacement pending search.
- ME `/multilinguallearner/services` URL swap.
- NJ N.J.S.A. 18A:35-15 stable URL pending lookup.
- TN broken-URL swap-list (6 URLs).
- IN Indiana Code substitution for 7 dead PDFs.

## How to read the per-state reports

Each state has a worker report at
`sources/<usps>/2026-05-10/audit-report.md` covering history rows,
suggested additions, elPercent verification, proposed elPercentHistory
JSON, credential/standards spot-check, and source URL concerns. The
verifier reports at `sources/_verifier/2026-05-10/batches-{1-2,3-4,5-6,7-8,9-10}.md`
catalog confirmed/disputed/missed/systemic findings across pairs of
batches.
