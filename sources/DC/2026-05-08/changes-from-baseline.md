# DC — Changes from baseline-2019

Refresh date: 2026-05-08
Retrieved by: projectcert-2026
SEA: Office of the State Superintendent of Education (OSSE)

## Sources verified live (200 OK)

1. https://osse.dc.gov/page/english-learner-policy-and-programs
2. https://osse.dc.gov/sites/default/files/dc/sites/osse/publication/attachments/Educator%20Credential%20Areas%20and%20Fee%20Schedule%201.8.21.pdf
3. https://osse.dc.gov/sites/default/files/dc/sites/osse/publication/attachments/Educator%20Credentials%20Exams_9%202025.pdf
4. https://osse.dc.gov/sites/default/files/dc/sites/osse/page_content/attachments/DC%20Professional%20Teaching%20Standards%20(Final)_1%2029%2013.pdf
5. https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp
6. https://sealofbiliteracy.org/state/dc/

The legacy leider-2021 source URL
(https://osse.dc.gov/service/educator-credentialing-and-certification)
is still live but is now an index page; the operative documents are
the two PDFs (#2, #3) and the EL Policy page (#1).

## Field diffs vs. baseline-2019

- **elPercent: 10.9 → 11.3**
  (NCES 2023 Digest Table 204.20, Fall 2021 — most recent
  state-level NCES figure for cross-state comparability)
- **elPercentAsOf: 2019-10-01 → 2021-10-01**
- **credentials.bilingual.requirements.program: null → true**
  (OSSE 9/2025 exam matrix lists no Praxis content exam for Bilingual
  Education; "a completed degree major or completion of an approved
  program is required" — i.e., approved program is the affirmative
  pathway)
- **credentials.bilingual.requirements.test: null → true**
  (PLT pedagogy exam required for Bilingual Education)
- **credentials.bilingual.requirements.languageProficiency: true → null**
  (AMBIGUOUS: leider-2021 coded `true`; OSSE 9/2025 exam matrix does
  not list any language-proficiency exam — e.g., ACTFL OPI — as a
  prerequisite. Per the schema rule "ambiguous → null + notes," coded
  null with explanation in notes. Could be a 2019 → 2026 change in
  policy, or could be a coding difference between leider-2021 and the
  current published OSSE document.)
- **credentials.eld.requirements.test: true (unchanged)**
  (Praxis 5362 — ESOL — explicitly required at score 155)
- **professionalStandardsMentions.el: true → false**
  (Current published DC Professional Standards for Teaching contains
  zero references to "English learner," "EL," "ELL," or "English
  language learner." `linguistic` retained as `true` via the phrase
  "language skills," consistent with conservative reading.)
- **sealOfBiliteracy.sourceUrl:**
  https://sealofbiliteracy.org/ → https://sealofbiliteracy.org/state/dc/
  (more specific source — same fact)
- **elpAssessment.sourceUrl: unchanged**
  (kept WIDA consortium URL; OSSE EL Policy page corroborates)
- **lastVerified: 2019-11-15 → 2026-05-08**
- **verificationStatus: baseline-2019 → verified-2026**

## Sources appended

The two leider-2021 source entries are retained. Six new
projectcert-2026 entries appended (one per item above).

## Gaps / unresolved

- `credentials.bilingual.requirements.languageProficiency` is set to
  `null` rather than `false` because the absence of a proficiency
  exam in the OSSE 9/2025 matrix is not the same as an affirmative
  statement that none is required. A direct OSSE confirmation would
  be needed to flip to `false` with confidence; in the meantime,
  `null + notes` is the honest coding.
- DC's Professional Standards for Teaching document still carries a
  "DRAFT" watermark on the 1/29/13 PDF that OSSE publishes. It is
  the current operative document but is not labeled as final.
  Worth re-checking next refresh cycle.
