---
name: state-source-refresh
description: Workflow for re-verifying one state's EL teacher certification data against current SEA sources. Use when the user asks to "refresh", "verify", or "update" a specific state, or when a baseline-2019 record needs to be promoted to verified-2026. This is the Phase 2 workflow that runs incrementally per-state until all 51 are current.
---

# State source refresh — Phase 2 verification workflow

The goal: take one state's `baseline-2019` record (or stale
`verified-2026`) and bring it current against the SEA's *present-day*
public documents, with full provenance.

## When this skill triggers

Phrases like:

- "refresh `<state>`"
- "verify `<state>`"
- "update `<state>` data"
- "check Massachusetts" / "let's do Texas next"
- "promote `<state>` to verified-2026"

Also appropriate when the user references the `/verification` page and
asks to work on the next pending state.

## Procedure

### 1. Read the current record

`src/content/states/<usps>.json` — note `verificationStatus`,
existing `sources[]`, `notes`, and any quirks.

### 2. Pull current SEA sources

For each entry in `sources[]`:

1. WebFetch the URL.
2. If it returns 200 and content matches the original purpose, save a
   snapshot.
3. If it 404s or has clearly moved, search the SEA homepage for the
   current equivalent (e.g., the "teacher licensure" / "educator
   preparation" / "credentialing" section).
4. Save the current PDF or page snapshot to:

   ```text
   sources/<usps>/<YYYY-MM-DD>/<short-slug>.{pdf,html}
   ```

   (Date is the day of retrieval, not publication.)

5. **Read every source you save.** A file in `sources/<usps>/.../`
   and a corresponding entry in `sources[]` is a claim you read it
   and that the schema fields you set are grounded in its content.
   If `WebFetch` returns "binary content / can't extract text",
   fall back to the `Read` tool — it handles PDFs natively. Don't
   skip a source because the first extraction attempt failed; either
   read it some other way, or don't save it and don't cite it.

For documents the paper's Appendix A names but no longer exist, log
the disappearance in
`sources/<usps>/<YYYY-MM-DD>/changes-from-baseline.md`.

### 3. Re-code the credentials

Read each source carefully against the `el-cert-schema`. For each of
`bilingual`, `eld`, `sei`:

- Is it still offered? Did pathways change?
- Did `requirements.*` change (e.g., a state added a practicum
  requirement, dropped the test-only path)?
- Did the SEI mandate change? (NV in particular has been phasing in.)

For `professionalStandardsMentions`: open the current professional
teaching standards document. Search for `diverse, cultural, language,
linguistic, EL, English`. Refresh the four booleans.

For `elPercent`: the canonical source is **NCES Digest of Education
Statistics, Table 204.20** ("English Learners in Public Schools").
The most recent table at the time of this skill's authorship is the
2023 Digest reporting fall 2021 enrollment — code `elPercentAsOf:
"2021-10-01"`. Pull the SD-row's percent to one decimal. Use an
SEA-specific number only as a sanity-check; do not substitute.

URL: <https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp>

### 3b. Watch for common baseline miscodings

The 2019 baseline systematically miscoded a few patterns. When you
re-verify, double-check these specifically:

- **`bilingual.standalone: true`** is often wrong. Many states offer
  bilingual *only* as an add-on endorsement on top of a primary
  license; coding standalone-true should require a license-list entry
  for "Bilingual Education" as its own field. CT, KS, MN, NY, VT, WA,
  and WI all flipped to false on refresh.
- **`eld.standalone` vs `eld.addOn`** — same pattern. Some states
  classify ESL as a free-standing license (TX, NY, MA), some as an
  add-on only (ME, MS, MD), some both (NC, OH, IL).
- **`professionalStandardsMentions.{linguistic, el}`** were sometimes
  coded `true` against an EL-specific ESOL rule rather than the
  state's general teaching standards document. The four flags should
  reflect the *general* teaching standards (the document binding all
  teachers, not the ESOL-specialty subset).

### 3c. ELP-assessment migrations to verify

Several states have migrated their annual ELP test in the last few
years; do not assume the cross-state dataset is current:

- **TN: WIDA → ELPA21** effective 2024-07-01 (per TDOE/SBE workshop
  May 2024). First ELPA21 Summative Feb 5, 2025.
- **MS: LAS Links → ELPA21** during 2024-25 (per ELPA21 Insider
  Spring 2025; MDE ELPT page now references ELPA 21).
- **NY: never WIDA** — uses NYSESLAT (state-specific) since 2003.
  Companion screener is NYSITELL.

If the existing `elpAssessment` field looks WIDA but the SEA's own
EL-assessment page contradicts that, trust the SEA's page and
correct.

### 3a. Capture history events

Each state record carries a `history[]` array — a chronological log of
SEA-side policy events that shape the EL credentialing landscape. As
you read sources, watch for events worth a row and append them.

**`history[]` is for substantive policy events, not the audit log.**
Don't add rows that describe the verification process itself. The
following titles and the prose patterns behind them are **forbidden**:

- "Re-verified against current X sources"
- "Refreshed against current SEA sources"
- "Re-audit (history events captured)"
- "Phase 2 verification (verified-2026)"
- "Standards verified — promoted to verified-2026"
- "Re-confirmed", "Re-checked", "Re-audited", "Bilingual cross-endorsement
  scope corrected on refresh", and any other framing that describes the
  catalog's QA workflow rather than an SEA-side event.

**One documented exception**: every state carries a `2019-12-01` row
titled "EPAA 29(100) document analysis (Leider, Colombo & Nerlino, 2021)"
that anchors the catalog's seed dataset. This row points at a published
peer-reviewed research event — Leider, Colombo & Nerlino's systematic
coding of every state's EL-credentialing rules from primary SEA
documents collected October–December 2019, published in *Education
Policy Analysis Archives* 29(100). Because the row documents a citable
academic milestone (with DOI) rather than the catalog's own QA workflow,
it is allowed. Do not propose new rows that mimic this pattern for
unrelated research unless they document an equivalently specific
peer-reviewed publication with a citable DOI.

The audit trail belongs in `sources/<USPS>/<date>/changes-from-baseline.md`,
not in `history[]`. The site renders `history[]` as a public timeline of
policy changes for researchers; meta-process rows clutter it and are
written in the wrong voice. Voice for `history[]` rows is third-person,
matter-of-fact academic register: "Massachusetts enacts the LOOK Act
(Ch. 138 of the Acts of 2017)", not "MA verified against current DESE
sources." Past tense is preferred over present-progressive ("enacted",
"authorized", "filed", not "is enacting"). No first person, no
references to "this catalog", "we", or "the verification".

