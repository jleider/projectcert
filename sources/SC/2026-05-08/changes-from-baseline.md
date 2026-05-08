# South Carolina — changes from baseline-2019 (refresh 2026-05-08)

Sources reviewed (saved under `sources/SC/2026-05-08/`):

- `scde-add-on-guidelines.pdf` — SCDE "Guidelines and Requirements for
  Adding Certification Fields and Endorsements" (Updated September 10,
  2019; current document on the SCDE Educator Services site as of
  2026-05-08). Defines the ESOL field certification requirements (p.
  12) and the ESOL Endorsement requirements (p. 35).
- `scde-dual-language-endorsements.pdf` — "Endorsements for Dual
  Language Immersion (DLI) for Teachers, Coaches and Instructional
  Leaders," approved by the SC State Board of Education on
  2025-09-02. Establishes a brand-new DLI Teacher add-on endorsement
  (and DLI Coach / DLI Instructional Leadership add-ons).
- `scde-required-exams-25-26.pdf` — "South Carolina Certification
  Assessment Program — Required Assessments, 2025-26 Academic Year"
  (posted July 2025). Lists Praxis 5362 (English to Speakers of Other
  Languages, qualifying score 155) and Praxis PLT 5625 (PreK-12) as
  the required pedagogy exam for ESOL.
- `sc-teaching-standards-handbook.pdf` — "Expanded ADEPT Support and
  Evaluation System: Teacher Standards Rubric Handbook" (NIET
  Teaching Standards 4.0 rubric adopted by SCDE for ADEPT teacher
  evaluation).

NCES Digest of Education Statistics 2023, Table 204.20 (fall 2021)
gives South Carolina 41,949 ELs ≈ 5.6% of public-school enrollment.

## Diffs from baseline-2019

- `elPercent`: 6.1 → 5.6
  (baseline used paper Table 2; refresh uses NCES Digest 2023
  Table 204.20, fall 2021, for cross-state comparability).
- `elPercentAsOf`: 2019-10-01 → 2021-10-01.
- `credentials.bilingual.offered`: false → true
  (SC SBE approved a Dual Language Immersion add-on endorsement on
  2025-09-02; it is the first SCDE-issued bilingual-program
  credential).
- `credentials.bilingual.standalone`: false (unchanged — DLI is an
  add-on only; there is no standalone DLI/bilingual SC certification).
- `credentials.bilingual.addOn`: false → true.
- `credentials.bilingual.requirements.program`: false (not required —
  the endorsement is added by coursework or by a SCDE-approved
  comprehensive sequence of professional learning under the waiver
  provision; no full state-approved preparation program is required).
- `credentials.bilingual.requirements.coursework`: true (two
  3-semester-hour courses required: Foundations of DLI; DLI Methods —
  Key Practices in Content-Based Language Instruction).
- `credentials.bilingual.requirements.practicum`: false (the published
  DLI endorsement requirements list no practicum component).
- `credentials.bilingual.requirements.test`: false (no subject-area
  test required to add the DLI Teacher endorsement).
- `credentials.bilingual.requirements.languageProficiency`: null
  (the September 2025 SBE-approved requirements do not list a
  separate language-proficiency exam for the DLI Teacher endorsement;
  proficiency is implicit in the role but the SCDE document does not
  state a specific proficiency requirement, so coded null rather than
  false to flag the ambiguity).
- `credentials.eld.offered`: true (unchanged).
- `credentials.eld.standalone`: true (unchanged — ESOL is a named
  field certification, Grades PK-12, with Praxis 5362 + PLT 5625).
- `credentials.eld.addOn`: true (unchanged — separate ESOL Endorsement
  exists alongside the field certification).
- `credentials.eld.requirements.program`: null → true
  (per SCDE Add-On Guidelines, Section G "ESOL and Literacy": the
  ESOL field certification "may not be added by method of exam" and
  requires a SCDE-approved preparation program or the listed
  coursework pathway; the field-cert pathway is approved-program
  based).
- `credentials.eld.requirements.coursework`: true (unchanged — the
  add-on coursework pathway and the endorsement pathway are both
  course-based).
- `credentials.eld.requirements.practicum`: null → true
  (ESOL Endorsement requires a 15-hour practicum; the field-cert
  add-on coursework pathway requires a Practicum in the Instruction
  of ESOL course, waivable with one year of successful documented
  ESOL teaching).
- `credentials.eld.requirements.test`: null → true
  (Praxis 5362 — English to Speakers of Other Languages, qualifying
  score 155 — required for the ESOL field certification per the
  2025-26 Required Assessments document; PLT 5625 PreK-12 is the
  pedagogy exam).
- `credentials.eld.requirements.languageProficiency`: false
  (unchanged — no non-English language proficiency required for ESOL).
- `credentials.sei.mandatedForAllTeachers`: false (unchanged — SC has
  no universal SEI mandate; the only EL-related certification
  obligations attach to ESOL/DLI candidates).
- `professionalStandardsMentions.diverse`: true → false
  (the NIET Teaching Standards 4.0 rubric adopted by SCDE for ADEPT
  contains no occurrences of "diverse" or "diversity").
- `professionalStandardsMentions.cultural`: true (unchanged — the
  rubric includes a "Respectful Culture" indicator and references
  "cultural heritage" and "cultural centers").
- `professionalStandardsMentions.linguistic`: true → false
  (no occurrences of "linguistic" or "language/linguistic diversity"
  in the NIET 4.0 rubric).
- `professionalStandardsMentions.el`: true → false
  (no occurrences of "English learner," "English language learner,"
  "ELL," "ESL," "ESOL," or "LEP" in the NIET 4.0 rubric — SCDE moved
  away from the prior SC-authored ADEPT 4.0 standards, which had
  EL-explicit language, to the NIET-authored rubric).

## Source-by-source verification log

- SCDE homepage (`https://ed.sc.gov`) — still resolves; retained as a
  baseline source. Current educator-services pages are reachable from
  it.
- Leider, Colombo & Nerlino (2021), EPAA 29(100) — DOI
  `10.14507/epaa.29.5279` still resolves; retained as the baseline
  audit-trail entry.

No 404s encountered; no gaps. State promotes from `baseline-2019` to
`verified-2026`.
