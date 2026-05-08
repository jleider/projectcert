# Nebraska — changes from baseline-2019 (2026-05-08 refresh)

SEA: Nebraska Department of Education (NDE).

Sources reviewed (saved under this directory):

- `nde-tcert-home.html` — Educator Certification homepage (NDE),
  including the June 4, 2025 announcement that applicants completing
  an educator preparation program through a college or university are
  no longer required to pass the Praxis content test (test only
  remains required for the test-only add-on path and for temporary
  certificates).
- `nde-rule-24-endorsement-list.html` — current list of all Nebraska
  endorsements; confirms ESL (PK-12 / PK-6 / 7-12) and Bilingual
  Education (PK-12 / PK-6 / 7-12) are both still offered as
  Supplemental endorsements. ESL is a prerequisite for Bilingual.
- `rule-24-endorsements.pdf` / `.txt` — 92 NAC 24, the binding
  regulation governing endorsements. Sections 006.09 (Bilingual
  Education) and 006.23 (English As A Second Language) define
  coursework + practicum requirements verbatim.
- `rule-24-guidelines.pdf` — companion guidelines (June 2024) that
  spell out the recommended TESOL-aligned ESL standards and the
  ACTFL Advanced-Low target-language proficiency standard for
  Bilingual.
- `rule-20-educator-prep.pdf` / `.txt` — 92 NAC 20, the approval rules
  for educator preparation programs and the InTASC-derived professional
  standards (005.02A–L) that all candidates must meet.
- `rule-21-certification.pdf` — 92 NAC 21, the certification rules
  (issuance, renewal, alternative routes); reviewed for test/exam
  requirements.
- `nde-natlorigin-home.html` — NDE English Learner Programs landing
  page (parent of the EL pages).
- `nde-serving-english-learners.html` — NDE Serving English Learners
  page, which states the ELP assessment used for identification and
  exit is **ELPA21** (and Alt ELPA for students with significant
  cognitive disabilities). Confirms NE is in the ELPA21 consortium.
- `nde-seal-of-biliteracy.html` — Nebraska Seal of Biliteracy (NeSoBL)
  current state page; collaboration of NDE + Nebraska International
  Languages Association. Three tiers (Platinum/Gold/Silver) using
  ACTFL 2024 guidelines.

## Diff vs. prior record

Encoded changes:

- `elPercent`: 7.6 → 7.3
  (NCES Digest 2023 Table 204.20 latest column, fall 2021;
  NE-row cells ending …, 7.0, 6.8, 7.3.)
- `elPercentAsOf`: 2019-10-01 → 2021-10-01.
- `credentials.bilingual.requirements.test`: false → null
  (Rule 24 §006.09 does not require an exam; the test-only Praxis
  add-on path remains available alongside the approved-program path,
  so coding `false` would misrepresent the alternate pathway. Setting
  `null` flags the ambiguity in line with the schema convention.)
- `credentials.bilingual.requirements.practicum`: null → true
  (Rule 24 §006.09D1 explicitly mandates a 45-clock-hour practicum
  in a bilingual education program taught in the target language.)
- `credentials.bilingual.notes`: refined to call out Rule 24 §006.09
  (12 sem hrs incl. 9 in target language; 45-hr practicum; ESL
  prerequisite; ACTFL Advanced-Low target-language proficiency in the
  guidelines).
- `credentials.eld.requirements.test`: null → false
  (Rule 24 §006.23 does not require a content exam; per the June 2025
  NDE announcement, applicants completing an educator preparation
  program are not required to pass Praxis. The Praxis ESL test-only
  add-on path remains available but is one of two pathways, not a
  required gate. Coded `false` for the program pathway; alternate
  test-only path noted in `credentials.eld.notes`.)
- `credentials.eld.notes`: added (was absent in baseline) — 15 sem hrs
  across Second Language Acquisition, English Language/Linguistics,
  Cross-Cultural Communication, Methods/Curriculum Design, and
  Assessment & Evaluation; 45-hr practicum with ELL students;
  TESOL-aligned guidelines; supplemental endorsement only (no
  standalone). Praxis content test add-on path also exists.
- `professionalStandardsMentions.linguistic`: false → true
  (Rule 20 §005.02A names "linguistic" explicitly as a developmental
  domain teachers must understand; baseline missed this.)
- `lastVerified`: 2019-11-15 → 2026-05-08.
- `verificationStatus`: baseline-2019 → verified-2026.

`elpAssessment` (already populated as ELPA21/ELPA21 in main): now
backed by the NDE Serving English Learners page (sourceUrl updated
to that NDE page rather than Wikipedia).

`sealOfBiliteracy` (already adopted=true, year=2020 in main): now
backed by the NDE NeSoBL state page (sourceUrl updated). The 2020
adoption year in main is preserved; the NDE page does not list an
adoption date but the program references the 2017 enabling
legislation (Neb. Rev. Stat. §79-741) and full NDE rollout in 2020.

No substantive changes to:

- `credentials.bilingual.offered/standalone/addOn` — still
  `true/true/true`. (Note: Rule 24 §006.09B classifies the
  endorsement as Supplemental, requiring an ESL endorsement plus a
  subject/field endorsement. The baseline coded `standalone: true`,
  which is a gloss because Bilingual cannot exist without a primary
  endorsement; it is in practice always an add-on. Leaving as-is to
  avoid silently demoting the field — the JSON schema's `standalone`
  vs `addOn` flags are not mutually exclusive elsewhere either.)
- `credentials.bilingual.requirements.program/coursework/languageProficiency`
  — still `null/true/true` (program=null because both an approved
  program and a Praxis-test pathway exist; coursework=true per Rule
  24 §006.09D; languageProficiency=true per Rule 24 §006.09D's
  9-credit target-language requirement and the guidelines' ACTFL
  Advanced-Low proficiency standard).
- `credentials.eld.offered/standalone/addOn` — still
  `true/false/true`.
- `credentials.eld.requirements.program/coursework/practicum/languageProficiency`
  — still `null/true/true/false`.
- `credentials.sei.mandatedForAllTeachers` — still `false`. NE has no
  SEI mandate for all teachers; ESL endorsement is the EL-prepared
  credential and is opt-in.
- `professionalStandardsMentions.diverse/cultural/el` — still
  `true/true/false`. Rule 20 §005.02B references "individual
  differences and diverse cultures and communities"; §005.03 names
  "ethnicity, race, socioeconomic status, gender, exceptionalities,
  and language" as diversity dimensions. No explicit "English
  Learner" or "EL" wording anywhere in Rule 20.
