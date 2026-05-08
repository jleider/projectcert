# ISBE — Subsequent Teaching Endorsements (Bilingual & ESL)

Source URL: https://www.isbe.net/Pages/Subsequent-Teaching-Endorsements.aspx
Retrieved: 2026-05-08
Retrieved by: projectcert-2026

## Bilingual Education endorsement (subsequent, on PEL)

- **Coursework:** 18 semester hours, distributed across required areas
  (foundations of bilingual education, assessment of bilingual
  students, methods for teaching limited-English-proficient students,
  cross-cultural studies, ESL methods, plus an elective).
- **Clinical experience (practicum):** 100 clinical clock hours
  (university-verified) OR 3 months of documented teaching experience
  in a bilingual setting.
- **Language proficiency:** Required. Pass an applicable Target
  Language Proficiency test, OR hold a degree from an out-of-country
  institution taught in the target language, OR hold the Illinois
  State Seal / Global Seal of Biliteracy.
- **Content test:** Not separately required as a standalone content
  exam in addition to the above.

## ESL endorsement (subsequent, on PEL)

- **Coursework:** 18 semester hours, distributed across required areas
  (linguistics, theoretical foundations of ESL teaching, assessment of
  bilingual students, ESL methods and materials, cross-cultural
  studies, plus an elective).
- **Clinical experience (practicum):** 100 clinical clock hours
  (university-verified) OR 3 months of documented teaching experience
  in an ESL setting.
- **Language proficiency:** None required (this is the key distinction
  from the bilingual endorsement).
- **Content test:** None required for the subsequent ESL endorsement.

## Implication for schema

### bilingual:
- offered = true, standalone = true (ELS-TBE pathway), addOn = true
- requirements.coursework = true (18 SH)
- requirements.practicum = true (100 hrs / 3 months)
- requirements.test = false (no content test required separately;
  the language-proficiency test is captured in `languageProficiency`)
- requirements.languageProficiency = true (Target Language Proficiency
  test or qualifying alternative)
- requirements.program = null (the endorsement can be earned via
  18-SH coursework path; an entitlement program is one route but not
  the only route, so "approved program required" is not affirmative)

### eld (= ESL/ENL):
- offered = true, standalone = true (ENL endorsement), addOn = true
- requirements.coursework = true (18 SH)
- requirements.practicum = true (100 hrs / 3 months)
- requirements.test = false (no content test required for subsequent
  endorsement)
- requirements.languageProficiency = false (explicitly not required)
- requirements.program = null (coursework path is available; not
  exclusively program-required)
