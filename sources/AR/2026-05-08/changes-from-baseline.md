# AR — Changes from baseline-2019

Refresh date: 2026-05-08
Retrieved by: projectcert-2026
SEA: Arkansas Department of Education / Division of Elementary and
Secondary Education (DESE)

## Sources verified live (200 OK)

1. https://dese.ade.arkansas.gov/Files/Educator_Licensure_(Effective_6-2-22)_Legal.pdf
   — Rules Governing Educator Licensure (effective 2022-06-02; ADE
   317-1, Agency #005.16). Appendix A is the canonical pathway chart.
2. https://dese.ade.arkansas.gov/Offices/educator-effectiveness/educator-licensure-area
   — DESE list of all licensure areas (ESL = code 247, K-12,
   Endorsement; ESOL Ancillary = code 100).
3. https://dese.ade.arkansas.gov/Offices/educator-effectiveness/educator-preparation-programs-in-arkansas/arkansas-educator-competencies-by-licensure-area
   — Index of state-prescribed competency documents per licensure area.
4. https://dese-admin.ade.arkansas.gov/Files/44._English_as_a_Second_Language_K-12_Endorsement_Competencies_Updated_2024_EEF.pdf
   — ESL K-12 endorsement competencies (TESOL- and Praxis-5362-aligned).
5. https://dese-admin.ade.arkansas.gov/Files/62._Arkansas_Teaching_Standards_Updated_2024_EEF_EEF.pdf
   — Arkansas Teaching Standards (Updated 2024).
6. https://dese.ade.arkansas.gov/Files/63._Arkansas_Teaching_Standards_2023_EEF.pdf
   — 2023 prior version of the same standards (diff context).
7. https://dese.ade.arkansas.gov/Offices/educator-effectiveness/licensure/licensure-assessments
   — Praxis 5362 (ESL) passing score 155.
8. https://dese.ade.arkansas.gov/Offices/public-school-accountability/assessment/elpa21
   — DESE ELPA21 assessment page (2025-2026 administration).
9. https://dese.ade.arkansas.gov/Offices/learning-services/curriculum-support/arkansas-seal-of-biliteracy
   — DESE Seal of Biliteracy page (state board endorsement June 2018).
10. https://sealofbiliteracy.org/state/ar
    — National registry confirmation.
11. https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp
    — NCES Digest 2023 Table 204.20 (fall-2021 EL counts, AR row).
12. https://dese.ade.arkansas.gov/divisions/learning-services/english-learners
    — DESE English Learners office hub (English-Learners-office HTML).

The legacy leider-2021 source URL
(http://dese.ade.arkansas.gov/) is still reachable via redirect to
https://dese.ade.arkansas.gov/. It now serves as a hub; the operative
documents are the rules PDF, Appendix A, the licensure-area list, and
the competency document.

## Field diffs vs. baseline-2019

- **elPercent: 8.3 → 8.1**
  (NCES Digest 2023 Table 204.20, fall 2021 — 39,763 ELs / 8.1% of
  total Arkansas public-school enrollment. Most recent NCES year and
  matches the convention used by other refreshed states.)
- **elPercentAsOf: 2019-10-01 → 2021-10-01**
- **credentials.bilingual.offered: false (unchanged)**
  (No bilingual-education endorsement in Appendix A of the current
  rules; world-language endorsements such as Spanish (710), French
  (248) exist but are foreign-language teaching credentials, not
  bilingual-program credentials.)
- **credentials.bilingual.standalone: false (unchanged)**
- **credentials.bilingual.addOn: false (unchanged)**
- **credentials.eld.offered: true (unchanged)**
- **credentials.eld.standalone: false (unchanged)**
  (ESOL is issued only as an endorsement on a Standard or Ancillary
  License — never first-time/standalone.)
- **credentials.eld.addOn: true (unchanged)**
- **credentials.eld.requirements.program: true (unchanged)**
  (Approved program of study remains a path per Rules §4-11.01 and
  Appendix A "Available By Program of Study" column.)
- **credentials.eld.requirements.coursework: null (unchanged)**
  (State competency document lists five domains but no minimum
  credit-hour count; each approved program designs its own coursework.)
- **credentials.eld.requirements.practicum: null (unchanged)**
  (Rules §4-11.02.3 requires "an internship if applicable" tied to
  the approved program — conditional, not a state-stipulated practicum
  for the endorsement itself; test-out path requires no practicum.)
- **credentials.eld.requirements.test: null → true**
  (Coding correction. Praxis 5362 ESL is the licensure assessment per
  the DESE licensure-assessments page (passing score 155), and
  Appendix A Chart 2 explicitly lists ESOL (K-12) as available by
  testing out from any first-time license level. The 2019 baseline
  recorded `null`; the current evidence is unambiguous.)
- **credentials.eld.requirements.languageProficiency: false (unchanged)**
  (No non-English proficiency exam required — ESOL is *teaching*
  English to non-English speakers, not bilingual instruction.)
- **credentials.sei.mandatedForAllTeachers: false (unchanged)**
  (Rules text contains no all-teacher EL/SEI training mandate;
  searches for "sheltered", "SEI", "all teachers", "every teacher"
  return no such mandate.)
- **professionalStandardsMentions.diverse: true (unchanged)**
  (Standard 2: "diverse cultures and communities".)
- **professionalStandardsMentions.cultural: true (unchanged)**
  (Standard 2: "diverse cultures and communities".)
- **professionalStandardsMentions.linguistic: true (unchanged)**
  (Intro + Standard 1: "cognitive, linguistic, social, emotional,
  and physical" development.)
- **professionalStandardsMentions.el: true → false**
  (Coding correction. The Arkansas-published Arkansas Teaching
  Standards (2024 update; 2023 text is identical) contain only the
  ten InTASC standard headers and short descriptions. The terms
  "EL", "English Learner", "English language learner", and "ELL"
  do not appear anywhere in the document. The baseline likely
  credited the underlying InTASC source, which mentions ELs in its
  expanded performance criteria, but Arkansas's own published
  document does not include those expansions. Coding strictly
  against the AR-published primary source.)
- **sealOfBiliteracy.adopted: true (unchanged)**
- **sealOfBiliteracy.year: 2018 (unchanged)**
  (Confirmed against both DESE page and national registry: pilot
  March 2017, State Board endorsement June 2018.)
- **sealOfBiliteracy.sourceUrl:**
  https://sealofbiliteracy.org/ →
  https://dese.ade.arkansas.gov/Offices/learning-services/curriculum-support/arkansas-seal-of-biliteracy
  (DESE primary source replaces national aggregator root; same fact,
  better provenance.)
- **elpAssessment.name: "ELPA21" (unchanged)**
- **elpAssessment.consortium: "ELPA21" (unchanged)**
- **elpAssessment.sourceUrl:**
  https://en.wikipedia.org/wiki/ELPA21 →
  https://dese.ade.arkansas.gov/Offices/public-school-accountability/assessment/elpa21
  (DESE primary source replaces Wikipedia; same fact, better
  provenance. DESE page confirms 2025-2026 administration is ELPA21.)
- **lastVerified: 2019-11-15 → 2026-05-08**
- **verificationStatus: baseline-2019 → verified-2026**

## Sources appended

The two leider-2021 source entries are retained as the audit trail.
Eight new projectcert-2026 entries appended covering the rules PDF,
licensure-area list, ESL endorsement competencies, AR Teaching
Standards, licensure assessments, ELPA21 page, Seal of Biliteracy
DESE page, and NCES Digest Table 204.20.

## Gaps / unresolved

- `credentials.eld.requirements.coursework` and `.practicum` remain
  `null` because Arkansas does not publish state-level credit-hour
  or clock-hour minimums for the ESOL endorsement. Approved programs
  set their own to cover the five competency domains, and the
  test-out pathway bypasses both. This is a faithful reading of the
  current rules + competency document; flipping either to `true` or
  `false` would require evidence the state does not publish.
