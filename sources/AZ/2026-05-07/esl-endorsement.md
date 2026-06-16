# English as a Second Language, PreK-12 Endorsement — ADE

Sources retrieved 2026-05-07:

- ADE Educator Certification — ESL, PreK-12 endorsement page
  (via Wayback raw):
  `https://www.azed.gov/educator-certification/english-second-language-prek-12`
  (snapshot: `wb-id-educator-certification-english-second-language-prek-12.html`)
- Ariz. Admin. Code R7-2-615(K) via Cornell LII:
  `https://www.law.cornell.edu/regulations/arizona/Ariz-Admin-Code-SS-R7-2-615`
  (snapshot: `r7-2-615-cornell.html`)

## Structure

ESL is offered as an **endorsement** added to a primary certificate.
The ADE page is explicit: "The English as a Second (ESL), PreK-12
Endorsement authorizes the holder to teach one or more English
language learners in the area they are appropriately certified. The
ESL endorsement also authorizes the holder to teach in a Structured
English Immersion setting." There is no standalone ESL teacher
certificate in AZ.

## Full ESL endorsement requirements (verbatim from ADE page)

Prerequisite certificate (broad list, same as SEI/Bilingual). Plus
Option A or B:

- A: Completion of an ESL education program from an accredited
  institution; OR
- B: 18 semester hours of coursework — 3 hrs each of foundations of
  instruction for non-English-language-background students; ESL
  methods; teaching reading/writing to LEP students; assessment of
  LEP students; linguistics; and school/community/family culture
  and parental involvement.

Practicum/experience (one of):

- 3 semester hours of ESL practicum; OR
- Verification of 2 years full-time ESL or Bilingual teaching
  experience.

Second language learning experience (one of seven):

- 6 semester hours single-language coursework
- Intensive language training (Peace Corps / FSI / DLI)
- Third-semester-level placement by an accredited institution
- ACTFL OPI level one-intermediate/low or above
- Arizona Classroom Spanish Proficiency Exam passing score
- American Indian language proficiency verification (tribal official)
- AEPA/NES (or comparable out-of-state) foreign-language exam pass

Fee: $60. AZDPS IVP fingerprint clearance card. Official transcripts.

## Provisional ESL endorsement

Prerequisite certificate PLUS 6 semester hours of ESL coursework
(must include 3 hours in ESL methods + 3 hours toward full
endorsement; second-language-learning-experience courses don't
count toward this). Valid 3 years, non-renewable.

## Schema mapping

- `eld.offered`: true
- `eld.standalone`: false (endorsement only — there is no AZ teacher
  license titled "ESL" or "TESOL"; the credential rides on a primary
  certificate)
- `eld.addOn`: true
- `eld.requirements.program`: true (accredited ESL program is an
  explicit Option A pathway)
- `eld.requirements.coursework`: true (Option B alternative)
- `eld.requirements.practicum`: true (3 semester hour practicum is
  a named option; the "or 2 years experience" alternative does not
  remove practicum as a recognized AZ requirement)
- `eld.requirements.test`: false (no subject-area exam gates the
  endorsement; the foreign-language and ACTFL options are
  *second-language-experience* verifications)
- `eld.requirements.languageProficiency`: false — the "second
  language learning experience" requirement here is about exposure,
  not demonstrated proficiency. Multiple non-proficiency options
  (semester-hour coursework, third-semester placement, intensive
  training) satisfy it. This is materially different from the
  Bilingual endorsement, which mandates verified *proficiency*.
