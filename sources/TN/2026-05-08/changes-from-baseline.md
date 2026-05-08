# Tennessee — changes from baseline-2019 (refresh 2026-05-08)

SEA: Tennessee Department of Education (TDOE).
Sources read this round (under `sources/TN/2026-05-08/`):

1. `licensure-resources.html` — TDOE Licensure Resources / Endorsement
   Code Listings page.
2. `additional-endorsement-programs-2023.pdf` (+ `.txt`) — TDOE State
   Board of Education presentation on the no-cost ESL additional
   endorsement pathway (Praxis 5362). Includes endorsement codes:
   English as a Second Language pre-K–12 (490).
3. `esl-rule-0520-01-19.pdf` (+ `.txt`) — Current State Board Rule
   0520-01-19 (Sept 2024 Revised), the operative rule on ESL programs.
4. `esl-manual.pdf` — TDOE *English as a Second Language Manual*,
   September 2023 edition. Note: this manual still references WIDA
   ACCESS / WIDA ELD Standards (the 2023 version pre-dates the 2024
   transition). Used for ESL teacher licensure language only.
5. `el-assessments-tdoe.html` — TDOE *English Learner (EL) Assessments*
   page; explicitly links to ELPA21 as the EL assessment vendor.
6. `wida-to-elpa-transition-may2024.pdf` (+ `.txt`) — TDOE State Board
   of Education workshop deck (May 30, 2024) documenting the
   transition from WIDA / ACCESS for ELLs to ELPA21 effective July 1,
   2024 (standards + assessment + screener).
7. `eld-standards-page.html` — TDOE academic standards landing page
   confirming an English Language Development standards section
   exists.
8. `teacher-code-of-ethics-2024.pdf` (+ `.txt`) — Tennessee Teacher
   Code of Ethics (T.C.A. 49-5-1001 *et seq.*). Not a teaching
   standards document; does not reference diverse / cultural /
   linguistic / EL learners. Used as evidence that the Code of Ethics
   is *not* the source for `professionalStandardsMentions`.

## Substantive changes vs. baseline-2019

### EL assessment vendor: WIDA → ELPA21 (state-level, July 2024)

Tennessee withdrew from the WIDA Consortium and adopted ELPA21
effective July 1, 2024 (standards) and February 5, 2025 (first ELPA21
Summative). Source: `wida-to-elpa-transition-may2024.pdf`,
`el-assessments-tdoe.html`, `esl-rule-0520-01-19.pdf` (Sept 2024
revision references "Department of Education-adopted English Language
Proficiency screener identified in State Board Policy 3.207").

This is **not a credential-schema field** but it is recorded in
`notes` because the prior internal coding (per the prompt) treated TN
as a WIDA member; that is no longer accurate.

### ELD standards: WIDA 2020 → ELPA21 ELD standards (10 standards)

The Tennessee ELD standards adopted by reference in Rule
0520-01-19-.03(11)(c) are now the ELPA21 ELD Standards (10 standards;
Standards 1–7 cover meaning/engagement, 8–10 cover word/discourse/
sentence linguistic features). Source:
`wida-to-elpa-transition-may2024.pdf` slides "New TN English Language
Development Standards (ELD)" and "Standards 1-7" / "Standards 8-10".

### ESL endorsement codes & program

Current endorsement codes per TDOE Endorsement Code Listings:

- `490` English as a Second Language pre-K–12
- `488` English as a Second Language K-8 (per word-cloud listing)
- `489` English as a Second Language 6-12 (per word-cloud listing)

TDOE runs (and continues to run on a vacancy basis) a *no-cost
additional endorsement* program for ESL aligned to Specialty Area
Standards Policy 5.505, with Praxis 5362 (Crosswalk noted in
additional-endorsement-programs-2023.pdf p. "Praxis Pass Rate
Comparison"). Pathway requirements per TDOE:

> Professional level license; successful completion of coursework
> provided by TDOE; be recommended by TDOE; qualifying scores on all
> required content assessments as defined in the Professional
> Assessments for Tennessee Educators Policy 5.105.

This confirms `eld.requirements.program = true` and
`eld.requirements.test = true` (Praxis 5362) carry forward
unchanged. The TDOE additional pathway also offers a coursework-only
route alongside EPP (educator preparation provider) approved
programs, so `eld.requirements.coursework` is best coded `true` (was
`null`) — coursework is required either via TDOE modules or via an
approved EPP program.

### No bilingual credential

TDOE Endorsement Code Listings (HTML) and 2023 Additional Endorsement
deck contain **no** bilingual / dual-language teaching endorsement.
`bilingual.offered = false` carries forward unchanged.

### SEI mandate

No evidence Tennessee mandates SEI training for *all* teachers (rule
0520-01-19-.03(8) requires annual ESL training only for teachers
"who provide Direct or Indirect ESL Services," not all teachers).
`sei.mandatedForAllTeachers = false` carries forward unchanged.

### `professionalStandardsMentions`

The Tennessee Teacher Code of Ethics retrieved this round
(`teacher-code-of-ethics-2024.pdf`) is **not** the SEA's professional
teaching standards document — it is a statutory ethics code (T.C.A.
49-5-1001 *et seq.*) and contains no `diverse / cultural / linguistic
/ english learner` references. Tennessee's *teaching* standards are
distributed across SBE Educator Licensure Policy 5.502 + Literacy and
Specialty Area Standards Policy 5.505 + the TEAM evaluation rubric;
none of those documents was retrieved this round (the prior agent's
quota was exhausted before fetching them).

Decision: leave the four booleans at their baseline-2019 values
(`diverse: true`, `cultural: true`, `linguistic: true`, `el: true`)
because no current source *contradicts* them, and add a `notes` flag
that the standards-document re-verification is incomplete. This is
honest — the schema requires non-nullable booleans, and we have not
retrieved a more current standards document that would justify a
flip.

### EL share of public-school enrollment

TDOE 2024 transition deck reports 93,433 ELs = 9% of Tennessee public
school enrollment (`wida-to-elpa-transition-may2024.pdf` slide
"English Learners and Educators in Tennessee"). Baseline figure was
4.6% (2019).

**Re-verified 2026-05-08 against NCES** (`nces-table-204.20.html` —
the NCES Digest 2023 Table 204.20 page, fetched today): Tennessee
Fall 2021 = **57,799 ELs / 5.8%**. The catalog uses NCES Fall 2021
across all 51 jurisdictions for cross-state comparability, so the
TN record is set to `elPercent: 5.8` and `elPercentAsOf:
2021-10-01`. The earlier 9% / 2024-05-30 reading remains accurate
under TDOE's denominator and is preserved in `eld.notes` as a
contextual reference; the 4.6% / 2019 figure was the seed-paper
baseline.

## Source file disposition (matching baseline `sources[]`)

- Baseline source 1: `https://www.tn.gov/education.html` — still
  resolves; replaced by more specific TDOE pages cited above. Kept
  in `sources[]` as part of the audit trail per skill rules.
- Baseline source 2: Leider, Colombo & Nerlino (2021) DOI — kept;
  baseline audit trail.

Both baseline entries retained; new 2026 sources appended.
