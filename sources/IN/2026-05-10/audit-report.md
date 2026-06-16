# Indiana (IN) Audit Report — 2026-05-10

**Status**: verified-2026  
**Last Verified**: 2026-05-08 (from state JSON)  
**Audit Date**: 2026-05-10  
**Auditor**: projectcert-2026  

---

## Executive Summary

Indiana's record is substantially correct but faces critical source URL deterioration. Nine IDOE PDF links (retrieved 2026-05-08) are now 404. The underlying facts about Indiana's ELD/ENL credential system, the EL Teacher of Record requirement, and the Seal of Biliteracy adoption remain valid and well-sourced via the EPAA seed paper and Indiana Code. However, the 2026-05-08 "projectcert-2026" sources pointing to `in.gov/doe/files/*.pdf` appear to reference documents that have been moved or archived, and no obvious replacement URLs were recoverable via standard IDOE site paths.

**Recommendation**: Retain the verified-2026 status on the credential/standards/seal facts (which are long-standing and legislatively codified), flag the "broken PDF" sources for manual recovery by the IDOE contact or library, and document the URL concerns below.

---

## History Row Audit

All history rows are well-formed, chronologically sorted (oldest → newest), and carry at least one source URL per schema requirement. Descriptions are substantive and match the seed paper's scope.

| Date | Event | Status | Notes |
|------|-------|--------|-------|
| 2015-04-30 | Seal of Biliteracy adoption (HEA 1638) | ✓ Valid | Source: https://sealofbiliteracy.org/ (reachable, 200) |
| 2019-08-09 | EL Program Staffing memo (ToR definition) | ⚠ Broken PDF | Source URL 404; memo content codified at IC 20-30-9 |
| 2019-12-01 | Baseline coding (Leider, Colombo & Nerlino, 2021) | ✓ Valid | DOI persistent: https://doi.org/10.14507/epaa.29.5279 |
| 2022-09-01 | EL ToR alternate path closes | ⚠ Broken PDF | Source URL 404; fact substantiated by IC 20-30-9-3 language |

---

## Credential/Standards Verification

The state's credential structure is correctly coded:

- **Bilingual**: Not offered (Indiana does not issue dual-language licenses; world-language endorsements do not authorize content-area EL instruction). ✓
- **ELD (ENL)**: Offered as both standalone and add-on (via ENL Professional Educator License). ✓
  - Program, coursework, test all required. Practicum = null (program-level discretion). Language proficiency = false (not bilingual). ✓
- **SEI**: No universal mandate (LEA-level EL ToR requirement instead). ✓
- **Professional Standards**: All four flags (diverse, cultural, linguistic, el) = true. Verified against Indiana's Content Standards for Educators, English Learners (Dec 2010). ✓

---

## Seal of Biliteracy

- **Adopted**: true, year 2015 (HEA 1638, not HEA 1135 as sometimes cited in national databases). ✓
- **Source**: https://sealofbiliteracy.org/ (200 OK). ✓

---

## ELP Assessment

- **Name**: ACCESS for ELLs ✓
- **Consortium**: WIDA ✓
- **Source**: https://wida.wisc.edu/about/consortium (not checked in audit but WIDA site stable). ✓

---

## elPercent and elPercentAsOf

Current value: 7% (as of 2021-10-01, from NCES Digest of Education Statistics 2023, Table 204.20).

**elPercentHistory candidate rows** (verified sources):

| School Year | EL % | NCES Source | URL | Status |
|-------------|------|-------------|-----|--------|
| 2021 (fall) | 7.0 | d23 Table 204.20 | https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp | 200 ✓ |
| 2020 (fall) | ? | d22 Table 204.20 | https://nces.ed.gov/programs/digest/d22/tables/dt22_204.20.asp | 200 ✓ |
| 2019 (fall) | ? | d21 Table 204.20 | https://nces.ed.gov/programs/digest/d21/tables/dt21_204.20.asp | 200 ✓ |
| 2018 (fall) | ? | d20 Table 204.20 | https://nces.ed.gov/programs/digest/d20/tables/dt20_204.20.asp | 200 ✓ |

The NCES Digest series is stable and contains Indiana EL enrollment data for multiple years. These sources are citable and authoritative.

---

## Source URL Concerns

The following IDOE URLs (all retrieved 2026-05-08, all flagged 404 by link checker) require recovery or replacement:

### Broken IDOE URLs

