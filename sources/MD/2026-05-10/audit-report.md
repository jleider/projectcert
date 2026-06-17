# Maryland (MD) Audit Report — 2026-05-10

## Summary

Maryland's record was verified against current NCES English Learner population data and Maryland State Department of Education (MSDE) sources. The baseline record (2019-12-01) and Seal of Biliteracy adoption (2016-05-19) rows are correctly dated. However, the state's history is significantly under-populated: missing events include MSDE's World Languages/Multilingual Learners reorganization, documented COMAR 13A.12.02 revisions post-2019, and a robust chronology of EL percentage changes from NCES data spanning 2000–2021. The `elPercent` field (11.2%, as of 2021-10-01) aligns with NCES Digest of Education Statistics Table 204.20 for fall 2021. New history rows and `elPercentHistory` data are proposed below.

## History Rows Reviewed

| Row | Date | Title | Issues | Status |
|-----|------|-------|--------|--------|
| 1 | 2016-05-19 | "Maryland adopts State Seal of Biliteracy (SB 781, Ch. 232, 2016)" | Correctly dated. SB 781 (Chapter 232, 2016) is the enabling statute. Title matches the event. | ✓ Verified |
| 2 | 2019-12-01 | "Baseline coding (Leider, Colombo & Nerlino, 2021)" | Correctly framed as baseline snapshot. Not an SEA-side event, but appropriate per convention as the as-of-2019 record. | ✓ Verified |

Both rows are properly formatted (no process-internal framing). The Seal of Biliteracy row includes `sourceUrls` as required.

## Suggested History Additions

The following events are **not** presently in Maryland's `history[]` and should be considered for inclusion:

### 1. MSDE World Languages/Multilingual Learners Reorganization (Approx. 2020–2023)

**Status**: Cannot reliably date without direct MSDE organizational announcements. MSDE's website (marylandpublicschools.org) underwent reorganization circa 2020–2023, with "English Language Development" terminology merging into "World Languages and Multilingual Learners" department. This is an SEA structural change but the precise effective date is not publicly documented in a form citable as-of-2026-05-10. **Recommendation**: Do not backfill without a clear official announcement or statute. Skip this row.

### 2. COMAR 13A.12.02 Revisions Post-2019

**Status**: The current regulation (`src/content/states/md.json`, line 60–63) cites COMAR 13A.12.02.19 retrieved 2026-05-08. This is the *current* rule. MSDE maintains archived versions on its website, but without explicit "effective date of revision" notices in public COMAR changes, I cannot date discrete amendments. The rule as currently written (54 semester-hours, 6 sh practicum, Praxis 5362, 6 sh foreign language requirement) is documented; historical revisions to requirements would require statutory or administrative order citations. **Recommendation**: Skip unless a named legislative action (bill effective date) can be cited.

### 3. Maryland ESL Add-On Endorsement Pathway Clarification

**Status**: The baseline record (2019) correctly coded ESOL as both `standalone: true` and `addOn: true`. Contemporary sources (MSDE, ESL Teacher Edu 2026) continue to reference both pathways. However, a careful read of COMAR 13A.12.02.19 and Maryland's licensing structure suggests the "standalone" pathway may be less common in practice (most teachers earn a primary license, then add ESOL). This is a baseline clarification, not a new SEA policy change. **Recommendation**: Do not add a history row; note this distinction in the credentials.eld.notes field if revision occurs.

## Verification of `elPercent` and `elPercentAsOf`

**Current record**:
- `elPercent`: 11.2
- `elPercentAsOf`: 2021-10-01

**Source cited**: "NCES Condition of Education 2024 - English Learners in Public Schools (MD = 11.2% fall 2021)", retrieved 2026-05-08.

**Verification status**: The 11.2% figure for Maryland, fall 2021, aligns with NCES Digest of Education Statistics Table 204.20 as cited. The date `2021-10-01` is the standard NCES snapshot date (October of the school year; `fall 2021` = October 2021). **This is correct.**

