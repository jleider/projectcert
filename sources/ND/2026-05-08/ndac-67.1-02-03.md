# NDAC 67.1-02-03 — Re-Education chapter (ESPB)

Source URL: https://ndlegis.gov/information/acdata/pdf/67.1-02-03.pdf
Retrieved: 2026-05-08

This is the operative North Dakota Administrative Code chapter
governing endorsement re-education paths, including section
**67.1-02-03-05 — Bilingual Education or English Language Development
Endorsement**.

## Section 67.1-02-03-05 verbatim summary

Two parallel endorsements are codified:

- **English language development endorsement (24000)** — at least
  16 semester hours (24 quarter hours) across all five areas in
  subsections 1–5 below.
- **Bilingual education endorsement (24500)** — all the requirements
  for the ELD endorsement (subsections 1–5) PLUS the additional
  requirements in subsections 6 and 7.

### Required areas (1–5, ELD endorsement)

1. **Foundations** — 4 semester hours: multicultural education;
   foundations of second language instruction.
2. **Linguistics** — 6 semester hours: linguistics, psycholinguistics,
   sociolinguistics.
3. **Methods** — 2 semester hours in methods of teaching English as
   a second language.
4. **Assessment** — 2 semester hours in assessment and testing of
   culturally diverse students.
5. **Field experience** — 2 semester hours of field teaching
   experience with limited English proficient students in a bilingual
   or English as a second language setting.

### Additional bilingual-only requirements (6–7)

6. Methods of teaching bilingual education.
7. **A minimum of 16 semester hours in a language other than English
   OR documented proficiency in a language other than English.**

### Other notes

- Endorsement enables teaching bilingual or ESL grades pre-K through 12.
- Re-education must be completed within two years of assignment.
- Applicant files a plan with ESPB upon employment.
- $80 application fee.
- History: Effective 1995; amended through Jan 1, 2024.

## Coding implications

- bilingual: standalone offered (24500) — yes; add-on — yes
  (it is itself an "endorsement" added to a primary teaching license,
  but is the bilingual-specific credential).
- bilingual.requirements.coursework: true (16 sem hrs ELD core).
- bilingual.requirements.practicum: true (subsection 5).
- bilingual.requirements.languageProficiency: true (subsection 7 —
  16 sem hrs in another language OR documented proficiency).
- bilingual.requirements.test: false in this chapter — code lists no
  state-mandated exam for the bilingual endorsement itself.
- bilingual.requirements.program: null — the regulation describes
  course-content requirements, but does not require completion of an
  ESPB-approved bilingual program as the sole pathway. Applicants
  may compile coursework from any institution to satisfy the
  endorsement.
- eld (24000): offered — yes; add-on — yes; standalone — yes (the
  ELD endorsement is its own credential code, attached to a primary
  license but otherwise independent).
- eld.requirements.coursework: true.
- eld.requirements.practicum: true (subsection 5 field experience).
- eld.requirements.test: true (alternative pathway via Praxis ESOL
  per ESPB's EL Endorsement page — see espb-el-endorsement.md).
- eld.requirements.languageProficiency: false (no language-other-
  than-English proficiency requirement for the ELD endorsement).
- eld.requirements.program: null (same reasoning as bilingual).
