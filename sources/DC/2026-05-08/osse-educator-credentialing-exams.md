# OSSE — Educator Credentialing Exams (9/2025)

Source URL:
https://osse.dc.gov/sites/default/files/dc/sites/osse/publication/attachments/Educator%20Credentials%20Exams_9%202025.pdf

Retrieved: 2026-05-08
Retrieved by: projectcert-2026

## ENGLISH as a SECOND LANGUAGE (PreK-12)

- Content: **Praxis 5362 — English to Speakers of Other Languages**,
  required score 155.
- Pedagogy: PLT (5622/5623/5624/5625) OR World Languages Pedagogy
  (5841, score 158).

## BILINGUAL EDUCATION (PreK-12)

- Content: "A completed degree major or completion of an approved
  program is required" (no Praxis content exam adopted).
- Pedagogy: PLT (5622/5623/5624/5625).
- **No language-proficiency exam (e.g., ACTFL OPI) is listed by OSSE
  as required for the Bilingual Education credential.**

## BILINGUAL SPECIAL EDUCATION (PreK-12)

- Content: 5354 (Core Knowledge & Applications), score 151.
- Pedagogy: PLT.

## Implication for schema

### eld (= ESL):
- requirements.test = true (Praxis 5362 explicitly required)
- requirements.languageProficiency = false (no proficiency exam; ESL
  credential is for teaching English to non-English-speakers, not
  bilingual delivery)
- requirements.program = null (the matrix only enumerates exams; the
  Standard Teacher Credential pathway accepts approved programs OR
  alternate routes — not unambiguously required by this document)
- requirements.coursework = null (not specified here)
- requirements.practicum = null (not specified here)

### bilingual:
- requirements.test = true (PLT pedagogy is required)
- requirements.program = true (a completed degree major OR completion
  of an approved program is **mandatory** because no Praxis content
  exam exists for Bilingual Education)
- requirements.coursework = null (degree major implies coursework but
  not separately enumerated)
- requirements.practicum = null
- requirements.languageProficiency = null — **AMBIGUOUS**:
  leider-2021 coded this `true`; OSSE's current 9/2025 exam matrix
  does not list a proficiency exam (e.g., ACTFL OPI) as a
  prerequisite. With no current public document confirming the
  proficiency requirement, set to `null` and note in `notes`.
