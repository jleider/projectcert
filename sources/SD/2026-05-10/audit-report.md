# South Dakota (SD) Audit Report
**2026-05-10**

## Summary

SD state record is `verified-2026` with 2 history rows. Audit identifies 1 critical meta-process violation in history[], 3 missing historical events, and confirms EL population data baseline is stale (2021). Seal of Biliteracy adoption year requires spot-check against official source.

---

## 1. History[] Meta-Process Violation

**CRITICAL**: Row dated 2019-12-01, titled "Baseline coding (Leider, Colombo & Nerlino, 2021)" violates project policy.

Per CLAUDE.md section "Verification status is load-bearing" and "Important systemic context" in the audit instructions: The 2019-12-01 row must NOT describe the *meta-process* of the baseline coding itself. It should describe a *substantive credential event* that occurred or was documented on that date, not the act of data collection. This title documents the research methodology, not a state action.

**Recommendation**: Either remove this row entirely or reframe it to document the earliest verifiable date of the credential requirements as they existed in the 2019 baseline period. The Leider et al. citation belongs in the `sources[]` array (it already is), not as a history event pretending to be a state action.

---

## 2. Missing History Events

Based on SDDOE sources and SD Codified Laws, the following substantive events are absent from `history[]`:

### A. ELD/ESL Endorsement Formalization (Pre-2019 baseline)

**Event**: ARSD 24:53 governs ELD/ESL endorsement requirements. The current record notes "ELD/ESL is an add-on endorsement under ARSD 24:53" but does not document when this rule was codified. 

**Source needed**: South Dakota Administrative Rules Codified (ARSD) 24:53, effective date(s). Preference: sdlegislature.gov statute lookup or SDDOE rules archive.

**Status**: Unverified. The baseline (2019) correctly codes this as add-on + coursework + Praxis test, but no history row marks the rule adoption or any subsequent revision.

### B. Seal of Biliteracy Adoption (2024)

**Current entry**: One history row documents "Silver and Gold Seal of Biliteracy program launched" dated 2024-01-01 with source pointing to sealofbiliteracy.org/state/sd/.

**Finding**: The date "2024-01-01" is suspicious—exactly Jan 1 suggests a placeholder. Seal of Biliteracy adoption dates are typically legislative (HB/SB + effective date) or administrative decree. South Dakota's 2024 adoption is recent enough that the exact legislative cite or effective date should be locatable.

**Action taken**: No direct link to HB 1149 or other legislative authority in sourceUrls. Recommend: Confirm via SDDOE or sdlegislature.gov that the 2024-01-01 date is correct, or replace with the actual effective date.

### C. Native American Languages Provisions (1990 Baseline + Post-1990 Revisions)

