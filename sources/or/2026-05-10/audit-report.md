# Oregon (OR) Audit Report — 2026-05-10

**Verification Status**: verified-2026 (confirmed via centralized audit; no edits recommended)

**Last Verified**: 2026-05-08 (per state JSON)

---

## Summary of Findings

Oregon's record is **substantially verified** against current TSPC (Teacher Standards and Practices Commission), ODE (Oregon Department of Education), and NCES sources. The JSON structure, credential requirements, and history timeline are accurate as of the audit date.

### Issues Identified

1. **History row: 2019-12-01 "Baseline coding" is a meta-process title**
   - This row documents the seed paper's (Leider, Colombo & Nerlino, 2021) coding activity rather than a substantive policy event.
   - Per schema safeguards, dated history events should capture regulatory or policy moments, not documentation-processing metadata.
   - **Action**: This row is defensible as a provenance marker (it anchors the 2019 snapshot) but should be flagged in any bulk meta-review. No removal recommended without confirming the policy intent across all 51 states.

2. **Missing foundational statute in history: ORS 336.074**
   - Oregon Revised Statutes § 336.074 (English Language Learners) is the codified statute governing EL-teacher licensure eligibility and requirements.
   - It is not explicitly cited in the `history[]` array, though TSPC rules (effective 2023-11-01) cite it as the operative statute.
   - **Action**: Optional backfill; pre-2019 enactment date unknown from available sources. If a legislative history or codification date is retrieved, consider adding a row with the ORS URL and codified form.

3. **elPercent = 9.5% (Fall 2021) — validation pass**
   - Current record cites NCES Digest Table 204.20 (2023 edition), reporting Fall 2021 enrollment.
   - 9.5% aligns with Oregon's demographic composition and is consistent with prior years' trends.
   - No `elPercentHistory[]` field is present (not required by schema).
   - **Action**: No change needed. If historical enrollment data is desired for analysis, populate `elPercentHistory[]` manually via NCES Digest archival access (2023, 2022, 2021, 2020, 2019 digests cover 2000–2021 cohort).

---

## Credential Requirements Verification

### Bilingual Specialization / Endorsement
- **Standalone + Add-on**: Confirmed via TSPC Adding Specializations rules (effective 2023-11-01).
- **Language Proficiency** only (`test: false`): Correct. ACTFL OPI/OPIc Advanced Mid+ is the exam, not a separate language-proficiency test.
- **Dual Language Specialization**: Distinct add-on requiring approved program + transcripts + exam. Record notes this distinction appropriately.
- **Sources**: TSPC Specialization Requirements PDF (2026-05-08) confirms the structure.

### ESOL (ELD) Endorsement
- **Standalone + Add-on + Program Completion Report pathway**: Confirmed.
- **Test requirement**: ORELA ESOL (subject-matter measure). Recorded as `test: true`.
- **Multiple Measures (June 2024)**: TSPC approved alternative competency pathway (20 semesters / 30 quarters + practicum or approved ESOL program), but does not waive test as the default.
- **Sources**: TSPC Multiple Measures-ESOL worksheet (2026-05-08) and Test Guide (3/2025) confirm.

### Sheltered English Instruction (SEI)
- **Not mandated for all teachers**: Correct (`mandatedForAllTeachers: false`).
- No SEI-specific credential found. Some states embed SEI into ELD or mainstream teaching standards (e.g., AZ, CA, MA). Oregon appears to not have a standalone SEI endorsement.
- **Confirmed via**: TSPC Testing for Teaching License Endorsements guide (3/2025 revision) lists available endorsements.

### Professional Standards
- **Oregon Model Core Teaching Standards** (OAR 581-022-2415, InTASC-aligned): Reviewed (2026-05-08 PDF snapshot).
- **Mentions**:
  - `diverse: true` — Standard 2 and others reference "diverse learners."
  - `cultural: true` — Standard 2 explicitly mentions "cultural diversity."
  - `linguistic: true` — Standard 2 and Standard 7 reference "linguistic diversity."
  - `el: false` — No explicit "English Learner" terminology in standard titles; competency is embedded under "diverse learners."
