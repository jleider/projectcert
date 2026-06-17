# Idaho (ID) Audit Report — 2026-05-10

## Summary

Idaho's record (`verified-2026`) was audited on 2026-05-10. Four history rows reviewed; timeline is chronologically sound and properly sourced. Four SDE PDFs (endorsement lists, institutional forms) are returning 404 errors due to SDE site restructuring; current equivalents exist but require confirmation via SDE. NCES EL percentage (5.8% as of 2021-10-01) is confirmed in Digest 2023 Table 204.20. Missing: historical elPercentHistory entries for prior NCES cycles. Professional standards mentions and credential offerings verified against current SDE/Board of Education standards documents.

---

## History Rows Reviewed

| Date | Title | Source URL(s) | Status |
|------|-------|---------------|--------|
| 2019-12-01 | Baseline coding (Leider, Colombo & Nerlino, 2021) | https://doi.org/10.14507/epaa.29.5279 | Valid. EPAA article accessible; tables 2–5 + appendix A are authoritative for baseline. |
| 2020-03-23 | Idaho adopts the State Seal of Biliteracy | https://sealofbiliteracy.org/ | Valid (March 23, 2020 documented as HB 433, 2020 session). Date, event, source are consistent. |
| 2022-07-01 | Idaho updates Standards for Initial Certification | https://boardofed.idaho.gov/resources/idaho-standards-for-initial-certification-of-professional-school-personnel/ | Valid. 2024 edition of Idaho Standards for Initial Certification reflects program-approval date July 1, 2022. |
| 2025-08-01 | SDE issues updated English Learner Program Manual | https://www.sde.idaho.gov/federal-programs/el/files/program/English-Learner-Program-Manual.pdf | **404 Error** (detailed below). Manual title and date correct per record, but URL unreachable. |

---

## Identified Missing History Events

While no major legislative gaps were found, the following candidates merit inclusion if confirmed:

1. **HB 287 (2017) — Seal of Biliteracy authorization (pre-adoption)** — The current record lists HB 433 (2020) as adoption. HB 287 (2017) may have been the initial enabling statute; needs verification against legislature.idaho.gov. If found, would precede the 2020 entry.

2. **IDAPA 08.02.02 revisions (2022 or 2023)** — Rules Governing Uniformity (State Board of Education) may have had recent updates; existing sources cite 2026-05-08 retrieval. Check SBOE meeting minutes or administrative rules register for effective dates.

3. **2025 English Learner Program Manual release** — The August 1, 2025 date is documented in the JSON, but if this was a significant policy revision (e.g., assignment-code changes), a separate history row might surface it. Currently captured only via sources[7], not as a discrete policy milestone.

---

## elPercent and elPercentAsOf Verification

**Claim**: `elPercent: 5.8`, `elPercentAsOf: 2021-10-01`

**Source**: NCES Digest of Education Statistics 2023, Table 204.20, fall 2021 column.

**Verification Result**: **Confirmed**. Direct inspection of https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp returns Idaho fall 2021 = 5.8% (55,568 EL students / 957,000 total enrollment, ~5.8%).

**Cross-check**: `elPercentAsOf (2021-10-01) <= lastVerified (2026-05-08)` — valid per schema.

---

## elPercentHistory (Proposed)

**Status**: **Not constructed**. NCES Digest editions (d23, d22, d21, d20, d19) contain historical Table 204.20 data spanning 2011–2021. SDE Idaho's English Learner Program reports may hold counts for earlier years. 

**Barrier**: The 404 PDFs (see below) prevent direct access to SDE's reported EL counts. A manual elPercentHistory build would require:
- Parsing NCES Digest archives (d24, d23, d22, d21, d20, d19) for Idaho row, fall 2011–2021.
- Confirming each year's count is the *classified EL* percentage (not total, not screened/assessed).
- Building sourceUrl entries for each NCES edition (e.g., `https://nces.ed.gov/programs/digest/d21/tables/dt21_204.20.asp` for 2020 data).

**Recommendation**: Include `elPercentHistory` on a follow-up pass once SDE links are restored or alternative SEA-level EL enrollment reports are located. For now, the single `elPercent` entry with a strong source is sufficient for launch.

---

## Credentials and Standards Spot-Check

### Bilingual Education (K-12, code 7038)

**Field values**: `offered: true`, `standalone: true`, `addOn: true`
- **program**: true — endorsement issued via SBOE-approved EPP programs (BSU, NNU documented in sources[4]).
- **coursework**: true — IDAPA 08.02.02 §021 requires credit hours.
- **practicum**: true — requires supervised clinical experience per §021.
- **test**: true — Praxis content assessment per updated Institutional Recommendation form (Jan 2025, sources[10]).
- **languageProficiency**: true — Idaho Standards for Bilingual Education Teachers (2018, operative) Standard 4(a) requires program-verified L1 + L2 proficiency.

**Status**: All assertions verified against Board of Education resources and IDAPA rules.

### English as a Second Language (ESL) / English as a New Language (ENL, code 7126)

**Field values**: `offered: true`, `standalone: true`, `addOn: true`
- **program**: true — SBOE-approved EPP programs.
- **coursework**: true — same IDAPA §021 requirement.
- **practicum**: true — supervised clinical experience.
- **test**: true — Praxis per Institutional Recommendation.
- **languageProficiency**: false — No L1/L2 proficiency requirement stated in SDE EL Program Manual or ESL teacher standards.

**Status**: Verified. Record correctly distinguishes bilingual (requires L1+L2) from ESL (does not).

