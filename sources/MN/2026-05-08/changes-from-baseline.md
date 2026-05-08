# MN — changes from baseline-2019

Refreshed 2026-05-08 against current MDE and PELSB sources, plus
Minnesota Administrative Rules 8710.4400 (ESL), 8710.4150 (bilingual),
8710.2000 (Standards of Effective Practice), and Minn. Stat. 120B.022
(state bilingual seals).

## elPercent

- 8.5 → 8.8 (NCES Digest of Education Statistics 2023, Table 204.20,
  fall 2021).
- elPercentAsOf: "2019-10-01" → "2021-10-01".

## Bilingual credential

- bilingual.standalone: true → false.
  Reason: Rule 8710.4150 subp. 2 requires a prerequisite Minnesota
  license (elementary, or 5–12/7–12 in math, science, social studies,
  or health). Minnesota's bilingual/bicultural credential is therefore
  an add-on, not a standalone licensure field. Coding correction
  against the explicit rule text rather than a regulatory change since
  2019 — the rule has been on the books since 2001 (last amended
  2017).
- bilingual.requirements.coursework: null → true.
  Reason: Rule 8710.4150 subp. 4 enumerates nine competency areas
  (A–I) the candidate must demonstrate in the approved program.
- bilingual.requirements.program: unchanged (true).
- bilingual.requirements.practicum: unchanged (null). The bilingual
  rule does not specify a separate practicum/student-teaching
  requirement; the prerequisite license already includes one.
- bilingual.requirements.test: unchanged (null). MTLE Bilingual
  exists but is not uniformly required; per PELSB Compliance Manual
  (FY25), the MTLE content/pedagogy/basic-skills tests are no longer
  required for completers of MN-state-approved licensure programs
  effective 2023-08-01.
- bilingual.requirements.languageProficiency: unchanged (true).
  Subp. 3 requires ACTFL advanced oral + advanced written, or
  schooling conducted in the target language.

## ELD (ESL) credential

- eld.standalone: unchanged (true). Rule 8710.4400 subp. 2 does not
  require a prerequisite license; ESL is its own licensure field with
  its own student-teaching requirement.
- eld.addOn: unchanged (false).
- eld.requirements.program: null → true.
  Reason: subp. 2 explicitly requires verification of completing a
  PELSB-approved preparation program.
- eld.requirements.coursework: null → true.
  Reason: subp. 3 enumerates ten competency areas (A–J).
- eld.requirements.practicum: null → true.
  Reason: subp. 3a requires ≥ 100 hrs field-based experience prior to
  student teaching, plus a 12-week full-time face-to-face student-
  teaching placement spanning K–6, 5–8, and 9–12.
- eld.requirements.test: unchanged (null). MTLE ESL exists but is not
  uniformly required — same PELSB program-completer exemption as
  bilingual.
- eld.requirements.languageProficiency: unchanged (false). The rule
  asks the candidate to model English and to have studied a second
  language for at least two HS years or one postsecondary year, but
  this is a coursework prerequisite for the ESL teacher rather than a
  formal proficiency assessment in another language.

## SEI mandate

- mandatedForAllTeachers: unchanged (false). Minnesota does not
  require a sheltered-content endorsement of all classroom teachers.
  Standard 4.A in Rule 8710.2000 references the MN ELD Standards
  Framework, which all licensed teachers must understand, but this
  does not constitute a sheltered-instruction mandate of the kind
  used in AZ, CA, MA, or NV.

## Professional standards mentions

No flag changes. All four (diverse, cultural, linguistic, el) remain
true. The 2022-era revision of 8710.2000 strengthened the textual
basis: Standard 4.A now explicitly names "Minnesota's English
Language Development Standards Framework," and Standards 1.A, 1.D,
1.H, 1.I, 2.A, 4.E, 4.F, and 5.E carry the diverse/cultural/linguistic
language. The literal phrase "English learner" is not in the rule
text we read, but the EL-specific framework is named, supporting the
`el: true` coding.

## Seal of Biliteracy

- adopted: unchanged (true).
- year: unchanged (2014; LEAPS Act enactment per
  sealofbiliteracy.org adoption date 2014-05-16). The current
  codified seal language (Minn. Stat. 120B.022 subd. 1b) was placed
  by 1Sp2015 c 3 art 2 s 2 with subsequent amendments through 2024,
  but we keep the 2014 LEAPS Act enactment year as the adoption
  reference.
- sourceUrl: https://sealofbiliteracy.org/ →
  https://education.mn.gov/MDE/dse/stds/world/seals/
  (more authoritative SEA-hosted page).

## ELP assessment

No change. Minnesota remains a WIDA Consortium member and
administers ACCESS for ELLs. MDE EL Education page references WIDA
under its assessment resources.

## Source list updates

- Old generic root https://education.mn.gov/MDE retained as audit
  trail per skill rules.
- Appended: Rule 8710.4400 (ESL), Rule 8710.4150 (bilingual), Rule
  8710.2000 (effective practice), Minn. Stat. 120B.022 (state seal),
  PELSB FY25 Licensure Compliance Manual, MDE EL Education program
  page, MDE Bilingual Seals page, NCES Digest Table 204.20.
