# Oklahoma — changes from baseline-2019 to verified-2026

Retrieved: 2026-05-08
SEA: Oklahoma State Department of Education (OSDE) and Oklahoma Office
of Educational Quality and Accountability (OEQA, the body governing
educator preparation accreditation).

## Summary

Oklahoma's EL teacher credential structure is substantively unchanged
from the 2019 baseline: ESL is the only EL-related credential offered
by OSDE, available as an add-on endorsement via OSAT subject-area test
177 (English as a Second Language, PK-12). There is no Bilingual
Education credential. SEI training is not mandated for every teacher.

The non-trivial changes are: (a) NCES enrollment data refresh,
(b) confirming the Seal of Biliteracy was adopted in 2020 (the prior
record had this as `null`), (c) refining `professionalStandardsMentions`
to reflect the operative OEQA framework, and (d) appending current
SEA/OEQA source URLs.

## Diffs vs. prior record

- elPercent: 8 → 9.3
  (NCES Digest of Education Statistics 2023, Table 204.20, Fall 2021
  data; refreshed for cross-state comparability)
- elPercentAsOf: 2019-10-01 → 2021-10-01
- credentials.bilingual.offered: false → false (unchanged — confirmed
  no Bilingual Education credential listed in OSDE Full Competencies
  TOC; OK's IS1/IS2 program models are LEA-level delivery models, not
  teacher credentials)
- credentials.eld.offered: true → true (unchanged)
- credentials.eld.standalone: false → false (unchanged — OK's ESL is
  an add-on endorsement, not a standalone certificate)
- credentials.eld.addOn: true → true (unchanged)
- credentials.eld.requirements.program: null → null (OEQA accredits
  EPPs but doesn't publish a per-endorsement approved-program list for
  ESL; coding `null` rather than `false` to reflect this ambiguity)
- credentials.eld.requirements.coursework: null → null (OSDE's ESL
  competencies imply coursework but do not mandate specific credit
  hours; preserved as null)
- credentials.eld.requirements.practicum: null → null (no practicum
  requirement evident in OSDE/OEQA documents reviewed; preserved as
  null pending direct OAC citation)
- credentials.eld.requirements.test: true → true (unchanged — OSAT
  177 confirmed via CEOE and OSDE Competencies document)
- credentials.eld.requirements.languageProficiency: false → false
  (unchanged — the "Demonstrate English fluency" expectation in ESL
  competency E.5 is a candidate English-fluency expectation, not a
  non-English language proficiency requirement)
- credentials.sei.mandatedForAllTeachers: false → false (unchanged —
  OSDE EL FAQ 2025 explicitly contemplates LEAs without dedicated EL
  staff; OEQA State Requirement 1 is an either/or pathway at the EPP
  level, not a per-teacher mandate)
- professionalStandardsMentions.diverse: true → true (unchanged —
  OEQA State Requirement 5 mandates "60 hours of diverse field
  experiences"; InTASC Standard 2 references "diverse cultures and
  communities")
- professionalStandardsMentions.cultural: false → true
  (Oklahoma's adopted General Teacher Competencies — InTASC Model
  Core Teaching Standards — Standard 2 references "diverse cultures
  and communities"; OSDE ESL competency block also has a Culture
  domain. Baseline 2019 coded this false; current operative framework
  warrants true.)
- professionalStandardsMentions.linguistic: false → true
  (InTASC Standard 1, as adopted by OEQA at OAC 210:20-9-152,
  literally references the "linguistic" area of learner development.
  Baseline 2019 coded false; the current adopted framework warrants
  true.)
- professionalStandardsMentions.el: false → true
  (OEQA State Requirement 1 explicitly references "Emergent Bilingual
  (English Learner) students" as one of two pathways every EPP must
  embed. Baseline 2019 coded false; the operative state requirement
  governing educator preparation accreditation in Oklahoma directly
  names ELs. Coding to `true` is faithful to the regulatory framework
  even though the narrow InTASC adoption text doesn't say "English
  learner.")
- sealOfBiliteracy.adopted: null → true
  (Confirmed: established September 2020 by OSDE under 70 O.S. §
  11-103.2 and OAC 210:10-1-16; Oklahoma is the 40th state plus DC to
  adopt. Two levels: Gold (intermediate-mid) and Platinum (advanced-
  low).)
- sealOfBiliteracy.year: null → 2020
- sealOfBiliteracy.sourceUrl: Wikipedia → OSDE Seal of Biliteracy page
- elpAssessment: unchanged (ACCESS for ELLs / WIDA — confirmed via
  WIDA consortium membership page and OSDE English Language
  Proficiency services page; 2025-2026 testing window Jan 5 – Mar 20,
  2026)
- sources[]: appended 7 new entries with retrievedBy: "projectcert-
  2026" — the two leider-2021 entries are preserved.
- lastVerified: 2019-11-15 → 2026-05-08
- verificationStatus: baseline-2019 → verified-2026

## Sources retrieved (snapshots in this folder)

1. `nces-el-percent.md` — NCES Digest 2023, Table 204.20
2. `oeqa-general-teacher-competencies.{html,md}` — OEQA General Teacher
   Competencies for Licensure (OAC 210:20-9-152, InTASC adoption)
3. `oeqa-state-requirements.{html,md}` — OEQA State Requirements for
   Educator Preparation (incl. State Requirement 1 EL pathway)
4. `oeqa-osats.html` — OEQA OSAT subject-area test catalog
5. `osde-competencies.{pdf,txt,md}` — OSDE Full (Subject-Matter)
   Competencies for Licensure and Certification
6. `sde-el-faq-2025.{pdf,txt,md}` — OSDE English Learner Process and
   Practice FAQ 2025
7. `sde-english-language-proficiency.{html,md}` — OSDE English
   Language Proficiency Services landing page
8. `sde-teacher-certification.html` — OSDE Teacher Certification
   landing page
9. `seal-of-biliteracy.md` — Notes on OSDE Seal of Biliteracy +
   sealofbiliteracy.org

## No 404s encountered; promotion to verified-2026 is justified.
