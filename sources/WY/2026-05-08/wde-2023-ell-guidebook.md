# WDE — English Learner (EL) Guidebook 2023-24

- **URL**: https://edu.wyoming.gov/wp-content/uploads/2023/10/2023-ELL-Guidebook.pdf
- **Local snapshot**: `wda-2023-ell-guidebook.pdf` (1.4 MB)
- **Retrieved**: 2026-05-08
- **Document title**: "English Learner (EL) Guidebook 2023-24 — Assessment and Title III: Identifying, Serving and Reporting"
- **Updated**: Aug 2, 2023 (per cover page)
- **Authority**: Wyoming Department of Education (WDE), Cheyenne, WY
- **Statutory authority cited**: W.S. 21-13-309(m)(v)(A); ESEA Title III as amended by ESSA

## Key extractions

### EL Educator Requirements (p. 9)

Quoted verbatim:

> "Educators who provide the Active English Learner (EL) services in a
> language instruction educational program (LIEP) are required to have
> an ESL endorsement in Wyoming. Wyoming has the following
> endorsements: ESL K-6, ESL 5-8, ESL 6-12, and ESL K-12."

This is the single most load-bearing sentence in the guidebook for our
schema: it confirms (a) ESL endorsement is offered, (b) it is gated to
licensed teachers, (c) it is grade-banded into four sub-endorsements.
The guidebook does not mention a "bilingual" endorsement — only ESL.

### ELP Assessment (pp. 3, 10)

- Wyoming uses the **WIDA ACCESS for ELLs** (and Alternate ACCESS) as
  its annual ELP assessment for all Active ELs.
- For initial identification, districts use **WIDA Screener** (grades
  1–12) and **WIDA Screener for Kindergarten** or **WIDA Kindergarten
  MODEL** (K).
- Statement on consortium membership: "WIDA is a consortium of states
  working together to meet the requirements of the Every Student
  Succeeds Act (ESSA) for ELs with standards and assessments."
- Exit cut: overall CPL ≥ 4.6 AND Literacy PL ≥ 4.3.

### Program models / SEI

The "Examples of EL Program Models that Meet the Requirements of Title
III" section enumerates LIEP models (ESL pull-out, push-in, sheltered
content, etc.) but contains **no statewide SEI mandate** that all
teachers complete sheltered-instruction training. WDE explicitly leaves
program model selection to districts: "The Office for Civil Rights and
the State of Wyoming allows school districts broad discretion
concerning how to ensure EL students have a reasonable chance for
success." → `sei.mandatedForAllTeachers = false` (unchanged).

### Bilingual program models

Mentioned in the abstract sense ("a bilingual and/or English as a
Second Language [ESL] program") as one program model districts may
adopt, but **no Wyoming bilingual teacher endorsement** is referenced.
This is consistent with leider-2021 baseline coding
(`bilingual.offered = false`).

## Coding implications

- `credentials.eld.offered = true` (confirmed)
- `credentials.eld.standalone = true` — ESL endorsements exist as
  named credentials with their own grade bands (the 2014 baseline note
  also coded standalone=true; current PTSB rules continue to list ESL
  K-6, 5-8, 6-12, K-12).
- `credentials.eld.addOn = true` — added via Demonstration of
  Competency or Institutional Recommendation atop an existing license.
- `credentials.bilingual.*` = all `false` (no bilingual endorsement).
- `credentials.sei.mandatedForAllTeachers = false`.
- `elpAssessment` = ACCESS for ELLs / WIDA (confirmed).
