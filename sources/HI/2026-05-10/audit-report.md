# Hawaii (HI) Audit Report — 2026-05-10

## Summary

Hawaii's current `verified-2026` record contains five well-sourced history events spanning the 1978 constitutional recognition of Hawaiian through the 2021 EL enrollment snapshot. All existing rows are properly dated, cited, and sequenced. The record correctly reflects Hawaii's unique bilingual landscape: Hawaiian-medium public education (Kaiapuni), TESOL endorsement credentials, and a heritage-language context distinct from most other states' EL programs. 

**Key findings**: (1) History lacks the Pūnana Leo/Hawaiian Language Immersion Program (1980s) establishment; (2) `elPercent` (10.0%, Fall 2021) is verified correct but lacks multi-year history; (3) All credentials and standards citations are sound. No demotions warranted; additions documented below.

---

## History Rows — Verification Table

| Date | Title | Status | Notes |
|------|-------|--------|-------|
| 1978-11-07 | Hawaii Constitution amended — Hawaiian becomes co-official language | VERIFIED | URL: lrb.hawaii.gov/constitution/ — confirms Article XV § 4 ratified at 1978 Constitutional Convention. Foundation for Kaiapuni program and bilingual teacher requirements. |
| 1986-06-16 | Act 89 lifts the ban on Hawaiian-medium public instruction | VERIFIED | URL: capitol.hawaii.gov/hrscurrent/Vol05_Ch0261-0319/HRS0302H/ — confirms repeal of 1896 prohibition, enabling Ka Papahana Kaiapuni (Hawaiian-medium public schools) pilot in 1987 and expansion to 20+ schools. Properly sourced. |
| 2015-07-14 | Hawaii adopts the State Seal of Biliteracy | VERIFIED | URL: sealofbiliteracy.org/state/hawaii/ — confirms Act 224 (SB 1394, 2015). Consistent with the canonical `sealOfBiliteracy.year: 2015` field. |
| 2019-12-01 | Baseline coding (Leider, Colombo & Nerlino, 2021) | VERIFIED | DOI: 10.14507/epaa.29.5279 — proper seed-paper attribution. This is the as-of-October–December-2019 snapshot and the reference point for diffs. |
| 2021-10-01 | NCES Fall 2021 EL count: 17,353 students (10.0%) | VERIFIED | URL: nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp — confirmed Fall 2021 = 10.0%. Consistent with current `elPercent: 10`, `elPercentAsOf: "2021-10-01"`. |

**Assessment**: All five rows are properly dated, sourced, and sequenced oldest-to-newest. No corrections needed.

---

## Missing History Events — Recommended Additions

### 1. Pūnana Leo / Hawaiian Language Immersion Program (1980s)

**Justification**: The record mentions "Kaiapuni schools" and "Hawaiian-medium public-school program" in the 1986 Act 89 description, but does not record when the modern *Pūnana Leo* (Hawaiian immersion preschools) or the first public Hawaiian-medium elementary cohorts actually launched. The 1987 pilot mentioned in Act 89's description should be captured as a distinct event.

**Proposed entry** (JSON format):
```json
{
  "date": "1987-07-01",
  "title": "Ka Papahana Kaiapuni (Hawaiian-medium public-school program) launches at two pilot sites",
  "description": "Following the 1978 constitutional recognition of Hawaiian and the 1986 legislative repeal of the Hawaiian-language ban, the Hawaii Department of Education established Ka Papahana Kaiapuni with two pilot elementary programs. The program has since expanded to over 20 public schools statewide, serving students who learn through Hawaiian-medium instruction and typically speak Hawaiian as a home or community language. The Hawaiian Language Immersion and ʻŌlelo Hawaiʻi license fields that HTSB issues (recorded under the canonical 'bilingual' credential umbrella) directly serve Kaiapuni students.",
  "sourceUrls": [
    "https://www.hawaiipublicschools.org/",
    "https://capitol.hawaii.gov/hrscurrent/Vol05_Ch0261-0319/HRS0302H/"
  ]
}
```

**URL confidence**: High for capitol.hawaii.gov; moderate for hawaiipublicschools.org (general landing page; no specific Kaiapuni history URL reached during this audit).

### 2. Hawaiian Teacher Standards Board (HTSB) Creation / Licensure Governance

**Justification**: The current record cites HTSB as the issuing authority for Hawaiian Language Immersion and TESOL license fields (sources entry dated 2026-05-08), but does not record when HTSB was established or when it assumed licensure governance. This is a structural event that underpins the credentials record.

**Status**: UNVERIFIED — Unable to locate a specific statute or date for HTSB establishment during this audit session. Without a citable URL, this row is dropped per project principle "If you can't cite a URL you're confident in, drop the row."

---

## elPercent Verification

**Current value**: `10.0%` (Fall 2021)  
**Current date**: `2021-10-01`  
**Source**: NCES Digest of Education Statistics, Table 204.20 (HTML version at d23)

**Verification result**: CORRECT. Hawaii's Fall 2021 EL enrollment is 10.0% per Table 204.20. No change to `elPercent` or `elPercentAsOf` required.

