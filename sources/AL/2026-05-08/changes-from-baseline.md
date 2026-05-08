# Alabama — changes from baseline-2019

Refresh date: 2026-05-08. Baseline source: `leider-2021` (Appendix A,
collected November 2019). SEA: Alabama State Department of Education
(ALSDE). Public-facing site: alabamaachieves.org. Regulatory text:
Alabama Administrative Code Chapter 290-3-2 (Educator Certification)
and Chapter 290-3-3 (Educator Preparation).

## Material changes

- `elPercent: 3.5 → 4.7`. NCES Digest 2023 Table 204.20 (fall 2021
  EL enrollment) records Alabama at 34,965 ELs / 4.7% of total
  public school enrollment, up from the 3.5% Leider et al. used from
  fall-2017 / 2018-2019 data. Real growth, consistent with the
  southeastern U.S. trend; not a definitional change. Source:
  `nces-table-204.20.md`.
- `elPercentAsOf: 2019-10-01 → 2021-10-01`. Aligned with CO/MA/NV
  refresh convention (Oct 1 of the fall enrollment year).

- `credentials.eld.requirements.program: null → true`. Rule
  290-3-3-.43(3)(c) is unambiguous: "Satisfactory completion of a
  State-approved program with a minimum GPA of 3.0 [3.25 for
  candidates unconditionally admitted on/after 2017-07-01]." There is
  no test-only or coursework-only pathway to ESOL certification in
  Alabama; the approved-program pathway is the *only* pathway.
  Baseline-2019 had this `null`, presumably a conservative coding
  given the paper's generic 51-state coding rubric. The current rule
  is so explicit that `true` is the only honest reading. Source:
  `290-3-3-educator-preparation.md`.

- `credentials.eld.requirements.coursework: null → true`. Rule
  290-3-3-.43(2) prescribes specific TESOL-aligned coursework strands
  (Knowledge about Language; ELLs in the Sociocultural Context;
  Planning and Implementing Instruction; Assessment and Evaluation;
  Professionalism and Leadership) that any State-approved program
  must include. Plus 290-3-3-.43(3)(b) requires a survey-of-special-
  education or diversity course. Baseline had this `null`; flipping
  to `true`. Source: `290-3-3-educator-preparation.md`.

- `credentials.eld.requirements.practicum: null → true`. Rule
  290-3-3-.43(3)(d): "Competence to teach English for speakers of
  other languages as demonstrated in an internship, with an ESOL
  certified cooperating teacher, of at least 300 clock hours that
  complies with Rule 290-3-3-.03(6)(e)2.(i) and (iv) and Rule
  290-3-3-.41(5)(e)." A 300-hour ESOL-supervised internship is a
  classic practicum requirement. Baseline had this `null`; flipping
  to `true`. Source: `290-3-3-educator-preparation.md`.

- `sealOfBiliteracy.adopted: null → true`. Alabama enacted the Seal
  of Biliteracy via **Act 2022-200**, signed April 1, 2022 (the
  ceremony date recorded by sealofbiliteracy.org is April 6, 2022 —
  same statute). Sources: `al-seal-of-biliteracy-guidelines.md`,
  `sealofbiliteracy-al.md`.

- `sealOfBiliteracy.year: null → 2022`.

- `sealOfBiliteracy.sourceUrl`:
  `https://en.wikipedia.org/wiki/Seal_of_Biliteracy` →
  `https://www.alabamaachieves.org/wp-content/uploads/2024/03/GR_20240323_Alabama-Seal-of-Biliteracy-Guidelines-for-Alabama-Public-Schools_V1.0.pdf`.
  We prefer the ALSDE-issued guidelines PDF over the generic
  Wikipedia article because it is the authoritative state document.

## Unchanged from baseline-2019

- `credentials.bilingual.offered`: still **false**. Alabama does not
  issue a bilingual education certificate or endorsement. The only
  appearance of "bilingual" anywhere in Chapter 290-3-3 is in the
  Pre-K curriculum's reference to "bilingual/multilingual" linguistic
  domains (Rule 290-3-3-.06) — not a credential. Confirmed by reading
  the full 12,230-line snapshot of the chapter. Source:
  `290-3-3-educator-preparation.md`.
- `credentials.bilingual.standalone`: false (unchanged).
- `credentials.bilingual.addOn`: false (unchanged).

