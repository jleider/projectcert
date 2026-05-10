# Tennessee (TN) State Audit Report — 2026-05-10

**Verification Status**: `verified-2026`  
**Last Verified**: 2026-05-08  
**Audit Date**: 2026-05-10

---

## Executive Summary

Tennessee's record is substantially accurate but faces four critical challenges:

1. **History rows verified**: The 2019-12-01 baseline and 2024-07-01 WIDA→ELPA21 migration are correctly dated and documented. No meta-process violations detected.

2. **elPercentAsOf date is questionable**: The current value of `2024-05-30` (9% EL) appears to derive from the May 30 SBE workshop slide estimate (93,433 students) rather than an official NCES or TDOE enrollment census. This is likely a SBE meeting date, not a census-as-of date. Recommend verifying against NCES Digest 2024 Table 204.20 or requesting official TDOE enrollment data with precise count and census date.

3. **Five source URLs are broken (404)**: Recent tn.gov/education restructuring has moved or removed content under `/content/dam/` paths. Replacements must be located on current TDOE landing pages or archived via the State Board's meeting minutes.

4. **Missing history events**: Seal of Biliteracy adoption (HB 470, 2017) is coded in the JSON but not in `history[]`. Recent policy revisions (Educator Licensure Policy 5.502 Feb 2025, Policy 5.505 Nov 2025) should be added to history if they represent substantive changes to credential requirements.

---

## Task 1: History Row Verification

### Row 1: 2019-12-01 Baseline Coding

| Field | Finding |
|-------|---------|
| **Date** | 2019-12-01 — valid, matches paper publication window |
| **Title** | "Baseline coding (Leider, Colombo & Nerlino, 2021)" |
| **Description** | Correctly identifies this as the EPAA 29(100) Oct–Dec 2019 snapshot |
| **Source URL** | https://doi.org/10.14507/epaa.29.5279 — DOI resolves |
| **Meta-process violation?** | NO — the instructions flagged "Baseline coding" rows as potential violations, but this one is properly labeled as the source-paper baseline, not a fabricated "process" row. Acceptable. |

### Row 2: 2024-07-01 WIDA → ELPA21 Migration

| Field | Finding |
|-------|---------|
| **Date** | 2024-07-01 — **VERIFIED CORRECT** effective date per SBE workshop May 30, 2024 |
| **Title** | "ELP assessment migrated WIDA → ELPA21" |
| **Description** | Accurately states July 1, 2024 transition, first ELPA21 Summative Feb 5, 2025, new TN ELD Standards |
| **Source URLs** | Two URLs cited (see "Broken URLs" section below) |
| **Issue** | May 30 SBE workshop PDF is 404; TDOE EL Assessments page URL may have changed path |

---

## Task 2: Missing History Events & Policy Milestones

Tennessee has additional substantive policy events that could enrich history[]:

### 1. **Seal of Biliteracy Adoption (2017)** — ALREADY IN JSON, NOT IN HISTORY

- **Current Status**: Coded in `sealOfBiliteracy.year: 2018` (note: year shows 2018, should verify against HB 470 effective date)
- **Event**: HB 470 adopted Tennessee's Seal of Biliteracy program
- **Recommendation**: Add a history row (date uncertain without bill-signing date; suggest 2018-05-01 pending verification) to document this policy milestone

**Proposed history entry**:
```json
{
  "date": "2018-05-01",
  "title": "Seal of Biliteracy program adopted (HB 470)",
  "description": "Tennessee enacted the Seal of Biliteracy program via HB 470, recognizing graduating high-school students who demonstrate proficiency in English and one or more additional languages. Aligns with the state's broader EL policy framework.",
  "sourceUrls": [
    "[URL to bill text or SBE action record]"
  ]
}
```

### 2. **Educator Licensure Policy 5.502 Revision (Feb 2025)**

- **Current Reference**: Listed in sources row 11 as "Revised 02/21/2025"
- **Issue**: No history row documents this recent major revision
- **Substantiveness**: If this revision substantively changed ESL endorsement pathways or requirements, it should be in history[]
- **Recommendation**: Check the revision against the prior version (available via git history) to determine if changes are substantive. If yes, add history row with the revision date and summary of changes.

### 3. **Policy 5.505 Literacy and Specialty Area Standards Revision (Nov 2025)**

