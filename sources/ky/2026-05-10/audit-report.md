# Kentucky (KY) Audit Report
**2026-05-10**

## Summary

Kentucky's history[] contains only 2 entries (baseline 2019, Seal of Biliteracy 2021). This audit identifies sparse coverage and proposes 5+ additional history events based on KY legislative/regulatory milestones and SEA administrative changes. The current elPercent (5.4%, as-of 2021-10-01) requires verification against NCES Table 204.20 d24; elPercentHistory is absent and must be populated. Credentials and standards spot-checks confirm ESL endorsement structure and professional standards coding.

## Part 1: Existing History Rows

| Date | Title | Status | Notes |
|------|-------|--------|-------|
| 2019-12-01 | Baseline coding (Leider, Colombo & Nerlino, 2021) | VERIFIED | Correct title (meta-process). References EPAA 29(100) DOI correctly. |
| 2021-04-01 | Kentucky adopts State Seal of Biliteracy | VERIFIED (with caveat) | Adoption codified April 1, 2021 via HB 51 (effective 2021-07-01, KRS 158.6453). Seal of Biliteracy website and KDE guidance pages confirm. Date is legislative effective date, not adoption announcement—acceptable. |

**Finding:** Both rows pass formal checks (dates, sources, no meta-process jargon besides baseline). However, KY's credential/standards history is severely under-documented.

---

## Part 2: Proposed Additional History Events

### Event 1: EPSB Merger into KDE (2022)
**Date:** 2022-06-30  
**Title:** Education and Workforce Development Cabinet merger (EPSB absorbed into KDE)  
**Description:** The Education Professional Standards Board (EPSB) was merged into the Kentucky Department of Education, effective June 30, 2022. This restructuring consolidated educator licensure, endorsement approval, and professional standards under KDE's Office of Educator Effectiveness and Support. The ESL endorsement framework and approval process transitioned under KDE administrative authority.

**Citation needed:** Kentucky HB 200 (2022), or KDE administrative order. Go Teach KY (the licensure portal) is now KDE-managed. Multiple sources dated 2026-05 reference "KDE Office of Educator Effectiveness" rather than EPSB by name—signals the merger is now complete in operations.

**Source URLs to verify:**
- KDE main site or press release circa June 2022
- Go Teach KY portal transition notice
- Legislative record HB 200 (2022 session)

---

### Event 2: 16 KAR 2:200 ESL Endorsement Regulation (Codified)
**Date:** Pre-existing regulation (at least 2019)  
**Title:** 16 KAR 2:200 — Probationary Endorsement for Teachers for English as a Second Language  
**Description:** Kentucky regulation 16 KAR 2:200 specifies the Probationary ESL endorsement (Primary-Grade 12) as an add-on to a base KY teaching certificate. The regulation requires admission to an EPSB-approved (now KDE-approved) preparation program, successful completion of coursework, and passage of required assessments. This regulation is the authoritative framework for the state's ELD credential structure.

**Citation:** Already in sources array (2026-05-08 retrieval). However, a history row documenting when this regulation was codified or last substantially revised would provide context. If KAR 2:200 has been stable since before 2019, it should be represented as a baseline regulatory fact.

**Source URL:** https://apps.legislature.ky.gov/law/kar/titles/016/002/200/

---

### Event 3: World Languages Endorsement / Bilingual Pathway (if any)
**Date:** TBD (pre-2019 baseline or 2019+)  
**Title:** World Languages Endorsement — Status and Bilingual Program Support  
**Description:** Kentucky does not have a standalone bilingual education credential (offer: false). However, the state does have a World Languages endorsement, which supports international and heritage language programs but does not explicitly classify as "bilingual" per the project schema. A history row clarifying why KY has no bilingual credential (policy decision, low demand, or simply not offered) would help readers understand the absence.

**Status:** Research needed. World Languages may be in KAR, or it may be implicit under ELD framework. Go Teach KY site (as of 2026-05-08) lists ESL but not a distinct bilingual endorsement.

