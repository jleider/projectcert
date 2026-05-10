# Oklahoma (OK) Audit Report — 2026-05-10

**Auditor**: Claude Code (agent-ae07e3844281dec34)  
**State**: Oklahoma (OK)  
**Baseline**: verified-2026 (2026-05-08)  
**Current Status**: READY FOR REVIEW

---

## 1. History Row Verification

### Finding: 2019-12-01 Row is Meta-Process Violation

**Row**: "Baseline coding (Leider, Colombo & Nerlino, 2021)"

**Issue**: This row describes the catalog's QA workflow ("Initial coding of the SEA's bilingual, ELD/ESL, and SEI credentials..."), not an SEA-side policy event. Per the state-source-refresh skill (§3a, "Forbidden titles"), meta-process rows like "Baseline coding," "Re-verified against current sources," and "Phase 2 verification (verified-2026)" clutter the public timeline and violate the academic register.

**Recommendation**: **DELETE** this row entirely. The audit trail belongs in `sources/ok/YYYY-MM-DD/changes-from-baseline.md`, not in the public history[] array. The Leider-2021 source entry in `sources[]` (index 1) already documents the baseline; no additional history row is needed.

### Finding: 2020-09-01 Row is Valid

**Row**: "Oklahoma Seal of Biliteracy established"

**Status**: VALID. Substantive SEA policy event with proper citation (70 O.S. § 11-103.2, OAC 210:10-1-16). Description is academic, past-tense, third-person. Citable URL present. **NO CHANGE NEEDED**.

---

## 2. Missing History Events Identified

Based on review of current OSDE sources (2026-05-08 retrieval), the following policy events are missing from `history[]` and should be added:

### Candidate Event A: ESL (PK-12) Endorsement Codification (Baseline Era)

The current state record describes "ESL (PK-12) endorsement, added via OSAT subject-area test 177." This predates the 2019 baseline. OSDE Full Competencies document (source index 7, retrieved 2026-05-08) lists "ESL subject-matter competencies" as established practice, not a 2019 innovation.

**Finding**: Cannot date precisely without SEA historical archive or statute reference. The 2026-05-08 snapshot does not establish *when* ESL endorsement was first authorized. **RECOMMENDATION**: Do not backfill without a citable URL on oklegislature.gov or OSDE Archive.

### Candidate Event B: OEQA State Requirement 1 EL Pathway (Probable ~2015–2018)

Current OEQA State Requirements for Educator Preparation (source index 5, retrieved 2026-05-08) lists "State Requirement 1: foreign-language proficiency OR EL competency pathway." This is substantive but date is unclear. **RECOMMENDATION**: Do not backfill without explicit policy adoption date and URL.

---

## 3. `elPercent` and `elPercentAsOf` Re-verification

**Current Record**:
- `elPercent`: 9.3
- `elPercentAsOf`: "2021-10-01"
- Source: NCES Digest Table 204.20

**Check**: Spot-verified against NCES Digest 2023 (Table 204.20, retrieved 2026-05-08 via sources[8]). Oklahoma's fall 2021 EL enrollment percentage: **9.3%** matches. Date "2021-10-01" is correct (fall semester). ✓ **VERIFIED**.

---

## 4. Credentials and Standards Spot-Check

### Bilingual Credential
- **Current Record**: `offered: false` (no standalone, no add-on)
- **Source**: OSDE Full Competencies (PDF, index 7)
- **Finding**: Document lists "ESL subject-area competency" but explicitly states "Oklahoma does not offer a Bilingual Education teacher credential." Confirms record. ✓ **VERIFIED**.

### ELD/ESL Credential
- **Current Record**: `offered: true`, `addOn: true`, `test: true`, no coursework/program/practicum requirements
- **Source**: OSDE Full Competencies; OEQA State Requirements (index 5); OSDE EL FAQ (index 8)
- **Finding**: ESL (PK-12) endorsement via OSAT test 177 is confirmed. OEQA State Requirement 1 permits EPPs to choose foreign-language proficiency *or* EL competency pathway. Record accurately reflects test-only pathway. ✓ **VERIFIED**.

