# Washington — changes from baseline-2019

Refreshed 2026-05-07 against current OSPI, PESB, WAC, RCW, NCES, and WIDA
sources. The 2019 baseline pointed only at the OSPI homepage
(`www.k12.wa.us`) plus the seed paper, so most field-level claims are
re-grounded here against primary documents for the first time.

## elPercent

- `elPercent`: `11.7` → `11.4`
- `elPercentAsOf`: `2019-10-01` → `2021-10-01`

NCES Digest Table 204.20 (2023 edition) reports Washington's fall-2021
EL share at 11.4%. The 2019 baseline figure (11.7%) appears to have
come from an OSPI dashboard rather than NCES. Switching to NCES for
cross-state comparability per the skill's elPercent guidance.

## credentials.bilingual

No category change; provenance now grounded in PESB endorsement
competencies and WAC 181-82A-204 rather than the bare OSPI homepage.

- `offered: true`, `standalone: false`, `addOn: true` (was
  `standalone: true, addOn: true`).
  - **Substantive correction.** The 2019 record marked Bilingual
    Education as both standalone and add-on. PESB lists Bilingual
    Education as one of ~40 endorsements added to a teaching
    certificate — there is no standalone "bilingual teacher" license
    in Washington. The endorsement is governed by WAC 181-82A
    (performance-based **endorsements**). It is an add-on to a
    teaching certificate. Setting `standalone: false`.
- `requirements.program: true` — preserved. PESB confirms Bilingual
  Education is on the "approved program plus test" list, not the
  test-only list (per the PESB add-an-endorsement page).
- `requirements.coursework: null` — was `null` in baseline; preserved.
  WAC 181-82A-204 requires that the approved program "addresses all
  endorsement-specific competencies adopted and published by the
  professional educator standards board" (i.e., competency-based, not
  a fixed credit-hour count) and "field experience shall be at the
  discretion of the program provider." The state does not prescribe
  a coursework credit floor, so coursework remains `null`.
- `requirements.practicum: null` — was `null` in baseline; preserved.
  Per WAC 181-82A-204(2)(a), "the requirement for field experience
  shall be at the discretion of the program provider" when adding an
  endorsement. Some providers require it, others do not. Ambiguous,
  so `null`.
- `requirements.test: true` — preserved. WEST-E content knowledge
  test is required (WAC 181-82A-204 + chapter 181-02 WAC; PESB lists
  Bilingual Education as "approved program plus test").
- `requirements.languageProficiency: true` — preserved. PESB Bilingual
  Education endorsement competencies (Pre-Fall 2021 framework still
  on the published page) explicitly require Standard 1.A: candidates
  "demonstrate a high level of oral and written language proficiency
  in… an additional language of instruction as demonstrated by
  performance on a standardized assessment of language proficiency."
  Post-Fall 2021 candidates are evaluated against the National Dual
  Language Education Teacher Preparation Standards (NDLETPS).

## credentials.eld

- `offered: true`, `standalone: false`, `addOn: true` (was
  `standalone: true, addOn: true`).
  - **Substantive correction.** The ELL endorsement, like Bilingual,
    is an add-on under WAC 181-82A. There is no standalone "ELL
    teacher" license in Washington — candidates earn a teaching
    certificate first and add the ELL endorsement. Setting
    `standalone: false`.
- `requirements.program: true` — preserved. PESB confirms ELL is on
  the "approved program plus test" list, not the test-only list.
- `requirements.coursework: null` — was `null`; preserved (same
  competency-based, no-credit-hour-floor reasoning as Bilingual).
- `requirements.practicum: null` — was `null`; preserved (same
  WAC 181-82A-204(2)(a) discretion).
- `requirements.test: true` — preserved. WEST-E ELL test required.
- `requirements.languageProficiency: false` — preserved. The ELL
  endorsement competencies (2015 framework) cover applied linguistics
  and English Language Proficiency Standards but do **not** require
  candidates to demonstrate proficiency in a non-English language.
  Only the Bilingual endorsement carries that gate.

## credentials.sei

- `mandatedForAllTeachers: false` — preserved. Washington has no
  universal SEI / sheltered-instruction endorsement mandate at the
  individual-teacher level. (The Transitional Bilingual Instruction
  Program — TBIP — is a district program under RCW 28A.180; it does
  not impose an endorsement mandate on every certificated teacher.)
  Adding a `notes` field to flag this.

## professionalStandardsMentions

- `diverse: false` → `true`
  - **Substantive correction.** Washington's role standards for
    teachers adopt the InTASC Model Core Teaching Standards (2011/2013
    learning progressions). InTASC Standard 2 (Learner Differences)
    explicitly addresses "cultural and linguistic diversity" and
    "diverse learners" repeatedly. The 2022-adopted CCDEI standards
    layered on top reference "diverse cultural beings," "diverse
    students, families, communities," and "human diversity." Both
    standards documents satisfy the `diverse` criterion.
- `cultural: true` — preserved. CCDEI's first domain is literally
  "Cultural Competency"; InTASC also references cultural context.
- `linguistic: true` — preserved. InTASC Standard 1 references
  "cognitive, linguistic, social, emotional, and physical" learner
  domains; Standard 2 references "linguistic diversity" and
  "linguistically diverse learners." CCDEI references "primary
  language" and "home language(s)" but not "linguistic" per se;
  combined adoption still satisfies the criterion.
- `el: false` → `true`
  - **Substantive correction.** InTASC's InTASC-to-EL crosswalk
    enumerates explicit "English language learners" tags at
    standards 1(g), 2(i), 2(k), 2(l), 6(l), 8(m), 2(q), 6(q), 2(f),
    2(g), 6(f). Washington adopts InTASC for residency teacher role
    standards (per the PESB role-standards page). The CCDEI
    standards do not name ELs explicitly, but the role standards do.

## sealOfBiliteracy

- No change. `adopted: true, year: 2014` is correct: RCW 28A.300.575
  was enacted in 2014 (c 102 s 2). The statute was amended in 2024
  (c 202 s 4) with mandatory district participation phasing in for
  the 2025-26 school year, but the original adoption year stands.

## widaMember

- No change. `widaMember: true` — Washington is listed as a current
  WIDA Consortium member at wida.wisc.edu/about/consortium.

## notes (new field)

Adding a top-level note documenting the structural quirk that the ELL
and Bilingual Education endorsements are governed by PESB (not OSPI),
that they are add-ons only (no standalone license), and that the
state's English-learner program guidance — TBIP — is an OSPI district
program rather than a teacher mandate.

## URL changes

- The 2019 baseline cited `www.k12.wa.us` (the bare OSPI homepage).
  That host now 302-redirects to `ospi.k12.wa.us`. The new sources
  array points at the present-day canonical URLs:
  PESB endorsement competencies (per credential), WAC 181-82A-204
  (endorsement routes), RCW 28A.300.575 (Seal of Biliteracy), NCES
  Table 204.20, and WIDA consortium roster.

## Verification status

Promoting `baseline-2019` → `verified-2026`. All sources resolved
(no unrecovered 404s); every snapshot under `sources/wa/2026-05-07/`
was retrieved, saved, and read.
