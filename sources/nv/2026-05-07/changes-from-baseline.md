# Nevada — changes from baseline-2019 (refreshed 2026-05-07)

## Source pulls (this folder)

- `nepf-protocols-2024-25.pdf` — Nevada Educator Performance Framework, 2024–25 School Administrator and Teacher Protocols.
- `elad-endorsement.pdf` — NDE ELAD endorsement requirements one-pager.
- `bilingual-endorsement.pdf` — NDE Bilingual Education endorsement requirements one-pager.

Underlying regulations (not snapshotted as PDF — public NAC):

- NAC 391.237 — ELAD endorsements (and related ESL / specialist endorsements).
- NAC 391.242 — Bilingual education endorsements.
- NAC 391.059 — Language proficiency assessment for bilingual program teachers.

## Substantive diffs

### Terminology: TESL → ELAD

Between ~2018 and 2019 Nevada formally renamed its English-language credential from **TESL** to **ELAD** (English Language Acquisition and Development). The 2019 baseline note's reference to a "SEI-equivalent endorsement being phased in" is the same credential. Codified under NAC 391.237.

### `credentials.bilingual.requirements.program: null → true`

NAC 391.242 explicitly offers an approved bilingual teacher preparation program path: "completion of an approved bilingual teacher preparation program" OR ≥12 semester hours of qualifying coursework. Baseline left this `null`; current source is unambiguous.

### `credentials.bilingual.requirements.test: null → true`

NDE Bilingual Education one-pager (regulation T002-24, updated 2024-12-26 under NAC 391.242) requires a Praxis language exam in the native language — passed *prior to issuance* of the endorsement. Baseline `null`; now positively confirmed. (An older Cornell LII summary of NAC 391.242 referenced a two-year post-issuance window — superseded by the 2024 regulation update.)

### `credentials.eld.requirements.test: null → false`

NAC 391.237 specifies the ELAD endorsement requirements as coursework + practicum only. There is no test gate. Baseline `null` (unknown); now positively confirmed *not* required.

### `credentials.sei` — phase-in did not become a universal mandate

Baseline-2019 note read: "SEI-equivalent endorsement is being phased in: required for early childhood/elementary (2020) and middle/secondary (2021)." As of 2026, NAC Chapter 391 contains **no general mandate** that all teachers obtain the ELAD (or any EL) endorsement. ELAD is a voluntary specialization in the same category as reading specialist, gifted/talented, etc. `mandatedForAllTeachers` remains `false` — but the phase-in language is no longer accurate and the note is rewritten.

### `professionalStandardsMentions.el: false → true`

The 2024–25 NEPF Protocols document explicitly references "English Learners" (Step 2 Pre-Evaluation Conference Conversation, p. 10) and defines "Diverse Learners" in the Glossary (p. 18) to include "limited English proficiency." Borderline call: the Teacher Instructional Practice Standards/Indicators in Appendix B do not name ELs directly — they use "all students" and "diverse learners" — but the document as a whole now meets the schema's threshold for an explicit reference. Other three flags (`diverse`, `cultural`, `linguistic`) remain `true`.

### `elPercent: 17.1 → 13.8`, `elPercentAsOf: 2019-10-01 → 2021-10-01`

NCES Digest of Education Statistics 2023, Table 204.20: Nevada fall 2021 = 13.8% (down from 17.1% in 2019). NCES highlights Nevada as the largest negative percentage-point change between fall 2011 and fall 2021. Most recent NCES table available is fall 2021; will refresh again when fall 2022/2023 publishes.

## No change

- `credentials.bilingual` `offered`, `standalone`, `addOn`, `requirements.coursework`, `requirements.practicum`, `requirements.languageProficiency`.
- `credentials.eld` `offered`, `standalone`, `addOn`, `requirements.program`, `requirements.coursework`, `requirements.practicum`, `requirements.languageProficiency`.
- `professionalStandardsMentions.diverse / cultural / linguistic`.
- `name`, `usps`.
