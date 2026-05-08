# CT — Changes from baseline-2019

Refresh date: 2026-05-08
Retrieved by: projectcert-2026
SEA: Connecticut State Department of Education (CSDE)

## Sources verified live (200 OK)

1. https://portal.ct.gov/sdecertification/knowledge-base/articles/resources/endorsements/what-are-the-requirements-for-bilingual-cross-endorsements
2. https://portal.ct.gov/en/SDE/Certification/Approved-Courses-for-Teaching-English-to-Speakers-of-Other-Languages-TESOL-Cross-Endorsement
3. https://portal.ct.gov/SDE/Student-Assessment/ELP-Assessment/English-Language-Proficiency-Assessment---LAS-Links
4. https://portal.ct.gov/sde/seal-of-biliteracy/seal-of-biliteracy
5. https://portal.ct.gov/-/media/SDE/Evaluation-and-Support/CCTRubricForEffectiveTeaching2017.pdf
6. https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp
7. https://portal.ct.gov/SDE/English-Learners/Bilingual-Education

The legacy leider-2021 source URL (https://portal.ct.gov/SDE) is still
live but is now an index page; the operative documents are the
credentialing knowledge-base articles, the CCT Rubric PDF, the LAS
Links assessment page, and the EL/Bilingual Education hub.

## Field diffs vs. baseline-2019

- **elPercent: 7.4 → 9.4**
  (NCES 2023 Digest Table 204.20, Fall 2021 — most recent state-level
  NCES figure for cross-state comparability; 47,740 ELs in CT)
- **elPercentAsOf: 2019-10-01 → 2021-10-01**
- **credentials.bilingual.offered: false → true**
  (CT clearly issues bilingual cross-endorsements with their own
  coursework and language-proficiency requirements. Baseline appears
  to have read "no standalone bilingual license" and missed the
  add-on pathway. Coding correction.)
- **credentials.bilingual.standalone: false (unchanged)**
- **credentials.bilingual.addOn: false → true**
  (Cross-endorsements per CSDE knowledge base.)
- **credentials.bilingual.requirements.{program,coursework,practicum,test,languageProficiency}: added**
  - program: null (cross-endorsement is coursework-based, but ARCTEL
    alternate route exists as program-based pathway — ambiguous)
  - coursework: true (18 semester hours from one regionally
    accredited college, six required areas)
  - practicum: false (cross-endorsement does not specify a separate
    practicum; primary cert carries that)
  - test: false (no separate bilingual subject-matter Praxis)
  - languageProficiency: true (ACTFL OPI + WPT in target language;
    Praxis Core writing for English)
- **credentials.eld.requirements.program: null → true**
  (Initial TESOL Teaching Certificate is a state-approved program
  pathway with student teaching and Praxis II ESOL.)
- **credentials.eld.requirements.practicum: null → true**
  (TESOL student-teaching experience required for the standalone cert.)
- **credentials.eld.requirements.test: null → true**
  (Praxis II English to Speakers of Other Languages required for the
  standalone cert.)
- **credentials.eld.requirements.coursework: true (unchanged)**
- **credentials.eld.requirements.languageProficiency: false (unchanged)**
- **credentials.sei.mandatedForAllTeachers: false (unchanged)**
  (CT relies on CGS §10-17f bilingual programs and TESOL-certified
  ESL/sheltered instruction; no statewide SEI mandate for all teachers.)
- **professionalStandardsMentions.diverse: true (unchanged)**
- **professionalStandardsMentions.cultural: true (unchanged)**
- **professionalStandardsMentions.linguistic: true → false**
  (The CCT Rubric for Effective Teaching 2017 — the currently
  published professional-standards document — uses the word "language"
  but does not contain the word "linguistic." Coding correction
  against the current primary source. EL-specific CSDE resources do
  use "linguistic" but those are not the foundational standards.)
- **professionalStandardsMentions.el: false → true**
  (Footnote 2 of the 2017 CCT Rubric explicitly names "English
  learners" within the definition of "learning needs of all students."
  Coding correction against the current primary source.)
- **sealOfBiliteracy.adopted: true (unchanged)**
- **sealOfBiliteracy.year: 2017 (unchanged)**
- **sealOfBiliteracy.sourceUrl:**
  https://sealofbiliteracy.org/ → https://portal.ct.gov/sde/seal-of-biliteracy/seal-of-biliteracy
  (CSDE primary source replaces national directory aggregator;
  same fact, better provenance.)
- **elpAssessment.name: "LAS Links Online" (unchanged)**
- **elpAssessment.consortium: null (unchanged — state-specific)**
- **elpAssessment.sourceUrl: unchanged**
  (CSDE confirmed: "The CSDE will be using the LAS Links Assessment
  for the ELP Assessments for all students in Grades K-12 for the
  2025-26 test administration.")
- **lastVerified: 2019-11-15 → 2026-05-08**
- **verificationStatus: baseline-2019 → verified-2026**

## Sources appended

The two leider-2021 source entries are retained. Seven new
projectcert-2026 entries appended (one per source above).

## Gaps / unresolved

- `credentials.bilingual.requirements.program` is set to `null` rather
  than `true` or `false` because the bilingual cross-endorsement
  coursework pathway is transcript-based but ARCTEL exists as a
  program-based alternate route. A direct CSDE policy reading would
  be needed to resolve.
- `linguistic: false` is a tight reading of the CCT Rubric specifically.
  If projectcert later decides the schema flag should reflect any
  CSDE-published professional document (not just the foundational
  standards), this flag would flip back to `true`. Worth revisiting
  when the schema convention is documented.
