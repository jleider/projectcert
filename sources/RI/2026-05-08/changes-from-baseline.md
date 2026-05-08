# Rhode Island — changes from baseline-2019

Refresh date: 2026-05-08
Verifier: projectcert-2026
Source set saved alongside this file under `sources/RI/2026-05-08/`.

## Summary

The substantive credential coding from leider-2021 holds: RI offers
both standalone bilingual/dual-language certificates (six grade
bands) and a standalone ESOL (All Grades PK-12) certificate, plus
add-on MLL endorsement / MLL Integrated Content paths. RI has no
SEI mandate. Two diffs of note:

1. `bilingual.requirements.program` flips `null → true` (the 2025
   regs explicitly require completion of an approved program; this
   was simply uncoded in the baseline).
2. `eld.requirements.program` flips `null → true` (same — All Grades
   ESOL likewise requires an approved program per Section 1.9.5.S).
3. Three of four `professionalStandardsMentions` flip false → true.
   Reading the 2007 RIPTS document plus the 2025 Cert Regulations
   Section 1.3 descriptors, RI's standards explicitly mention
   cultural background, English language acquisition, native
   language, and English Language Learners / Multilingual Learners.
   The baseline appears to have been conservative.
4. `elPercent` updated from 9 (2019) to 12.5 (NCES Table 204.20,
   fall 2021). NCES narrative explicitly notes RI as having the
   largest positive percentage-point change in EL representation
   nationwide between fall 2011 and fall 2021.

## Field-level diffs vs. baseline-2019

- elPercent: 9 → 12.5
- elPercentAsOf: 2019-10-01 → 2021-10-01
- credentials.bilingual.requirements.program: null → true
  (Section 1.9.X.D.2.b of the 2025 RI Certification Regulations:
  "Has completed an approved program in this certification area".)
- credentials.eld.requirements.program: null → true
  (Section 1.9.5.S.2.a of the 2025 RI Certification Regulations:
  "Has completed an approved program in this certification area".)
- professionalStandardsMentions.cultural: false → true
  (RIPTS Standard 1 and Standard 4 descriptors; 2025 Cert Regs §1.3
  reiterates "cultural background" / "Socio-Cultural Studies".)
- professionalStandardsMentions.linguistic: false → true
  (RIPTS Standard 4: "English language acquisition", "native
  language"; 2025 Cert Regs §1.3 carries forward equivalent
  language and adds "language proficiency".)
- professionalStandardsMentions.el: false → true
  (RIPTS preamble names "English Language Learners" twice; 2025
  Cert Regs §1.3 names "Multilinguals and Multilingual Learners".)

## Field-level confirmations (no change)

- credentials.bilingual.offered = true (six grade-band Bilingual /
  Dual Language Education certificates).
- credentials.bilingual.standalone = true (each is its own
  certificate area in the regs).
- credentials.bilingual.addOn = true (each requires the matching
  general grade-band certificate as a prerequisite, so the
  bilingual layer functionally adds onto base certification).
- credentials.bilingual.requirements.coursework = true (program
  approval + 21-credit-hour Elementary variant; MLL Integrated
  Content variants enumerate specific coursework).
- credentials.bilingual.requirements.practicum = true (45 hours
  explicit).
- credentials.bilingual.requirements.test = true (Praxis 5362 ESOL
  + a language-specific test, e.g., Spanish 5195, French 5174,
  Mandarin 5665, ASL 0634, Latin 5601, German 5183; ACTFL OPI+WPT
  at Advanced Low for "all other world languages" effective
  2025-07-01).
- credentials.bilingual.requirements.languageProficiency = true
  ("demonstrated proficiency in the first (1st) and second (2nd)
  languages of instruction" — Section 1.9.X.D.2.h).
- credentials.eld.offered = true (All Grades ESOL + MLL endorsement
  + MLL Integrated Content).
- credentials.eld.standalone = true (All Grades ESOL is its own
  certificate area).
- credentials.eld.addOn = true (MLL Endorsement and MLL Integrated
  Content layered onto a primary certificate).
- credentials.eld.requirements.coursework = true.
- credentials.eld.requirements.practicum = true (45 hrs +
  one-year practical residency or equivalent + 60 hrs field
  experience).
- credentials.eld.requirements.test = true (Praxis 5362 at 155).
- credentials.eld.requirements.languageProficiency = false (ESOL
  has no L2 proficiency requirement).
- credentials.sei.mandatedForAllTeachers = false (no statewide SEI
  mandate; "sheltered English instruction" is not a listed RI
  program model — RI uses content-based instruction terminology).
- sealOfBiliteracy.adopted = true; year = 2016 (Board adoption
  2016-06-17 per sealofbiliteracy.org/state/ri/).
- elpAssessment: ACCESS for ELLs via WIDA Consortium (corroborated
  by the RIDE MLL/EL landing page).

## Sources retrieved (snapshots saved 2026-05-08)

1. RIDE — Multilingual Learners (MLLs) / English Learners (ELs)
   landing page (`ride-mll-el-page.{html,md}`).
2. RIDE — Certificate Areas and Requirements live index
   (`ride-cert-areas-and-requirements.{html,md}`).
3. RIDE — Regulations Governing the Certification of Educators in
   Rhode Island (June 2025 PDF) — the document of record behind
   #2 (`ride-certification-regulations-2025.{pdf,txt,md}`).
4. RIDE — Rhode Island Professional Teaching Standards (RIPTS,
   2007) — still the standards document linked from the
   certification page (`ripts.{pdf,md}`).
5. sealofbiliteracy.org — Rhode Island state page
   (`seal-of-biliteracy-ri.html`, `seal-of-biliteracy.md`).
6. NCES Digest 2023, Table 204.20 — fall-2021 EL counts and
   percentages (`nces-table-204-20.html`, `nces-el-percent.md`).

## No 404s

All linked SEA URLs resolved. No sources had to be replaced; all
new entries are append-only additions to `sources[]`. The
leider-2021 baseline entries are retained per the
state-source-refresh skill.
