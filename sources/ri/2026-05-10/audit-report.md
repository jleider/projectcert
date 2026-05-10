# Audit Report: Rhode Island (RI) — 2026-05-10

**State:** Rhode Island (RI)  
**Audit Date:** 2026-05-10  
**Verification Status:** verified-2026  
**Last Verified:** 2026-05-08

---

## Summary

Rhode Island's state record is substantially complete and well-sourced. Core credentials, standards, and EL-population data have been re-verified against current RIDE sources (2026-05-08). One historical event (the 2019-12-01 "Baseline coding" row) is flagged as a meta-process violation per project guidance and should be removed. EL-percent data is current (fall 2021, NCES Table 204.20). No missing statute citations or recent RIDE policy changes have been identified beyond those already recorded in the June 2025 Certification Regulations.

---

## History Array Verification

### 2016-06-17: Seal of Biliteracy adoption
- **Status:** Valid
- **Date:** Correct (2016-06-17)
- **Source:** sealofbiliteracy.org/state/ri/
- **Substance:** RI Board of Education adopted a State Seal of Biliteracy; awarded to graduating high school students demonstrating proficiency in English and one or more additional languages.
- **Notes:** Properly sourced and dated. No changes detected.

### 2019-12-01: Baseline coding (Leider, Colombo & Nerlino, 2021)
- **Status:** Meta-process violation
- **Issue:** Per CLAUDE.md guidance, dated events in `history[]` should record substantive policy moments, not methodological metadata. The "Baseline coding" entry documents the data-collection process, not a state action or policy change.
- **Recommendation:** Remove this row. If a reference to the 2019 baseline snapshot is needed, it belongs in site documentation or commit messages, not in the public history array.

### 2025-06-01: RIDE Certification Regulations (June 2025) finalized
- **Status:** Mostly valid; source URL needs refinement
- **Current Source:** https://www.ride.ri.gov (overly broad)
- **Recommended Source:** https://ride.ri.gov/sites/g/files/xkgbur806/files/2025-06/Certification-Regulations-2025.pdf
- **Substance:** RIDE issued the Regulations Governing the Certification of Educators in Rhode Island (June 2025). Sections 1.9.X.D.2.b and 1.9.5.S.2.a explicitly require approved-program completion for Bilingual/DLE and All Grades ESOL certificates. Effective 2025-07-01, ACTFL OPI+WPT at Advanced Low replaced certain language-specific exams for world languages in Bilingual Education.
- **Verification:** Confirmed in RIDE Certification-Regulations-2025.pdf (retrieved 2026-05-08).

---

## EL-Population Data

### Current Record
- **elPercent:** 12.5
- **elPercentAsOf:** 2021-10-01
- **Source:** NCES Digest of Education Statistics 2023, Table 204.20 (fall 2021 data)

### Re-Verification
- NCES Table 204.20 (Table 204.20 — English learners enrolled in public schools by state, fall 2021) confirms Rhode Island: 17,289 ELs / 12.5% of total enrollment.
- NCES COE narrative flags RI as the largest positive percentage-point change in EL representation nationwide from fall 2011 to fall 2021.
- Date (2021-10-01) aligns with NCES fall 2021 collection window.
- **Status:** Current and accurate.

### EL-Percent History Opportunity
The current record lacks an `elPercentHistory` array spanning 2000–2021 NCES Table 204.20 data. NCES Digest archives (d23, d22, d21, d20, d19) would support construction of a complete time series, but retrieval and curation are deferred pending orchestrator guidance on whether this enhancement is in scope for the current audit batch.

---

## Credential Verification

### Bilingual Education
- **Offered:** true | **Standalone:** true | **Add-on:** true
- **Current Record:** Six grade-band certificates (PK-3, K-6, 5-8, 6-12, PK-12) per RIGL 16-54 and RIDE Certification Regulations §1.9.1–1.9.5.
- **Requirements Accuracy:**
  - program: true (approved program required §1.9.X.D.2.b) ✓
  - coursework: true (implicit in approved program) ✓
  - practicum: true (45 hours §1.9.X.D.2.e) ✓
  - test: true (Praxis 5362 ESOL 155 + language-specific: Spanish 5195/168, French 5174/162, Mandarin 5665/164, ASL 0634/170, Latin 5601/161, German 5183/163; effective 2025-07-01, ACTFL OPI+WPT Advanced Low for all others) ✓
  - languageProficiency: true (demonstrated proficiency in first and second languages) ✓
- **Prerequisite Note:** Bilingual functions as add-on; holders must hold matching-grade-band base certificate. Notes field correctly documents this.
- **Status:** Accurate and current (June 2025 Regulations).

### English Language Development (ESOL)
- **Offered:** true | **Standalone:** true | **Add-on:** true
- **Standalone:** All Grades PK-12 ESOL certificate §1.9.5.S requires approved program, bachelor's, practical residency (1 year equivalent), 60 hours field experience, 45-hour practicum, Praxis 5362 ESOL 155.
- **Add-on:** MLL Endorsement available to any certificate holder via approved provider (Brown, ExcEL, RIC, RISPE, Roger Williams, URI, RI Federation of Teachers); MLL Integrated Content Teacher grade-band variants (§§1.9.X.C) via coursework (second-language acquisition, linguistics, socio-cultural studies, content-based instruction, oracy/literacy).
- **Requirements Accuracy:**
  - program: true ✓
  - coursework: true ✓
  - practicum: true (45 hours ESOL; MLL has no formal practicum requirement) — recorded as true; MLL variants have implicit coursework but not separate practicum. This is defensible.
  - test: true (Praxis 5362 ESOL 155) ✓
  - languageProficiency: false (ESOL is English-language-teaching, not bilingual) ✓
