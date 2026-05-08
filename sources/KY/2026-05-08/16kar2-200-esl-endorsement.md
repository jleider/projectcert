# 16 KAR 2:200 — ESL teacher endorsement

- Retrieved: 2026-05-08
- URL: https://apps.legislature.ky.gov/law/kar/titles/016/002/200/
- File: 16kar2-200-esl-endorsement.html

## Citation

Title 16 Education Professional Standards Board, Chapter 2 Teaching
Certificates, Regulation 200: "Probationary endorsement for teachers
for English as a second language."

## Key requirements (paraphrased; full text in HTML snapshot)

To obtain the **probationary** ESL endorsement, a candidate must:

- Hold a valid Kentucky teaching certificate.
- Have completed at least one year of successful teaching experience.
- Hold a bachelor's degree.
- Be **admitted to an EPSB-approved preparation program for the
  endorsement for teaching English as a second language**.
- Be currently enrolled in graduate studies related to the education
  profession.

The probationary endorsement is valid two years and is not renewable;
during that window the teacher must complete the full curriculum to
convert to the regular ESL endorsement.

The regulation explicitly references **Form CA-EL** and directs
candidates to the EPSB; coursework, practicum, language-proficiency,
and test details are operationalized through the EPSB-approved
program standards rather than enumerated in the regulation itself.

## Coding decisions for credentials.eld

- offered: **true** (unchanged)
- standalone: **false** (ESL is an add-on endorsement requiring an
  underlying KY teaching certificate; not a standalone license)
- addOn: **true** (unchanged)
- requirements.program: **true** (NEW — was null. Regulation requires
  enrollment in/completion of an "EPSB approved preparation program";
  goteachky.com endorsements page corroborates that all endorsements
  require an "approved educator preparation program.")
- requirements.coursework: **true** (unchanged — completion of program
  curriculum is mandatory)
- requirements.practicum: **null** (16 KAR 2:200 does not specify;
  practicum exists at the program level but is not surfaced in the
  regulation or on goteachky.com — coding null per "ambiguous → null"
  rule)
- requirements.test: **true** (NEW — was null. The goteachky.com
  endorsements page states endorsement applications require "passage
  of appropriate assessments for each endorsement"; this is a global
  EPSB requirement applied to ESL endorsement candidates. Praxis 5362
  ESOL is the customary test for the ESL endorsement, though the
  specific test number is not enumerated in 16 KAR 2:200. Coding
  `true` reflects the affirmative requirement that *some* assessment
  is required; the test name is not stored in our schema.)
- requirements.languageProficiency: **false** (unchanged. ESL
  endorsement targets teaching English to ELs, not proficiency in a
  partner language; bilingual endorsement does not exist in KY.)

## Bilingual

KY has **no bilingual education teacher endorsement** in 16 KAR
Chapter 2. The only EL-related endorsement is ESL. This corroborates
the baseline coding bilingual.offered=false.

## SEI

No statewide regulation was located mandating SEI training for all
teachers. SEI mandate remains false.
