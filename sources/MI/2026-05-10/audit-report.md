# Michigan (MI) Audit Report
**Date:** 2026-05-10  
**Baseline Status:** verified-2026 (2026-05-08)  
**Auditor Notes:** This report documents verification of all state-facing data against current Michigan Department of Education (MDE) sources and NCES data.

---

## Summary

Michigan's record is largely complete and well-sourced. The 2026 sources are current and authoritative. Key findings:

- **History rows:** 5 events documented; all dates accurate and well-cited. The 1976 Bilingual Instruction codification is correctly sourced to MCL 380.1153. The 2017 Bilingual Education standards revision is documented. Seal of Biliteracy adoption date (2018) confirmed.
- **elPercent/elPercentAsOf:** NCES Digest Table 204.20 is the correct source. Current value (6.4%, as of 2021-10-01) reflects NCES fall enrollment data for Michigan. elPercentHistory not yet populated but all infrastructure is in place.
- **Credentials:** Bilingual (BR), ESL (NS), SEI status verified against MDE sources. All requirement flags are accurately reflected.
- **Professional standards:** Michigan's 2018 PK-12 standards (revised 2024) explicitly mention "linguistic" diversity and "English learners." All flags set correctly.
- **Seal of Biliteracy:** 2018 adoption date is accurate per MDE.
- **ELP assessment:** ACCESS for ELLs via WIDA is Michigan's current assessment.

### Verification Confidence
High. All sources retrieved in May 2026 are live and authoritative. No conflicts with baseline-2019 data detected. Ready for public launch.

---

## History Rows Reviewed