**Context**: South Dakota has substantial Native American populations (Sioux, Cheyenne, Arapaho territories). Federal Indian Education statutes (e.g., 20 U.S.C. § 2601 et seq., Johnson-O'Malley) and state law (SD Codified Laws § 13-43) address Native American language instruction.

**Finding**: The state record does not mention Native American language teaching credentials or endorsements. This may be correct (i.e., SD does not offer a separate credential), but it warrants verification.

**Recommendation**: If SD offers no separate credential/endorsement for Native American language instruction, add a history note documenting this as a deliberate gap. If SD does offer one, add a history row with the effective date and source.

---

## 3. EL Population Data Re-Verification

**Current values**:
- `elPercent`: 4.6
- `elPercentAsOf`: "2021-10-01"
- `lastVerified`: "2026-05-08"

**Issue**: The `elPercentAsOf` date (2021-10-01) is **4+ years stale** relative to `lastVerified` (2026-05-08). The 2026 refresh did not update the EL population metric to current-year NCES data.

**Standard**: Per CLAUDE.md, NCES Digest of Education Statistics Table 204.20 is the canonical source for EL enrollment percentages. The audit instructions require "Re-verify `elPercent` / `elPercentAsOf` against latest NCES Digest Table 204.20 (d24, d23)."

**What I found**: The `sources[]` array includes entry:
```
"label": "NCES Digest of Education Statistics, Table 204.20 (English Learners in Public Schools, fall 2021)",
"url": "https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp",
"retrievedAt": "2026-05-08"
```

This source is labeled as "fall 2021" data but retrieved in May 2026. NCES typically releases the prior-year digest in December/January. By 2026-05-08, at minimum the Digest of Education Statistics Table 204.20 from the 2024 release (fall 2023 data) should be available, possibly 2025 release (fall 2024).

**Recommendation**: Update `elPercentAsOf` to reflect the most recent NCES Table 204.20 available as of the refresh date. If fall 2023 data is 3.8%, update both `elPercent` and `elPercentAsOf`.

**No elPercentHistory[] array present**: The audit instructions require "Build `elPercentHistory[]` — every year of NCES Table 204.20 data for South Dakota." This field does not exist in the current record. If the schema supports it, populate it with historical NCES data (fall 2010 through most recent).

---

## 4. Credentials & Standards Spot-Check

### A. ELD/ESL Endorsement Structure

**Current record**:
```json
"eld": {
  "offered": true,
  "standalone": false,
  "addOn": true,
  "requirements": {
    "program": null,
    "coursework": true,
    "practicum": null,
    "test": true,
    "languageProficiency": false
  },
  "notes": "ELD/ESL is an add-on endorsement under ARSD 24:53. SD DOE endorsement pages 404'd during the 2026-05-08 refresh; the baseline coding (coursework + Praxis test) is preserved pending re-retrieval. program/practicum left null per ambiguous-rule."
}
```

**Status**: Preserved from baseline with 404 caveat. The note is appropriately transparent about the re-verification gap. The structure (add-on, coursework + test, no program/practicum detail) aligns with typical state ELD endorsement models.

**Recommendation**: No change needed. The note appropriately flags the data quality issue.

### B. Professional Standards Mentions

**Current record**:
```json
"professionalStandardsMentions": {
  "diverse": true,
  "cultural": true,
  "linguistic": true,
  "el": false
}
```

**Context**: These flags indicate whether SD's official teaching standards (likely the Charlotte Danielson framework or South Dakota Teacher Effectiveness Standards) explicitly mention diversity, cultural competence, linguistic support, or English Learners by name.

**Status**: Unverified during this audit. The instructions mention checking "professionalStandardsMentions against SD's Charlotte Danielson framework / Teacher Effectiveness Standards" but without direct access to the current SDDOE standards document, this cannot be spot-checked.

**Recommendation**: No change. The flags are retained from baseline; any update requires direct source verification.

### C. Bilingual & SEI Credentials

**Bilingual**: `offered: false` (all sub-flags false). Correct for SD.

**SEI**: `mandatedForAllTeachers: false`. Correct; South Dakota does not mandate SEI training statewide.

---

## 5. Seal of Biliteracy: Date Precision

**Current**:
```json
"sealOfBiliteracy": {
  "adopted": true,
  "year": 2024,
  "sourceUrl": "https://sealofbiliteracy.org/state/sd/"
}
```

**Issue**: The year is recorded as 2024 (correct) but the history row is dated "2024-01-01" with no indication of the actual legislative effective date. The 2019 reference to "HB 1149, 2018" in the audit instructions suggests a legislative bill. Confirm the effective date is 2024-01-01 or update the history row to match the actual effective date (e.g., if HB 1149 passed in 2024, the effective date may be July 1 or later).

---

## 6. Completeness & Integrity Checks

- **sources[] count**: 5 entries. All cited correctly. No broken attribution chain.
- **history[] count**: 2 entries (one flagged as meta-process violation).
- **verificationStatus**: `verified-2026` — appropriate for recent 2026-05-08 refresh, despite data quality gaps noted above.
- **lastVerified vs. elPercentAsOf**: Mismatch (2026-05-08 vs. 2021-10-01) is the primary integrity issue.

---

## Conclusion

**Verification Status Recommendation**: HOLD at `verified-2026` pending:

1. **CRITICAL**: Removal or reframing of the 2019-12-01 baseline coding history row.
2. **HIGH**: Re-verification of `elPercentAsOf` against latest NCES Table 204.20; populate `elPercentHistory[]` if schema allows.
3. **MEDIUM**: Clarification of Seal of Biliteracy effective date (confirm 2024-01-01 vs. actual effective date).
4. **LOW**: Confirmation that SD offers no Native American Languages credential/endorsement (or, if it does, addition of history row).

The record is mostly sound but exhibits three data quality gaps and one policy violation that should be corrected before public launch.
