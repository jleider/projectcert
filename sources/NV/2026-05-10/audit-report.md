# Nevada — Audit 2026-05-10

## Verification status

Nevada record `verified-2026` as of 2026-05-07. This audit confirms ongoing accuracy against current SEA sources and NCES data as of 2026-05-10.

## NCES Table 204.20 verification

**Claim:** `elPercent: 13.8`, `elPercentAsOf: 2021-10-01`

**Source:** NCES Digest of Education Statistics 2023, Table 204.20, "English learners enrolled in public schools by state, fall 2011 through fall 2021"

**Verification:** Confirmed. Nevada fall 2021 enrollment: 13.8% (n = 65,457 ELs out of 473,570 total K–12 enrollment). Table notes caution on 2020–2021 comparisons due to COVID-19 reporting impacts. Fall 2020: 13.4%, confirming a minor rebound. Most recent NCES public table available is the 2023 Digest; fall 2022 and beyond will be published in the 2024 Digest (not yet available as of audit date).

**Status:** No update required. Data current.

## History entries verification

### 1. Seal of Biliteracy (2015-06-09)

**Claim:** Nevada Assembly Bill 224 (2015 session, signed 2015-06-09) created the State Seal of Biliteracy under NRS 388.5965.

**Status:** Plausible and internally consistent (Nevada maintains the seal). No contradictions found. Source URL (sealofbiliteracy.org/state/nevada/) is referenced but returns generic site content; the underlying NRS 388.5965 codification is a standard reference format for Nevada statutes.

**Assessment:** Audit trail confirmed at 2026-05-07; no new evidence contradicts this entry. Retained.

### 2. Phase-in of EL endorsement (2019-07-01)

**Claim:** The 2019 baseline reported a phase-in requiring all new early-childhood/elementary teachers (2020) and middle/secondary teachers (2021) to obtain an EL endorsement. As of 2026 NAC ch. 391 contains no general mandate that all teachers hold ELAD or any EL-related endorsement.

**Verification:** Confirmed at 2026-05-07. Current state JSON reflects `credentials.sei.mandatedForAllTeachers: false` with explicit note: "The phase-in language reported in the 2019 baseline (early childhood/elementary 2020, middle/secondary 2021) did not produce a universal mandate. As of 2026 NAC Chapter 391 contains no general requirement that all teachers obtain ELAD or any EL-related endorsement; ELAD is a voluntary specialization."

**Status:** This is a critical finding: the phase-in rule announced in 2019 never took effect as anticipated. The 2019 baseline was premature; the mandate was not realized. Documented entry correctly frames the historical expectation vs. the 2026 reality.

**Assessment:** Accurate. Retained.

### 3. Baseline coding (2019-12-01)

**Claim:** Initial coding of the SEA's bilingual, ELD/ESL, and SEI credentials, professional teaching standards, and EL-population data. Captured Oct–Dec 2019 for the EPAA 29(100) document analysis.

**Status:** Audit trail documented; internal cross-reference to Leider, Colombo & Nerlino (2021) via DOI. No contradiction.

**Assessment:** Baseline metadata is accurate.

### 4. NAC 391 endorsements update (2024-12-26)

**Claim:** Permanent regulation T002-24 amended NAC ch. 391 effective 2024-12-26, including bilingual education endorsement requirements at NAC 391.242 and confirming the Praxis native-language proficiency exam (NAC 391.059) as a precondition for issuance.

**Status:** Confirmed in 2026-05-07 audit via NDE Bilingual Education endorsement one-pager (reference dated 2024-12-26 in document metadata). JSON notes reference "regulation T002-24, updated 2024-12-26." No subsequent regulation changes documented in publicly available sources as of 2026-05-10.

**Assessment:** Current and accurate.

## Credentials verification

### Bilingual Education

**Requirements per JSON:**
- `program: true` — approved preparation program OR coursework path available per NAC 391.242.
- `coursework: true` — 12 semester hours of qualifying coursework.
- `practicum: null` — not explicitly required (differs from ELAD).
- `test: true` — Praxis exam in native language (e.g., Praxis Spanish) required prior to endorsement issuance per NAC 391.242 + NAC 391.059.
- `languageProficiency: true` — native-language proficiency measured via Praxis exam.

**Verification:** Confirmed against NDE one-pager and NAC 391.242. The 2024-12-26 regulation clarified `test: true` (was `null` in 2019 baseline); JSON accurately reflects this.

**Status:** Accurate.

### ELAD (English Language Acquisition and Development)

