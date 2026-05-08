# CT bilingual cross-endorsement — current requirements

Source: https://portal.ct.gov/sdecertification/knowledge-base/articles/resources/endorsements/what-are-the-requirements-for-bilingual-cross-endorsements
Retrieved: 2026-05-07
(Companion: https://portal.ct.gov/en/SDE/Certification/Approved-Courses-for-Teaching-English-to-Speakers-of-Other-Languages-TESOL-Cross-Endorsement
 retrieved same day for the cross-endorsement coursework approved-list reference)

## Standalone vs. cross-endorsement

Bilingual qualifications in Connecticut are **exclusively cross-
endorsements** added to an existing certification. There is no
standalone bilingual teacher license. To add an elementary bilingual
endorsement, the candidate must first complete all coursework
required for the elementary endorsement (#305); secondary bilingual
endorsements require the underlying subject endorsement, with two
exceptions for secondary bilingual humanities (#991) and secondary
bilingual STEM (#992) which require 15 semester hours of content
coursework instead.

This confirms the prior baseline coding `bilingual.standalone =
false, addOn = false → offered = false`.

WAIT — that does NOT match. Baseline coded
`bilingual.offered = false`. But Connecticut clearly offers bilingual
**cross-endorsements**, which under the projectcert canonical
terminology fall under the "credential" umbrella (specifically,
endorsement / add-on). So the correct coding is:

- offered: TRUE (CT offers a bilingual education endorsement)
- standalone: FALSE (no standalone bilingual license)
- addOn: TRUE (it is an add-on / cross-endorsement)

This is a coding correction against the current source — the
baseline appears to have read "no standalone certification" and
coded `offered: false` rather than capturing the cross-endorsement
pathway. Since CT clearly has a documented bilingual
cross-endorsement with its own coursework and language proficiency
requirements, the credential is offered.

## Coursework requirements

"At least 18 semester hours of credit completed at ONE regionally
accredited college" covering six areas:

1. First and second language acquisition
2. Linguistic and academic assessment
3. Cross cultural sensitivity and communication
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
  Interview (OPI) and Writing Proficiency Test (WPT). Per other CSDE
  guidance the passing score for both is Advanced Low.

→ languageProficiency: TRUE
   (Baseline had this `false`. ACTFL OPI/WPT is target-language
    proficiency testing, which is exactly what this flag captures.
    This is a coding correction; the ACTFL requirement has been in
    place at least since the early 2000s, predating Leider 2021.)

## Test (subject-matter)

The bilingual cross-endorsement does not require a separate
bilingual subject-matter Praxis (the Praxis Core writing test is the
English-proficiency requirement, not a subject test, and ACTFL
serves as language proficiency assessment, not subject content).

→ test: FALSE

## Practicum

The cross-endorsement page does not specify a practicum requirement
for the bilingual cross-endorsement (the candidate is already a
certified teacher in the underlying area, where practicum was
required for the primary cert). A standalone practicum is not
described in the current source.

→ practicum: FALSE
   (Note: this represents the bilingual cross-endorsement
    specifically; the underlying primary endorsement carries its
    own practicum.)

## Approved program

Coursework is required at "ONE regionally accredited college" —
i.e., transcript-based course completion rather than a state-
approved bilingual program. The ARCTEL alternate route is one
program-based pathway, but the primary route is coursework.

→ program: NULL
   (Cross-endorsement is coursework-based, but ARCTEL exists as a
    program-based pathway. Genuinely ambiguous — set null with note.)