- `credentials.eld.offered`: still **true**. Rule 290-3-3-.43:
  English for Speakers of Other Languages (ESOL), Grades P-12,
  Class A (master's-degree-level). Most recent rule revision adopted
  2021-08-12, effective 2021-10-15.
- `credentials.eld.standalone`: still **true**. ESOL is the named
  field of a Class A Professional Educator Certificate, but every
  ESOL candidate must first hold a Class B Professional Educator
  Certificate in another teaching field. (See `notes` for the
  full nuance — Alabama's ESOL credential is genuinely both
  "standalone" in the schema sense (issued in its own right) and
  "addOn" (rides on a prerequisite primary teaching certificate).)
- `credentials.eld.addOn`: still **true** (same reasoning).
- `credentials.eld.requirements.test`: still **true** — AECAP /
  Praxis subject test required for initial ESOL certification per
  Rule 290-3-3-.43(4) and Rule 290-3-3-.41(6).
- `credentials.eld.requirements.languageProficiency`: still
  **false** — no second-language proficiency requirement for ESOL
  candidates anywhere in Rule 290-3-3-.43.

- `credentials.sei.mandatedForAllTeachers`: still **false**. Alabama
  has no universal SEI/EL training mandate for all teacher candidates
  (no "Alabama Reads"-type EL gate, no AZ/CA/MA-style universal SEI).
  The diversity-course requirement at 290-3-3-.43(3)(b) and parallel
  rules in non-ESOL fields can be satisfied by *any one* of five
  topics (special-ed methods, multicultural education, **teaching
  ELLs**, rural education, urban education) — EL is a permitted but
  optional satisfier, not a required topic. The 2025-2026 EL
  Guidebook does not impose new SEI obligations on non-ESL teachers;
  it requires LEAs to staff EL programs with "Qualified personnel
  (state certification and/or ESL licensure)," which is about ESL
  staffing, not about all teachers.

- `professionalStandardsMentions.diverse`: still **true** (Rule
  290-3-3-.04, the Alabama Core Teaching Standards, references
  "diverse" many times).
- `professionalStandardsMentions.cultural`: still **true** (e.g.,
  "diverse cultures and communities," "culturally relevant content,"
  "developmentally, culturally, and linguistically appropriate").
- `professionalStandardsMentions.linguistic`: still **true** (e.g.,
  "cognitive, linguistic, social, emotional, and physical areas" in
  Standard 1; "developmentally, culturally, and linguistically
  appropriate instructional strategies" in Standard 7).
- `professionalStandardsMentions.el`: still **true** (Rule
  290-3-3-.04 explicitly directs candidates to "scaffold instruction,
  including strategies for making content accessible to **English
  language learners**" — line 1200 of the snapshot).

- `elpAssessment.name`: still "ACCESS for ELLs". The 2025-2026 EL
  Guidebook reads "WIDA ACCESS"; same instrument.
- `elpAssessment.consortium`: still "WIDA". WIDA Consortium
  membership re-confirmed at wida.wisc.edu/about/consortium.
- `elpAssessment.sourceUrl`: unchanged.

## New material flagged in `notes` (state record)

- ESOL is Class A only. There is no Class B (bachelor's-level) ESOL
  certificate. Every ESOL candidate first holds a Class B
  Professional Educator Certificate in another teaching field, then
  earns the ESOL Class A as a master's-level program. We code both
  `standalone` and `addOn` true to capture this — Alabama issues an
  ESOL-specific Professional Educator Certificate (so it is the
  *named field* of a license, hence standalone in the schema's
  vocabulary), but it is *only* obtainable as an add-on to a primary
  teaching field certificate.

## Sources retrieved (all 2026-05-08)

1. Alabama Administrative Code Chapter 290-3-3 (Educator Preparation),
   SUPP. NO. 21-4 (current). Rule 290-3-3-.43 ESOL P-12, Rule
   290-3-3-.04 Alabama Core Teaching Standards.
   (`290-3-3-educator-preparation.pdf` + `.txt` + `.md`.)
2. Alabama Administrative Code Chapter 290-3-2 (Educator
   Certification), SUPP. NO. 16-1. Rule 290-3-2-.09 IEC approach with
   ESOL provisions.
   (`290-3-2-educator-certification.pdf` + `.txt` + `.md`.)
3. ALSDE EL Guidebook 2025-2026 (published 2025-12-10).
   (`al-el-guidebook-2025-2026.pdf` + `.txt` + `.md`.)
4. ALSDE Alabama Seal of Biliteracy Overview and Guidelines for
   Public Schools (Act 2022-200).
   (`al-seal-of-biliteracy-guidelines.pdf` + `.txt` + `.md`.)
5. WIDA Consortium membership directory.
   (`wida-consortium.html` + `.md`.)
6. Sealofbiliteracy.org Alabama state record.
   (`sealofbiliteracy-al.html` + `.md`.)
7. NCES Digest of Education Statistics 2023, Table 204.20 — English
   learners enrolled in public schools by state, fall 2021.
   (`nces-table-204.20.html` + `.md`.)

## Gaps / things to revisit

- The ALSDE "English Learners" landing page at
  `https://www.alabamaachieves.org/english-learners/` returns
  truncated content via WebFetch (the JS-rendered page seems to
  exceed the fetch tool's window). The substance of that page is
  fully captured in the Guidebook PDF (which the page itself links
  to), so this is a non-blocking gap. If the page is restructured
  later, re-snapshot.
- No regulatory action found that would change Alabama's posture on
  bilingual credentials, SEI mandate, or EL-specific gating of
  non-ESOL certifications. If ALSDE proposes such a rule (e.g., as
  part of a Strong Foundations/literacy initiative spillover), this
  state will need a re-verify earlier than the next routine cycle.
