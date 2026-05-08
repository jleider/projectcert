# MD — re-audit 2026-05-08

Re-audit of the 2026-05-08 verification, focused on §3a history-event
capture.

## Coding changes

None. ESOL credential (COMAR 13A.12.02.19, PreK-12, both standalone
and add-on pathways), WIDA ACCESS for ELLs, and standards mentions
confirmed against `sources/MD/2026-05-08/`.

## History rows added

- **2016-05-19 — Maryland State Seal of Biliteracy adopted (SB 781,
  Ch. 232; Education Article §7-208).**

## §3b miscoding spot-check

- `eld.standalone: true / addOn: true` — confirmed. COMAR
  13A.12.02.19 supports both pathways: a teacher prepared in an
  approved ESOL program (standalone) or adding ESOL to an existing
  certificate via Praxis 5362 + coursework.
- `bilingual.{standalone,addOn} = false/false` — confirmed; Maryland
  does not issue a bilingual education credential.
