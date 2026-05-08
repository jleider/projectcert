# Idaho — changes from baseline-2019 (refreshed 2026-05-08)

## Source pulls (this folder + 2026-05-07/)

Snapshots saved under `sources/ID/2026-05-08/` and `sources/ID/2026-05-07/`:

- `idapa-08-02-02-current.pdf` (and copy `idapa-08-02-02.pdf`) — IDAPA
  08.02.02 "Rules Governing Uniformity," current effective rule. §017
  (content/pedagogy/performance assessment) and §021 (endorsements,
  including the §021.01 clinical experience requirement) are the
  operative pieces for endorsement add-on procedure.
- `idapa-08-02-03.pdf` — IDAPA 08.02.03 "Rules Governing Thoroughness."
  Curriculum/program rule; not a credential rule, retained for the
  audit trail.
- `osbe-approved-endorsement-programs.pdf` — Idaho State Board of
  Education's "Approved Educator Preparation Provider Initial
  Certificate Endorsement Programs" matrix. Bilingual Education (K-12)
  and English as a Second Language (ESL) (K-12) appear as standalone
  endorsement programs offered through Idaho EPPs.
- `sboe-standards-initial-cert-2018.pdf` — "Idaho Standards for Initial
  Certification of Professional School Personnel" (full version, July 1
  2018 program-approval date). Contains the *Idaho Foundation Standards
  for Bilingual Education and ESL Teachers* + the discipline-specific
  *Idaho Standards for Bilingual Education Teachers* and *Idaho
  Standards for English as a Second Language (ESL) Teachers*. This is
  still the operative discipline-standards document for these
  endorsements as of the 2024 update.
- `sboe-standards-initial-cert-2024.pdf` — successor doc with updated
  Idaho Core Teaching Standards and Idaho Comprehensive Literacy
  Standards (program-approval date July 1 2022). It does **not**
  re-publish the bilingual/ESL discipline standards — the 2018 doc's
  bilingual/ESL chapters remain the operative discipline standards.
- `sde-el-manual.pdf` — SDE *English Learner Program Manual* (updated
  08/01/2025). Pp. 40–42 is the "Idaho ESL and Bilingual Teacher
  Certification" assignment-code table. Confirms Bilingual (K-12)
  endorsement code 7038 and ESL/ENL (K-12) endorsement code 7126.
  Confirms Idaho is a WIDA Consortium state (ACCESS for ELLs / WIDA
  Screener references throughout).
- `sde-adding-endorsement.pdf` — SDE one-pager: "You cannot add an
  endorsement to an Idaho credential by just passing a test (Praxis or
  other) or earning a degree in a subject area." Either approved-program
  pathway with content assessment, or Alternative Authorization Option
  III (content assessment + one year mentored teaching).
- `sde-endorsement-list.pdf` — SDE "List of Idaho Endorsements." Lists
  *Bilingual Education (K-12)* and *English as a Second Language (ESL)
  (K-12)* on the Standard Instructional Certificate.
- `sde-inst-rec-form.pdf` — Institutional Recommendation form (updated
  Jan 30 2025). Section II requires a Praxis content/pedagogy
  assessment number and score for each endorsement.

## Substantive diffs

### Terminology: ESL vs. ENL

The SBOE program list and SDE endorsement list still name the
credential **"English as a Second Language (ESL) (K-12)"** (endorsement
code 7126). The current SDE *English Learner Program Manual* uses
**"English as a New Language (ENL)"** for the *teaching assignment*
codes (assignment codes 00013/51008/01008) but routes them to the same
underlying 7126 endorsement. Both names point to the same credential.
Notes on `eld` are updated to record this dual naming.

### `credentials.bilingual.requirements.test: false → true`

Baseline-2019 coded the bilingual endorsement as `test: false`. Current
SEA documents are unambiguous that **all** endorsements (including
Bilingual Education K-12) require the candidate to "meet or exceed the
state qualifying score on a board approved content, pedagogy or
performance assessment" (IDAPA 08.02.02 §021, effective 4-6-23). The
Institutional Recommendation form (Jan 2025) requires a Praxis number
and score per endorsement, and the SDE adding-endorsement guidance
explicitly states a test is required (in addition to coursework). Promoted
to `true`.

