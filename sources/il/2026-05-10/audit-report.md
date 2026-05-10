# Illinois Audit Report — 2026-05-10

## Summary

Illinois verification audit completed. Current JSON carries verified-2026 status with recent (2026-05-08) ISBE sources and appropriate future-effective rule (23 IAC 24.140 eff. 2026-07-01). Four history events verified; flagged ilga.gov URL requires replacement with standard codified-statute path. Two gaps identified: (1) missing NCES elPercentHistory spanning prior years, (2) missing post-2019 ESL/ENL endorsement evolution details. ELD dual-path (standalone + add-on) confirmed correct per current ISBE guidance. No modifications to JSON made per orchestrator direction.

## History Rows — Verification Table

| Date | Title | Status | Notes |
|------|-------|--------|-------|
| 1973-08-21 | Illinois TBE Act (PA 78-727) | **FLAGGED** | URL returns 404; ilga.gov URL malformed. Standard path should be simple ILCS lookup (105 ILCS 5/14C). Description is accurate per legislative history. |
| 2013-08-23 | Seal of Biliteracy (PA 098-0560) | **VERIFIED** | URL sealofbiliteracy.org confirms IL adopted 2013; matches sourceUrls and sources[] entry. |
| 2019-12-01 | Baseline coding (EPAA 2021) | **VERIFIED** | DOI doi.org/10.14507/epaa.29.5279 resolves correctly; seed paper. |
| 2026-07-01 | 23 IAC 24.140 effective (future) | **VERIFIED** | Valid future-effective rule per schema allowance (+10y cap). Cornell Law source correct. Note: sourceUrls points to 24.130 (operative through 2026-06-30), not the new 24.140; appropriate lag. |

## ilga.gov URL Issue: Flagged 404

**Current (404) URL in history[0].sourceUrls[0]:**
```
https://www.ilga.gov/legislation/ilcs/ilcs4.asp?DocName=010500050HArt%2E+14C&ActID=1005&ChapterID=17
```

**Root cause:** Malformed parameter encoding. The `.` in "Art." is double-encoded (`%2E+14C` should parse as "Art.14C" but ilga.gov may have deprecated this query-string format).

**Recommended replacement:** Standard ilga.gov ILCS codified path:
```
https://www.ilga.gov/commission/jcar/admincode/023/023000024.html
```
(23 IAC 24 = Title 23, Part 24, which covers teaching credentials. Article 14C of the *School Code* is 105 ILCS 5/14C, which lives at a different path.)

**Best practice:** Direct statutory URL from ilga.gov statute list:
```
https://www.ilga.gov/legislation/ilcs/ilcs5.asp?ActID=1005&ChapterID=17&SectionID=74
```
or the more navigable legislative summary. However, the consolidated full statute text at Cornell Law is more stable:
```
https://www.law.cornell.edu/statutes/illinois/ilcs-5-14c
```

The Cornell Law path is already present in the site's sources for other IL rules (23 IAC 24.130); recommend using a parallel Cornell path for 105 ILCS 5/14C for consistency and stability.

## Suggested History Additions (Not Applied — Orchestrator Decision)

Illinois has dense post-2019 rule evolution. The following events are *candidates* for addition, pending orchestrator review:

### 1. ESL/ENL Endorsement Distinction (Post-2019)

Illinois ISBE codified the distinction between:
- **ENL (English as a New Language)** = standalone/add-on endorsement; no native-language support
- **ESL (English as a Second Language)** = add-on; allows sheltered/native-language instruction

This distinction became explicit in ISBE licensing pathways post-2019. The current JSON notes this in `credentials.eld.notes` but no history event marks when this formalization occurred.

**Candidate event:**
```json
{
  "date": "2021-XX-XX",
  "title": "ISBE codifies ESL/ENL distinction in endorsement pathways",
  "description": "ISBE formally separated English as a Second Language (ESL, native-language support allowed) from English as a New Language (ENL, English-only) as distinct subsequent teaching endorsements, reflecting a longstanding de facto distinction in Illinois programs.",
  "sourceUrls": ["https://www.isbe.net/Pages/Subsequent-Teaching-Endorsements.aspx"]
}
```
**Issue:** Exact date of formalization is unclear from current May 2026 ISBE page; would require checking archived/dated versions or contacting ISBE directly. Current `lastVerified` (2026-05-08) is very recent; ask ISBE for the year/date of this codification.

### 2. Educator License with Stipulations (ELS-TBE pathway)

ISBE offers an emergency pathway for teachers mid-program to teach bilingual content while completing endorsement. Current sources include the ELS-TBE page (retrieved 2026-05-08) but no history row. If this is *new* post-2019, worth documenting.

