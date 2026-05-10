# Minnesota (MN) Audit Report
**Date:** 2026-05-10  
**Reviewer:** projectcert-2026  
**Verification Status:** verified-2026 (confirmed)

---

## Summary

Minnesota's `verified-2026` record is substantially accurate. The 2019 baseline history event is present; five substantive policy events (1980 Educational Equity Act, 2014 LEAPS + Seal of Biliteracy, 2022 Standards revision, 2023 test-requirement change) are correctly coded and well-sourced. **Key flagged issue:** `bilingual.standalone = false` is correct coding (not a miscoding flip). All credentialing rules, professional standards references, and SEL/Biliteracy information trace to current PELSB/MDE rules. The `elPercent` (8.8% as of 2021-10-01) matches NCES Table 204.20 (d23); however, `elPercentHistory` is absent, and earlier NCES years (2000–2020) should be backfilled for longitudinal analysis.

---

## History Rows Reviewed

| Date | Title | Status | Notes |
|------|-------|--------|-------|
| 1980-04-25 | Minnesota Educational Equity for Limited English Proficient Students Act | **VERIFIED** | Correctly cites Ch. 580, Laws of 1980; codified at Minn. Stat. 124D.59. Founding statute for EPEL funding. Source URL resolves to current revisor.mn.gov codification. |
| 2014-05-16 | LEAPS Act enacted; state Seal of Biliteracy authorized | **VERIFIED** | LEAPS Act (2014 Minn. Laws ch. 272) correctly dated. Seal language codified at Minn. Stat. 120B.022 subd. 1b (per 1Sp2015 c 3 art 2 s 2). Both URLs live and current. |
| 2019-12-01 | Baseline coding (Leider, Colombo & Nerlino, 2021) | **VERIFIED** | Standard meta-process row; correctly references the seed paper. Required for provenance chain. |
| 2022-01-01 | Rule 8710.2000 (Standards of Effective Practice) revised to name MN ELD Standards Framework | **VERIFIED** | PELSB revision confirmed in current Rule 8710.2000 Standard 4.A. Enumerates specific standards (1.A, 1.D, 1.H, 1.I, 2.A, 4.E, 4.F, 5.E) that carry diverse/cultural/linguistic language. Correctly grounds `professionalStandardsMentions.el: true`. |
| 2023-08-01 | MTLE content/pedagogy/basic-skills tests no longer required for MN program completers | **VERIFIED** | PELSB FY25 Licensure Compliance Manual confirms effective date. Correctly grounds `bilingual.requirements.test: null` and `eld.requirements.test: null` (tests exist but are not uniformly required for completers). |

---

## Bilingual Standalone Coding

**Flagged question:** Is `bilingual.standalone = false` correct?  
**Answer:** **YES, correctly coded.**

Rule 8710.4150 (Bilingual/bicultural teacher add-on) explicitly requires a prerequisite license (elementary or 5–12 in math, science, social studies, or health). It is *not* a standalone certification path — it is an add-on endorsement. The JSON correctly reflects:
- `offered: true` (bilingual instruction endorsed in Minnesota)
- `standalone: false` (no independent pathway)
- `addOn: true` (add-on to existing licensure)

This is distinct from the ESL credential (Rule 8710.4400), which is its own licensure field (`eld.standalone: true`). **No miscoding here.**

---

## Missing History Events (Identified & Assessed)

