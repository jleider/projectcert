# GaPSC Rule 505-2-.14 — Endorsements (general rule)

Source: https://www.gapsc.com/Rules/Current/Certification/505-2-.14.pdf
Effective: April 15, 2024
Retrieved: 2026-05-08
File: gapsc-505-2-14-endorsements.pdf (saved 2026-05-07)

## Summary

The umbrella rule governing all GaPSC endorsements. Sets the requirements
that apply to every endorsement field (including ESOL) unless the
field-specific rule (e.g., 505-2-.166) overrides.

## Key requirements for a renewable professional endorsement

- Hold a valid base certificate.
- Meet **one** of:
  1. Complete a **state-approved program** in the endorsement field and
     receive verification of program completion from the approved provider; OR
  2. Hold or have held an out-of-state certificate in a comparable field.

For three-year Non-Renewable endorsements, the educator's employing LUA
must request the endorsement; ESOL is the only Non-Renewable Professional
endorsement that may be added to a Permit certificate.

## Schema implications

- For the ESOL endorsement path, the **default** route to eligibility is
  completing a state-approved educator preparation program in ESOL — i.e.,
  `eld.requirements.program: true`.
- There is no "test-only" route to the ESOL endorsement under 505-2-.14.
  However, GADOE/GaPSC accepts the GACE ESOL test as one of the program
  exit/content assessments through approved EPPs. Coding `test: true`
  remains defensible because passing the GACE ESOL assessment is part of
  certification, but it is not a sole pathway.