Examples worth filing:

- A new statute or rule (e.g., a 2024 "Multilingual Learner Bill of
  Rights"; a Seal of Biliteracy authorizing act with bill number).
- A SEA reorganization or rename (ODE → ODEW, MA RETELL → SEI).
- A new credential, endorsement, or pathway (e.g., a Dual Language
  Immersion endorsement adopted in 2025).
- A change in the ELP assessment (e.g., MS migrated LAS Links →
  ELPA21; TN moved WIDA → ELPA21 effective 2024-07-01).
- A standards revision that flips a `professionalStandardsMentions`
  boolean.
- An effective-date for a phase-in (NV's SEI mandate; CA's AB 1059
  embedded prep).

Each row:

```json
{
  "date": "YYYY-MM-DD",          // event date, not retrieval date
  "title": "Short headline",      // ~60 chars; what changed
  "description": "One-paragraph why-it-matters with citation hooks.",
  "sourceUrls": ["https://..."]   // 1-N URLs supporting the row
}
```

Only file events you have a citable source for; the `sourceUrls`
should resolve to the same documents you saved under
`sources/<usps>/<date>/`. If you're filing a row about a baseline-era
event you can corroborate (e.g., the 2014 LEAPS Act), cite the
authoritative current page even if you didn't fetch the original
bill text. Don't backfill speculative history — provenance still
applies, and the schema now enforces `sourceUrls.min(1)` so a row
without a citation will fail validation outright.

**Going further back than the 2019 baseline.** Many states have
foundational pre-2019 events (1971 MA Ch. 71A; 1973 NM/TX/IL bilingual
acts; 1975 NJ/WI; 1976 CA Chacón-Moscone; 1977 CT; 1979 WA; 1980 MN;
1968 LA Act 409 / CODOFIL; 1972 AK; 1978 HI constitutional amendment;
2002 MA Question 2; 1998 CA Prop 227; etc.). For these, prefer
*codified-statute pages* on the state legislature's site (e.g.,
cga.ct.gov, ilga.gov, malegislature.gov, leg.mt.gov,
statutes.capitol.texas.gov, leginfo.legislature.ca.gov,
docs.legis.wisconsin.gov, akleg.gov) over session-law page numbers —
codified URLs survive renumbering. For federal cases, use justia
(`law.justia.com`, `supreme.justia.com`) or oyez. **If you can't point
at an authoritative URL you're confident in, drop the row** — fabricating
a plausible-looking but unverified link is worse than a missing event.

The schema enforces chronological ordering (`history[]` must be sorted
oldest → newest). When inserting a pre-2019 event, place it at the
chronologically correct position in the array, not at the end.

### 4. Document changes

In `sources/<usps>/<YYYY-MM-DD>/changes-from-baseline.md`, list every
diff vs. the prior record. Examples:

```text
- bilingual.requirements.languageProficiency: false → true
  (state added a Spanish proficiency exam in 2023, see source 4)
- eld.standalone: false → true
  (state introduced a standalone TESOL certificate)
- professionalStandardsMentions.el: false → true
  (revised standards now reference ELs explicitly in 3 places)
```

If nothing changed: note "No substantive changes from baseline-2019."

### 5. Update the JSON file

