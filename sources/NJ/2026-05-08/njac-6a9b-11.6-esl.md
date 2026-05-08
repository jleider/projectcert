# N.J.A.C. 6A:9B-11.6 — English as a Second Language endorsement

Source: https://www.law.cornell.edu/regulations/new-jersey/N-J-A-C-6A-9B-11-6
Retrieved: 2026-05-08
Retrieved by: projectcert-2026

## Summary

NJ ESL is an **add-on endorsement** on an underlying NJ instructional
certificate. To earn it, candidates must:

- Complete a Department-approved educator preparation program at an NJ
  college/university **OR** complete a minimum of **15 credit hours of
  formal instruction** in seven specified topic areas:
  1. Historical and cultural backgrounds of multilingual learners
  2. Linguistics
  3. Language acquisition
  4. Structure of American English
  5. Developing literacy skills for the second-language learner
  6. Methods of teaching ESL, including teaching English through
     content
  7. Theory and practice of teaching ESL
- Demonstrate English proficiency by passing a Department-approved
  nationally recognized test of oral and written English proficiency,
  **or** an oral proficiency test combined with the basic-skills
  requirement for written competence.

All teachers of ESL classes must hold a NJ instructional certificate
with an ESL endorsement (N.J.S.A. 18A:6-38; N.J.A.C. 6A:9B-11.6).

## Schema mapping

- credentials.eld.offered: true
- credentials.eld.standalone: false
  - ESL is structured as an endorsement on a primary instructional
    certificate, not a standalone primary license. Baseline coded
    standalone: true — appears to be a coding error vs. current and
    historical NJ structure.
- credentials.eld.addOn: true
- requirements.program: true (program-completion path)
- requirements.coursework: true (15-credit alternate path)
- requirements.practicum: null
  - 11.6 does not state a clean true/false practicum requirement
    distinct from the underlying certificate's clinical practice; the
    candidate already holds/qualifies for an instructional certificate
    that has its own clinical-practice expectations.
- requirements.test: true
  - Department-approved nationally recognized test of English
    proficiency (oral + written) is required.
- requirements.languageProficiency: false
  - The ESL endorsement does not require proficiency in a non-English
    target language. The "proficiency" requirement here is *English*
    competence, not a second/target language.

## Notes

The baseline coded `eld.requirements.test: true` and noted "English
proficiency requirement explicit" — that observation matches 11.6's
oral-and-written English proficiency test, so we keep that note.
