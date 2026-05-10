# Ohio (OH) Audit Report — 2026-05-10

## Summary

Ohio's record is marked `verified-2026` with `lastVerified: 2026-05-08`. The verification includes recent sources from ODEW (formerly Ohio Department of Education), but the audit reveals one meta-process violation in the history array, one broken external source, and gaps in historical data capture. The ODE → ODEW reorganization (HB 33, signed 2023-07-04) is correctly documented as a policy event.

---

## Detailed Findings

### 1. History Array Issues

#### Meta-Process Violation: "Baseline coding" Row (Line 121–127)

The history entry with date `2019-12-01` and title "Baseline coding (Leider, Colombo & Nerlino, 2021)" violates the skill's forbidden patterns. Per state-source-refresh/SKILL.md:

> **Forbidden**: "Baseline coding", "Phase 2 verification", "Re-verified against current X sources", and any other framing that describes the catalog's QA workflow rather than an SEA-side event.

This row describes the audit process itself, not a substantive Ohio policy change. It should be removed or archived to `changes-from-baseline.md` instead.

#### ODE → ODEW Reorganization (Line 129–135)

The row documenting HB 33 (FY24-25 biennial budget, signed 2023-07-04) is **correctly structured**:
- Date is the enactment date, not the retrieval date.
- Title and description are in third-person, academic voice.
- Correctly notes "Structural change only; EL-related teacher credentialing requirements were not altered."

---

### 2. Broken Source URL

**Source entry (lines 85–89)** references:
```
https://www.southernohioesc.org/wp-content/uploads/sites/13/2020/09/Qualification-for-Teachers-Providing-Language-Instruction-Educational-Programs-for-English-Learners.pdf
```

This URL is flagged as 404 by the external link checker. The label calls it "Aug 2019 guidance, current canonical summary of TESOL/Bilingual licensure pathways" — but it is hosted on a third-party Educational Service Center, not on the official ODEW domain. 

**Status**: This source should be replaced with an equivalent official ODEW document, or removed if no equivalent exists. The credential information cited in the record (bilingual and TESOL requirements) appears well-grounded in the other ODEW sources (lines 73–76, 79–82), so removal may not break provenance for the main claims.

---

### 3. EL Percent Data

**Current record**:
- `elPercent: 3.8`
- `elPercentAsOf: "2021-10-01"`
- Source: NCES Digest 2023, Table 204.20

The NCES Table 204.20 was retrieved 2026-05-08 per source line 103–106. The value 3.8% aligns with Fall 2021 enrollment for Ohio published in the Digest of Education Statistics 2023 edition. This is current and appropriately cited.

**EL Percent History**: The record does not include an `elPercentHistory[]` array. Per the audit instructions, this should be built by pulling multiple years of NCES Table 204.20 data. This is a data-completeness gap, not an error — it requires a separate data-collection pass.

---

### 4. Professional Standards Mentions

The four booleans in `professionalStandardsMentions` (diverse, cultural, linguistic, el) are all `true`:
- Source: Ohio Standards for the Teaching Profession (retrieved 2026-05-08, source line 91–94).

No verification of the PDF content was performed during this audit — the retrieval date is recent, and the entry carries proper provenance. Spot-check: A quick search of the Ohio Department of Education website confirms the Ohio Standards for the Teaching Profession are the canonical state teaching standards document.

---

### 5. Seal of Biliteracy

**Current record**:
- `adopted: true`
- `year: 2017`
- Source: sealofbiliteracy.org

**History row (line 113–119)** documents the authorization:
- Date: 2016-06-14 (Substitute SB 3, 131st GA, 2016)
- Correctly states adoption in 2017–18 academic year, with note that sealofbiliteracy.org records 2017-03-16.

The data is consistent. No issues detected.

---

### 6. Credentials (Bilingual, ELD/TESOL, SEI)

All credential blocks include proper requirements metadata and notes explaining pathways:

- **Bilingual**: standalone + add-on routes, program-required, no test, supplemental license available
- **ELD/TESOL**: standalone + add-on routes, program-required, test required (OAE), supplemental route available
- **SEI**: not mandated for all teachers (mandatedForAllTeachers: false)

The notes are detailed and source-grounded. No discrepancies detected during spot-check against ODEW sources.

---

### 7. ELP Assessment

**Current record**:
- `name: "OELPA"`
- `consortium: "ELPA21"`
- Source URL: education.ohio.gov/Topics/Testing/Ohio-English-Language-Proficiency-Assessment-OELPA/...

The assessment designation and consortium are current per the May 2026 ODEW page retrieval. No drift detected.

---

## ODE → ODEW Transition Context

Ohio's reorganization under HB 33 (signed July 4, 2023) renamed the Ohio Department of Education to the Ohio Department of Education and Workforce. The education.ohio.gov domain continues to resolve, and ODEW banner headers appear on current pages. All three 2026-05-08 source retrievals reference education.ohio.gov and properly attributed the agency as "Ohio Department of Education and Workforce."

**Impact on data**: Structural change only. No EL credentialing requirements were altered by the reorganization. The transition is already documented in the history array and should be preserved.

---

## Action Items

1. **Remove or demote** the "Baseline coding" history row (2019-12-01 entry). It is a meta-process violation per the skill guide. Archive its context to `sources/oh/2026-05-10/changes-from-baseline.md` if needed for internal tracking.

2. **Replace or remove** the broken Southern Ohio ESC PDF URL (source line 86). Search ODEW for an equivalent official guidance document on TESOL/Bilingual licensure pathways. If no equivalent exists on ODEW, remove the source entry and verify that the remaining sources (lines 73–82) are sufficient to ground the credential requirements.

3. **Build elPercentHistory[]** (future pass): Collect NCES Table 204.20 data for multiple years (d23, d22, d21, d20, d19 covering 2000–2021+) and append to the record with citable URLs per row.

4. **Verify Seal of Biliteracy adoption year**: The CLAUDE.md notes that the Seal was adopted in 2017 but codified under 2014 HB 487. Cross-check whether the 2016 Substitute SB 3 reference is complete or whether HB 487 was the original statute.

---

## Verification Status

**Current**: `verified-2026` (2026-05-08)

**Recommended post-cleanup**: `verified-2026` (after removing meta-process row and replacing broken source)

**Data freshness**: Sources are current as of 2026-05-08. No stale references detected.
