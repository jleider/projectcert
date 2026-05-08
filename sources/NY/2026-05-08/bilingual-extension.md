# NY Bilingual Education Extension

**URLs:**
- https://www.highered.nysed.gov/tcert/certificate/typesofcerts/extbil.html (snapshot: `nysed-bilingual-extension.html`)
- https://www.nysed.gov/college-university-evaluation/general-and-program-specific-requirements-bilingual-education (snapshot: `nysed-bilingual-requirements.html`)

## Credential type

NY's bilingual credential is an **extension** (add-on) attached to a valid base teaching certificate. It is **not** a standalone license — the OTI page is explicit: "An extension of this type is attached to a valid base certificate, authorizing the holder to teach bilingual education."

## Coursework / content core

The Bilingual Education Extension regulations require program-specific coursework in six areas:

1. Theories of bilingual education and bilingualism
2. Multicultural perspectives in education
3. Sociolinguistics and psycholinguistics
4. Methods for teaching English language arts to bilingual learners using both native language and English to meet state standards
5. Native language arts instruction methods for bilingual learners
6. Content-area teaching methods using both languages, appropriate to the certificate

University catalog evidence (Hunter, Brooklyn College, Molloy, etc.) confirms the field's standard implementation: 12-15 semester credits Content Core + Pedagogical Core.

## Practicum / field experience

Programs require **college-supervised field experiences of at least 50 clock hours** in providing bilingual education, appropriate to the teaching certificate.

## Exam

The **Bilingual Education Assessment (BEA)** is required of candidates seeking the bilingual education extension. The BEA also functions as NY's instrument for verifying language proficiency in the language other than English — i.e., it doubles as the language-proficiency requirement.

## Implication for schema

- `credentials.bilingual.offered` = true
- `credentials.bilingual.standalone` = **false** (correction from baseline; NY's bilingual credential is exclusively an extension to a base certificate, never standalone)
- `credentials.bilingual.addOn` = true
- `requirements.program` = true (approved program pathway exists; baseline had `null`)
- `requirements.coursework` = true (6 content areas required)
- `requirements.practicum` = true (≥50 clock hours; baseline had `false`)
- `requirements.test` = true (BEA)
- `requirements.languageProficiency` = true (BEA verifies language proficiency in the LOTE; baseline had `false`)
