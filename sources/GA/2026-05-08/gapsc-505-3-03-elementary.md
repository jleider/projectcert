# GaPSC Rule 505-3-.03 — Elementary Education Program (representative general teacher-prep standards)

Source: https://www.gapsc.com/Rules/Current/EducatorPreparation/505-3-.03.pdf
Retrieved: 2026-05-08
File: gapsc-505-3-03-elementary.pdf

## Why this rule

Georgia's GaPSC does not publish a single "professional standards for
teachers" document; it adapts CAEP standards (per 505-3-.01) and supplies
field-specific content standards in the 505-3 series. The Elementary
Education rule (P-5) is the closest equivalent to a general
teacher-preparation standards document and is what we read for
`professionalStandardsMentions`.

## Search for the four schema terms

Run on extracted text:

- **`diverse`**: 1 hit, in a vocabulary definition ("dynamic and evolves
  through exposure to **diverse** sources and experiences"). Marginal but
  present.
- **`linguistic`**: many hits, including substantive standards language —
  e.g., Language and Literacy Professional Disposition (i): "Candidates
  promote language and literacy development for all students by using
  developmentally responsive practices and engaging in ethical and
  effective practices that honor all students' **linguistic** backgrounds."
  Also recurs in references to "linguistic, cognitive, and neurobiological
  factors."
- **`cultural`**: 0 hits.
- **`English learner` / `EL` / `ELL` / `ESOL`**: 0 hits.

## Schema implications (`professionalStandardsMentions`)

- `diverse: true` — appears in the rule, even if context is vocabulary
  exposure rather than student demographics. Honoring the literal text of
  the schema field.
- `cultural: false` — absent from the elementary teacher-prep rule.
- `linguistic: true` — explicit, substantive ("honor all students'
  linguistic backgrounds").
- `el: false` — the general elementary rule does not reference ELs.
  EL-specific language lives in 505-3-.89 (ESOL endorsement program), not
  the general teacher-prep standards.

## Note

Per the Leider 2021 baseline, Georgia was coded
`{diverse: true, cultural: false, linguistic: false, el: false}`.
The current source supports moving `linguistic: false → true`. Other
flags unchanged.
