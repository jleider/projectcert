---
description: Refresh and verify one state's EL teacher certification data against current SEA sources (Phase 2 verification workflow).
argument-hint: <state> (USPS code or name, e.g. MA, Texas)
---

Run the `state-source-refresh` skill to re-verify the state's record against current SEA sources, save snapshots, document diffs from baseline, and promote `baseline-2019` → `verified-2026`.

Target state: $ARGUMENTS

If no state was provided, ask which state to refresh (or check `/verification` for the next pending one). Then follow the skill's procedure end-to-end: read the current JSON, pull current SEA sources, re-code credentials, document changes, update the file, and run `npm run validate` before committing.
