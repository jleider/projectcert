# Kansas — changes from baseline-2019

Retrieved: 2026-05-08
SEA: Kansas State Department of Education (KSDE)

## Sources read

1. `ksde-esol-options.html` — KSDE ESOL License Endorsement
   Requirements page (canonical: K.A.R. 91-1-203).
2. `ksde-adding-endorsement.html` — KSDE "Adding an Endorsement to
   Your License" page; specifies which endorsements may not be added
   by content-test only (ESOL is on that list — Test Plus is required
   for that pathway).
3. `ksde-teacher-preparation-standards-index.html` — KSDE Higher
   Education Teacher Preparation Standards landing page; enumerates
   Professional Education Standards (INTASC-based) and content-area
   standards (incl. ESOL). No standalone "bilingual education"
   teacher-prep standards listed.
4. `professional-education-standards.pdf` / `.txt` — KSDE Professional
   Education Standards (adopted 2015-01-13; edited 2016-04-29 to
   include ESOL and virtual learning).
5. `esol-teacher-preparation-standards.pdf` / `.txt` — KSDE ESOL
   teacher-prep standards (adopted 2017-05-09); seven standards
   covering language as a system, language acquisition, role of
   culture, planning, implementing, assessment, and professionalism.
6. `nces-table-204-20.html` — NCES Digest of Education Statistics
   2023, Table 204.20, used for `elPercent` (cross-state
   comparability per the skill's guidance).

## Field-level changes

- `elPercent`: 10.3 → 8.0
  Source: NCES Digest 2023, Table 204.20, Kansas, Fall 2021 column
  (38,757 ELs; 8.0%). Baseline (10.3%) reflected an earlier KSDE/SEA
  figure; adopting the most-recent NCES national table for
  comparability across states. Kansas's EL share peaked at ~11.0% in
  Fall 2016 and has trended down since.
- `elPercentAsOf`: 2019-10-01 → 2021-10-01
  Conforms to the cross-state convention of using the NCES fall
  reference date.

- `credentials.bilingual.offered`: false → false (unchanged)
  No bilingual-education endorsement appears in the KSDE endorsement
  list, the Adding-an-Endorsement page, or the teacher-prep standards
  index. Kansas does not offer a bilingual credential in 2026.
- `credentials.bilingual.standalone` / `addOn`: unchanged (false /
  false).

- `credentials.eld.offered`: true → true (unchanged)
- `credentials.eld.standalone` / `addOn`: true / true → false / true
  The ESOL endorsement is structured as an add-on to a held Kansas
  teaching license — both pathways (Option 1 approved program +
  exam; Option 2 Test Plus = ESOL content-specific coursework + ESOL
  content exam) are routes to add the endorsement to an existing
  license rather than a standalone certification. The baseline coded
  `standalone: true`, but the current KSDE pages frame ESOL as an
  endorsement only. Correcting `standalone` to `false`.
- `credentials.eld.requirements`:
  - `program`: null → true
    Option 1 explicitly requires a state-approved ESOL program.
  - `coursework`: null → true
    Option 2 ("Test Plus", post-2023 K.A.R. 91-1-203 update) requires
    completion of state-approved ESOL content-specific learning
    (named courses at FHSU, KU, K-State, McPherson, Newman,
    Washburn, Wichita State).
  - `practicum`: null → null
    Some institutional Option 1 programs and some Option 2 pathways
    (e.g., FHSU ESOL 885; KU C&T 491 / 825) include a practicum, but
    the regulation does not require a practicum statewide. Leaving
    `null` (mixed at the program level, no SEA-wide rule).
  - `test`: true → true (unchanged)
    Both options require the state-approved ESOL content exam (Praxis
    5362 in Kansas's ETS list).
  - `languageProficiency`: false → false (unchanged)
    No second-language proficiency requirement; ESOL is for teaching
    English to multilingual learners.
- Added `credentials.eld.notes` describing both pathways and the
  March 2023 K.A.R. 91-1-203 update that revised Option 2.

- `credentials.sei.mandatedForAllTeachers`: false → false (unchanged)
  Kansas has no statewide SEI / sheltered-instruction mandate for all
  teachers. The Professional Education Standards include EL-related
  competencies (Standard 2 Function 1) that all candidates must meet,
  but this is a teacher-prep program standard, not an SEI mandate.

- `professionalStandardsMentions.diverse`: true → true
- `professionalStandardsMentions.cultural`: true → true
- `professionalStandardsMentions.linguistic`: true → true
- `professionalStandardsMentions.el`: true → true
  All four flags remain true. The Professional Education Standards
  reference "diverse" learners (definition of "Learner(s)";
  Standard 2: differences in individuals, languages, cultures, and
  communities), "cultural" pluralism (Standard 2 Function 2; 8.1.2CK
  "developmentally, culturally, and linguistically appropriate
  instructional strategies"), "linguistic" diversity (Standard 7
  Function 3; 7.3.1CK), and English language learners explicitly
  ("strategies for making content accessible to English language
  learners and for evaluating and supporting their development of
  English proficiency", 2.1.5PS).

- `sealOfBiliteracy.adopted`: true (2016) — unchanged.
- `elpAssessment.name / consortium`: "ACCESS for ELLs" / "WIDA" —
  unchanged. Kansas remains a WIDA Consortium member.

## Notes carried forward

- ESOL is offered as an **add-on endorsement only**; there is no
  standalone ESOL initial certification pathway in K.A.R. 91-1-203.
- Two endorsement routes after the March 2023 regulation update:
  Option 1 (approved program + content exam) and Option 2 / Test Plus
  (ESOL content-specific coursework at an approved KS institution +
  content exam). The Test Plus route replaces the prior pure
  test-only path, reflecting the 2023 rule change.
- No bilingual education credential exists at the SEA level.

## verificationStatus

Promoted to `verified-2026`. All baseline assertions either
re-verified or corrected against current KSDE pages and standards
documents. No 404s; no missing pieces requiring `in-progress`.
