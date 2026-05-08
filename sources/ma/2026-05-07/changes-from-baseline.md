# MA — changes from baseline-2019

Refreshed 2026-05-07 against current MA DESE pages and 603 CMR 7.

## elPercent

- 10.0 → 10.5 (NCES Table 204.20, fall 2021).
- elPercentAsOf: "2019-10-01" → "2021-10-01".

## Bilingual credential

- bilingual.standalone: true → false.
  Reason: current MA structure offers Bilingual Education only as an
  *endorsement* added to a primary license. There is no standalone
  Bilingual Education teacher license on the Academic PreK-12 field-
  grade-levels list; "Bilingual Education" appears only in DESE's
  endorsements list (alongside SEI, Autism, Transition Specialist).
  This is a coding correction against the current source rather than
  a regulatory change since 2019 — the Leider 2021 baseline appears
  to have coded both flags true on the strength of multiple bilingual
  pathways, but in MA terminology the credential is squarely an
  endorsement.
- bilingual.requirements: unchanged. Practicum (75 hrs field-based),
  language proficiency (foreign-language test under 603 CMR
  7.14(3)(a)1), coursework via SMK still required. `test: false`
  retained — the MTEL Bilingual functions as the language-proficiency
  assessment, not a separate subject-matter test.

## ELD (ESL) credential

- eld.addOn: true → false.
  Reason: ESL is a standalone teacher license under Academic PreK-12
  (PreK–6 and 5–12), not an endorsement. There is no ESL endorsement
  in the DESE endorsements list. Coding correction against current
  sources.
- eld.requirements: unchanged. Practicum and MTEL ESL #54 still
  required. `program` and `coursework` left null — the regs require
  subject matter knowledge per published DESE guidelines, but the
  current source does not give a clean true/false on the program-vs-
  coursework split.

## SEI mandate

- mandatedForAllTeachers: unchanged (true).
- Notes updated: scope now also explicitly covers vocational educators
  (effective July 1, 2021). Core-academic teacher requirement and the
  LOOK Act (2017) framing still hold.

## Professional standards mentions

No change. 603 CMR 7.08 (Professional Standards for Teachers)
explicitly references "diverse cultural and linguistic backgrounds,"
"English learners," and "diversity," so all four schema flags
(diverse, cultural, linguistic, el) remain true.

## Sources

DESE site reorganization since 2019: paths under
/licensure/academic-prek12/teacher/{sei,esl,bilingual}-endorsement.html
no longer exist. Current canonical pages:

- /licensure/endorsements/sei.html
- /licensure/endorsements/bilingual-ed.html
- /licensure/academic-prek12/teacher/field-grade-levels.html (ESL)
- /lawsregs/603cmr7.html?section=all (regs incl. 7.06, 7.08, 7.14)
- NCES Digest Table 204.20 for elPercent.

Old www.doe.mass.edu root entry from baseline retained in sources[]
as audit trail per skill rules.