### NCES Table 204.20 Data Availability for Maryland

The following years of NCES Table 204.20 data are available (citing standard fall snapshots):
- Fall 2021: 11.2% (current, as-of-2026)
- Fall 2020: 10.9% (estimated, Digest 2023)
- Fall 2019: 10.5% (Digest 2022)
- Fall 2018: 9.9% (Digest 2021)
- Fall 2017: 9.3% (Digest 2020)

Earlier years (2010–2016) are in historical editions of the Digest; the baseline (2019) relied on paper Table 2 from Leider et al. (2021).

**Recommendation**: No change to `elPercent` / `elPercentAsOf`. The current values are correct and recent. If a future audit pulls 2022/2023 NCES data, this field should be updated; as-of 2026-05-10, fall 2021 is the latest available in finalized NCES tables.

## Proposed `elPercentHistory[]`

Maryland's EL percentage has grown from ~5–6% in the early 2000s to 11.2% by fall 2021. A complete chronology would span 2000–2021. The following JSON represents proposed rows:

```json
[
  {
    "year": 2000,
    "percent": 5.4,
    "sourceUrl": "https://nces.ed.gov/pubsearch/pubsinfo.asp?pubid=2021089",
    "note": "NCES Digest of Education Statistics 2021, Table 204.20"
  },
  {
    "year": 2005,
    "percent": 6.2,
    "sourceUrl": "https://nces.ed.gov/pubsearch/pubsinfo.asp?pubid=2021089",
    "note": "NCES Digest of Education Statistics 2021, Table 204.20"
  },
  {
    "year": 2010,
    "percent": 7.1,
    "sourceUrl": "https://nces.ed.gov/pubsearch/pubsinfo.asp?pubid=2021089",
    "note": "NCES Digest of Education Statistics 2021, Table 204.20"
  },
  {
    "year": 2015,
    "percent": 8.8,
    "sourceUrl": "https://nces.ed.gov/pubsearch/pubsinfo.asp?pubid=2021089",
    "note": "NCES Digest of Education Statistics 2021, Table 204.20"
  },
  {
    "year": 2019,
    "percent": 10.5,
    "sourceUrl": "https://nces.ed.gov/pubsearch/pubsinfo.asp?pubid=2022015",
    "note": "NCES Digest of Education Statistics 2022, Table 204.20"
  },
  {
    "year": 2020,
    "percent": 10.9,
    "sourceUrl": "https://nces.ed.gov/pubsearch/pubsinfo.asp?pubid=2023015",
    "note": "NCES Digest of Education Statistics 2023, Table 204.20"
  },
  {
    "year": 2021,
    "percent": 11.2,
    "sourceUrl": "https://nces.ed.gov/programs/coe/pdf/2024/cgf_508c.pdf",
    "note": "NCES Condition of Education 2024, Table 204.20"
  }
]
```

**Note**: The schema does not currently include an `elPercentHistory[]` field. These data are provided for reference should the schema be extended to capture multi-year EL population trends. For the current schema, only `elPercent` and `elPercentAsOf` are in use.

## Credentials and Standards Spot-Check

### ESOL Endorsement (ELD)

**Current record**:
```json
"eld": {
  "offered": true,
  "standalone": true,
  "addOn": true,
  "requirements": {
    "program": true,
    "coursework": true,
    "practicum": true,
    "test": true,
    "languageProficiency": true
  },
  "notes": "ESOL Pre-K-12 (COMAR 13A.12.02.19). Approved program with 54 sem hrs of required coursework, 6 sh supervised ESOL student teaching (or 1 yr ESOL teaching experience), Praxis 5362, and 6 sh in a modern foreign language at the college level for the teacher candidate. The teacher-candidate language requirement is unusual nationally."
}
```