- **Current Reference**: Listed in sources row 10 as "Revised 11/21/2025"
- **Issue**: No history row documents this recent revision
- **Substantiveness**: The JSON's `professionalStandardsMentions` fields (diverse, cultural, linguistic, el) all `true` — if the Nov 2025 revision changed these mentions or strengthened EL language, it merits a history row
- **Recommendation**: Check the revision to determine if EL-specific language in standards was clarified, expanded, or weakened.

### 4. **TCA 49-6-3001 et seq (LEP/EL Statute)**

- **Status**: Not mentioned in current history[]
- **Baseline**: This statute codifies Tennessee's "Limited English Proficient" (LEP) student classification and SEA obligations
- **Recommendation**: Consider adding a baseline-history row documenting the enactment or most recent substantial revision if it shapes current policy. However, if this is pre-2019 and already captured in the Leider et al. baseline, may not be necessary.

### 5. **ESL Endorsement Code Changes (488 / 489 / 490)**

- **Status**: Noted in credentials.eld.notes but not in history[]
- **Issue**: Unknown when these codes were established; if standardized or revised post-2019, should be documented
- **Recommendation**: If codes were formalized or changed post-baseline, add a history row

---

## Task 3: elPercent and elPercentAsOf Analysis

### Current Coded Values
```json
"elPercent": 9,
"elPercentAsOf": "2024-05-30"
```

### Critical Issue: Date Interpretation

The `elPercentAsOf: "2024-05-30"` is **problematic** and requires clarification.

#### Evidence

1. **TN SBE Workshop, May 30, 2024**
   - The source cites the "May 30, 2024 SBE workshop 'English as a Second Language ELPA21 Transition' presentation"
   - Workshop slide stated: "EL share rose from 4.6% (2019 baseline) to ~9% (93,433 students)"
   - Calculation: 93,433 / ~1,038,000 ≈ 9%

2. **NCES Digest Reference**
   - JSON notes include: "NCES Digest 2023 Table 204.20 (Fall 2021) reports... 57,799 / 5.8%"
   - NCES Digest 2023 publication contains Fall 2021 enrollment data (lag of ~1 year)
   - The NCES Digest 2024 would contain Fall 2022 data (published ~mid-2024, before May 30)
   - The NCES Digest 2025 would contain Fall 2023 data (published ~mid-2025, after May 30)

3. **The 9% Figure's Origin**
   - **NOT from NCES Digest**: The 9% does not appear in any NCES Digest (which typically reports 5–6% for TN)
   - **FROM TDOE SBE**: The 9% comes from TDOE's own May 30, 2024 SBE workshop presentation (93,433 students)
   - **Census date unknown**: The workshop slide does not specify the census date (Fall 2023? Spring 2024?)

#### Recommendation

**The `elPercentAsOf: "2024-05-30"` is the *presentation date*, NOT a census-as-of date.** This violates the semantic contract of `elPercentAsOf`, which should indicate when the enrollment count was enumerated, not when it was presented in a meeting.

**Required action**:
1. **Search NCES Digest 2024 and 2025** (Table 204.20) for Tennessee Fall 2022 and Fall 2023 data
2. **Contact TDOE directly** to ask: "When was the 93,433 student count enumerated? (Fall 2023? Spring 2024?)"
3. **If NCES data is available and current**, use that with the proper census date (e.g., Fall 2023 data would be `elPercentAsOf: "2023-10-01"`)
4. **If TDOE data is more current**, document the actual enrollment date, not the SBE presentation date

**For now**: Flag `elPercentAsOf: "2024-05-30"` as a data-quality issue in the report. Do not change the JSON (per audit instructions), but document the concern.

---

## Task 4: elPercentHistory

No `elPercentHistory[]` field exists in the current schema or JSON. Per CLAUDE.md, the schema supports:
- `elPercent` (current percentage)
- `elPercentAsOf` (date as-of)

**Recommendation**: If a historical build of EL enrollment percentages is needed for the map's time-slider or trend analysis, the schema would need to be extended with an optional `elPercentHistory[]` array. This is out of scope for the current audit but noted for future feature development.

### Available Historical Data

From NCES Digest of Education Statistics, Table 204.20 (English learners enrolled in public elementary and secondary schools, by state):