- **Status:** Accurate; MLL Endorsement pathway correctly modeled as add-on to any existing certificate.

### Sheltered English Instruction (SEI)
- **mandatedForAllTeachers:** false
- **Notes:** RI uses content-based instruction (CBI) terminology; no statewide SEI mandate. EL preparation only through Bilingual/DL, ESOL, MLL Endorsement, or MLL Integrated Content.
- **Verification:** RIDE MLL/EL landing page and Certification Regulations reviewed (2026-05-08) — no SEI mandate found.
- **Status:** Accurate.

---

## Professional Standards

### Rhode Island Professional Teaching Standards (RIPTS)
- **Adoption Date:** October 2007 (still active)
- **Source:** https://ride.ri.gov/sites/g/files/xkgbur806/files/Portals/0/Uploads/Documents/Teachers-and-Administrators-Excellent-Educators/Educator-Certification/Cert-main-page/RIPTS-with-preamble.pdf
- **Preamble:** Explicitly names English Language Learners
- **Standard 4:** Descriptors name cultural background, native language, English language acquisition
- **Recorded Boolean Flags:**
  - diverse: true (Standard 4 cultural background) ✓
  - cultural: true (Standard 4 cultural background) ✓
  - linguistic: true (Standard 4 native language, English language acquisition) ✓
  - el: true (Preamble explicitly names ELLs) ✓
- **Status:** All flags correctly set; standard is current and accessible.

---

## Seal of Biliteracy

- **Adopted:** true
- **Year:** 2016
- **Source:** sealofbiliteracy.org
- **Date Verification:** RI Board of Education adopted standards including Seal of Biliteracy on 2016-06-17 per sealofbiliteracy.org/state/ri/
- **Status:** Correct; aligns with history event.

---

## ELP Assessment

- **Name:** ACCESS for ELLs
- **Consortium:** WIDA
- **Source:** https://wida.wisc.edu/about/consortium
- **Verification:** RIDE MLL/EL landing page confirms WIDA ACCESS for ELLs as the statewide ELP assessment.
- **Status:** Accurate and current.

---

## Sources Array

All eight sources have been spot-checked for URL validity and label accuracy:

1. **leider-2021 (2019-11-15):** General RIDE homepage — valid
2. **leider-2021 (2019-11-15):** EPAA 29(100) DOI link — valid
3. **projectcert-2026 (2026-05-08):** RIDE MLL/EL landing page — retrieved, current
4. **projectcert-2026 (2026-05-08):** RIDE Certificate Areas & Requirements — retrieved, current
5. **projectcert-2026 (2026-05-08):** RIDE Certification Regulations (June 2025) PDF — retrieved, current
6. **projectcert-2026 (2026-05-08):** RIPTS with preamble PDF — retrieved, current
7. **projectcert-2026 (2026-05-08):** sealofbiliteracy.org/state/ri/ — retrieved, current
8. **projectcert-2026 (2026-05-08):** NCES Digest Table 204.20 — retrieved, current

All sources carry `retrievedAt` + `retrievedBy` metadata and conform to schema.

---

## No Changes Detected

### Baseline 2019 vs. 2026
No substantive policy changes to credentials, standards, or EL-population percentages since the 2019 baseline. The June 2025 Certification Regulations formalize requirements already in place; the ACTFL OPI+WPT adoption for world languages is a **procedural refinement** (alternative pathway for less-common languages), not a scope reduction or credentialing shift.

### Missing Post-2019 Events Checked
- **RI General Laws (RIGL) 16-54 (Bilingual Education / EL):** No recent amendments identified beyond June 2025 Regulations entry.
- **RIDE Rule Changes (200-RICR-20-30-1, ESL Specialist):** Subsumed under Bilingual/ESOL certificates; no independent administrative code changes detected.
- **Multilingual Learner Office Reorganization:** RIDE MLL office confirmed active; no structural disruption noted.
- **SEI Mandate:** No state-level mandate adopted (RI uses CBI framing).

---

## Recommendations

1. **Remove the 2019-12-01 "Baseline coding" history row.** It documents data methodology, not state policy. This is a meta-process violation per project guidance.

2. **Update 2025-06-01 history source URL** from generic RIDE homepage to the specific Certification-Regulations-2025.pdf document for direct traceability.

3. **Consider future `elPercentHistory` array** spanning NCES Table 204.20 data from 2000 or 2005 through 2021, if orchestrator deems such a time series in scope for all states. RI's dramatic 2011–2021 growth is analytically significant.

4. **No other changes required.** Credentials, standards, ELP assessment, and Seal of Biliteracy are all accurate and current as of 2026-05-08.

---

## Audit Confidence

**Overall Status:** VERIFIED-2026  
**Confidence Level:** High  
**Outstanding Items:** None (removal of meta-process history row pending orchestrator guidance)

Rhode Island record is accurate, well-sourced, and ready for publication with the recommended history array cleanup.