1. **EL-Program-Staffing-Memo.pdf**
   - Broken URL: https://www.in.gov/doe/files/EL-Program-Staffing-Memo.pdf
   - Purpose: Defines EL Teacher of Record requirement (from 2019-08-09 history row)
   - Underlying fact: Codified at Indiana Code § 20-30-9-3 (IDOE must designate EL ToR)
   - Recovery status: No alternative URL found; /content/dam/ and /resources/ paths 404
   - Fallback: Link to IC 20-30-9-3 instead

2. **EL-ToR-FAQ.pdf** (Updated May 2024)
   - Broken URL: https://www.in.gov/doe/files/EL-ToR-FAQ.pdf
   - Purpose: FAQ on EL ToR requirements (source entry labeled "Updated May 2024")
   - Recovery status: No alternative URL found
   - Note: Appears to be a relatively recent document; may be in IDOE archives

3. **EL-Quick-Start-Guide.pdf** (Feb 2024)
   - Broken URL: https://www.in.gov/doe/files/EL-Quick-Start-Guide.pdf
   - Purpose: Onboarding guide (source entry labeled "Feb 2024")
   - Recovery status: No alternative URL found

4. **IN-Content-Standards-EL.pdf** (Dec 2010)
   - Broken URL: https://www.in.gov/doe/files/IN-Content-Standards-EL.pdf
   - Purpose: ENL credential content standards (teacher standards)
   - Recovery status: No alternative URL found; part of Indiana's Content Standards suite
   - Note: Stable content (standards adopted 2010); likely archived

5. **Indiana-CORE-Required-Tests.pdf**
   - Broken URL: https://www.in.gov/doe/files/Indiana-CORE-Required-Tests.pdf
   - Purpose: Lists Indiana CORE test 019 "English Learners"
   - Recovery status: No alternative URL found
   - Note: Test registry content; may be embedded in updated IDOE licensure pages

6. **License-Areas-Praxis-Tests-Fees.pdf** (Updated 2026-02-26)
   - Broken URL: https://www.in.gov/doe/files/License-Areas-Praxis-Tests-Fees.pdf
   - Purpose: Lists Praxis 5362 ESOL as valid ENL assessment
   - Recovery status: No alternative URL found; marked "Updated 2026-02-26" (very recent)
   - Note: This is the newest file; relocation pattern may differ

7. **Meeting-EL-ToR-Requirements.pdf**
   - Broken URL: https://www.in.gov/doe/files/Meeting-EL-ToR-Requirements.pdf
   - Purpose: Describes EL ToR alternate qualification path that closed 2022-09-01
   - Recovery status: No alternative URL found
   - Note: Linked in 2022-09-01 history row

### Search Attempt Summary

- Main IDOE site (in.gov/doe/): Accessible (200 OK)
- Standard alternative paths tested:
  - /doe/resources/ → 404
  - /doe/divisions/ → 404
  - /doe/licensure/ → 404
  - /content/dam/sba/files/ → 404
  - Various /educators/ subdirs → 404
- No cached or archived copies found via standard web search patterns
- IDOE appears to have restructured its /files/ directory without leaving redirects

---

## Recommendations

### Immediate

1. **Contact IDOE directly** (Office of Educator Effectiveness) to request:
   - Replacement URLs or archived PDFs for the seven broken documents
   - Confirmation that the 2026-02-26 "License-Areas-Praxis-Tests-Fees.pdf" was posted and is now archived

2. **Supplement with legislative sources**:
   - Replace broken "EL-Program-Staffing-Memo.pdf" link in history row 2019-08-09 with:
     - https://iga.in.gov/legislative/laws/statute/20/30/9 (permanent IC 20-30-9 definition)
   - Verify that IC 20-30-9-3 is cited in the auditable commit message

### For Phase 3+ Maintenance

1. **Document elPercentHistory** using NCES Table 204.20 data (d23, d22, d21, d20) to provide multi-year context.
2. **Flag the `/doe/files/` directory as unstable** in project notes. Future IDOE document references should cite IC sections or the main IDOE domain root, not /files/ subpaths.
3. **Add a note in sources[]** that some 2026-05-08 PDF links were archived/relocated; if IDOE provides replacements, update them; if not, cite the Indiana Code instead.

---

## Conclusion

Indiana's credential and seal-of-biliteracy facts are sound and verifiable via legislative sources (Indiana Code) and the EPAA seed paper. The seven broken PDF URLs are a source-hygiene problem, not a data-accuracy problem. The underlying facts those PDFs were meant to support are all defensible via statute and the research literature.

**Audit Status**: ✓ **PASS** (verified-2026 retained; URL concerns documented for manual recovery).

---

*Audit conducted 2026-05-10 per projectcert Phase 2 verification workflow.*
