# VT — 2026-05-10 Audit Report

**Audit Date:** 2026-05-10  
**Auditor:** Claude Code (projectcert audit workflow)  
**Previous Verification:** 2026-05-08 (promoted to verified-2026)

---

## CRITICAL FINDING: Meta-Process Violation in History Row

The single history row in `src/content/states/vt.json` contains a **forbidden meta-process title**:

```json
{
  "date": "2019-12-01",
  "title": "Baseline coding (Leider, Colombo & Nerlino, 2021)",
  "description": "Initial coding of the SEA's...",
  "sourceUrls": ["https://doi.org/10.14507/epaa.29.5279"]
}
```

Per CLAUDE.md **Safeguards**: "Baseline coding rows are forbidden meta-process violations."

**Action Required:** This row must be removed or reworded. The 2019-12-01 entry documents the seed-paper's capture date, not a state policy event. The baseline snapshot is already encoded in the `verificationStatus: verified-2026` state—this row does not represent a substantive policy moment and serves only as process metadata.

---

## Data Freshness & Missing History Events

### elPercent & elPercentAsOf
- **Current:** elPercent = 2, elPercentAsOf = 2021-10-01
- **Status:** Stale. The 2026-05-08 verification identified NCES fall 2021 data (2%), but `elPercentAsOf` has not been updated to reflect the actual retrieval date (2026-05-08) and should reflect the census year when the EL count was taken.
- **elPercentHistory:** No array present. CLAUDE.md implies multi-year tracking should be built. Per earlier schema discussions, every year of available NCES Table 204.20 data for Vermont should be backfilled if captured.

### Vermont Policy Timeline (from 2026-05-08 sources & historical record)
The 2026-05-08 audit (`changes-from-baseline.md`) noted:

1. **Act 71 of 2015 / Act 81 of 2017** — Seal of Biliteracy authorization
   - Adopted date: 2020-12-01 (per sealofbiliteracy.org)
   - Currently coded: `sealOfBiliteracy.adopted: true, year: 2020`
   - No history event documents the legislative authorization → adoption gap

2. **Endorsement renaming: 2022 revision**
   - Rule 5440-40 "English Language Multilingual Learner" (ELLML)
   - Revised August 2015, **May 2022**
   - This policy change (renamed credential, restructured standards) is not captured as a history event

3. **Bilingual (Rule 5440-39) revision history**
   - June 2018 revision (in effect at baseline)
   - Currently states add-on-only status; changes-from-baseline.md noted baseline incorrectly coded as standalone=true
   - No history event marks the 2018 rule revision

4. **Core Teaching Standards**
   - Current version: 2018
   - Credentialed from AOE, but no legislative/rule enactment date documented in history

### Recommendation
The 2026-05-08 changes-from-baseline.md identified 7 substantive diffs (elPercent, bilingual.standalone flip, bilingual.requirements, ELD rename, Seal adoption). Each of these should map to legislative or rule events with dates and sourceUrls. Currently only the baseline seed-paper entry exists.

---

## Credential & Standards Verification (Re-Confirmed)

### Bilingual (Endorsement 5440-39)
- **Current coding:** offered=true, standalone=**false**, addOn=true ✓
- **Verification:** Correct per June 2022 VSBPE Rules (explicit "add-on endorsement only" language in the rule text).
- **History note:** The 2026-05-08 audit corrected baseline's standalone=true flip. Confirmed; no further action needed.

### ELD/ELLML (Endorsement 5440-40)
- **Current coding:** offered=true, standalone=false, addOn=true ✓
- **Requirements:** program=true, coursework=true, practicum=true, test=true, languageProficiency=false ✓
- **Test:** Praxis II ESOL (5362) per Rule 5246 ✓
- **Standards alignment:** Rule 5440-40 §1.2 explicitly references WIDA English Language Development Standards ✓

### SEI Mandate
- **Current coding:** mandatedForAllTeachers=false ✓
- **Verification:** Core Teaching Standards (5235) reference linguistic diversity but do not mandate SEI competency for all license holders. Correct.

### Professional Standards Mentions
- **Current coding:** diverse=true, cultural=true, linguistic=true, el=false
- **Verification:** Core Teaching Standards (5235) repeatedly cite "diverse," "cultural," "linguistic" (e.g., 1(b), 2(o), 3(l), 4(m)) but do not name "English learners" or "ELs" explicitly. Correct.

---

## Data Integrity & Source Attribution

**Sources Array (7 entries):**
1. Vermont Agency of Education (2019-11-15, baseline)
2. Leider, Colombo & Nerlino (2021), EPAA paper (2019-11-15, baseline)
3. VSBPE Licensing Rules (2026-05-08, projectcert-2026) ✓
4. Core Teaching Standards (2026-05-08, projectcert-2026) ✓
5. NCES English Learners (2026-05-08, projectcert-2026) ✓
6. Seal of Biliteracy state listing (2026-05-08, projectcert-2026) ✓
7. WIDA Consortium membership (2026-05-08, projectcert-2026) ✓

All projectcert-2026 sources have corresponding retrieval snapshots in `sources/VT/2026-05-08/`. ✓

---

## Summary

| Finding | Status |
|---------|--------|
| History row meta-process violation (title "Baseline coding...") | **CRITICAL VIOLATION** |
| elPercentAsOf staleness (2021-10-01 vs. 2026 refresh) | Minor (data value valid, dating inconsistent) |
| Missing history events (2018 bilingual rule, 2022 ELD rename, Seal authorization) | Expected gaps (Phase 2 workflow) |
| Credential/standards coding accuracy | ✓ Verified correct |
| Source attribution completeness | ✓ Complete |
| Verification status promotion justification | ✓ Justified by 2026-05-08 audit |

---

## Next Steps

**For this audit:**
1. **Remove or reword** the 2019-12-01 history row to eliminate the meta-process violation. Options:
   - Delete entirely (simplest; the baseline is already implicit in verification status)
   - Reword to document a substantive event (requires identification of what actually happened on 2019-12-01 in Vermont EL licensing)

**For future refreshes:**
1. Backfill history events for major policy moments (2018 bilingual rule, 2022 ELD rename, Seal adoption timeline).
2. If NCES Table 204.20 annual data becomes available, populate elPercentHistory[] and update elPercentAsOf to retrieval date.
3. Watch Rule 5440-40 (next review cycle may surface amendments).

---

## Files Retained for Next Cycle

- `sources/VT/2026-05-08/*` — baseline 2026 verification snapshot
- Supporting PDFs & raw HTML retained for manual audit trail