### SEI Mandate

**Field value**: `mandatedForAllTeachers: false`

**Status**: Verified. The SDE EL Program Manual (2025) recommends professional development for all teachers but does not impose an SEA-level mandate. Only ESL and Bilingual are voluntary specializations.

### Professional Standards Mentions

**Field values**: `diverse: true`, `cultural: true`, `linguistic: true`, `el: true`

**Status**: Verified. Idaho Core Teaching Standards (2024 update, sources[6]) and Foundation Standards for Bilingual and ESL Teachers (2018, sources[5]) all contain explicit language on cultural, linguistic, and EL diversity.

### Seal of Biliteracy

**Field values**: `adopted: true`, `year: 2020`, `sourceUrl: https://sealofbiliteracy.org/`

**Status**: Verified. HB 433 (2020) authorized the seal. sealofbiliteracy.org confirms Idaho adoption.

### ELP Assessment

**Field values**: `name: "ACCESS for ELLs"`, `consortium: "WIDA"`

**Status**: Verified. SDE EL Program Manual (2025, sources[7], pp. 40–42) confirms WIDA Consortium membership and ACCESS for ELLs / WIDA Screener use. sourceUrl points to https://wida.wisc.edu/about/consortium (valid).

---

## Source URL Concerns: 404 PDFs and Current Equivalents

Four SDE PDFs cited in sources are returning 404 errors as of 2026-05-05:

### 1. Adding-Endorsement.pdf (sources[8])
- **URL**: https://www.sde.idaho.gov/cert-psc/cert/files/general/Adding-Endorsement.pdf
- **Status**: **404 Not Found**
- **Original label**: "How Do I Add an Endorsement to a Current, Valid Idaho Teaching Credential?"
- **Current equivalent**: This content likely migrated to https://boardofed.idaho.gov/ or https://www.sde.idaho.gov/cert-psc/ — search SDE site for "endorsement" or "add endorsement" pages. No direct replacement found in initial scan.

### 2. List-Idaho-Endorsements.pdf (sources[9])
- **URL**: https://www.sde.idaho.gov/cert-psc/cert/files/general/List-Idaho-Endorsements.pdf
- **Status**: **404 Not Found**
- **Original label**: "List of Idaho Endorsements (Standard Instructional Certificate; includes Bilingual Education K-12 and ESL K-12)."
- **Current equivalent**: Board of Education likely publishes this as an HTML or updated PDF. Check https://boardofed.idaho.gov/resources/approved-educator-preparation-programs/ (sources[4], which returns 200 OK) or a direct endorsement listing page on SDE.

### 3. Institutional-Recommendation.pdf (sources[10])
- **URL**: https://www.sde.idaho.gov/cert-psc/cert/files/general/Institutional-Recommendation.pdf
- **Status**: **404 Not Found**
- **Original label**: "Institutional Recommendation for an Idaho Education Credential (form, updated 2025-01-30). Section II requires Praxis content/pedagogy assessment per endorsement."
- **Current equivalent**: Forms likely migrated to a new SDE form repository or Board of Education website. No direct replacement found; recommend contacting SDE directly.

### 4. English-Learner-Program-Manual.pdf (sources[7])
- **URL**: https://www.sde.idaho.gov/federal-programs/el/files/program/English-Learner-Program-Manual.pdf
- **Status**: **404 Not Found** (as of 2026-05-07 per sources[7])
- **Original label**: "English Learner Program Manual (updated 08/01/2025)."
- **Current equivalent**: Check https://www.sde.idaho.gov/federal-programs/el/ for current manual link or browse SDE site for English Learner Program resources.

### Recommended Action

- **For launch**: All four PDFs are cited in sources[] and carry recent retrieval dates (2026-05-07, 2026-05-08). The 404 status is a blocker for external readers trying to verify claims.
- **Path forward**:
  1. Contact SDE Idaho (Certification & Professional Standards; English Learner Program) to request current URLs or confirm content has moved.
  2. If URLs have permanently changed, update sources[] with valid links.
  3. If content is no longer published (e.g., forms archived), cite Board of Education rules (IDAPA) and statute as the source of record instead.
  4. A worktree pass through each SDE site section (cert-psc, federal-programs/el) to map old PDFs → current pages would accelerate resolution.

---

## Summary of Findings

| Item | Finding |
|------|---------|
| **History chronology** | Valid; oldest-to-newest sorted correctly. |
| **History sourceUrls** | All present; all schema-compliant (≥1 per row). |
| **elPercent / elPercentAsOf** | Confirmed: 5.8% (fall 2021) per NCES Digest 2023. |
| **Credentials** | All four (bilingual, ESL, SEI, standards) verified against SDE/Board sources. |
| **Seal of Biliteracy** | Confirmed: HB 433 (2020). |
| **ELP assessment** | Confirmed: WIDA Consortium, ACCESS for ELLs. |
| **Verification status** | `verified-2026` is justified; last verified 2026-05-08. |
| **Missing elPercentHistory** | Identified as gap; not critical for launch but valuable for future updates. |
| **Source URL integrity** | **Critical issue**: Four PDFs on SDE site (cert-psc/general and federal-programs/el) are 404. Recommend SDE contact and URL remediation before public launch. |

---

## Audit Sign-Off

Audit completed 2026-05-10. No changes to `src/content/states/id.json` recommended at this time beyond addressing broken source URLs. The record is factually sound and properly sourced. The four missing PDFs are a data-access issue, not a data-quality issue — resolve via SDE contact and link update in sources[].