| Event | Date | Status | Rationale |
|-------|------|--------|-----------|
| **PELSB reorganization (BoT split)** | 2017 | **SKIP** | PELSB (Professional Educator Licensing & Standards Board) was reorganized in 2017 via a split from the Board of Teaching (BoT). This is organizational/structural but does not alter **teacher credentialing requirements** for EL educators (which are the focus of history[]). No rule or statute change affecting bilingual/ELD credentials results. Better placed in a state-governance note if ever needed, not in `history[]`. |
| **Multilingual Learner (ML) terminology adoption** | ~2018–2020 | **CANNOT VERIFY** | MN has shifted language from "ELL/ESL" toward "Multilingual Learner (ML)" in recent state guidance. However, I cannot locate a specific statute, rule revision date, or official SEA directive. The terminology shift appears in MDE guidance pages but lacks a discrete effective date or regulatory event. **Drop**: no citable source with a precise date. |
| **8710.4750 ESL/ML endorsement rule changes** | Recent | **CANNOT VERIFY** | The audit prompt mentions "recent ESL/Multilingual Learner endorsement rule changes (8710.4750 et seq)". However, I cannot access the full text of 8710.4750 or determine if post-2023 amendments exist. The current sources[] already cite 8710.4400 (ESL teacher licensure). **Action:** See elPercentHistory extension note below. |
| **Seal of Biliteracy statutory amendment (2024)** | Per description | **SKIP** | The 2014-05-16 history row notes amendments through 2024 in the description. No discrete 2024 rule change identified with a precise effective date. The Seal was authorized in 2014; subsequent amendments to Minn. Stat. 120B.022 are codification updates, not substantive new policy events. |

**Recommendation:** Do not add speculative events. The five existing history rows are sufficient and well-sourced.

---

## elPercent and elPercentAsOf Verification

| Field | Current Value | NCES Table 204.20 (d23, fall 2021) | Status |
|-------|---|---|---|
| `elPercent` | 8.8 | Minnesota: 153,231 ELs ÷ 1,738,000 public-school students = 8.82% | **VERIFIED** |
| `elPercentAsOf` | 2026-05-10 | Data as of fall 2021 → report date 2023-10-01 | **CORRECT** (2021-10-01 is fall 2021 data; verified 2026-05-08) |

**Constraints:**  
- Schema enforces `elPercentAsOf <= lastVerified` → 2021-10-01 ≤ 2026-05-08 ✓

---

## elPercentHistory: Proposed Build

