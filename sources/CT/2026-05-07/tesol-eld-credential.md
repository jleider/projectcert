# CT TESOL/ELD credential — current requirements

Sources retrieved 2026-05-07:
- https://portal.ct.gov/en/SDE/Certification/Approved-Courses-for-Teaching-English-to-Speakers-of-Other-Languages-TESOL-Cross-Endorsement
- https://www.eslteacheredu.org/connecticut/  (third-party explainer of the CSDE Initial TESOL Teaching Certificate, useful for the standalone-vs-cross distinction since the certification.ct.gov certification-area page redirected)

## Two pathways

Connecticut offers TESOL as BOTH a standalone teaching certificate
AND a cross-endorsement.

### Initial TESOL Teaching Certificate (PK-12) — standalone

- Bachelor's degree from an approved college or university
- At least 39 semester hours of credit in general academic courses
  in five of the six areas (English, Natural Sciences, Math, Social
  Studies, Foreign Language, Fine Arts)
- A major in TESOL OR at least 30 semester hours of credit in TESOL
  and at least 9 semester hours in bilingualism
- At least 30 semester hours of credit in professional education,
  including at least 6 semester hours each in TESOL at the elementary
  and secondary level
- At least 36 clock hours of study in special education
- TESOL student-teaching experience
- Praxis II English to Speakers of Other Languages exam

→ standalone: TRUE
→ practicum: TRUE (TESOL student teaching)
→ test: TRUE (Praxis II ESOL)
→ coursework: TRUE
→ program: TRUE (approved teacher preparation program)

### TESOL Cross-Endorsement — add-on

State regulations require completion of at least 30 semester hours
of credit in TESOL coursework with course work in each of five
categories:

1. English Syntax and English Composition
2. Language Theory and Second Language Acquisition
3. Linguistic and Academic Assessment of English Language Learners
4. Curriculum and Methods of Teaching ESL
5. Culture and Intergroup Relations

The cross-endorsement page does not separately require Praxis II
ESOL beyond what is required for the underlying certificate; the
test requirement applies to the standalone Initial TESOL cert.

→ addOn: TRUE
→ coursework: TRUE

## Schema mapping

Per projectcert, `eld` covers ESL/ENL/CLD/TESOL — Connecticut's
TESOL credential rolls up under `eld`. Final coding:

- offered: TRUE
- standalone: TRUE (Initial TESOL Teaching Certificate exists)
- addOn: TRUE (TESOL cross-endorsement exists)
- requirements:
  - program: TRUE (approved program for the standalone cert)
  - coursework: TRUE
  - practicum: TRUE (TESOL student teaching for standalone cert)
  - test: TRUE (Praxis II ESOL for standalone cert)
  - languageProficiency: FALSE (TESOL teaches English; no target-
    language proficiency required of the teacher)

## Comparison to baseline-2019

Baseline coded:
- program: null  → now true (the Initial TESOL cert is a state-
  approved program)
- coursework: true → unchanged
- practicum: null → now true (TESOL student-teaching for the cert)
- test: null → now true (Praxis II ESOL)
- languageProficiency: false → unchanged

The baseline appears to have left fields null because the
distinction between cross-endorsement (coursework only) and Initial
TESOL cert (full program with student teaching and Praxis) was not
fully resolved. The current CSDE pages document both pathways
clearly. Per skill rules, when a current source clearly establishes
true/false, replace null. We code on the strength of the standalone
pathway since `standalone: true` carries the program/practicum/test
requirements.
