# Colorado — changes from baseline-2019

Refresh date: 2026-05-07. Baseline source: `leider-2021` (Appendix A,
collected 2019).

## Material changes

- `credentials.bilingual.standalone: true → false`,
  `credentials.bilingual.addOn: false → true`. Per the current CDE
  endorsement-requirements page, **both** Colorado EL credentials
  (Culturally and Linguistically Diverse Education and CLD Bilingual
  Education) are explicitly classified as "added endorsements only —
  you first must hold a valid Colorado teacher license in another
  content area." There is no standalone bilingual licensure path. The
  baseline-2019 coding of the bilingual credential as standalone
  appears to have been a misread of what the SEA calls "added
  endorsements" (Colorado uses *added endorsement* where most other
  SEAs say *add-on*); the CLD Bilingual Specialist explicitly
  *requires* the CLDE endorsement (8.22) as a prerequisite. (Source:
  `endorsement-requirements.html`,
  `cld-bilingual-worksheet.pdf` — Requirements §1 "Hold a Colorado
  initial or professional teacher license.")

- `credentials.bilingual.requirements`: previously all `null`. Now
  re-coded against the current CLD Bilingual added-endorsement
  worksheet (rev. 2021-12-17) and CLDE worksheet (rev. 2023-08-01):
  - `program: true` — Colorado-approved bilingual program is one
    pathway.
  - `coursework: true` — alternate pathway is the CLDE 24-credit
    coursework set plus three CLD Bilingual competencies.
  - `practicum: true` — the CLDE coursework includes "CLD Field
    Experience (3 semester hours): experience in an instructional
    setting with CLD learners." The CLD Bilingual worksheet adds
    "Ability to Teach in the Additional Language [a minimum of 30
    clock hours]," which functions as a bilingual practicum.
  - `test: null` — the worksheet allows "test score report(s)" *or*
    transcript coursework as documentation for the three bilingual
    competencies; per the Multiple Measures of Content Competency
    page, CLD/Bilingual is excluded from the multiple-measures
    portfolio option, but the CLD Bilingual worksheet itself still
    lets coursework substitute for a test on the language-proficiency
    competency. Coding `null` rather than `true`/`false`.
  - `languageProficiency: true` — Competency 3 ("Ability to Teach in
    the Additional Language") is a hard requirement for the bilingual
    endorsement. UNC's CDE-approved program documents it as Praxis +
    OPI in the chosen language, or a degree in that language.
    Baseline had this `null`.

- `credentials.eld.standalone: false → false` (unchanged).
  `credentials.eld.addOn: true → true` (unchanged). The CLDE
  endorsement remains an added endorsement only. Confirmed against
  the current endorsement-requirements page and the 2023-revised CLDE
  worksheet.

- `credentials.eld.requirements.test: null → false`. The CLDE worksheet
  contains no exam requirement; competency is demonstrated entirely
  through the 24 semester hours of coursework (or an approved
  program). Baseline had this `null`.

- `credentials.eld.requirements.languageProficiency: false → false`
  (unchanged for ELD; the "Knowledge of Other Languages (3 SH)"
  category in the CLDE worksheet is not a proficiency exam — it can
  be satisfied by coursework, study abroad, a major/minor, *or* by
  three additional hours in any other CLD category. So we keep this
  coded false.)

- `credentials.eld.requirements.program: null → true`. The current
  worksheet explicitly offers two pathways: completion of a
  Colorado-State-Board-approved CLD program OR 24 semester hours of
  specific coursework. Approved-program completion is a valid
  primary pathway. Baseline had this `null` despite the same
  structure presumably being in place in 2019; current source is
  unambiguous, so flipping to `true`.

- `professionalStandardsMentions.linguistic: true → false`. The
  Colorado Teacher Quality Standards (adopted 2011, still the
  governing document under the State Council for Educator
  Effectiveness) mention "language" (Standard 1.1 "language
  development," Standard 3.7 "even when language is a barrier") but
  do **not** use the word "linguistic." The baseline-2019 coding
  appears to have inferred linguistic from the discussion of
  language-as-content; we read the standards literally per the
  schema's word-search convention. (This is a downgrade in one
  direction but the standards also make EL-handling explicit:
  Standard 2.4 names "English language learners," which is why
  `professionalStandardsMentions.el` flips the other way — see
  next.)

- `professionalStandardsMentions.el: false → true`. Standard 2.4
  explicitly references "English language learners" as a group whose
  "learning needs" teachers must adapt to. This is a literal mention
  in the governing standards document. Baseline had it false.

- `elPercent: 11.9 → 10.4`, `elPercentAsOf: 2019-10-01 → 2021-10-01`.
  Updated to NCES Digest 2023 Table 204.20 (Colorado, fall 2021).
  Decline reflects the post-pandemic enrollment dip, not an
  identification-policy change. Matches the source we use for MA
  and NV.

## New material flagged in `notes`

- **EL professional development requirement for all renewing
  teachers (effective 2025-09-01):** Educators renewing a
  professional teaching license with an elementary, English language
  arts, math, science, or social studies endorsement must complete
  45 clock hours (or 3 semester hours) of EL-focused professional
  learning aligned to the CLD standards. CLDE / CLD Bilingual /
  LDE / LDE Bilingual endorsement holders are exempt. **This is not
  the same as an SEI mandate** — it applies only at the renewal of
  certain endorsements, not as a precondition of initial licensure
  for all teachers, and it can be waived for districts with ≤2% EL
  enrollment over three years. So
  `credentials.sei.mandatedForAllTeachers` stays `false`. The new PD
  rule is a meaningful tightening, but it does not make Colorado a
  universal-SEI-mandate state in the AZ/CA/MA sense. Documented in
  `notes`. (Sources: `el-pd-educators.html`, `el-pd-pathways.html`.)

## Unchanged from baseline-2019

- `credentials.bilingual.offered`: still true.
- `credentials.eld.offered`: still true; credential still named
  Culturally and Linguistically Diverse Education (CLDE).
- `credentials.eld.requirements.coursework`: still true.
- `credentials.eld.requirements.practicum`: still true (CLD Field
  Experience, 3 semester hours).
- `credentials.sei.mandatedForAllTeachers`: still false (see note
  above).
- `professionalStandardsMentions.diverse`: still true (Standard II
  title: "diverse population of students").
- `professionalStandardsMentions.cultural`: still true (Standard 2.2
  "diverse cultural competencies"; Standard 4.2
  "culturally-responsive").
- `sealOfBiliteracy`: still adopted 2017 (SB17-123).
- `widaMember`: still true. Colorado has been a WIDA member since
  2012; uses WIDA Screener and ACCESS for ELLs. Confirmed at
  wida.wisc.edu/about/consortium/co.

## Sources retrieved (all 2026-05-07)

1. CDE — Teacher Endorsement Requirements page
   (`endorsement-requirements.html`).
2. CDE — CLD Education added endorsement worksheet, rev. 2023-08-01
   (`clde-worksheet.pdf`).
3. CDE — CLD Bilingual Education added endorsement worksheet,
   rev. 2021-12-17 (`cld-bilingual-worksheet.pdf`).
4. CDE — English Learner PD Requirements: Information for Educators
   (`el-pd-educators.html`).
5. CDE — English Learner Educator PD Requirements pathways page
   (`el-pd-pathways.html`).
6. Colorado Teacher Quality Standards (2011, current governing
   standards) (`teacher-quality-standards.pdf`).
7. CDE — Office of CLDE landing page (`clde-office.html`).
8. CDE — Seal of Biliteracy / Diploma Endorsement for Biliteracy
   (`seal-of-biliteracy.html`).
9. WIDA Consortium — Colorado member page (`wida-co.html`).
10. NCES Digest 2023, Table 204.20, fall 2021 EL counts and percents
    (`nces-table-204.20.html`).