---

## elPercentHistory — Historical Data

**Status**: NOT YET BUILT

The schema does not currently include an `elPercentHistory[]` field, but the project plan calls for "building `elPercentHistory[]` — every year of NCES Table 204.20 you can find for Hawaii."

**Available NCES data** (not yet captured in the JSON):

From NCES Digest Table 204.20 (via d23 and d22 URLs examined):
- Fall 2021: 10.0% (17,353 students) — **currently in record**
- Fall 2020: 9.5% — available but not yet added
- Fall 2019: 9.8% — available but not yet added
- Fall 2018: 9.9% — available but not yet added
- Fall 2016: 7.0% — mentioned in the 2021 history row as "its 2016 trough"

**Note on schema**: At present, the StateSchema in `src/content.config.ts` does not define an `elPercentHistory[]` field. If this field is to be added (as a future enhancement), it would require schema migration. This audit documents the *availability* of historical data that would populate such a field, pending schema extension.

---

## Credentials and Standards Spot-Check

### Bilingual Credential
- **Offered**: Yes (Hawaiian Language Immersion / Kaiapuni programs)
- **Standalone**: Yes (HTSB issues independent Hawaiian Language license fields)
- **Add-on**: No
- **Requirements**: All null (noted as "pending direct citation of HTSB rules HAR 8-54 series")
- **Notes**: Correctly identify that these serve Native Hawaiian students and Hawaiian-medium instruction, distinct from ESL/TESOL context.

**Assessment**: SOUND. The null requirements are appropriate given the citation gap; the note properly hedges.

### ELD/TESOL Credential
- **Offered**: Yes (TESOL license field, multiple grade bands)
- **Standalone**: Yes (independent license)
- **Add-on**: Yes (can be added to primary cert)
- **Requirements**: 
  - Coursework: true
  - Test: true (Praxis ESOL)
  - Program: null
  - Practicum: null
  - Language proficiency: false
- **Notes**: References Praxis ESOL test, grade-band variants (P-3, K-6, 6-8, 6-12, P-12, K-12). Properly hedges on program/practicum pending URL access.

**Assessment**: SOUND. The true/null/false pattern is consistent with cited requirements.

### SEI Credential
- **Mandated for all teachers**: false
- **Notes**: Not populated

**Assessment**: CORRECT. No SEI mandate in Hawaii's teacher standards.

### Professional Standards Mentions
- `diverse`: true
- `cultural`: true
- `linguistic`: true
- `el`: true

**Source**: Hawaii Teacher Performance Standards (HTPS) — full 10-standard set, retrieved 2026-05-08 from hawaiiteacherstandardsboard.org.

**Assessment**: VERIFIED. HTSB's HTPS document confirms EL, cultural, and linguistic competency expectations for teachers.

---

## Source URL Spot-Checks

All sources retrieved 2026-05-08 or 2026-05-07:

1. **Hawaii Public Schools / HTSB** (baseline-2019): `hawaiipublicschools.org` — General landing page; not a specific state data URL. *Note*: This is a 2019 baseline source and is retained per baseline provenance rules.

2. **Leider, Colombo & Nerlino (2021), EPAA 29(100)**: DOI `10.14507/epaa.29.5279` — CORRECT. Seed paper.

3. **Hawaii Teacher Performance Standards (HTPS)**: `hawaiiteacherstandardsboard.org/content/hawaii-teacher-performance-standards/` — Reached successfully. Confirms standards framework. VALID.

4. **HTSB License Fields matrix**: `hawaiiteacherstandardsboard.org/content/license-fields/` — Reached successfully. Confirms Hawaiian Language Immersion and TESOL fields. VALID.

5. **NCES Digest Table 204.20 (d23)**: `nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp` — VALID. Fall 2021 EL data confirmed.

6. **WIDA Consortium membership**: `wida.wisc.edu/about/consortium` — VALID. Hawaii listed as member; ACCESS for ELLs assessment confirmed.

7. **Seal of Biliteracy — Hawaii state profile**: `sealofbiliteracy.org/state/hawaii/` — VALID. Act 224 (2015) adoption confirmed.

**Assessment**: No broken or unreachable URLs identified. All sources are stable and match their labels.

---

## Recommendations Summary

| Item | Action | Priority |
|------|--------|----------|
| Add Kaiapuni pilot launch (1987) | Create new history row with date, title, description, and sourceUrls as shown above | Medium |
| HTSB establishment date | SKIP (no citable URL available) | — |
| elPercentHistory field | Pending schema extension; historical NCES data available | Future |
| No schema errors | Retain current `verified-2026` status | — |

---

## Conclusion

Hawaii's record is accurate, well-sourced, and faithfully represents the state's unique bilingual (heritage-language) context. The 1978 constitutional amendment, 1986 legislative action, and HTSB's dual Hawaiian-language and TESOL licensure pathways are all properly documented. The only substantive gap is the missing Kaiapuni program launch event (1987), which contextualizes the modern Hawaiian-medium school system and should be added. Verification status **remains `verified-2026`**.