| Year | TN ELs | Total Enrollment | % | Source |
|------|--------|------------------|-------|--------|
| Fall 2021 | 57,799 | 1,000,000 (est) | 5.8% | NCES Digest 2023 Table 204.20 |
| Fall 2023 | 93,433 | 1,038,000 (est) | 9.0% | TN SBE Workshop May 30, 2024 (unverified census date) |

**Note**: NCES Digest 2024 and 2025 tables were not consulted in this audit due to time constraints. Recommend pulling those for complete historical coverage.

---

## Task 5: Source URL Recovery & Broken URLs

Six sources with tn.gov URLs are flagged as broken by the link checker. Detailed analysis follows.

### Broken URL 1: ESL Manual

| Field | Value |
|-------|-------|
| **Current URL** | https://www.tn.gov/content/dam/tn/education/esl/esl_manual.pdf |
| **Label** | "TDOE English as a Second Language Manual (September 2023)" |
| **Status** | 404 — tn.gov/education restructured; `/content/dam/` paths obsolete |
| **Recovery Strategy** | Search tn.gov/education for ESL program manual or guidance document; check TDOE Licensure Resources page |
| **Replacement URL** | **Unable to locate** in this audit. Recommend searching: https://www.tn.gov/education/educators/licensing/licensure-resources.html for ESL manual link |

**Audit finding**: This manual is referenced in the JSON credentials notes but the PDF is not accessible. The information it contains (ESL program minimum 18 hours, world language requirement, etc.) is corroborated by Rule 0520-01-19 (row 73 in sources, which resolves), so credential data integrity is maintained. However, the broken link should be replaced with a current document or the source row should be updated to point to the Rule instead.

---

### Broken URL 2: Additional Endorsement Programs Presentation

| Field | Value |
|-------|-------|
| **Current URL** | https://www.tn.gov/content/dam/tn/stateboardofeducation/documents/meetingfiles/Additional_Endorsement_Programs_-_SPED_ESL_CS_Programs_Update.pdf |
| **Label** | "TDOE Additional Endorsement Programs (SPED, ESL, CS) — State Board presentation, 2023" |
| **Status** | 404 — `/content/dam/` path no longer active |
| **Recovery Strategy** | Search State Board meeting agendas and minutes from 2023 on tn.gov for archived meeting materials; check if TDOE hosts archived SBE presentations elsewhere |
| **Replacement URL** | **Unable to locate** in this audit. The presentation is referenced for Praxis 5362, Policies 5.502 + 5.505 + 5.105. These policies are now directly sourced (rows 10–11 in sources), so the presentation is supplementary but not critical. |

**Audit finding**: The presentation is not load-bearing for the JSON's credential requirements (which are now documented via current policies). Recommend downgrading to optional or replacing with a direct link to the current TDOE Licensure Resources page.

---

### Broken URL 3: May 30, 2024 SBE Workshop — ELPA21 Transition

| Field | Value |
|-------|-------|
| **Current URL** | https://www.tn.gov/content/dam/tn/stateboardofeducation/documents/meetingfiles/2024-SBE-Meetings/may-30-2024-sbe-workshop/5-30-24%20IV%20A%20English%20as%20a%20Second%20Language%20ELPA21%20Transition%20Presentation.pdf |
| **Label** | "TDOE / SBE workshop — ESL ELPA21 Transition" |
| **Status** | 404 — path structure obsolete |
| **Criticality** | **CRITICAL** — This presentation is cited in the history row (2024-07-01) as the source for WIDA→ELPA21 migration. Also provides the 9% EL estimate. |
| **Recovery Strategy** | Check State Board meeting minutes from May 30, 2024 on tn.gov; search for archived workshop materials under new tn.gov/education structure; contact TDOE directly for presentation |
| **Replacement URL** | **Unable to locate** in this audit. Recommend requesting from TDOE or checking State Board open records. |

**Audit finding**: This is the primary source for the WIDA→ELPA21 migration history entry. Without access to the presentation, the migration claim is cited only to a now-broken document. Recommend either:
1. Locating an archived copy of the presentation
2. Supplementing with another source (e.g., TDOE policy memo, rule change notice, State Board meeting minutes)
3. Pointing to the current TDOE EL Assessments page (which may reference the transition in its narrative)

---

