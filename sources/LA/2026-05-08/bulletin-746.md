# Bulletin 746 — Louisiana Standards for State Certification of School Personnel

Source URL:
https://bese.louisiana.gov/docs/default-source/policy-page/28v131-(2).pdf

Title 28, Part CXXXI, Louisiana Administrative Code. Revised
February 2026 (per BESE policy page). Authoritative source for all
Louisiana teacher certification add-on endorsements.

Retrieved: 2026-05-08
Retrieved by: projectcert-2026

## §1359. English as a Second Language (ESL) — add-on endorsement

> A. Eligibility requirements:
>
> 1. valid standard professional level teaching certificate;
> 2. successful completion of the following coursework:
>    a. Methods for Teaching English as a Second Language, three
>       semester hours in theories and practical approaches and
>       techniques for teaching English as a second language to
>       elementary, secondary, and adult education students;
>    b. Introduction to Language and Culture, three semester hours
>       in the relationship of language acquisition to social and
>       cognitive development;
>    c. Structure of the English Language, three semester hours in
>       the distinctive sound patterns and grammatical systems of
>       American English; and
>    d. Curriculum Design for the Multicultural Classroom, three
>       semester hours in adapting curricula for the multi-ethnic
>       classroom as well as a review of existing English as a
>       second language materials for elementary, secondary, and
>       adult education levels.
>
> B. English as a Second Language certification will be valid only
> in the teaching area(s) in which an individual is certified and in
> teaching English as a Second Language I, II, III, and IV elective
> courses.

History: Promulgated LR 48:465 (March 2022), repromulgated LR 48:1073
(April 2022), amended LR 50:671 (May 2024).

### Implication for schema (eld)

- offered = true (ESL endorsement exists)
- standalone = false (ESL is add-on only; tied to an existing
  teaching certificate)
- addOn = true
- requirements.program = null (regulation does not name a
  state-approved EPP pathway distinct from coursework; coursework can
  be earned at any institution that offers it)
- requirements.coursework = true (12 semester hours / four 3-hour
  courses, explicitly listed)
- requirements.practicum = false (no practicum mentioned in §1359)
- requirements.test = false (no required exam in §1359; ELA Praxis
  for ESL is not invoked here)
- requirements.languageProficiency = false (no second-language or
  English-proficiency exam required of the teacher)

This matches the leider-2021 baseline coding for ELD; substantively
unchanged.

## §1343. Bilingual Specialist — add-on endorsement

> A. An elementary, secondary, or all-level certified foreign
> language teacher may be certified as a bilingual specialist upon
> completion of the following:
>
> 1. Bilingual Methods I, practical training in the teaching of
>    language arts and social studies in a bilingual-bicultural
>    setting, three semester hours; and
> 2. Bilingual Methods II, practical training in the teaching of
>    math and science in a bilingual-bicultural setting, three
>    semester hours.

History: Promulgated LR 48:462 (March 2022), repromulgated LR 48:1070
(April 2022).

### Implication for schema (bilingual)

This is the substantive change versus baseline-2019. Bulletin 746
**does** offer a Bilingual Specialist add-on endorsement to a
certified foreign-language teacher. The leider-2021 record coded
`bilingual.offered = false`, which appears to have been a coverage
gap (the 2019 paper focused on the ESL endorsement and the bilingual
specialist credential is small enough to be missed). Re-coded to:

- offered = true (Bilingual Specialist add-on)
- standalone = false (only available as add-on to a foreign language
  certification; not a primary credential)
- addOn = true
- requirements.program = null (no separate state-approved program
  required; just the two methods courses)
- requirements.coursework = true (6 semester hours: Bilingual
  Methods I + II)
- requirements.practicum = null (the courses include "practical
  training" but §1343 does not specify a separate supervised
  practicum hour requirement)
- requirements.test = false (no exam required in §1343)
- requirements.languageProficiency = true (the prerequisite is a
  certified foreign-language teacher, which under Louisiana's foreign
  language certification — and the ACTFL OPI standard typically used —
  functions as a target-language proficiency requirement; coding
  `true` to reflect that bilingual specialists must already be
  certified in the partner language)

## SEI

Louisiana has no statewide mandate that **all** teachers complete
sheltered/SEI coursework as a precondition of certification. Bulletin
746 does not require general-certification candidates to take EL
coursework. Sheltered English Instruction is mentioned in the EL
Program Handbook only as one of several program models that LEAs may
choose to operate.

- credentials.sei.mandatedForAllTeachers = false (unchanged from
  baseline)
