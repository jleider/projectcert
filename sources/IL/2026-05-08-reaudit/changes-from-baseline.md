# IL — re-audit 2026-05-08

Re-audit of the 2026-05-08 verification, focused on §3a history-event
capture (these states were originally promoted before the history-row
emphasis).

## Coding changes

None. All `credentials.*`, `professionalStandardsMentions`,
`elPercent`, `elpAssessment`, and `sealOfBiliteracy` fields confirmed
against the snapshot folder at `sources/IL/2026-05-08/`.

## History rows added

- **2013-08-23 — Illinois adopts State Seal of Biliteracy (PA 098-0560).**
  Cite: <https://sealofbiliteracy.org/state/il/>.
- **2026-07-01 — 23 IAC 24.140 supersedes 24.130 as IPTS.** Phase-in
  flagged in `sei.notes`. Cite: 23 IAC 24.130 (Cornell mirror).

## §3b miscoding spot-check

- `bilingual.standalone: true` — confirmed correct for IL. ISBE issues
  a standalone Bilingual subsequent endorsement and the ELS-TBE
  pathway also exists; standalone-true holds.
- `eld.standalone: true / eld.addOn: true` — both true confirmed for
  IL; ESL Subsequent Teaching Endorsement is an add-on, and ESL
  Educator License is standalone.