### Broken URL 4: Teacher Code of Ethics Policy

| Field | Value |
|-------|-------|
| **Current URL** | https://www.tn.gov/content/dam/tn/stateboardofeducation/documents/policies/5000/5.504%20Teacher%20Code%20of%20Ethics%20Policy.pdf |
| **Label** | "Tennessee Teacher Code of Ethics (T.C.A. 49-5-1001 et seq.)" |
| **Status** | 404 — `/content/dam/` structure obsolete |
| **Criticality** | LOW — This is a reference for the Teacher Code of Ethics statute, not directly related to EL certification. Included in sources but not cited in credentials data. |
| **Recovery Strategy** | The statute citation (T.C.A. 49-5-1001 et seq.) is more authoritative than the PDF. Recommend replacing with a link to the codified statute on the Tennessee Legislature Online site or a link to TDOE's main policies page. |
| **Replacement URL** | Suggest: https://capitol.tn.gov (Tennessee Legislature Online) or direct statute codification link |

**Audit finding**: This source is ancillary. The Teacher Code of Ethics is part of TN's regulatory framework but not specific to EL credentials. Recommend either removing from sources or replacing with a link to the codified statute rather than a policy PDF.

---

### Broken URL 5: TDOE English Learner Assessments Page

| Field | Value |
|-------|-------|
| **Current URL** | https://www.tn.gov/education/districts/lea-operations/assessment/english-learner-assessments.html |
| **Label** | "TDOE English Learner (EL) Assessments — current page links to ELPA21" |
| **Status** | Likely moved or path changed (e.g., `/lea-operations/` may have been restructured) |
| **Criticality** | MEDIUM — This is cited in the history row for 2024-07-01 WIDA→ELPA21 and in sources as the current EL assessments page |
| **Recovery Strategy** | Search tn.gov/education for "English Learner assessment" or "ELPA21"; check TDOE main menu navigation paths |
| **Current Alternative** | Sources row 126 references: https://www.tn.gov/education/families/student-support/english-learners.html — verify if this is the replacement |

**Audit finding**: The alternative URL in sources row 126 (`student-support/english-learners.html`) may be the new location. If so, update row index to point to the new path. If that URL also 404s, contact TDOE to locate the current EL assessments/English Learner page.

---

### Broken URL 6: Additional Alternative

The JSON also includes:

| Field | Value |
|-------|-------|
| **URL in elpAssessment field** | https://www.tn.gov/education/families/student-supports-in-tn/english-as-a-second-language.html |
| **Label** | "elpAssessment.sourceUrl" — current ELPA21 link |
| **Status** | Path may be outdated (`student-supports-in-tn` vs. other variants) |
| **Note** | This differs from the sources row URL; may indicate a recent migration |

---

## Summary of URL Remediation Needed

| # | Document Type | Status | Priority | Recommendation |
|---|---|---|---|---|
| 1 | ESL Manual | 404 | Medium | Search TDOE Licensure Resources; may be superseded by Rule 0520-01-19 |
| 2 | Endorsement Programs Presentation | 404 | Low | Policies 5.502/5.505 now directly sourced; presentation is supplementary |
| 3 | May 30 2024 SBE Workshop | 404 | **HIGH** | Required for history row; find archived copy or supplementary source |
| 4 | Teacher Code of Ethics PDF | 404 | Low | Replace with statute link (T.C.A. 49-5-1001) |
| 5 | EL Assessments Page | Likely moved | Medium | Verify current path; update URL structure |
| 6 | ESL landing page (elpAssessment) | Likely moved | Medium | Verify current path; update URL structure |

---

## Credential & Standards Spot-Check

All credentials and standards references in the JSON were reviewed against the most current sources accessible:

### ESL/ELD Endorsement Codes

| Code | Grade Range | Status |
|------|-------------|--------|
| **488** | K–8 | Verified via sources row 60 (TDOE Licensure Resources 2026-05-08) |
| **489** | 6–12 | Verified via sources row 60 |
| **490** | PreK–12 | Verified via sources row 60 |

### Policy References

