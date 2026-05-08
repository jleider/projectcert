# VT — changes from baseline-2019 → verified-2026

Retrieval date: 2026-05-08
SEA: Vermont Agency of Education (AOE), via the Vermont Standards Board
for Professional Educators (VSBPE) Rules Governing the Licensing of
Educators (Rules 5000–5800), revised June 2022.

## Sources reviewed

- `rules-licensing-educators-2023.pdf` / `.txt` — VSBPE Licensing Rules
  (5440-39 Bilingual Education; 5440-40 English Language Multilingual
  Learner; testing requirements at 5246).
- `core-teaching-leadership-standards.pdf` / `.txt` — Vermont Core
  Teaching and Leadership Standards (2018, current).
- `nces-coe-english-learners-2024.html` — NCES Condition of Education
  2024, English Learners in Public Schools (Fall 2021 data).
- `sealofbiliteracy-vt.html` — sealofbiliteracy.org state listing for
  Vermont (Approved State Seal, Adoption Date 2020-12-01).
- `global-seal-vt.html` — Global Seal of Biliteracy Vermont page
  (corroborating).
- `vt-seal-of-biliteracy-about.html` — VT AOE Seal of Biliteracy About
  page (corroborating; AOE administers the program).

## Diffs vs. prior record

- **elPercent: 2.2 → 2.0** (NCES Condition of Education 2024, table
  using fall 2021 enrollment; VT displayed as 2.0%). Baseline cited
  2.2% (2019). The decrease tracks the broader VT student population
  decline; it is not a re-classification.
- **elPercentAsOf: 2019-10-01 → 2021-10-01.**
- **bilingual.standalone: true → false.** Rule 5440-39 explicitly
  states: "This endorsement is an add-on endorsement only and is
  limited to holders of endorsements in early childhood, elementary
  education, middle grades, special education, English Language
  Learners, science, social studies, mathematics, or English language
  arts." Baseline coded standalone=true, which appears inconsistent
  with the rule text as currently written (and with the rule's
  June 2018 revision date — i.e., the same restriction was in force at
  baseline collection).
- **bilingual.requirements.program: null → true.** Add-on endorsements
  in VT take on the degree requirements of the existing endorsement;
  recommendation through an approved Vermont Educator preparation
  program is the standard pathway (Rule 5230 series). Bilingual is
  not on the Transcript Review list at Rule 5230.
- **bilingual.requirements.practicum: false → true.** Rule 5440-39 §3:
  "A minimum of a practicum, or the equivalent, in Bilingual/Dual
  Language Education at the elementary (PK-6) or middle/secondary
  (7-12) instructional level."
- **eld credential renamed.** The endorsement is now titled "English
  Language Multilingual Learner" (Revised May 2022; endorsement
  number 40, abbreviated "ELLML"). Rule text restructured into five
  Standards (Knowledge About Language; Multilingual Learners in the
  Sociocultural Context; Planning and Implementing Instruction;
  Assessment and Evaluation; Professionalism and Leadership). No
  change to the offered/standalone/addOn coding. Recorded in
  `credentials.eld.notes`.
- **eld.requirements.program: null → true.** Rule 5440-40 sits outside
  the Transcript Review list; an approved Educator preparation program
  is the standard pathway.
- **sealOfBiliteracy.adopted: null → true.**
- **sealOfBiliteracy.year: null → 2020.** sealofbiliteracy.org records
  Vermont's adoption date as 2020-12-01.
- **sealOfBiliteracy.sourceUrl:** Wikipedia → sealofbiliteracy.org.
- **professionalStandardsMentions: unchanged.** Vermont's Core Teaching
  Standards (5235) and Core Leadership Standards reference "diverse,"
  "cultural," and "linguistic" repeatedly (e.g., 1(b), 2(o), 3(l),
  4(m)) but do not mention "English learners" or "ELs" explicitly.
  diverse=T, cultural=T, linguistic=T, el=F holds.
- **sei.mandatedForAllTeachers: false (unchanged).** Vermont has no
  general SEI/sheltered-instruction mandate for all teachers.

## ELP assessment

Vermont remains a WIDA Consortium member; the annual ELP assessment is
ACCESS for ELLs. Rule 5440-40 §1.2 explicitly references "WIDA English
Language Development (ELD) Standards." Coded unchanged.

## Notes for next refresh

- Rule 5440-40 is dated "Revised August 2015, May 2022" — likely stable
  through the next legislative cycle but watch for further AOE rule
  amendments (the licensing rules are in continuous revision; PDF
  banner reads "Revised July 2020 / June 2022").
- Bilingual endorsement (39) language proficiency requirement is
  expressed as a knowledge standard (1.1 "Measurable academic language
  proficiency in English and a second language including listening,
  speaking, reading and writing skills"); no specific exam is named,
  so `test` stays null while `languageProficiency` stays true.
- Praxis II ESOL (5362) remains the required test for endorsement 40
  per Rule 5246/5440-40.
