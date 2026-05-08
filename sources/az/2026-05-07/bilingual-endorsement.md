# Bilingual Education, PreK-12 Endorsement — ADE

Sources retrieved 2026-05-07:

- ADE Educator Certification — Bilingual Education, PreK-12
  endorsement page (via Wayback raw):
  `https://www.azed.gov/educator-certification/bilingual-education-prek-12`
  (snapshot: `wb-id-educator-certification-bilingual-education-prek-12.html`)
- Ariz. Admin. Code R7-2-615(J) via Cornell LII:
  `https://www.law.cornell.edu/regulations/arizona/Ariz-Admin-Code-SS-R7-2-615`
  (snapshot: `r7-2-615-cornell.html`)

## Structure

Bilingual is offered as an **endorsement** added to a primary teaching
certificate. Confirmed by ADE page header
("Bilingual, PreK-12 Endorsement Overview") and by R7-2-615(J).
There is no standalone Bilingual teaching certificate in AZ. This is
significant: HB 2064 / Prop 203 era effectively eliminated the
freestanding bilingual track. Re-opening of bilingual pathways since
2019 has come through the *endorsement* route, not a new license.

## Full Bilingual endorsement requirements (verbatim, from ADE page)

Prerequisite certificate: AZ Standard Professional, Subject Matter
Expert, Specialized Secondary STEM, Classroom-Based Standard,
International, Alternative, Student Teaching Intern, CTE, Supervisor,
Principal, or Superintendent.

Coursework (Option A or B):

- A: Completion of a bilingual education program from an accredited
  institution; OR
- B: Specific 21-semester-hour package — 3 hrs each of (a) foundations
  of instruction for non-English-language-background students,
  (b) bilingual methods, (c) ESL for bilingual settings,
  (d) assessment of LEP students + reading/writing methods in
  bilingual classroom, (e) linguistics (psycho/socio/L1/L2 acquisition
  or American Indian language linguistics), (f) school/community/
  family culture and parental involvement, (g) methods of teaching
  children with disabilities from non-English-language backgrounds
  (only for special-ed certs).

Practicum/experience (one of):

- 3 semester hours of practicum in a PreK-12 bilingual classroom; OR
- Verification of 2 years full-time bilingual classroom teaching
  experience.

Language proficiency (one of seven options):

- Arizona Classroom Spanish Proficiency Exam (ASU/UA verified)
- AEPA / NES foreign-language subject-knowledge exam passing score
- American Indian language verification by tribal official
- Comparable out-of-state foreign language exam
- Bachelor's/Master's/Doctorate degree in the world language
- 3 years full-time single-subject foreign language teaching
- ACTFL OPI rating (intermediate-mid or higher)

Fee: $60. AZDPS IVP fingerprint clearance card required.

## Provisional Bilingual endorsement

Prerequisite certificate (same list) PLUS language proficiency
verification only. Valid 3 years, non-renewable. No coursework or
practicum required at the provisional stage.

## Schema mapping

- `bilingual.offered`: true
- `bilingual.standalone`: false (endorsement only)
- `bilingual.addOn`: true
- `bilingual.requirements.program`: true (program OR coursework
  pathway is acceptable; "program" route exists explicitly)
- `bilingual.requirements.coursework`: true (alternative pathway)
- `bilingual.requirements.practicum`: true (practicum OR 2 years
  experience — practicum is the named requirement)
- `bilingual.requirements.test`: false (no subject-area exam gates
  the endorsement; the foreign-language exam options are *language
  proficiency* verifications, captured separately)
- `bilingual.requirements.languageProficiency`: true (mandatory at
  both provisional and full stages)