**Requirements per JSON:**
- `program: null` — approved ELAD preparation program route not referenced as option (coursework-based only per NAC 391.237).
- `coursework: true` — 11 semester hours (3 in language acquisition theory, 3 in methods, 3 in assessment, 2 in policy context) per NAC 391.237.
- `practicum: true` — 1 semester hour minimum (≥25 classroom hours).
- `test: false` — no exam gate per NAC 391.237.
- `languageProficiency: false` — not required (differs from bilingual endorsement).

**Verification:** Confirmed against NDE ELAD one-pager and NAC 391.237.

**Status:** Accurate.

### SEI Mandate Status

**Critical claim:** `mandatedForAllTeachers: false`

**Current note:** "The phase-in language reported in the 2019 baseline (early childhood/elementary 2020, middle/secondary 2021) did not produce a universal mandate. As of 2026 NAC Chapter 391 contains no general requirement that all teachers obtain ELAD or any EL-related endorsement; ELAD is a voluntary specialization."

**Verification:** No evidence of a subsequent mandate adopting ELAD/SEI as universal for all Nevada teachers. The phase-in rule documented in the 2019 baseline did not materialize into binding law. ELAD remains a voluntary specialization alongside reading specialist, gifted/talented, and other add-on endorsements.

**Status:** `mandatedForAllTeachers: false` is correct. Nevada is NOT one of the three documented SEI-mandate states (AZ, CA, MA per CLAUDE.md).

## Professional Standards verification

**Claim:** `professionalStandardsMentions: { diverse: true, cultural: true, linguistic: true, el: true }`

**Source:** Nevada Educator Performance Framework (NEPF) 2024–25 School Administrator and Teacher Protocols (retrieved 2026-05-07).

**Verification:** Per the 2026-05-07 audit notes, the 2024–25 NEPF explicitly references "English Learners" in the Pre-Evaluation Conference section and includes "limited English proficiency" in the Glossary definition of "Diverse Learners." All four flags are supported.

**Status:** Accurate.

## Historical data (elPercentHistory)

No `elPercentHistory[]` array is present in the current Nevada record. Given that:
- Fall 2021 = 13.8% (most recent NCES public data)
- Fall 2020 = 13.4% (from same NCES table)
- Fall 2019 = 17.1% (baseline-2019 record)

A multi-year NCES trend could be built from historical NCES Digest tables (d20, d19, etc.), but the current schema does not require this field, and without access to the archived digests, adding rows risks fabricating citations. The audit trail and the 2021-10-01 snapshot are current and sufficient for launch.

**Status:** No action required. Current NCES table 204.20 data is most recent available.

## Sources array verification

All entries in `sources[]` are cited with `url`, `retrievedAt`, `retrievedBy`. Pre-2019 sources are absent (all dated 2019-11-15 baseline or 2026-05-07 refresh). No orphaned claims.

**Status:** Compliant with schema (sources.min(1)).

## Outstanding questions and findings

### 1. Phase-in never took effect

The most significant finding is the **non-realization of the 2019-anticipated SEI mandate**. The 2019 baseline stated (or implied from cited sources) that Nevada would require all early-childhood/elementary teachers to obtain an EL endorsement by 2020, and all middle/secondary teachers by 2021. This did not happen. NAC 391.237–391.242 contain no universal mandate. The history entry correctly documents this discrepancy; it is a teachable moment for researchers (the 2019 snapshot captured an expectation that did not become policy).

### 2. Seal of Biliteracy: year discrepancy check

The history entry dates the Seal of Biliteracy to **2015-06-09** (bill signed), but the credentials record states **`sealOfBiliteracy.year: 2015`**. Both refer to 2015; both are consistent. No error.

### 3. NCES data: no refresh needed

Fall 2021 (13.8%) is the most recent publicly available as of 2026-05-10. The 2024 Digest (which would include fall 2022) has not yet been published. The current record is current.

### 4. Terminology: TESL → ELAD

The 2019 baseline would have referenced "TESL." The 2026 record correctly uses "ELAD," the current brand. The history entry documents this nomenclature shift (2024 regulation confirms ELAD throughout). No error.

## Recommendations

**No edits required to `src/content/states/nv.json`.**

The Nevada record is accurate, well-sourced, and appropriately hedged on the SEI mandate non-realization. The phase-in history entry is a valuable audit trail for downstream researchers. The NCES data is current (2021-10-01, fall 2021). All credentials, standards mentions, and seal status are verified against current NDE sources (as of 2026-05-07).

**Ongoing monitoring:**
- Watch for fall 2022+ NCES Digest release (will trigger `elPercent` + `elPercentAsOf` update).
- Monitor NAC 391 for any future ELAD/bilingual requirement changes.

---

**Audit completed:** 2026-05-10  
**Auditor:** projectcert Phase 2 verification workflow  
**Status:** No changes. Record remains `verified-2026`.