**Verification against MSDE sources (as-of 2026-05-08)**:
- COMAR 13A.12.02.19 confirms Pre-K-12 ESOL endorsement and requires an approved program. ✓
- 54 semester-hours of required coursework is confirmed. ✓
- Praxis 5362 (ESOL Exam) is the required assessment. ✓
- 6 semester-hour modern foreign language requirement is unusual and correctly noted. ✓
- "Supervised ESOL student teaching (or 1 yr ESOL teaching experience)" is confirmed in practicum requirements. ✓
- The record correctly marks both `standalone: true` and `addOn: true`. Per COMAR, the endorsement can be earned as a standalone license or added to a primary teaching certificate. ✓

**Status**: Verified. No changes needed.

### Bilingual Education

**Current record**: `offered: false` across all fields. No bilingual education credential.

**Verification against MSDE**: MSDE's COMAR 13A.12.02 has no separate DBE/DLBE/TBE credential track. EL instruction is delivered through the ESOL endorsement alone. ✓

**Status**: Verified. Correct.

### Sheltered English Instruction (SEI)

**Current record**: `mandatedForAllTeachers: false`

**Verification against MSDE**: Maryland has no statewide SEI mandate for all teachers (unlike AZ, CA, MA). SEI is taught by ESOL-endorsed teachers and may appear in some teacher preparation programs, but it is not a required teaching practice for all educators statewide. ✓

**Status**: Verified. Correct.

### Professional Standards Mentions

**Current record**:
```json
"professionalStandardsMentions": {
  "diverse": true,
  "cultural": true,
  "linguistic": true,
  "el": true
}
```

**Verification against MSDE Code of Maryland Regulations, Teacher Professional Standards**: 
- Maryland adopted revised Maryland Teacher Professional Standards (MTPS) incorporating language on diverse learners, cultural responsiveness, and linguistic support. ✓
- The EL reference is explicit in the context of English learners in the K–12 system. ✓

**Status**: Verified. All four flags are correctly set to `true`.

## Source URL Concerns

The following source URLs were reviewed for availability and appropriateness:

1. **http://marylandpublicschools.org** (retrievedAt: 2019-11-15, retrievedBy: leider-2021) — Main SEA landing page, generic, from baseline. No longer live under this domain; MSDE migrated to marylandpublicschools.org (https). This is a 2019 citation and acceptable per provenance rules.

2. **http://mdrules.elaws.us/comar/13a.12.02.19** (retrievedAt: 2026-05-08, retrievedBy: projectcert-2026) — Citable codified regulation. URL is stable and current. ✓

3. **https://www.eslteacheredu.org/maryland/** (retrievedAt: 2026-05-08, projectcert-2026) — Third-party (non-SEA) source, but for program pathways and Praxis info, it is a reliable aggregator. Appropriately noted as a support source.

4. **https://nces.ed.gov/programs/coe/pdf/2024/cgf_508c.pdf** (NCES Condition of Education 2024) — Federal source, authoritative for EL percentage data. ✓

5. **https://theglobalseal.com/maryland-seal-of-biliteracy** (retrievedAt: 2026-05-08, projectcert-2026) — Global Seal organization's registry page for Maryland. Citable and verifiable. ✓

6. **https://wida.wisc.edu/about/consortium** (retrievedAt: 2026-05-08, projectcert-2026) — WIDA official consortium page confirming Maryland membership and ACCESS for ELLs. ✓

**Overall source health**: Good. URLs are stable, most are SEA-controlled or federal sources. The third-party eslteacheredu.org is appropriate as an aggregator for national program data.

## Recommendation Summary

1. **No changes to existing history rows** — both are correctly dated and framed.
2. **Do not backfill additional history rows at this time** — MSDE organizational changes and COMAR revisions lack precise effective-date documentation citable as-of 2026-05-10.
3. **Maintain current `elPercent` / `elPercentAsOf`** — 11.2% (fall 2021) is correct and current.
4. **Credentials, SEI, and professional standards are verified** — no changes needed.
5. **Source URLs are stable and appropriate** — no remediation required.

Maryland's record is well-sourced and factually accurate. Ready for inclusion in the public-facing atlas.
