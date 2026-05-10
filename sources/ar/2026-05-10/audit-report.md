# Arkansas audit report (2026-05-10)

## Summary
- History rows reviewed: 4
- History rows OK: 4
- History rows flagged: 0
- New history events suggested: 0
- elPercent change suggested: no — current 8.1% matches NCES 2021 fall
- elPercentHistory points found: 3 (fall 2019, 2020, 2021)
- Credential/standards changes suggested: yes — professionalStandardsMentions.linguistic should be false, not true

## History rows reviewed

All four existing history rows are chronologically sorted and substantive (no meta-process violations):

| Date | Title | Status | Notes |
|------|-------|--------|-------|
| 2018-06-01 | Arkansas Seal of Biliteracy adopted by State Board | OK | Verified via SEA website; pilot started 2017-03 per source |
| 2019-12-01 | Baseline coding (Leider, Colombo & Nerlino, 2021) | OK | Canonical baseline row; validates source structure |
| 2022-06-02 | Rules Governing Educator Licensure take effect | OK | Referenced in current DESE licensure pages; code 247 (ESL K-12) and code 100 (ESOL Ancillary) confirmed |
| 2024-01-01 | DESE refreshes ESL endorsement competencies and Arkansas Teaching Standards | OK | Verifies against 2024 EEF published documents; accurate |

## Suggested history additions
None. No new substantive EL-policy events discovered post-2024-01-01.

## elPercent verification
- **Current value**: 8.1% as of 2021-10-01
- **Latest NCES (Digest 2023)**: Fall 2021 = 8.1%, n=39,763 (matches exactly)
- **Divergence**: None
- **Recommendation**: Keep as-is; no update needed

## elPercentHistory (proposed)
The JSON currently has only `elPercent` + `elPercentAsOf` (single-year snapshot). Historical data is available from NCES Digest archives for fall years 2019, 2020, 2021:

```json
[
  {
    "date": "2019-10-01",
    "percent": 8.2,
    "source": {
      "label": "NCES Digest of Education Statistics 2021, Table 204.20",
      "url": "https://nces.ed.gov/programs/digest/d21/tables/dt21_204.20.asp"
    }
  },
  {
    "date": "2020-10-01",
    "percent": 8.3,
    "source": {
      "label": "NCES Digest of Education Statistics 2022, Table 204.20",
      "url": "https://nces.ed.gov/programs/digest/d22/tables/dt22_204.20.asp"
    }
  },
  {
    "date": "2021-10-01",
    "percent": 8.1,
    "source": {
      "label": "NCES Digest of Education Statistics 2023, Table 204.20",
      "url": "https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp"
    }
  }
]
```

Note: `elPercentHistory` is not part of the current Zod schema. This is a feature request, not a change to the extant AR record.

## Credentials / standards spot-check

**Issue flagged**: `professionalStandardsMentions.linguistic` should be `false`, not `true`.

The Arkansas Teaching Standards (Updated 2024 EEF) document was reviewed for explicit references to: `diverse`, `cultural`, `linguistic`, `language`, `EL`, `English language`, `ELL`, `ESL`, `LEP`.

**Findings**:
- ✓ `diverse` — Standard #2 (Learning Differences) references "diverse cultures and communities"
- ✓ `cultural` — Same standard references inclusive cultural learning environments
- ✗ `linguistic` — No explicit reference to "linguistic" or language-instruction focus found
- ✗ `el` — No reference to ELs / English language learners / ESL / ELL / LEP found

The current JSON correctly has `cultural: true` and `el: false`. However, **`linguistic: true` is questionable** — the standards do not explicitly mention "linguistic" or language acquisition/instruction in the general teaching standards. The standards emphasize cultural diversity within a general inclusive-practices frame, not language-specific instruction (which is appropriately captured in the specialized ESL competencies document instead).

**Recommendation**: Demote `professionalStandardsMentions.linguistic` to `false` unless a direct quote from the teaching standards can be found that uses `language` or `linguistic` in a way that suggests language-instruction is a teaching standard (not just a general competency mention).

## Source URL concerns
All source URLs accessed successfully (except the PDF corruption on the Rules Governing Educator Licensure, which is a fetch-artifact, not a content issue). The ELPA21 page lacks detailed adoption history; source is minimalist but current.

---

**Next steps**: 
1. Consider `professionalStandardsMentions.linguistic: false` correction (substantive, merits user review)
2. `elPercentHistory` is not yet in schema; deprioritized
3. Record status remains `verified-2026` with `lastVerified: 2026-05-08` (acceptable; audit date 2026-05-10 can supersede if AR JSON is re-edited)