- **Note**: OAR 581-022-2415 is the model framework. SB 13 (2017) directs ODE to develop tribal-history curriculum, shaping cultural-and-linguistic diversity competencies applied to all teachers (see history row 2017-06-28).
- **Confirmed**: Correct flags reflect the standards' structure.

---

## History Timeline Review

### Chronological Order Check
All rows are sorted oldest → newest:
1. 2016-04-14 — Seal of Biliteracy adopted
2. 2017-06-28 — SB 13 (Tribal History/Shared History)
3. 2019-12-01 — Baseline coding (Leider et al. 2021)
4. 2023-11-01 — TSPC endorsement/specialization rules effective
5. 2024-06-01 — Multiple Measures-ESOL approved

### Source URL Verification
- **2016-04-14**: sealofbiliteracy.org/state/or/ — accessible and canonical.
- **2017-06-28**: olis.oregonlegislature.gov SB 13 overview page — codified statute reference (ORS 329.494) present.
- **2019-12-01**: EPAA 29(100) DOI (https://doi.org/10.14507/epaa.29.5279) — correct citation.
- **2023-11-01**: Cited as "https://www.oregon.gov/tspc/" (generic domain). Specific rule URLs are in `sources[]` (endorsements PDF, specializations PDF).
- **2024-06-01**: Cited as "https://www.oregon.gov/tspc/" (generic). Specific worksheet URL in `sources[]`.

### Note on History Entries 2023 and 2024
The two most recent history rows cite the TSPC domain generically rather than the full PDF URLs. The full PDFs are in `sources[]`, which is acceptable (history can reference without duplication). However, for maximum traceability, future updates could point directly to the PDF or the specific rule-summary page if one exists.

### Missing History Events Considered and Not Added

1. **ORS 336.074 (English Language Learners statute)**: Pre-2019. Enactment date not definitively established from available 2026 sources. Could not source a canonical legislative history URL. Per provenance rules, fabricating a URL is worse than omission.

2. **Any TSPC reorganization with ODE**: Recent merger discussions or functional integration not confirmed in available sources. Not added without confirmation.

3. **Post-2024 TSPC actions**: Audit conducted 2026-05-10; state record lastVerified 2026-05-08. No intervening events flagged in the known administrative calendars.

---

## ELP Assessment (ELPA21)

- **Name**: ELPA21 (correct SEA designation)
- **Consortium**: ELPA21 (correct; not WIDA)
- **Source URL**: ODE assessment page (https://www.oregon.gov/ode/educator-resources/assessment/pages/english-language-proficiency.aspx) — up-to-date as of 2026-05-08.
- **Status**: No change from 2021 baseline. Oregon has used ELPA21 since 2015.

---

## Seal of Biliteracy

- **Adopted**: true
- **Year**: 2016
- **Source**: sealofbiliteracy.org/state/or/ (accessed 2026-05-08, consistent with historical record)
- **History entry aligns**: 2016-04-14 row confirms adoption date.

---

## Sources Array Review

All 10 sources are present, dated, and retrievable:
1. ODE generic (leider-2021, 2019-11-15) — seed paper baseline.
2. Leider, Colombo & Nerlino (2021) — DOI link, seed paper reference.
3–10. Current (2026-05-08) sources: ODE ELPA page, TSPC endorsements/specializations PDFs, TSPC testing guide, Oregon Model Core Teaching Standards PDF, Seal of Biliteracy, NCES Table 204.20.

Each source carries `retrievedAt` and `retrievedBy` (either leider-2021 or projectcert-2026), meeting schema requirements.

---

## Recommendations

1. **No edits to or.json required.** The record is verified and current as of 2026-05-08.

2. **Optional future enhancement**: If historical EL enrollment data (elPercentHistory[]) is collected for analysis, populate it via NCES Digest archives.

3. **Optional future clarification**: If ORS 336.074 foundational-statute date is confirmed, a history row could be backfilled. However, this is not essential for verification status.

4. **Meta-flag for bulk review**: The 2019-12-01 "Baseline coding" row is a documented meta-process entry (not unique to OR). Consider whether to canonically retire or clarify this pattern across all 51 states in a separate guidance update.

---

**Audit Date**: 2026-05-10  
**Auditor**: Automated state integrity check (claude-haiku-4-5-20251001)  
**Status**: PASS — No changes recommended.
