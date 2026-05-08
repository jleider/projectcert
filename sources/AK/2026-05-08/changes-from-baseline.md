# Alaska — Changes from baseline-2019 (verified 2026-05-08)

## Snapshots reviewed

Files copied forward from the 2026-05-07 fetch (same content, re-read on
2026-05-08; URLs verified as current and reachable):

- `deed-available-endorsements.html` — DEED list of all endorsement
  areas. Confirms World Languages → "Bilingual Education", "English as
  a Foreign Language", "English as a Second Language" remain. New row
  observed: "Statewide English as a Second Language Acquisition,
  Bilingual and Literacy Education (SLABEL)" listed under teaching
  endorsements (no formal adoption date located in DEED public
  pages — flagged in `notes` rather than coded as a separate canonical
  field, since it is structurally an SEA umbrella label rather than a
  new credential type).
- `deed-akreads-endorsements.html` — Alaska Reads Act endorsement; not
  EL-specific but explicitly applies to ELL/ESL support teachers in
  K-3. Effective 2025-07-01 deadline for all K-3 educators including
  ELL/ESL support staff (AS 14.20.015(c)).
- `deed-teaching-certificates.html` — Initial/Professional teacher
  certificate pathways. Alaska Studies + Alaska Multicultural
  coursework requirements unchanged.
- `deed-standards-elp.html` — confirms WIDA ELD Standards Framework
  2020 Edition adopted by Alaska State Board on 2021-06-10, in use
  since 2021-22 school year.
- `4AAC-04.200-standards-beginning-teachers.pdf` — Eight beginning-
  teacher content/performance standards. Standard 2(B)(ii) and 5(D)
  reference "limited English proficient students." Standard 3
  references "individual and cultural characteristics", "culturally
  appropriate communication", "cultural standards adopted by
  reference in 4 AAC 04.180". No explicit "linguistic" terminology
  in the regulation text.
- `ak-teacher-standards-framework-alignment.pdf` — DEED's alignment
  of 4 AAC 04.200(b) to Danielson/CEL 5D+/Marzano evaluation
  frameworks. Standard 2 alignment cites Marzano element 47
  ("Planning and Preparing for the Needs of ELL"), reinforcing EL
  presence in the standards.

## NCES EL percentage

- `elPercent` 12.1 (2019-10-01) → 10.8 (2021-10-01).
- Source: NCES Condition of Education 2024, "English Learners in
  Public Schools," Figure 1 (Fall 2021 data, the most recent NCES
  state-level figure as of 2026-05-08).

## Field-level diffs vs. baseline-2019

- `elPercent`: 12.1 → 10.8 (`elPercentAsOf` 2019-10-01 → 2021-10-01).
- `credentials.bilingual`: no substantive change to coding.
  Standalone "Bilingual Education" endorsement under World Languages
  still offered (4 AAC 12). Approved-program coursework + practicum
  pathway preserved; no test or language-proficiency requirement
  surfaced in regulation review. Notes preserved.
- `credentials.eld`: no substantive change. Standalone "English as a
  Second Language" and "English as a Foreign Language" endorsements
  remain in DEED's available-endorsements list. Add-on via approved
  program retained. Praxis content-area exam pathway requires
  passing scores; coursework and practicum left as `null` because
  4 AAC 12 frames them as approved-program-mediated rather than as
  standalone requirements.
- `credentials.sei.mandatedForAllTeachers`: false → false. Alaska
  has no statewide SEI mandate for all teachers; the K-3 Reads Act
  endorsement is reading-focused, not SEI.
- `professionalStandardsMentions`: diverse=true, cultural=true,
  el=true confirmed against 4 AAC 04.200(e). `linguistic`: was
  `true` in baseline; the current 2008-effective beginning-teacher
  standards do not use the word "linguistic". The cultural
  standards adopted by reference (ANKN) and the standards-framework
  alignment doc reference language and ELL students, but the
  4 AAC 04.200 regulation itself uses "limited English proficient"
  rather than "linguistic". Holding `linguistic=true` is defensible
  via the ANKN cultural standards' Standard E (linguistic
  diversity) cross-referenced in 4 AAC 04.180. No flip.
- `sealOfBiliteracy`: adopted=null → adopted=true, year=2022.
  4 AAC 06.077 establishes the Alaska State Seal of Biliteracy;
  proposed in early 2022, board hearing June 2022, became effective
  in 2022. Source: DEED Seal of Biliteracy page + Global Seal of
  Biliteracy state list (Alaska = 49th state to adopt).
- `elpAssessment`: unchanged (ACCESS for ELLs / WIDA). DEED ELP
  page confirms WIDA ELD Standards Framework 2020 Edition adopted
  2021-06-10.

## History events appended

- 2021-06-10 — Alaska adopts WIDA ELD Standards Framework 2020.
- 2022-06-08 — Alaska State Board adopts Seal of Biliteracy
  regulation (4 AAC 06.077).
- 2022-07-01 — Alaska Reads Act takes effect (HB 114, 2022).
- 2024-08-21 — Limited world language immersion teacher
  certificate regs (4 AAC 12.388, .397, .405) take effect.
- 2025-07-01 — Alaska Reads Act K-3 endorsement requirement takes
  effect for all teachers (including ELL/ESL support).

## Promotion decision

All baseline `sources[]` URLs return 200; no broken links. The two
substantive coding changes are the EL-percent refresh and Seal of
Biliteracy adoption. Promote to `verified-2026`.
