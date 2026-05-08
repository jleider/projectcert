# Connecticut Common Core of Teaching (CCT) Rubric for Effective Teaching 2017

Source: https://portal.ct.gov/-/media/SDE/Evaluation-and-Support/CCTRubricForEffectiveTeaching2017.pdf
Retrieved: 2026-05-08
Snapshot: cct-rubric-2017.pdf (in same directory; ~660 KB; identical
bytes to the 2026-05-07 snapshot)

## What this is

The CCT Rubric is the operational instrument that the CSDE-issued
Connecticut Common Core of Teaching (Foundational Skills, 1999/2010)
gets assessed against. It is "completely aligned with the CCT
professional standards" and is used to evaluate 40% of a teacher's
annual summative rating under Connecticut's SEED model. State law
and regulations link the CCT to preparation, induction, and
evaluation, so it is the appropriate document to code
`professionalStandardsMentions` against.

## Search results for the four schema flags

Read end-to-end (pages 1-17). Findings:

### diverse — TRUE

- Footnote 3 (page 6) defines "Student diversity" as
  "recognizing individual differences including, but not limited to
  race, ethnicity, gender, sexual orientation, socioeconomic status,
  age, physical abilities, intellectual abilities, religious beliefs,
  political beliefs, or other ideologies."
- Indicator 1a "Respect for student diversity" is a named attribute,
  with "Recognizes and incorporates students' cultural, social and
  developmental diversity to enrich learning opportunities" at
  Exemplary.
- Validation Process (page 2): "Subject matter experts representing
  diverse perspectives reviewed the language of the rubric…"
- Footnote 26 (page 17) defines Culturally-responsive as using "the
  cultural knowledge, prior experiences, and performance styles of
  diverse students."

### cultural — TRUE

- Indicator 1a attribute: "Establishes a learning environment that
  is consistently respectful of students' cultural, social and/or
  developmental differences."
- Indicator 4c attribute "Culturally responsive communications":
  Proficient = "Interacts with students, families and the community
  in a culturally respectful manner."
- Footnote 2 (page 6): "the impact of race, ethnicity, culture,
  language, socioeconomics and environment on the learning needs of
  students."

### linguistic — FALSE (in this primary source)

- The exact word "linguistic" does NOT appear in the CCT Rubric for
  Effective Teaching 2017. The rubric uses "language" (footnote 2)
  but not "linguistic."
- Coding `linguistic: false` is a coding correction against the
  current primary source, not a regulatory change since 2019.
  Connecticut does have separate documents (e.g., the Coaching and
  Self-Reflection Tool for Competency in Teaching English Learners)
  that use "linguistic" extensively, but those are EL-specific
  resources rather than the foundational professional standards
  applicable to all teachers. The schema flag tracks the
  professional-standards document, so we follow what is in the CCT.

### el — TRUE

- Footnote 2 (page 6), defining "Learning needs of all students":
  "includes understanding typical and atypical growth and development
  of PK-12 students, including characteristics and performance of
  students with disabilities, gifted/talented students, and **English
  learners**." (emphasis added)
- This is an explicit, named reference to ELs in the foundational
  attribute (Indicator 1a) of the rubric. Baseline coded this `false`;
  the 2017 rubric (the currently published CSDE professional-standards
  instrument) makes the EL reference explicit.

## Bottom line

Flags after this read:
- diverse: true (unchanged)
- cultural: true (unchanged)
- linguistic: false (changed from baseline true — see changes file)
- el: true (changed from baseline false — see changes file)
