# Michigan — changes from baseline-2019 (refresh 2026-05-08)

Baseline source: Leider, Colombo & Nerlino (2021), EPAA 29(100),
Tables 2-5 + Appendix A.

Refresh sources: see `sources[]` entries appended in `mi.json`. All
SEA documents under `sources/MI/2026-05-08/` were retrieved 2026-05-08
with HTTP 200 and read in full.

## Field-by-field diff

- `elPercent`: 6.6 → 6.4
  (NCES Digest 2023 Table 204.20, Fall 2021 — preferred over baseline
  for cross-state comparability per state-source-refresh skill;
  see `nces-el-percent.md`.)
- `elPercentAsOf`: 2019-10-01 → 2021-10-01
- `credentials.bilingual.requirements.program`: null → true
  (MDE ESL & Bilingual Placement Guide, p. 5: "All pathways to
  certification and/or endorsement require successful completion of
  an approved preparation program ..."; see `esl-bilingual-placement.md`.)
- `credentials.bilingual.requirements.languageProficiency`: false → true
  (Bilingual Education Preparation Standards, Standard 1.1: candidates
  must demonstrate ACTFL Oral Proficiency Interview at Advanced Low or
  higher in BOTH English and the target language. Standard 1.1 is
  flagged in the document as the "most significant change" from the
  2004 standards (adopted 2017). The 2019 baseline coding of `false`
  predates close reading of this standard; see
  `bilingual-education-standards.md`.)
- `credentials.eld.standalone`: false → true
  (MDE Adding-an-Endorsement page + ESL & Bilingual Placement Guide
  (p. 5) confirm that the ESL (NS) endorsement can be earned via an
  approved EPP either as the initial endorsement on a teaching
  certificate or as an add-on to an existing certificate. The Master's
  in ESL pathway also produces a standalone endorsement on a teaching
  certificate. See `adding-endorsement-page.md` and
  `esl-bilingual-placement.md`.)
- `credentials.eld.requirements.coursework`: null → true
  (ESL Preparation Standards: required coursework in linguistics,
  second-language acquisition, methods, assessment, and culture; see
  `esl-prep-standards.md`.)
- `credentials.eld.requirements.practicum`: null → true
  (ESL Preparation Standards: required field experiences / student
  teaching; see `esl-prep-standards.md`.)
- `credentials.eld.requirements.test`: null → true
  (MTTC ESL exam required for the NS endorsement; see
  `active-endorsements-mttc.md` and `esl-prep-standards.md`.)
- `professionalStandardsMentions.linguistic`: false → true
  (Both the PK-12 Professional Knowledge and Skills standards (2018,
  rev. through 2024) and the 5-9 / 7-12 Professional Standards
  explicitly enumerate "linguistic" diversity; see
  `pk12-prep-standards.md` and `professional-prep-standards.md`.)
- `professionalStandardsMentions.el`: false → true
  (Same two documents contain multiple explicit, operative references
  to "English learners" / "English language learners" — "support
  English learners' successful engagement with the core curriculum,"
  "promote full participation of English learners," etc. The 2019
  baseline `false` predates the 2018 PK-12 standards adoption and
  subsequent 2024 revision.)
- `sealOfBiliteracy.sourceUrl`: updated from sealofbiliteracy.org root
  to the operative MDE program page
  https://www.michigan.gov/mde/services/flexible-learning/michigan-seal-of-biliteracy
  (more authoritative; see `seal-of-biliteracy-mi.md`).

## Unchanged from baseline

- `credentials.bilingual.offered: true`
- `credentials.bilingual.standalone: true`
- `credentials.bilingual.addOn: true`
- `credentials.bilingual.requirements.coursework: true`
- `credentials.bilingual.requirements.practicum: true`
- `credentials.bilingual.requirements.test: true`
- `credentials.eld.offered: true`
- `credentials.eld.addOn: true`
- `credentials.eld.requirements.program: true`
- `credentials.eld.requirements.languageProficiency: false`
  (ESL/NS standards do not require an ACTFL OPI or other named
  language-proficiency exam — confirmed by `esl-prep-standards.md`.)
- `credentials.sei.mandatedForAllTeachers: false`
  (Michigan does NOT mandate SEI-style training for all teachers; only
  teachers serving as the primary EL provider must hold NS or Y\_;
  see `esl-bilingual-placement.md`.)
- `professionalStandardsMentions.diverse: true`
- `professionalStandardsMentions.cultural: true`
- `sealOfBiliteracy.adopted: true`, `year: 2018`
- `elpAssessment.name: "ACCESS for ELLs"`, `consortium: "WIDA"`
  (WIDA membership reaffirmed via Placement Guide's references to
  WIDA ELD Standards.)

## Gaps / open questions

None blocking promotion to verified-2026. Bilingual endorsement is
language-specific (YA-YT, 17 languages), but the schema does not
distinguish per-language credentials, and "offered" remains true for
the umbrella.
