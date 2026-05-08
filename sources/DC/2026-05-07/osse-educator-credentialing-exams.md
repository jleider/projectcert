# OSSE — Educator Credentialing Exams (9/2025)

Source URL:
https://osse.dc.gov/sites/default/files/dc/sites/osse/publication/attachments/Educator%20Credentials%20Exams_9%202025.pdf

Retrieved: 2026-05-07

## ENGLISH as a SECOND LANGUAGE (PreK-12)

- Content: **Praxis 5362 — English to Speakers of Other Languages**, required score 155.
- Pedagogy: PLT (5622/5623/5624/5625) OR World Languages Pedagogy (5841, score 158).

## BILINGUAL EDUCATION (PreK-12)

- Content: "A completed degree major or completion of an approved
  program is required" (no Praxis content exam adopted).
- Pedagogy: PLT (5622/5623/5624/5625).
- **No language-proficiency exam (e.g., ACTFL OPI) is listed as
  required by OSSE for the Bilingual Education credential area.**

## BILINGUAL SPECIAL EDUCATION (PreK-12)

- Content: 5354 (Core Knowledge & Applications), 151.
- Pedagogy: PLT.

## Implication for schema

### eld (= ESL):
- requirements.test = true (Praxis 5362 explicitly required)
- requirements.languageProficiency = false (no proficiency exam; ESL
  credential targets teaching English to non-English-speakers, not
  bilingual delivery)
- requirements.program = null — DC accepts approved programs as a
  pathway in many areas, but for ESL, the matrix here only lists
  exam requirements; Standard Teacher Credential pathway requires an
  approved program OR alt routes.
- requirements.coursework = null (not specified in this document)
- requirements.practicum = null (not specified in this document)

### bilingual:
- requirements.test = true (PLT pedagogy is required)
- requirements.program = true (approved program OR degree major in
  the area is **mandatory** because no content exam exists)
- requirements.coursework = null (degree major implies coursework but
  not separately specified)
- requirements.practicum = null
- requirements.languageProficiency = null — **AMBIGUOUS**: leider-2021
  coded this true; the current OSSE 9/2025 exam matrix does not list a
  proficiency exam (e.g., ACTFL OPI) as a prerequisite. Without explicit
  documentation, set to null and note in `notes`.
