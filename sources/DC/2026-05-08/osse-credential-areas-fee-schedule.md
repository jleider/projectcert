# OSSE — Educator Credential Areas and Fee Schedule (1.8.21)

Source URL:
https://osse.dc.gov/sites/default/files/dc/sites/osse/publication/attachments/Educator%20Credential%20Areas%20and%20Fee%20Schedule%201.8.21.pdf

Retrieved: 2026-05-08
Retrieved by: projectcert-2026

## Relevant subject areas (All Grades Pre-K-12 table)

Listed both as primary "All Grades" credentials AND as added
"Endorsement" entries:

- Bilingual Education (Pre-K-12), $50
- Bilingual Special Education (Pre-K-12), $50
- English as a Second Language (Pre-K-12), $50

Confirms applicants may file for primary certification in these areas
AND holders of an active full DC credential may apply for them as
added endorsements.

## Implication for schema

- credentials.bilingual.offered = true, standalone = true, addOn = true
- credentials.eld.offered = true, standalone = true, addOn = true
- DC's canonical SEA term for ELD is "English as a Second Language"
  (ESL); maps to our `eld` category per terminology skill.

DC has no separate SEI/sheltered English credential. Sheltered
content is one of five program models offered by LEAs but is not
mandated training for all teachers.
- credentials.sei.mandatedForAllTeachers = false
