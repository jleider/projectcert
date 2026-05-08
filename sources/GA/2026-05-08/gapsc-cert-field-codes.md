# GaPSC Certificate Field Codes (revised January 2026)

Source: https://www.gapsc.com/Certification/Downloads/Certificate_Field_Codes.pdf
Revised: January 2026
Retrieved: 2026-05-08
File: gapsc-cert-field-codes.pdf (saved 2026-05-07)

## Summary

Master list of every GaPSC field code, used to map the certification space.
Confirms which EL-related credentials exist in the present-day Georgia
licensure structure.

## Key entries — EL-relevant

- **Eng. To Speakers of Other Lang. (ESOL) – 885** (in the P-12 Fields
  block, alongside Art, Computer Science, Music, Dance, etc.). This is the
  **standalone ESOL certification field**, P-12.
- **ESOL – 825** (in the Teaching Endorsements block). This is the
  **add-on endorsement** form, governed by 505-2-.166 / 505-3-.89.
- **Dual Immersion Elementary Education – 863** (Teaching Endorsements).
  This is a dual-language/immersion endorsement, *not* a bilingual EL
  credential in the schema sense. It targets immersion-program teachers
  rather than EL students per se. Coded as not bilingual for our purposes
  (no separate bilingual teacher certification or endorsement field for
  EL instruction is listed).

## What's NOT listed

- No "Bilingual Education" certification or endorsement field.
- No separate "ESL" code (Georgia uses ESOL).
- No SEI / sheltered-instruction mandate field (matches absence of any
  state-wide SEI requirement).

## Schema implications

- `credentials.bilingual.offered: false` (no bilingual EL credential).
- `credentials.eld.offered: true`, `eld.standalone: true` (code 885),
  `eld.addOn: true` (code 825).
