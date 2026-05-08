# Louisiana — changes from baseline-2019 (refresh 2026-05-08)

SEA: Louisiana Department of Education (LDOE).
Authority for credentialing: BESE, via Bulletin 746 (Title 28, Part
CXXXI, Louisiana Administrative Code).

## Summary of diffs vs. baseline-2019

- elPercent: 3.6 → 4.9
  (NCES Digest of Education Statistics 2023, Table 204.20; Fall 2021
  state figure for Louisiana, 33,284 students. Source: nces-el-percent.)
- elPercentAsOf: 2019-10-01 → 2021-10-01.
- credentials.bilingual.offered: false → true
  (Bulletin 746 §1343 — Bilingual Specialist add-on endorsement —
  exists for elementary/secondary/all-level certified foreign-language
  teachers. Six semester hours of Bilingual Methods I and II.
  baseline-2019 missed this; the 2019 paper focused on the ESL
  endorsement only. Source: bulletin-746.)
- credentials.bilingual.standalone: false → false (unchanged; add-on only).
- credentials.bilingual.addOn: false → true.
- credentials.bilingual.requirements: added
  { program: null, coursework: true, practicum: null, test: false,
    languageProficiency: true }
  (coursework: 6 sh Bilingual Methods I/II;
  languageProficiency: prerequisite is a certified foreign-language
  teacher, which functions as a target-language proficiency gate.)
- credentials.eld.requirements.program: null → null (unchanged; no
  separately required state-approved EPP pathway distinct from
  coursework — coursework can be earned at any IHE that offers it).
- credentials.eld.requirements.practicum: null → false
  (Bulletin 746 §1359 specifies four 3-hour courses with no separate
  practicum hour requirement; ESL Add-on Checklist confirms.
  Source: bulletin-746, esl-add-on-checklist.)
- credentials.eld.requirements.test: null → false
  (no required exam in §1359 nor in the LDOE Add-on Application
  packet for ESL.)
- credentials.eld.requirements.coursework: true → true (unchanged;
  the four named 3-hour courses still control).
- credentials.eld.requirements.languageProficiency: false → false
  (unchanged).
- credentials.sei.mandatedForAllTeachers: false → false
  (unchanged; SEI is one of several optional LEA program models per
  the EL Program Handbook, not a universal teacher-certification
  precondition).
- professionalStandardsMentions.diverse: true → false
  (LEADS Educator Rubric, April 2024 — the new statewide evaluation
  rubric replacing Compass — does not mention "diverse" learners.
  Source: louisiana-educator-rubric.)
- professionalStandardsMentions.cultural: false → false (unchanged;
  the LEADS rubric's three "cultural" matches are the phrase
  "museums, cultural centers, etc." — incidental field-trip
  examples, not culturally responsive practice).
- professionalStandardsMentions.linguistic: false → false (unchanged;
  zero matches in LEADS).
- professionalStandardsMentions.el: true → false
  (LEADS does not mention English Learners, ELs, ELLs, or English
  language learners in any indicator. This is a meaningful regression
  from the prior Compass rubric, which had cited EL support as part
  of effective practice.)

## Schema additions (new fields adopted on main, not yet in this
worktree's local schema; written into the JSON anyway so the record
matches main when the schema lands)

- sealOfBiliteracy: { adopted: true, year: 2014,
  sourceUrl: "https://sealofbiliteracy.org/state/la/" }
  (Louisiana adopted the State Seal of Biliteracy 2014-05-16. Source:
  seal-of-biliteracy.)
- elpAssessment: { name: "ELPT", consortium: null,
  sourceUrl: ELPT Guidance PDF }
  (Louisiana administers its own state-developed English Language
  Proficiency Test — not WIDA, not ELPA21. Annual K-12 spring
  administration; computer-based; shortened-length form starting
  2024-25. ELPT Connect is the alternate for SCD students. Source:
  elpt-guidance.)

## Sources retrieved (22 files saved under sources/LA/2026-05-08/)

- bulletin-746 (.pdf, .txt, .md) — BESE Bulletin 746, Title 28 Part
  CXXXI, revised Feb 2026; §1359 ESL add-on, §1343 Bilingual
  Specialist add-on. Authoritative.
- el-framework (.pdf, .txt) — Louisiana's English Learner Framework
  (2025-2026), five strategic pillars; LEA-level guidance.
- el-pd-guide (.pdf, .txt) — LDOE EL Professional Development Guide
  (Oct 2022). LEA vendor selection guide; not a credentialing source.
- el-program-handbook (.pdf, .txt, .md) — LDOE EL Program Handbook;
  confirms LEA-discretion program models including SEI; confirms no
  universal SEI mandate.
- elpt-guidance (.pdf, .txt, .md) — LDOE Office of Assessments,
  Analytics, and Accountability ELPT Guidance, July 2025.
- esl-add-on-checklist (.pdf, .md) — LDOE applicant checklist for the
  ESL add-on; mirrors §1359.
- louisiana-educator-rubric (.pdf, .txt, .md) — LEADS Educator Rubric,
  April 2024, statewide rollout 2025-2026.
- nces-el-percent (.html, .md) — NCES Digest 2023 Table 204.20.
- seal-of-biliteracy-la (.html), seal-of-biliteracy (.md) — adoption
  date and citation source.

## No-longer-resolvable URL from baseline-2019

- The leider-2021 root URL https://www.louisianabelieves.com still
  resolves and now redirects to doe.louisiana.gov; not flagged as a
  gap. Kept in sources[] as the audit-trail entry.

## Verification status

- Promote to verified-2026.
- No 404 gaps. No ambiguous fields requiring null + in-progress.
