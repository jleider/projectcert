# TSPC — Testing for Teaching License Endorsements (rules effective 6/8/2020)

Source: https://www.oregon.gov/tspc/LIC/Documents/Test%20Guide.pdf
(also pulled the rev. 3/2025 version, see tspc-test-guide-2025.pdf)

TSPC works with three testing companies:
- ORELA (Pearson) — most subject tests
- Praxis (ETS)
- ACTFL — Oral Proficiency Interview / Computerized OPI (language
  proficiency assessments)

## Relevant rows

| Endorsement | Test Title | Testing Co. |
|---|---|---|
| Bilingual Specialization | Oral Proficiency Interview (OPI) or OPIc | ACTFL |
| English to Speakers of Other Languages (ESOL) | English to Speakers of Other Languages (ESOL) | ORELA |

## Implications

- ESOL endorsement requires the ORELA ESOL test → `eld.requirements.test: true`
  (preserves baseline-2019 coding).
- Bilingual Specialization requires only the ACTFL OPI/OPIc — that's a
  language-proficiency exam, not a subject-matter test. Coded under
  `bilingual.requirements.languageProficiency: true`, with
  `bilingual.requirements.test: false` (no subject-matter test required for
  Bilingual; Dual Language similarly has no separate subject-matter test).