### `credentials.bilingual.requirements.languageProficiency: null → true`

The 2018 *Idaho Standards for Bilingual Education Teachers* (which
remain operative under the 2024 doc) Standard 4(a) requires that the
bilingual education teacher "has communicative competence and academic
language proficiency in the first language and in the second language."
Performance Standard 4(e) requires the candidate to "demonstrate
proficiency in key linguistic structures." This is a program-level
proficiency demonstration (no separate SEA-administered language exam),
but it is an explicit, codified requirement. Baseline `null` (unknown);
now positively confirmed `true`.

### `credentials.bilingual.requirements.program: null → true`

Bilingual Education (K-12) is one of the SBOE-approved EPP endorsement
programs (BSU, NNU per the program matrix). IDAPA 08.02.02 §021 plus
the SDE adding-endorsement guidance establish the approved-program
pathway as the primary route (alternative authorization is the
secondary route). Baseline `null` (unknown); now `true`.

### `credentials.eld.requirements.coursework: null → true`

Baseline-2019 had `program: true, coursework: null, practicum: null,
test: true`. SDE adding-endorsement guidance ("required
coursework/testing/etc.") plus IDAPA §021 (credit hour requirements
under board rule) confirm coursework is required for the ESL/ENL K-12
endorsement. Promoted from `null` to `true`.

### `credentials.eld.requirements.practicum: null → true`

IDAPA 08.02.02 §021.01: "All standard endorsements require supervised
clinical experience in the relevant content area." This applies to the
ESL/ENL endorsement. Promoted from `null` to `true`.

### `elPercent: 6 → 5.8`, `elPercentAsOf: 2019-10-01 → 2021-10-01`

NCES Digest of Education Statistics 2023, Table 204.20: Idaho fall 2011
through fall 2021 percentages = 5.8, 5.0, 4.6, 4.4, 4.6, 5.4, 5.9, 6.2,
6.8, 6.0, 5.8. Most recent NCES value = fall 2021 = 5.8%. Baseline
recorded 6 (rounded from fall 2019's 6.8%); refresh to the most-recent
NCES figure (5.8). Will refresh again when fall 2022/2023 publishes.

## No change

- `credentials.bilingual.offered`, `.standalone`, `.addOn` — still
  offered K-12 standalone (and addable as endorsement to existing
  credential).
- `credentials.bilingual.requirements.coursework` — remained `true`,
  reaffirmed.
- `credentials.bilingual.requirements.practicum` — remained `true`
  (clinical experience is universal under IDAPA §021.01).
- `credentials.eld.offered`, `.standalone`, `.addOn` — still offered
  K-12 standalone.
- `credentials.eld.requirements.program` — still `true`.
- `credentials.eld.requirements.test` — still `true` (Praxis ESL
  content assessment).
- `credentials.eld.requirements.languageProficiency` — still `false`
  (no L1/L2 proficiency requirement for the ESL/ENL credential, as
  expected).
- `credentials.sei.mandatedForAllTeachers` — still `false`. No statute
  or rule mandates an SEI/EL endorsement for all certified teachers.
- `professionalStandardsMentions.diverse / cultural / linguistic / el`
  — all four remain `true`. Idaho Core Teaching Standards (2024 doc)
  Std 1 references "linguistic ... areas," Std 2 references "diverse
  cultures and communities." Idaho Comprehensive Literacy Standard 2
  explicitly mentions "English language learners." Cultural references
  appear throughout (e.g., 2024 doc Standard 8 in the school principal
  chapter — "culturally responsive practices").
- `sealOfBiliteracy` — values from main merge retained (adopted 2020,
  via sealofbiliteracy.org cross-reference).
- `elpAssessment` — Idaho is a WIDA Consortium state; ACCESS for ELLs
  is the annual ELP summative. Confirmed throughout the SDE EL Program
  Manual.
- `name`, `usps`.
