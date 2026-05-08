# NJ — changes from baseline-2019

Refreshed 2026-05-08 against current NJDOE pages and N.J.A.C. 6A:9B.

## elPercent

- 5.9 → 8.2 (NCES Digest 2023, Table 204.20, fall 2021).
- elPercentAsOf: "2019-10-01" → "2021-10-01".

## Bilingual credential (Bilingual/Bicultural Education, code 1480)

- bilingual.standalone: true → false.
  Reason: NJ Bilingual/Bicultural Education is structured at
  N.J.A.C. 6A:9B-11.5 as an **endorsement** layered on a CE/CEAS or
  standard NJ instructional certificate, not as a standalone primary
  license. The 2019 baseline coded `standalone: true` along with
  `addOn: true`; that does not match the current — or historical —
  NJ regulatory structure. Coding correction against current source.
- bilingual.requirements.coursework: null → true.
  Reason: 11.5 specifies a 12-credit-hour CE pathway covering
  linguistics, language acquisition, literacy for second-language
  learners, methods of teaching content in bilingual education, and
  theory and practice of teaching bilingual education.
- bilingual.requirements.program: unchanged (true) — CEAS path is
  completion of a Department-approved bilingual/bicultural educator
  preparation program at an NJ college or university.
- bilingual.requirements.languageProficiency: unchanged (true).
- bilingual.requirements.practicum: unchanged (null). 11.5 references
  exemption from the standard performance assessment but does not state
  a clean true/false on practicum specifically for the endorsement.
- bilingual.requirements.test: unchanged (null). No separate
  subject-matter test beyond the language-proficiency requirement.

## ELD credential (English as a Second Language, code 1475)

- eld.standalone: true → false.
  Reason: ESL is an endorsement under N.J.A.C. 6A:9B-11.6 and must be
  added to an underlying NJ instructional certificate. NJDOE does not
  issue ESL as a primary, standalone teaching license. Baseline coded
  `standalone: true` — coding correction against current source.
- eld.requirements.coursework: null → true.
  Reason: 11.6 specifies a 15-credit alternate path covering seven
  topic areas (multilingual learner backgrounds, linguistics, language
  acquisition, structure of American English, second-language literacy
  development, ESL methods including teaching English through content,
  and theory and practice of teaching ESL).
- eld.requirements.program: unchanged (true) — Department-approved
  educator preparation program path.
- eld.requirements.test: unchanged (true) — Department-approved
  nationally recognized test of oral and written English proficiency.
- eld.requirements.languageProficiency: unchanged (false). The ESL
  endorsement does not require a non-English target-language
  proficiency.
- eld.requirements.practicum: unchanged (null).

## SEI

- sei.mandatedForAllTeachers: unchanged (false).
  Reason: NJ requires that *ESL teachers* hold an ESL endorsement and
  that LEAs serving 10+ MLs offer one period daily of ESL by a
  certified teacher. There is no statewide mandate that all general
  classroom teachers complete SEI training.

## Professional standards mentions (N.J.A.C. 6A:9-3.3, NJPST)

- professionalStandardsMentions.diverse: unchanged (true).
- professionalStandardsMentions.cultural: unchanged (true).
- professionalStandardsMentions.linguistic: unchanged (true).
- professionalStandardsMentions.el: false → **true**.
  Reason: Current NJPST text explicitly references "multilingual
  learners" and "second language acquisition" within Standard Two
  (Learning Differences). Per project terminology, NJ's "multilingual
  learner" rolls up to the canonical EL term.

## Seal of Biliteracy

- adopted: unchanged (true).
- year: unchanged (2016).
- sourceUrl: replaced generic sealofbiliteracy.org pointer with the
  NJDOE Seal of Biliteracy page (an SEA-direct citation).

## ELP assessment

- Unchanged: ACCESS for ELLs / WIDA. Confirmed against current WIDA
  consortium membership listing.

## Sources

Original baseline `sources[]` entries (NJDOE root + Leider 2021)
retained as audit trail per skill rules. New 2026-05-08 entries appended
covering the bilingual and ESL endorsement regulations, current NJDOE
program requirement pages, NJPST regulation, NCES EL data, NJDOE Seal
of Biliteracy page, and WIDA consortium page.

No 404s / disappearances among baseline entries (the baseline only
listed the NJDOE root and the Leider DOI; both still resolve). New
verification therefore proceeds via current SEA endpoints rather than
substitution for missing baseline links.