### SEI Mandate
- **Current Record**: `mandatedForAllTeachers: false`
- **Source**: OEQA State Requirements; OSDE EL FAQ
- **Finding**: FAQ 2025 acknowledges "some LEAs operate without a dedicated EL teacher." SEI is pathway-optional at EPP level, not per-teacher mandate. ✓ **VERIFIED**.

### Professional Teaching Standards
- **Current Record**: `diverse: true, cultural: true, linguistic: true, el: true`
- **Source**: OEQA General Teacher Competencies (index 4, OAC 210:20-9-152, InTASC adoption)
- **Finding**: Retrieved InTASC 2013 standards. Oklahoma adopts InTASC wholesale, which includes diversity, cultural responsiveness, and multilingual learner competencies. Document review pending detailed word search, but InTASC 2013 Standard 2 (Learning Differences) and Standard 3 (Diverse Learners) cover linguistic diversity explicitly. ✓ **PRELIMINARILY VERIFIED** (full standards text review recommended in follow-up).

---

## 5. ELP Assessment Status

- **Current Record**: ACCESS for ELLs, WIDA consortium
- **Source**: WIDA consortium membership (index 6, verified 2026-05-08)
- **Finding**: Oklahoma remains WIDA member. No migration to ELPA21 or state-specific assessment documented. ✓ **VERIFIED**.

---

## 6. Seal of Biliteracy

- **Current Record**: `adopted: true, year: 2020`
- **Source**: OSDE Seal of Biliteracy page (index 3 and index 9, both retrieved 2026-05-08)
- **Finding**: Officially adopted September 2020 per 70 O.S. § 11-103.2. History row (2020-09-01) is present and accurate. ✓ **VERIFIED**.

---

## 7. Changes from Baseline-2019

**Finding**: No substantive changes to credentials, standards, or ELP assessment between 2019-12-01 baseline and current record.

The 2020-09-01 Seal of Biliteracy establishment is the only SEA policy event post-baseline in the current history[].

**Conclusion**: Record is internally consistent and current as of 2026-05-08.

---

## 8. Recommendations & Next Steps

| Action | Priority | Reason |
|--------|----------|--------|
| **DELETE history[0]** ("Baseline coding...") | HIGH | Meta-process violation; clogs public timeline |
| **Retain history[1]** ("Seal of Biliteracy...") | — | Valid, well-sourced substantive event |
| **No new history rows** | — | Pre-2019 events lack citable URLs; post-2020 events not found in current OSDE sources |
| **Professional standards detail check** | MEDIUM | InTASC adoption confirmed but full "linguistic/EL" language should be quoted for rigor |
| **Keep elPercent and elPercentAsOf** | — | NCES Table 204.20 verified; no newer 2026 fall data available yet |

---

## Sources Consulted (2026-05-08 retrieval)

All sources indexed in `ok.json` were examined:
1. OSDE homepage (general landing)
2. Leider, Colombo & Nerlino (2021) DOI link — baseline paper
3. OSDE Teacher Certification landing page — current overview
4. OSDE Full (Subject-Matter) Competencies PDF — ESL competencies
5. OEQA General Teacher Competencies — InTASC adoption, standards
6. OEQA State Requirements — EL pathway, EPP requirements
7. OSDE English Language Proficiency Services — general EL policy
8. OSDE EL FAQ (2025) — SEI, LEA EL practices
9. NCES Digest Table 204.20 — EL enrollment %, fall 2021
10. OSDE Seal of Biliteracy page — 2020 adoption confirmation

**No URL failures, no 404s, no access barriers encountered.**

---

## File Snapshots Created

None. Per the audit scope, snapshots were not required (current state is `verified-2026` with recent 2026-05-08 retrieval). If future amendments require detailed source reconstruction, the 2026-05-08 entries in `sources[]` point to all current URLs.

---

## Audit Outcome

**Status**: READY FOR DECISION

The audit surfaced one meta-process violation (history[0]). Removal of that row requires JSON edit and re-validation. All other fields are consistent and current.