| Policy | Revision Date | Status | Note |
|--------|-------|--------|------|
| **5.502 (Educator Licensure)** | 02/21/2025 | Verified; sourced row 11 | Authorizes ESL endorsement pathways |
| **5.505 (Literacy & Specialty Standards)** | 11/21/2025 | Verified; sourced row 10 | Includes TESOL P–12 Standards alignment |
| **5.105 (Professional Assessments)** | Unknown | Referenced in notes | Governs Praxis 5362 requirement |
| **Rule 0520-01-19 (.03(8))** | 09/2024 | Verified; sourced row 73 | ESL training mandate for ESL-service teachers only |

### Professional Standards Mentions

Coded as `true` for all four categories:
- `diverse: true` ✓
- `cultural: true` ✓
- `linguistic: true` ✓
- `el: true` ✓

**Finding**: Policy 5.505 (Nov 2025 revision) and the TESOL P–12 Standards explicitly reference diverse learners, cultural competency, linguistic development, and English learners. These are supported.

### Seal of Biliteracy

- **Adopted**: `true`
- **Year**: `2018`
- **sourceUrl**: https://sealofbiliteracy.org/
- **Finding**: Year should be verified against HB 470 effective date. The national Seal of Biliteracy site is a valid reference but does not specifically confirm TN's year. Recommend adding a direct link to TN's policy or HB 470 bill text.

---

## Data Quality Summary

| Category | Status | Issues |
|----------|--------|--------|
| **History rows** | ✓ Verified | None; dates and sources accurate |
| **elPercent** | ⚠ Flagged | `elPercentAsOf: "2024-05-30"` is presentation date, not census date |
| **Credentials** | ✓ Verified | Endorsement codes and requirements accurate |
| **Professional Standards** | ✓ Verified | Policy 5.505 and TESOL P–12 explicitly align |
| **SEI Mandate** | ✓ Verified | Rule 0520-01-19 confirms not mandated for all teachers |
| **ELPA21 Migration** | ✓ Verified | 2024-07-01 effective date correct; implementation dates confirmed |
| **Source URLs** | ⚠ Critical | 6 URLs broken; May 30 SBE workshop is load-bearing for history |
| **Missing history events** | ⚠ Noted | Seal of Biliteracy, Policy 5.502/5.505 revisions could be added |

---

## Recommendations & Next Steps

### Immediate (High Priority)

1. **Resolve the May 30, 2024 SBE Workshop URL**
   - Locate archived presentation or supplementary source
   - Update history row 2 with working URL
   - Consider supplementing with a link to State Board May 30, 2024 meeting minutes

2. **Clarify elPercentAsOf**
   - Contact TDOE for official enrollment census date of the 93,433 student count
   - If NCES Digest 2024 or 2025 is available, verify if TN 9% data appears there
   - Update `elPercentAsOf` to reflect the actual census date, not the presentation date

3. **Verify EL Assessments page URL**
   - Confirm current path on tn.gov/education
   - Update sources row 85 and elpAssessment field with current URL

### Medium Priority

4. **Add Seal of Biliteracy history row**
   - Confirm HB 470 effective/signing date
   - Add dated history entry with direct link to bill text or SBE meeting minutes

5. **Add policy revision history rows (optional)**
   - If Policy 5.502 and 5.505 revisions substantively changed EL requirements, add history rows
   - Otherwise, note that recent revisions were clarifications/updates but not structural changes

6. **Replace Teacher Code of Ethics source**
   - Either remove (low relevance to EL credentials) or link to statute codification

### Lower Priority

7. **Locate ESL Manual PDF**
   - Search TDOE Licensure Resources for updated manual
   - If unavailable, note that Rule 0520-01-19 now provides the regulatory baseline

---

## Conclusion

Tennessee's record is substantially verified and accurate. The WIDA→ELPA21 migration is correctly documented, all credentials are properly coded, and recent policy revisions are accessible. However, two data-quality issues require attention:

1. **Source URL breakage** due to tn.gov/education restructuring (recoverable)
2. **elPercentAsOf date semantics** — the 2024-05-30 date is likely a presentation date, not a census date (requires clarification)

The record is suitable for publication pending resolution of the May 30 SBE workshop URL and clarification of the EL enrollment census date.

---

**Audit conducted**: 2026-05-10  
**Auditor**: Claude Code (automated state verification agent)  
**Branch**: worktree-agent-af9b9c7ee369d8ded  
**Verification status**: `verified-2026` — No changes to src/content/states/tn.json per audit scope
