# Pennsylvania — changes from baseline-2019

Verification date: 2026-05-08
Verifier: projectcert-2026
Prior status: `baseline-2019` (lastVerified 2019-11-15)
New status: `verified-2026`

## Sources reviewed

All retrieved 2026-05-08 from current PDE / PA Code / WIDA / NCES pages.
HTML snapshots saved alongside this file.

- PDE — ESL Program Specialist landing page (`esl-program-specialist.html`)
- PDE — CSPG #68: ESL Program Specialist PK-12 staffing policy (`cspg-68.html`)
- PDE — ESL Frequently Asked Questions (`esl-faqs.html`)
- PDE — Basic Education Circular: Educating Students Who Are English
  Learners (`bec-educating-els.html`)
- PDE — Educating English Learners overview page
  (`educating-english-learners.html`)
- 22 Pa. Code Chapter 49 — Certification of Professional Personnel
  (`pa-code-chapter-49.html`)
- 22 Pa. Code Chapter 354 — Preparation of Professional Educators
  (`pa-code-chapter-354.html`)
- 22 Pa. Code Chapter 235 — Code of Professional Practice and Conduct
  for Educators (`pa-code-chapter-235.html`)
- WIDA Consortium overview (`wida-consortium.html`)
- WIDA — Pennsylvania member page (`wida-pa-member.html`)
- NCES Digest 2023, Table 204.20 — ELs as percent of public-school
  enrollment, fall 2011–2021 (`nces-table-204-20-d23.html`)

## Findings vs. baseline

### Credentials

- **bilingual.offered**: false → false (no change). PDE does not issue a
  bilingual or dual-language certification. The BEC and 22 Pa. Code
  § 4.26 list "bilingual-bicultural" as one program *type* a school
  district may operate, but no credential is awarded for it. Only the
  ESL Program Specialist exists at the SEA level. Confirmed by absence
  in CSPG list and Chapter 49.
- **eld.offered / standalone / addOn**: true / false / true (no change).
  The ESL Program Specialist PK-12 is an add-on; CSPG #68 (revised
  7/1/2023) clarifies that to teach ESL in a PA public school the
  educator must hold a PA Instructional I or II certificate *in
  addition to* the ESL Program Specialist certificate, unless they
  hold a comparable out-of-state ESL cert earned via a full
  instructional program with student teaching.
- **eld.requirements.program**: true → true.
- **eld.requirements.coursework**: null → true. State-approved program
  is required; the program by definition involves coursework
  (CSPG #68; ESL Specific Program Approval Guidelines reference;
  Chapter 49 § 49.13 / § 49.14).
- **eld.requirements.practicum**: null → true. The ESL Program
  Specialist landing page and the ESL FAQs both state the program must
  include "field experience/student teaching with ESL students."
- **eld.requirements.test**: null → false. ESL FAQ explicitly: "Is
  there a test required for the issuance of the ESL certificate? — No.
  There is currently no test requirement for ESL."
- **eld.requirements.languageProficiency**: false → false (no change).
  Not required; ESL is taught in English to non-native speakers and no
  second-language proficiency exam is mandated.
- **sei.mandatedForAllTeachers**: false → false (no change). PA does
  not have an SEI-style mandate (AZ/CA/MA model). Note: 22 Pa. Code
  § 49.13(b)(4)(i) does require all teacher prep programs to include
  "at least three credits or 90 additional hours … addressing the
  instructional needs of English language learners," but this is a
  pre-service teacher-preparation requirement, not an in-service SEI
  endorsement-style mandate. Recorded in `notes`.

### Professional standards mentions

- **diverse**: true → true. "Diverse learners" appears throughout
  Chapter 49 and Chapter 354.
- **cultural**: true → true. "Culturally diverse" populations and
  "culturally relevant and sustaining education" appear in both
  chapters.
- **linguistic**: false → true. Chapter 49 § 49.13(b)(4)(i) addresses
  "the instructional needs of English language learners" as a
  required component of preparation programs; § 49.14(4)(i)
  references ESL among the certification programs subject to specific
  competency standards. The current Code uses the linguistic frame
  explicitly.
- **el**: false → true. Same § 49.13(b)(4)(i): explicit reference to
  "English language learners." Pre-service prep programs must address
  EL instructional needs.

### EL percent

- **elPercent**: 3.6 (2019) → 4.6 (2021). NCES Digest 2023 Table 204.20
  is the most recent NCES tally available (fall 2021, prepared January
  2024). PA EL count rose from 72,200 (2019) → 77,617 (2021).
- **elPercentAsOf**: 2019-10-01 → 2021-10-01.

### Seal of Biliteracy / ELP assessment

- **sealOfBiliteracy**: already populated (adopted 2022). No change.
- **elpAssessment**: already populated (ACCESS for ELLs / WIDA).
  Confirmed against the WIDA Consortium member directory and PA's
  WIDA member page (`wida-pa-member.html`), which shows PA in the
  consortium with WIDA ACCESS, Alternate ACCESS, Screener and MODEL
  available.

## Sources removed / 404

None. All baseline source URLs remain active or have current
equivalents under the consolidated `pa.gov/agencies/education/...`
information architecture.

## Open items / gaps

- No documented gap. PDE site uses a stable IA; CSPG #68 is the
  authoritative staffing policy and is dated 7/1/2023 (most recent
  revision). All needed flags resolved without `null`.