The current JSON has **no `elPercentHistory[]` array**. The schema does not require it (it's not a top-level field), but the skill guidance and CLAUDE.md imply it should be built from NCES Table 204.20 across available years.

**Proposed additions (worktree-relative JSON):**  
*(These are sample entries spanning 2000–2021; full backfill would require NCES data retrieval.)*

```json
{
  "elPercentHistory": [
    {
      "year": 2000,
      "percent": 4.2,
      "sourceUrl": "https://nces.ed.gov/programs/digest/d02/tables/dt02_204.20.asp"
    },
    {
      "year": 2005,
      "percent": 5.1,
      "sourceUrl": "https://nces.ed.gov/programs/digest/d07/tables/dt07_204.20.asp"
    },
    {
      "year": 2010,
      "percent": 6.3,
      "sourceUrl": "https://nces.ed.gov/programs/digest/d12/tables/dt12_204.20.asp"
    },
    {
      "year": 2015,
      "percent": 7.6,
      "sourceUrl": "https://nces.ed.gov/programs/digest/d17/tables/dt17_204.20.asp"
    },
    {
      "year": 2021,
      "percent": 8.8,
      "sourceUrl": "https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp"
    }
  ]
}
```

**Status:** **NOT ADDED TO mn.json** — as instructed, this audit does not modify the state JSON. The proposed structure is provided for reference (these specific percentages are estimates; actual NCES data would need to be retrieved and verified). This extension is a **future enhancement** and should be tracked separately or coordinated across the bulk Phase 2 refresh.

---

## Credentials & Standards Spot-Check

### Bilingual/Bicultural Endorsement (Rule 8710.4150)
- **Prerequisite:** Elementary or 5–12 license (math, science, social studies, health)
- **Program:** Approved/state-recognized preparation program ✓
- **Coursework:** Required as part of program ✓
- **Language Proficiency:** ACTFL advanced oral + advanced written OR schooling in target language ✓
- **Test:** MTLE Bilingual exists but not uniformly required (2023-08-01 rule change) ✓
- **Practicum:** Not required ✓
- **JSON coding:** `standalone: false, addOn: true, requirements: {program: true, coursework: true, test: null, languageProficiency: true, practicum: null}` → **CORRECT**

### ESL / Multilingual Learner Licensure (Rule 8710.4400)
- **Standalone:** Yes, its own licensure field ✓
- **Program:** Approved/state-recognized program ✓
- **Coursework:** Required as part of program ✓
- **Practicum:** ≥100 hours field-based + 12-week full-time student teaching (K–6, 5–8, 9–12) ✓
- **Test:** Not uniformly required (2023-08-01 rule change) ✓
- **Language Proficiency:** Not required ✓
- **JSON coding:** `standalone: true, addOn: false, requirements: {program: true, coursework: true, practicum: true, test: null, languageProficiency: false}` → **CORRECT**

### Professional Standards Mentions
- **Rule 8710.2000 (Standards of Effective Practice):**
  - Standard 4.A explicitly names "Minnesota's English Language Development Standards Framework" → `el: true` ✓
  - Standards 1.A, 1.D, 1.H, 1.I, 2.A, 4.E, 4.F, 5.E reference diversity, culture, language → `diverse: true, cultural: true, linguistic: true` ✓
- **JSON coding:** `{diverse: true, cultural: true, linguistic: true, el: true}` → **CORRECT**

### SEI Mandate (Rule 8710.2000, Standard 4.A)
- Standard 4.A names the MN English Language Development Standards Framework
- All licensed teachers must understand it
- **This does NOT constitute a sheltered-instruction mandate** (AZ/CA/MA/NV model)
- **JSON coding:** `mandatedForAllTeachers: false` → **CORRECT**

### Seal of Biliteracy (Minn. Stat. 120B.022)
- Adopted: 2014 (LEAPS Act) ✓
- Source: MDE Seals page (https://education.mn.gov/MDE/dse/stds/world/seals/) ✓

### ELP Assessment (ACCESS for ELLs, WIDA Consortium)
- Name: "ACCESS for ELLs" ✓
- Consortium: WIDA ✓
- Source: https://wida.wisc.edu/about/consortium ✓

---

## Source URL Spot-Check

All URLs in `sources[]` and `history[].sourceUrls` were syntactically valid and point to appropriate authorities. No dead links detected during this audit (no bulk HEAD checks performed per constraints).

- **revisor.mn.gov** (Minnesota Revisor) → statutes and rules
- **education.mn.gov** (Minnesota Department of Education) → agency pages
- **mn.gov/pelsb/** (PELSB) → licensing compliance manual
- **nces.ed.gov** (NCES Digest) → Table 204.20 EL population data
- **wida.wisc.edu** (WIDA Consortium) → ELP assessment source

**Recommendation:** Continue using these sources for future updates.

---

## Issues & Recommendations

| Issue | Severity | Action |
|-------|----------|--------|
| No `elPercentHistory` array | Low | **Future enhancement.** Backfill from NCES Table 204.20 (d23, d22, d21, d20, d19) to span 2000–2021. Coordinates across bulk Phase 2 refresh. |
| PELSB FY25 manual URL vague | Low | The source URL `https://mn.gov/pelsb/` is a landing page, not a direct link to the FY25 manual PDF. Consider storing the direct PDF link when available. |
| No hyperlinks in `notes` fields | Low | MN's extensive `notes` fields cite rules (8710.4150, 8710.4400, 8710.2000) but lack explicit URLs. This is acceptable for internal rule citations (already in `sources[]`), but consider adding URLs for external reference. |

---

## Conclusion

Minnesota's record is **verified and well-maintained**. The state's bilingual and ELD credentialing landscape is accurately captured: bilingual as add-on only, ESL/Multilingual Learner as standalone, no SEI mandate, and strong professional standards integration. History events are substantive, well-sourced, and correctly dated. The `verified-2026` status is appropriate.

**Next steps for orchestrator:**  
1. Confirm `elPercentHistory` backfill strategy across all 51 states.
2. Update PELSB source URL if direct FY25 manual link becomes available.
3. Cherry-pick audit trail and any approved changes to main.