- Bump `lastVerified` to today's date.
- Set `verificationStatus: "verified-2026"`.
- **Append** new entries to `sources[]` (don't delete the
  `leider-2021` entries — they remain part of the audit trail).
  Each new entry: `retrievedBy: "projectcert-2026"`,
  `retrievedAt: <today>`.
- **Append** history rows for any policy events you uncovered in §3a
  (new credentials, statutes, SEA renames, ELP-assessment migrations,
  standards revisions). Don't delete prior rows; the array is a
  chronological log.
- Update `notes` if the state has new quirks worth flagging.

### 6. Validate and commit

```bash
npm run validate
```

If green, commit with a message like:

```text
verify: <state> sources refreshed against current SEA documents

- bilingual: added languageProficiency requirement
- standards: ELs now referenced explicitly
- elPercent: updated from 2019 (10.0%) to 2024 NCES (11.4%)
```

The pre-launch banner count updates automatically on next build.

## What to *not* do

- Don't delete the `leider-2021` source entries — they are the
  baseline audit trail. Always *append*.
- Don't refresh a state without saving snapshots. SEA pages change
  silently; future-you will need the bytes you saw today.
- Don't save a snapshot you didn't read. A file under
  `sources/<usps>/.../` and an entry in `sources[]` is a claim you
  read it and grounded the schema fields in its content. If
  `WebFetch` returns an unreadable binary blob, fall back to the
  `Read` tool (it handles PDFs natively) — don't shortcut by saving
  the bytes and coding from a third-party summary instead.
- Don't promote to `verified-2026` if any source returned 404 and you
  couldn't find a current equivalent. Use `in-progress` and leave a
  note in the JSON's `notes` for the next session.
- Don't fabricate `requirements.*` values to "match" the prior record.
  If a current source is ambiguous, set `null` and explain in `notes`.
- Don't change the schema. If a state has a credential that genuinely
  doesn't fit (e.g., a brand new program type), stop and discuss the
  schema change separately rather than smuggling new fields in.

## Common fetch failures and pivots

SEA pages fail in predictable ways. Don't burn 600 seconds retrying
the same URL — pivot to an alternate after two strikes.

- **Cloudflare 1020 / "Access denied"** on `curl` and sometimes
  `WebFetch`. Common on CTC (CA), MO DESE, several others. Pivot:
  WebFetch directly (it sometimes succeeds where curl is blocked); or
  use a mirror like `txrules.elaws.us`, `law.cornell.edu/regulations`,
  or `revisor.mn.gov/rules` that hosts the same regulatory text.
- **`acrobat.adobe.com` session-bound PDF URLs** (PTSB Wyoming and
  similar) — can't be fetched headlessly. Pivot to the parent page's
  HTML summary plus a Wayback Machine capture of the PDF, or skip the
  source and ground the field elsewhere.
- **Pages with large embedded images** (>2000px) trip the agent's
  image-size limit and can crash the run. Avoid SEA dashboards and
  pages that lead with hero graphics. Prefer text-heavy rule pages.
- **Scanned PDFs without an OCR text layer** (some WV, older
  legacy docs). Use `tesseract` on a saved page-image, or fall back
  to the text version published alongside the PDF.
- **State DOE URL renames** — common since 2019. If the baseline URL
  404s, search the SEA homepage for the current section (`teacher
  licensure`, `educator preparation`, `English learners`) before
  giving up. Document any disappearance in `changes-from-baseline.md`.
- **Agent watchdog stall (no progress for 600s)** — usually triggered
  by the agent retrying a dead URL or a paginated PDF in a tight
  loop. Sign of failure: same URL fetched 3+ times. Better pattern:
  one fetch, evaluate, pivot.

## Stay inside your worktree

When this skill runs as a subagent under `isolation: "worktree"`, the
agent's working directory is `.claude/worktrees/agent-<id>/`, not the
repo root. Two failure modes seen in past sweeps:

- **Absolute-path Bash commands escape the worktree.** A `cd
  /Volumes/Sources/projectcert && git ...` invocation operates on the
  *main* checkout, not your isolated copy. The worktree's git index
  goes untouched, and your changes land in main's working tree where
  the next unrelated commit silently sweeps them up. Always use
  relative paths or `process.cwd()`-relative ops; let the harness
  handle the worktree path.
- **Sources written to `sources/<usps>/...`** must go in the
  worktree's `sources/` tree, not the main repo's. Same root cause —
  use relative paths.

Quick check: `pwd` should print
`.../.claude/worktrees/agent-<id>`, not the repo root. If it doesn't,
stop and `cd` back to the worktree before any git operation.

## Resuming a partial refresh

If you find a state at `verificationStatus: "in-progress"`, look for
its most recent snapshot folder under `sources/<usps>/` and the
`changes-from-baseline.md` there. Read it, then continue from where
the prior session left off.

## Batch refresh guidance

It's tempting to do many states at once, but each state takes ~30–60
minutes of careful reading per source. Quality > throughput. Three to
five states per session is realistic; more risks shallow verification.
The user's launch criterion is *all 51 verified*, not *all 51
verified by Friday*.
