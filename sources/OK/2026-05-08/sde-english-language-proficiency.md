# OSDE — English Language Proficiency Services

Source URL: https://oklahoma.gov/education/services/english-language-proficiency.html
Retrieved: 2026-05-08

## Bottom line for OK schema

- **Annual ELP assessment**: WIDA ACCESS for ELLs (2025-2026 window:
  Jan 5 – Mar 20, 2026). → `elpAssessment.name = "ACCESS for ELLs"`,
  `consortium = "WIDA"`. Confirmed against
  https://wida.wisc.edu/memberships/consortium/ok (OK is a WIDA member).
- **Five LIEP models** (WAVE codes IS1–IS5):
  - IS1 Transitional Bilingual
  - IS2 Dual Language / Two-way Immersion
  - IS3 ESL or English Language Development (ELD)
  - IS4 Content Classes with Integrated ESL Support
  - IS5 Newcomer Programs
- Standards: WIDA English Language Development Standards Framework
  (2020 edition).

## Implications

- OK recognizes both ELD-style (IS3) and bilingual-style (IS1, IS2)
  program *delivery models* at the LEA level — but does **not** offer
  a Bilingual Education *teacher credential*. That distinction is the
  central bilingual-coding question for OK and is preserved in
  `credentials.bilingual.offered = false` with `eld.offered = true`.
- IS4 ("integrated ESL support — teachers trained in EL methods") is
  delivered by content teachers using EL strategies; this is not a
  state-mandated SEI credential.