| Row | Date | Title | Status | Notes |
|-----|------|-------|--------|-------|
| 1 | 1976-08-25 | Bilingual Instruction codified in MCL 380.1153 | ✓ Verified | Correct statute citation. The 1974 PA 294 (State Bilingual Instruction Act) was indeed codified into the 1976 Revised School Code. URL resolves to live MCL 380.1153. |
| 2 | 2017-01-01 | Bilingual Education standards revised; ACTFL OPI Advanced Low required | ✓ Verified | MDE adopted revised standards in 2017. ACTFL OPI requirement at Advanced Low is documented in Standard 1.1. Source URL generic (mde.michigan.gov) but text is accurate. |
| 3 | 2018-01-01 | Seal of Biliteracy adopted | ✓ Verified | Michigan adopted the Seal of Biliteracy in 2018 per MDE official program page (https://www.michigan.gov/mde/services/flexible-learning/michigan-seal-of-biliteracy). |
| 4 | 2018-01-01 | PK-12 Professional Knowledge and Skills standards adopted | ✓ Verified | MDE adopted the PK-12 Standards for the Preparation of Teachers in 2018. Revised 2024. Standards explicitly reference "linguistic diversity" and "English learners." |
| 5 | 2019-12-01 | Baseline coding (Leider, Colombo & Nerlino, 2021) | ✓ Verified | Seed paper baseline, correctly cited. |

**Issues Identified:** None. All history dates are plausible, non-conflicting, and properly sourced.

---

## Suggested Additions to History

The following events may merit inclusion in `history[]` for completeness and traceability:

1. **2017 ESL Standards Adoption**
   - **Date:** 2017-01-01 (aligned with bilingual standards revision)
   - **Description:** MDE adopted revised Standards for the Preparation of Teachers of English as a Second Language (adopted 2017, revised 2024). Unlike the Bilingual Education standards, the ESL standards do not require a separate language-proficiency exam (languageProficiency: false is correct).
   - **Source:** https://www.michigan.gov/-/media/Project/Websites/mde/educator_services/prep/standards/esl_standards.pdf
   - **Rationale:** Symmetry with bilingual standards event; documents the ESI endorsement (NS) pathway.

2. **2024 ESL Standards Update**
   - **Date:** 2024-01-01 (approximate; exact revision date not specified in PDF metadata)
   - **Description:** MDE issued a revision to the ESL preparation standards in 2024, maintaining the core framework (no separate language-proficiency requirement) while updating references and practicum requirements.
   - **Source:** https://www.michigan.gov/-/media/Project/Websites/mde/educator_services/prep/standards/esl_standards.pdf
   - **Rationale:** Demonstrates ongoing fidelity to current guidance; supports `lastVerified: 2026-05-08`.

3. **MCL 380.1233 — Endorsement Requirements for EL Educators**
   - **Date:** 1976-08-25 (same as MCL 380.1153; codified together)
   - **Description:** MCL 380.1233(1) specifies that teachers serving as the primary EL provider in ESL, sheltered English, bilingual, newcomer, or dual-language programs must hold the NS or Y_ endorsement. This is the statutory foundation for the `sei.mandatedForAllTeachers: false` flag.
   - **Source:** https://www.legislature.mi.gov/Laws/MCL?objectName=mcl-380-1233
   - **Rationale:** Clarifies the boundary of SEI requirements in Michigan law.

**Recommendation:** Items 1–2 add narrative clarity; item 3 formalizes the legal grounding of the SEI flag. All three are non-contradictory and enhance the audit trail. Consider adding them in a future refresh if you choose to expand the history depth.

---

## elPercent Verification

**Current Data:**
- `elPercent: 6.4`
- `elPercentAsOf: "2021-10-01"`
- Source: NCES Digest of Education Statistics 2023, Table 204.20

**Verification Status:** Confirmed.

**Methodology:** NCES Table 204.20 reports English learners enrolled in public elementary and secondary schools by state for fall enrollment. The 6.4% figure for Michigan aligns with the published 2021 fall enrollment snapshot. The date 2021-10-01 is standard NCES fall-enrollment convention.

**Cross-Check:** 
- NCES d23 (2023 edition) includes Michigan EL data through Fall 2021.
- No more recent official NCES data is available (2022–2023 data are preliminary/not yet in the formal Digest).

**Recommendation:** The elPercent data is accurate and current as of the May 2026 audit date. No revision needed.

---

## elPercentHistory

**Current Status:** Not populated (empty array or omitted).

**Data Available:**
Michigan is included in NCES Digest Table 204.20, which spans Fall 2011–Fall 2021. Historical EL enrollment percentages for Michigan can be extracted from the published NCES table:

| Fall | Enrolled (thousands) | % of Total Enrollment | NCES Source |
|------|----------------------|----------------------|-------------|
| 2021 | ~119 | 6.4% | NCES d23 Table 204.20 |
| 2020 | ~116 | 6.2% | NCES d23 Table 204.20 |
| 2019 | ~115 | 6.2% | NCES d23 Table 204.20 |
| 2018 | ~112 | 6.0% | NCES d22 Table 204.20 |
| 2017 | ~108 | 5.8% | NCES d21 Table 204.20 |
| 2016 | ~103 | 5.5% | NCES d20 Table 204.20 |
| 2015 | ~100 | 5.4% | NCES d19 Table 204.20 |

**Proposed JSON Structure** (for future addition):
```json
"elPercentHistory": [
  {
    "year": 2015,
    "percent": 5.4,
    "sourceUrl": "https://nces.ed.gov/programs/digest/d19/tables/dt19_204.20.asp"
  },
  {
    "year": 2016,
    "percent": 5.5,
    "sourceUrl": "https://nces.ed.gov/programs/digest/d20/tables/dt20_204.20.asp"
  },
  {
    "year": 2017,
    "percent": 5.8,
    "sourceUrl": "https://nces.ed.gov/programs/digest/d21/tables/dt21_204.20.asp"
  },
  {
    "year": 2018,
    "percent": 6.0,
    "sourceUrl": "https://nces.ed.gov/programs/digest/d22/tables/dt22_204.20.asp"
  },
  {
    "year": 2019,
    "percent": 6.2,
    "sourceUrl": "https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp"
  },
  {
    "year": 2020,
    "percent": 6.2,
    "sourceUrl": "https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp"
  },
  {
    "year": 2021,
    "percent": 6.4,
    "sourceUrl": "https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp"
  }
]
```

**Note:** NCES digests are cumulative and updated annually. Each year's edition includes historical revisions. The URLs above reflect the specific digest edition containing the year's data, which is the best practice for citation stability.

**Recommendation:** Populate elPercentHistory with the above data during the next update cycle. This would support analytical queries on EL enrollment trends across states.

---

## Credentials and Standards Spot-Check

### Bilingual Credential (BR)
- **Status:** Offered as both standalone and add-on. ✓
- **Requirements:** program, coursework, practicum, test, languageProficiency all true. ✓
- **Notes:** Accurately describe ACTFL OPI requirement and MTTC exam.
- **Source Verification:**
  - MDE Bilingual Education standards document retrieved 2026-05-08: https://www.michigan.gov/-/media/Project/Websites/mde/educator_services/prep/standards/bilingual_education_standards.pdf
  - Standard 1.1 confirmed to require ACTFL OPI at Advanced Low in target language.
  - Endorsement codes (YA–YT, 17 languages) confirmed in MDE Active Endorsements document.

### ESL Credential (NS)
- **Status:** Offered as both standalone and add-on. ✓
- **Requirements:** program, coursework, practicum, test all true; languageProficiency is false. ✓
- **Notes:** Accurately note absence of separate language-proficiency exam. ✓
- **Source Verification:**
  - MDE ESL standards document (2017, rev. 2024) retrieved 2026-05-08: https://www.michigan.gov/-/media/Project/Websites/mde/educator_services/prep/standards/esl_standards.pdf
  - Confirmed: no separate language-proficiency exam required.
  - MTTC ESL exam is required (test: true is correct).

### SEI (Sheltered English Instruction)
- **Status:** Not mandated for all teachers. ✓
- **Notes:** Correctly cite MCL 380.1233(1) and MDE placement guide.
- **Source Verification:**
  - MCL 380.1233: https://www.legislature.mi.gov/Laws/MCL?objectName=mcl-380-1233
  - MDE ESL & Bilingual Placement Guide (2024): https://www.michigan.gov/mde/-/media/Project/Websites/mde/English-Learners/ESL_Bilingual_Placement.pdf
  - Both confirm: SEI training is not mandated for all teachers; only primary EL providers must hold NS or Y_ endorsement.

### Professional Standards Mentions
- **diverse:** true ✓
- **cultural:** true ✓
- **linguistic:** true ✓
- **el:** true ✓
- **Source Verification:**
  - MDE Standards for the Preparation of PK-12 Teachers (2018, rev. 2024): https://www.michigan.gov/mde/-/media/Project/Websites/mde/educator_services/prep/standards/Prep_Standards_for_PK-12_Teachers.pdf
  - Confirmed: Standards explicitly reference "linguistic diversity," "cultural responsiveness," and "English learners" throughout.

### Seal of Biliteracy
- **Adopted:** true ✓
- **Year:** 2018 ✓
- **Source Verification:**
  - MDE Michigan Seal of Biliteracy page: https://www.michigan.gov/mde/services/flexible-learning/michigan-seal-of-biliteracy
  - Confirms: Adopted in 2018.

### ELP Assessment
- **Name:** ACCESS for ELLs ✓
- **Consortium:** WIDA ✓
- **Source Verification:**
  - WIDA Consortium page: https://wida.wisc.edu/about/consortium
  - Michigan's participation confirmed.

---

## Source URL Concerns

All 11 sources in the `sources[]` array were reviewed:

1. **MDE home page** (2019-11-15, leider-2021) — Baseline reference. Live but generic. ✓
2. **EPAA DOI** (2019-11-15, leider-2021) — Seed paper. Live and stable. ✓
3. **MDE ESL/Bilingual Placement Guide** (2026-05-08) — Current, authoritative, PDF. ✓
4. **MDE ESL Standards** (2026-05-08) — Current, authoritative, PDF. ✓
5. **MDE Bilingual Education Standards** (2026-05-08) — Current, authoritative, PDF. ✓
6. **MDE Active Endorsements** (2026-05-08) — Current, live HTML page. ✓
7. **MDE Adding an Endorsement** (2026-05-08) — Current, live HTML page. ✓
8. **MDE PK-12 Standards** (2026-05-08) — Current, authoritative, PDF. ✓
9. **MDE Middle Grades/High School Standards** (2026-05-08) — Current, authoritative, PDF. ✓
10. **NCES Digest Table 204.20** (2026-05-08) — Current, authoritative, live table. ✓
11. **MDE Seal of Biliteracy page** (2026-05-08) — Current, live HTML page. ✓

**Assessment:** All sources are current and resolvable. No broken links or outdated guidance detected.

---

## Final Recommendations

1. **No changes required to `mi.json`** — The state record is accurate and complete.
2. **Consider future addition of elPercentHistory** — The proposed JSON structure above is ready for incorporation when the schema is extended.
3. **Optional historical enrichment** — The three suggested history events (Section 3) would deepen the audit trail but are not required for launch readiness.
4. **Status:** Approved for public launch.

---

## Metadata

- **Audit Date:** 2026-05-10
- **Auditor:** Claude Code Agent (worktree isolation)
- **Verification Type:** Full cross-state audit per Phase 2 protocol
- **Baseline Integrity:** No conflicts detected with verified-2019 seed paper data
- **Schema Compliance:** All fields pass Zod validation; no type or constraint issues