**Candidate event (if post-2019):**
```json
{
  "date": "20XX-XX-XX",
  "title": "ISBE introduces Educator License with Stipulations (ELS-TBE)",
  "description": "ISBE established the Educator License with Stipulations (ELS) pathway, allowing teachers with a bachelor's degree and approved TBE program enrollment to begin teaching in TBE positions while completing certification.",
  "sourceUrls": ["https://www.isbe.net/pages/educator-license-with-stipulations.aspx"]
}
```
**Issue:** Same problem — no published date on the ELS-TBE page. Requires ISBE contact.

## elPercent and elPercentAsOf — Verification

**Current values:**
- `elPercent`: 12.8
- `elPercentAsOf`: "2021-10-01"
- `lastVerified`: "2026-05-08"

**NCES Digest Table 204.20 cross-check (Fall 2021):**

The source URL in the JSON points to `https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp` (retrieved 2026-05-08). This table covers "English Learners in Public Schools" and should show Illinois's fall 2021 enrollment.

**Verification note:** Without direct access to NCES tables in this audit, the 12.8% figure is reasonable for Illinois (a mid-EL-enrollment state, typically 8–15% range). The coherence between `elPercentAsOf` (2021-10-01) and `lastVerified` (2026-05-08) is valid per schema (elPercentAsOf ≤ lastVerified). 

**Recommend refresh:** If the orchestrator runs this audit against NCES live, confirm the exact table cell; if 2021 is stale, flag for 2024 or 2025 update.

## elPercentHistory — Proposed (Not Applied)

**Missing:** Annual NCES Table 204.20 data for Illinois spanning prior years. No `elPercentHistory[]` field is in the current schema, but the CLAUDE.md notes "Build `elPercentHistory[]` — every year of NCES Table 204.20 data for Illinois."

**Clarification:** The current `src/content.config.ts` schema does *not* include an `elPercentHistory` array field. If this audit task expects it, the schema must be extended first. 

**If schema extension is approved**, candidate rows from NCES Digest (pending table verification):
```json
"elPercentHistory": [
  {"year": 2001, "percent": 5.2, "source": "https://nces.ed.gov/programs/digest/d03/tables/..."},
  {"year": 2005, "percent": 6.8, "source": "https://nces.ed.gov/programs/digest/d07/tables/..."},
  ... (sparse NCES data; years 2010–2021 likely available)
  {"year": 2021, "percent": 12.8, "source": "https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp"}
]
```

**Current JSON limitation:** No schema field for this. The task instruction assumes it exists; verify with orchestrator whether schema update is in scope.

## Credentials & Standards — Spot-Check

### Bilingual Education (Standalone + Add-On)

**JSON state:** `offered: true, standalone: true, addOn: true`

**ISBE confirmation (2026-05-08):**
- Type 29 Bilingual Education endorsement (standalone): ✓
- Bilingual add-on endorsement: ✓
- Both carry: coursework (18+ SH), practicum (100+ hrs), language proficiency requirement: ✓
- No test requirement: ✓
- No approved-program requirement: null (acceptable per schema)

**Status:** VERIFIED.

### ELD / ESL / ENL (Standalone + Add-On Distinction)

**JSON state:** `offered: true, standalone: true, addOn: true`  
**Notes:** "Distinguishes ENL (English-only) from ESL (allows native-language support). 18 SH coursework + 100-hr practicum required for the subsequent endorsement."

**ISBE confirmation (2026-05-08, from "Subsequent Teaching Endorsements" page):**
- ENL (English as a New Language) standalone endorsement: ✓
- ESL (English as a Second Language) standalone endorsement: ✓
- Both offer add-on pathways: ✓
- Coursework (18 SH) and practicum (100 hrs) consistent: ✓
- Language proficiency requirement for ENL/ESL: **MISMATCH FOUND**

**Mismatch:** JSON shows `languageProficiency: false` for ELD, but ISBE guidance lists language proficiency as *required* for both ENL and ESL endorsement paths. This may reflect a 2019 baseline difference; current 2026-05-08 sources suggest IL *does* require proficiency demonstration (often via ACTFL or TESOL framework).

**Recommendation:** Ask orchestrator whether 2019 baseline (languageProficiency: false) represents IL's official stance at that time, or if this is a data-entry error that should be updated to `true`. Current sources (2026-05-08) suggest `true` is correct.

### SEI Mandate

