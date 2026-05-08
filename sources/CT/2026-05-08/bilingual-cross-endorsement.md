# CT bilingual cross-endorsement — current requirements

Source: https://portal.ct.gov/sdecertification/knowledge-base/articles/resources/endorsements/what-are-the-requirements-for-bilingual-cross-endorsements
Retrieved: 2026-05-08
Companion: https://portal.ct.gov/en/SDE/Certification/Approved-Courses-for-Teaching-English-to-Speakers-of-Other-Languages-TESOL-Cross-Endorsement
Retrieved: 2026-05-08

## Standalone vs. cross-endorsement

Bilingual qualifications in Connecticut are issued as **cross-
endorsements** added to an existing certification. There is no
standalone bilingual teaching certificate. To add an elementary
bilingual endorsement, the candidate must first complete all
coursework required for the elementary endorsement (#305); secondary
bilingual endorsements require the underlying subject endorsement,
with two exceptions: secondary bilingual humanities (#991) and
secondary bilingual STEM (#992) require 15 semester hours of content
coursework instead of holding the underlying subject endorsement.

Under the projectcert canonical terminology, "credential" covers both
standalone certifications and add-on endorsements. Connecticut clearly
offers a bilingual education credential as an add-on/cross-endorsement.

Coding:
- offered: TRUE
- standalone: FALSE
- addOn: TRUE

The baseline-2019 record coded `offered: false`, which appears to have
read "no standalone bilingual license" rather than capturing the
documented cross-endorsement pathway. This refresh corrects the coding.

## Coursework requirements

"At least 18 semester hours of credit completed at ONE regionally
accredited college" covering six areas:

1. First and second language acquisition
2. Linguistic and academic assessment
3. Cross cultural sensitivity and communication and implications for
   instruction
4. Strategies for modifying English content area instruction
5. Methods of teaching ESL
6. Methods of teaching bilingual education

→ coursework: TRUE

## Language proficiency

Candidates must demonstrate competency through:

- **English proficiency**: passing score on the Praxis Core Academic
  Skills for Educators (Core) writing test
- **Target language proficiency**: passing both the American Council
  on the Teaching of Foreign Languages (ACTFL) Oral Proficiency
  Interview (OPI) and Writing Proficiency Test (WPT)

→ languageProficiency: TRUE
   (Baseline coded `false`. ACTFL OPI/WPT is target-language
    proficiency testing, which is exactly what this flag captures.
    This is a coding correction.)

## Test (subject-matter)

The bilingual cross-endorsement does not require a separate
bilingual subject-matter Praxis. The Praxis Core writing test is the
English-proficiency requirement (not a subject test) and ACTFL OPI/WPT
is target-language proficiency (not subject content).

→ test: FALSE

## Practicum

The cross-endorsement page does not specify a separate practicum
requirement for the bilingual cross-endorsement; the candidate is
already a certified teacher in the underlying area, where practicum
was required for the primary cert.

→ practicum: FALSE
   (Note: this represents the bilingual cross-endorsement
    specifically; the underlying primary endorsement carries its
    own practicum.)

## Approved program

The cross-endorsement is coursework-based at "ONE regionally
accredited college" — transcript-based course completion rather than
a state-approved bilingual program. The ARCTEL alternate route is one
program-based pathway, but the primary route is coursework.

→ program: NULL
   (Cross-endorsement is coursework-based, but ARCTEL exists as a
    program-based pathway. Genuinely ambiguous — set null with note.)
