# RIDE — Certificate Areas and Requirements (live page)

URL: https://ride.ri.gov/teachers-administrators/educator-certification/certificate-areas-and-requirements
Retrieved: 2026-05-08

This is the SEA's authoritative human-readable index of every Rhode
Island educator certificate, the prerequisites, the required tests,
and the practicum hours. It supersedes the leider-2021 baseline page
("https://www.ride.ri.gov" home) for cert-detail purposes.

## Bilingual / Dual Language certificates (six grade bands)

RI offers six standalone Bilingual / Dual Language Education
certificates by grade band (Early Childhood PK-3, Elementary K-6,
Middle 5-8, Secondary 6-12, All Grades PK-12, plus an Elementary
variant with 21 credit-hours of target-language coursework). Each
share the same core requirements:

- Pathway: RI-Approved Program OR Credential Review (CRCI) OR
  Reciprocity. (The non-program pathways still require evidence of
  having met the same competencies — they're routes, not loopholes.)
- Bachelor's degree from regionally accredited institution.
- 45 hours of practicum in the area.
- Tests: ESOL (Praxis 5362) at passing score 155 PLUS a
  language-specific test (e.g., Spanish World Language 5195 at 168;
  French 5174 at 162; Mandarin 5665 at 164; ASL 0634 at 170; Latin
  5601 at 161; German 5183 at 163). For all other world languages
  (effective July 1, 2025): ACTFL OPI + WPT at Advanced Low.
- Prerequisite: must already hold a valid certificate at the matching
  grade band.

The language-specific test is the affirmative
**languageProficiency** signal — a candidate cannot earn the
Bilingual/DL certificate without demonstrating proficiency in the
non-English language of instruction.

## ESOL certificate (All Grades PK-12)

- "English to Speakers of Other Languages (ESOL) Teacher" — All
  Grades PK-12 standalone.
- Pathway: RI-Approved Program OR Credential Review OR Reciprocity.
- Bachelor's degree.
- 45 hours of practicum.
- One year of practical residency (or equivalent) plus 60 hours of
  field experience.
- Test: ESOL (Praxis 5362) at passing score 155.
- Restriction: educators holding only the ESOL certificate are
  restricted to ELD support roles and may not serve as a
  teacher-of-record in early childhood, elementary, middle, or
  secondary grades unless also certified in the appropriate content
  area.

ESOL has no second-language proficiency requirement (this is a
TESOL-style English-language teaching credential, not a bilingual
credential).

## MLL (Multilingual Learner) Endorsement

- Add-on endorsement available to educators holding a valid RI
  certificate.
- "NEW": completion of an approved MLL proficiency program meets
  expectations per current MLL Regulations.
- Approved providers (per RIDE): Brown University, ExcEL Leadership
  Academy, Rhode Island College, Rhode Island School for Progressive
  Education, Roger Williams University, University of Rhode Island,
  RI Federation of Teachers and Health Professionals.
- Evidence: Certificate or Letter of Completion from approved
  provider.

The endorsement is the lower-effort path for an existing teacher to
add an MLL specialization without going through full ESOL or
Bilingual certification. The schema models it as `eld.addOn = true`.

## District Level Administrator — Multilingual Learners

- Support certificate (PK-12) for district-level MLL leadership.
- Three (3) years professional teaching experience in ESOL, MLL,
  ELD, or Bilingual/Dual Language.
- Advanced degree.
- 9 graduate credits in ESOL/Bilingual plus additional graduate-level
  coursework in second-language acquisition, linguistics,
  socio-cultural studies, curriculum, and supervision.
- Test: ESOL (Praxis 5362) at 155.

Out-of-scope for the schema's three credentials but recorded here
for provenance.

## SEI mandate

The page does NOT list any sheltered-English-instruction requirement
for all teachers. RI has no SEI mandate analogous to AZ/CA/MA.

## Schema mapping

| Field | Value | Evidence |
|---|---|---|
| credentials.bilingual.offered | true | six grade-band certs listed |
| credentials.bilingual.standalone | true | each is its own certificate area, not an add-on |
| credentials.bilingual.addOn | true | "extends" prerequisite cert at matching grade band |
| credentials.bilingual.requirements.program | true | RI-Approved Program is the primary pathway |
| credentials.bilingual.requirements.coursework | true | program approval entails coursework; Elementary band explicitly lists 21 sem hrs |
| credentials.bilingual.requirements.practicum | true | 45 hours required |
| credentials.bilingual.requirements.test | true | Praxis 5362 + language test |
| credentials.bilingual.requirements.languageProficiency | true | language-specific test required |
| credentials.eld.offered | true | All Grades ESOL + MLL endorsement |
| credentials.eld.standalone | true | All Grades ESOL is its own certificate |
| credentials.eld.addOn | true | MLL Endorsement, plus Bilingual/DL holders can convert to ESOL |
| credentials.eld.requirements.program | true | RI-Approved Program required |
| credentials.eld.requirements.coursework | true | program approval + MLL endorsement coursework |
| credentials.eld.requirements.practicum | true | 45 hrs + 1 yr residency + 60 hrs field |
| credentials.eld.requirements.test | true | Praxis 5362 (155) |
| credentials.eld.requirements.languageProficiency | false | ESOL has no second-language requirement |
| credentials.sei.mandatedForAllTeachers | false | no SEI mandate found |