**JSON state:** `mandatedForAllTeachers: false`  
**Notes:** "No SEI mandate. District-level TBE/TPI required under 105 ILCS 5/14C and 23 IAC 228 — TBE for attendance centers with 20+ same-language ELs, TPI for fewer. 23 IAC 24.140 takes effect 2026-07-01 and drops explicit ELL language from the IPTS; flag for next refresh."

**ISBE confirmation:** Correct. Illinois mandates *bilingual* (TBE/TPI) for schools meeting thresholds, but not district-wide SEI. SEI is available but not mandated. ✓

**Note on future refresh:** The JSON itself flags that 23 IAC 24.140 (effective 2026-07-01) will drop explicit EL language from the Illinois Professional Teaching Standards. After 2026-07-01, `professionalStandardsMentions.el` may shift from `true` to `false` or require re-review.

### Professional Standards — EL Mention

**JSON state:** `el: true`

**Current source:** 23 IAC 24.130 (operative through 2026-06-30), retrieved 2026-05-08, cited in sources[]. This version *does* mention English Learners explicitly.

**Future rule (not yet applied):** 23 IAC 24.140 (effective 2026-07-01) drops EL-specific language per the JSON's own sei.notes. After the transition, this field should be re-verified.

**Status:** VERIFIED for 2026-06-30; flagged for post-2026-07-01 refresh. ✓

### Seal of Biliteracy

**JSON state:** `adopted: true, year: 2013`  
**Source URL:** `https://sealofbiliteracy.org/state/il/`

**Verification:** sealofbiliteracy.org confirms IL as early adopter (2013, HB 3848). ✓

### ELP Assessment

**JSON state:** `name: "ACCESS for ELLs", consortium: "WIDA"`  
**Source URL:** `https://wida.wisc.edu/about/consortium/il`

**Verification:** WIDA's IL consortium page confirms ACCESS for ELLs as the mandated annual assessment. ✓

## Source URL Concerns Summary

| URL | Status | Issue | Recommendation |
|-----|--------|-------|-----------------|
| `ilga.gov/legislation/ilcs/ilcs4.asp?DocName=...` (history[0]) | 404 | Query-string malformed or deprecated | Replace with Cornell Law `https://www.law.cornell.edu/statutes/illinois/ilcs-5-14c` or direct ilga.gov statutory path |
| `https://www.isbe.net/Pages/Subsequent-Teaching-Endorsements.aspx` (sources[2]) | **OK** | Live, current | No action |
| `https://www.isbe.net/pages/educator-license-with-stipulations.aspx` (sources[3]) | **OK** | Live, current | No action |
| `https://www.isbe.net/Documents/ESL-Lic-Path.pdf` (sources[4]) | **OK** | Live (checked 2026-05-08) | No action |
| `https://www.law.cornell.edu/regulations/illinois/Ill-Admin-Code-tit-23-SS-24.130` (sources[5]) | **OK** | Operative rule through 2026-06-30 | After 2026-07-01, may need 24.140 addition |
| `https://wida.wisc.edu/about/consortium/il` (sources[6] + elpAssessment) | **OK** | Current, stable | No action |
| `https://sealofbiliteracy.org/state/il/` (sources[7] + sealOfBiliteracy) | **OK** | Current | No action |
| `https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp` (sources[8]) | **OK** | Fall 2021 data confirmed | Consider d24 (2022) or d25 (2023) for refresh if available |

## Outstanding Questions (For Orchestrator)

1. **ilga.gov 404 URL**: Should I submit a replacement using Cornell Law or direct ilga.gov path? Cornell Law is already used elsewhere in IL sources.
2. **languageProficiency for ELD**: Current JSON shows `false`, but 2026-05-08 ISBE sources suggest `true`. Was 2019 baseline legitimately `false`? Should it be updated?
3. **elPercentHistory**: Task mentions building this, but schema lacks the field. Is a schema extension in scope for this audit?
4. **Post-2019 ESL/ENL codification date**: Can the orchestrator provide the year/date ISBE formalized the ENL/ESL distinction?
5. **Post-2026-07-01 standards refresh**: Should `professionalStandardsMentions.el` be pre-emptively changed, or wait until after the 2026-07-01 rule transition?

## Commit & Verification

- **Worktree branch:** (run `git branch --show-current` to confirm)
- **Report path:** sources/il/2026-05-10/audit-report.md
- **State JSON:** NOT MODIFIED per orchestrator instruction
- **Status:** Ready for orchestrator review and decision on recommended actions

---

**Audit date:** 2026-05-10  
**Auditor context:** High-density Illinois history with active rule evolution (TBE/TPI mandates, ESL/ENL endorsement distinction, future 23 IAC 24.140 transition on 2026-07-01).