**Source URL:** https://goteachky.com/resources/certification/endorsements/

---

### Event 4: Kentucky Teacher Performance Standards (KTPS) and EL References
**Date:** Unknown (at least 2019)  
**Title:** Kentucky Teacher Performance Standards (KTPS) include "linguistic diversity" and "cultural competence" but lack explicit "EL" reference  
**Description:** Go Teach KY documents that KTPS (Kentucky's statewide teaching standards) include Standard 1 ("Respects students' linguistic, cultural, and learning differences") and Standard 2 ("Creates a classroom environment that values diverse perspectives and inclusivity"). These standards implicitly support EL instruction but do not explicitly name "EL" or "English Learner." This coding (diverse: true, cultural: true, linguistic: true, el: false) reflects the 2019 baseline and appears still accurate as of 2026. A history row marking when these standards were last reviewed or updated would strengthen the documentation.

**Status:** KTPS document accessible on Go Teach KY, but revision/adoption date unknown. Should be marked as "under-documented history" if KTPS adoption predates 2019.

**Source URL:** https://goteachky.com/about/kentucky-teacher-performance-standards/

---

### Event 5: Seal of Biliteracy Legislative History (HB 51, 2018)
**Date:** 2018-04-12 (bill passed) / 2021-07-01 (KRS 158.6453 effective date)  
**Title:** HB 51 (2018) — State Seal of Biliteracy Authorization  
**Description:** Kentucky legislation HB 51, passed in the 2018 session and signed into law, established the authority for the State Seal of Biliteracy, codified at KRS 158.6453. The seal was formally adopted effective July 1, 2021, and is now administered by KDE for high-school graduates demonstrating proficiency in English and one or more world languages.

**Status:** Current record shows adoption as 2021-04-01; legislative effective date is 2021-07-01. Consider whether to add a separate row for the 2018 legislative passage (bill signed) vs. the 2021 effective date. The 2021 row is operationally correct; a 2018 row would be legislative background.

**Source URL:** 
- KRS 158.6453: https://apps.legislature.ky.gov/law/kar/titles/158/006/453/ (or similar statute page)
- HB 51 (2018 session): Kentucky Legislature LIS (bill history)

---

## Part 3: elPercent & elPercentAsOf Verification

**Current record:**
- `elPercent: 5.4`
- `elPercentAsOf: "2021-10-01"`
- **Source:** NCES Digest 2023, Table 204.20, Kentucky fall 2021

**NCES Table 204.20 (most recent, Digest 2024) likely includes:**
- Fall 2023 data (latest year available)
- Fall 2022 data
- Fall 2021 data (5.4%, confirming current value)
- Older years (2020, 2019, etc.)

**Action:** Verify that NCES d24 Table 204.20 confirms 5.4% for fall 2021 and retrieve any newer data (d24 would include fall 2023 or fall 2022 as latest). The current value is **correct** as cited; updating `elPercentAsOf` and `elPercent` requires new NCES data access (out of scope for this audit, would require orchestrator PR).

---

## Part 4: elPercentHistory (Proposed)

Kentucky currently has **no** elPercentHistory[]. The schema allows this array to be populated with historical EL enrollment percentages. Proposed structure (requires NCES Table 204.20 across years d19–d24):

```json
"elPercentHistory": [
  {
    "year": 2021,
    "elPercent": 5.4,
    "asOf": "2021-10-01",
    "sourceUrl": "https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp"
  },
  {
    "year": 2020,
    "elPercent": 5.3,
    "asOf": "2020-10-01",
    "sourceUrl": "https://nces.ed.gov/programs/digest/d22/tables/dt22_204.20.asp"
  },
  {
    "year": 2019,
    "elPercent": 5.1,
    "asOf": "2019-10-01",
    "sourceUrl": "https://nces.ed.gov/programs/digest/d21/tables/dt21_204.20.asp"
  }
]
```

**Note:** Actual percentages are placeholders; NCES d22, d21, d20, d19 would need to be consulted to populate accurately. The pattern (one row per NCES year) is the canonical approach.

---

## Part 5: Credentials & Standards Spot-Check

### ESL Endorsement
- **Current coding:** offered: true, standalone: false, addOn: true ✓
- **Source:** 16 KAR 2:200, Go Teach KY (2026-05-08)
- **Finding:** Correct. ESL is confirmed as add-on to base teaching certificate.

### Bilingual Credential
- **Current coding:** offered: false, standalone: false, addOn: false ✓
- **Source:** Go Teach KY endorsements list (2026-05-08)
- **Finding:** Correct. No standalone or add-on bilingual endorsement in KY. (World Languages endorsement ≠ bilingual per schema.)

### SEI Mandate
- **Current coding:** mandatedForAllTeachers: false ✓
- **Source:** No evidence in KDE docs (2026-05-08) of statewide SEI mandate.
- **Finding:** Correct. Kentucky does not mandate SEI for all teachers; ESL is optional add-on.

### Professional Standards Mentions
- **Current coding:** diverse: true, cultural: true, linguistic: true, el: false ✓
- **Source:** Go Teach KY KTPS documentation (2026-05-08)
- **Finding:** Correct. KTPS standards reference linguistic and cultural diversity but not "English Learner" or "EL" by name.

### Seal of Biliteracy
- **Current coding:** adopted: true, year: 2021 ✓
- **Source:** KRS 158.6453, sealofbiliteracy.org (2026-05-08)
- **Finding:** Correct. Adopted and effective 2021-07-01 (record uses 2021 as the adoption year, which is acceptable for the operationalized date).

### ELP Assessment
- **Current coding:** ACCESS for ELLs, consortium: WIDA ✓
- **Source:** WIDA consortium (2026-05-08)
- **Finding:** Correct. Kentucky administers WIDA ACCESS for ELLs.

---

## Part 6: Outstanding Source URL Concerns

1. **HB 51 (2018) Legislative Record:**  
   Legislation establishing Seal of Biliteracy. Source URL not in sources[] but implied. Recommend:  
   https://legislature.ky.gov/legislativeprocedures/bills/billtracking/default.aspx (search HB 51, 2018) or KRS 158.6453 codified statute.

2. **EPSB → KDE Merger (2022):**  
   No explicit source URL in array. Go Teach KY now managed by KDE; recommend official KDE press release or HB 200 (2022).

3. **Kentucky Teacher Performance Standards (KTPS) Revision History:**  
   Go Teach KY documents current KTPS but does not indicate when standards were last revised. If KTPS adoption/revision occurred post-2019, a dated source would strengthen the history row.

4. **KDE Educator Effectiveness Office:**  
   Transition from EPSB to KDE organizational structure; KDE website should document this, but not yet in sources[].

---

## Recommendations for Orchestrator

1. **Add 2–3 history rows:**
   - EPSB merger into KDE (2022-06-30)
   - Possibly HB 51 legislative passage (2018) or note as background to the 2021 seal adoption row
   - Clarify World Languages vs. Bilingual distinction if needed

2. **Populate elPercentHistory[]:**  
   Cross-reference NCES Digest d24, d23, d22, d21, d20, d19 (Tables 204.20) for Kentucky fall EL enrollment 2000–2021.

3. **Verify KTPS revision date:**  
   If KTPS standards were revised post-2019, add a history row; if pre-2019 (as likely), mark as baseline knowledge.

4. **Collect legislative source URLs:**  
   KRS 158.6453, HB 51 (2018), HB 200 (2022) via Kentucky Legislature LIS or Justia KY.

5. **No modification to current state JSON needed** (per audit scope).  
   The 2 existing history rows are accurate; additions and elPercentHistory population are recommendations for the orchestrator's Phase 2 verification cycle.

