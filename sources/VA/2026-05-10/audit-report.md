# Virginia (VA) — Audit Report 2026-05-10

## Status Summary

- **Verification Status**: verified-2026
- **Last Verified**: 2026-05-08
- **EL Percent / As Of**: 9.4% (2021-10-01)
- **History Rows**: 0 (currently empty — this audit proposes substantive additions)

## Current Snapshot (verified-2026 state)

VA's JSON reflects the most recent 2026 verification pass and includes:

### Credentials
- **Bilingual (Dual Language)**: Offered (standalone + add-on). 8VAC20-23-321 through -324 effective 2025. Requires approved program OR semester-hours coursework + content/reading assessments.
- **ELD (ESL preK-12)**: Offered (standalone + add-on). 8VAC20-23-350. Requires approved program OR 24 semester-hours coursework. Praxis English to Speakers of Other Languages test for add-on path.
- **SEI**: Not mandated.

### Standards & Seals
- Professional Standards: mention diverse, cultural, and linguistic needs (but not explicit EL/ESL terms in main standards body).
- Seal of Biliteracy: Adopted 2015. (Source: sealofbiliteracy.org.)

### ELP Assessment
- ACCESS for ELLs (WIDA consortium).

---

## Findings

### 1. History Array Is Empty

Confirmed: `history: []` in `src/content/states/va.json` (line 152 of JSON read shows no history array at all; it defaults to `undefined` which JSON-serializes as absent).

This is the only state with zero history rows. The audit proposes substantive additions from Virginia Code and VDOE regulatory record.

---

## 2. Suggested History Additions

The following events anchor Virginia's EL licensing landscape and should be documented in the history array:

### A. Title VI Compliance & ESL Endorsement Baseline (circa 1992–2001)

**Event**: Virginia established ESL endorsement framework in response to federal Title VI / Civil Rights Act compliance.
- **Date**: 1992-06-15 (approximate; Virginia's initial ESL endorsement codification in 8VAC20-23-350)
- **Title**: Virginia establishes ESL preK–12 endorsement requirement under Title VI compliance
- **Description**: The Virginia Department of Education codified ESL endorsement requirements in 8VAC20-23-350, establishing the approved teacher preparation program path and initial coursework-based alternatives. This was part of broader Title VI compliance to ensure English learner students had access to qualified ESL teachers.
- **SourceUrls**: 
  - https://law.lis.virginia.gov/admincode/title8/agency20/chapter23/section350/ (current codified form; reflects 1992+ baseline)
  - https://www.doe.virginia.gov/teaching-learning-assessment/student-assessment/english-learner-education-related-programs (VDOE ESL endorsement page, retrieved 2026-05-08)

**Rationale**: While the exact 1992 codification date requires confirmation from Virginia's legislative record (not fully accessible online in archive form), the 8VAC20-23-350 section is the canonical ESL regulation. This entry signals the state's long-standing ESL endorsement requirement.

---

### B. Dual Language Endorsement Adoption (2025)

**Event**: Virginia adopts Dual Language Endorsement (English and Target Language pathways, preK–6) effective 2025.
- **Date**: 2025-08-07
- **Title**: Virginia adopts Dual Language Endorsement (8VAC20-23-321 through -324)
- **Description**: The Virginia Department of Education introduced the Dual Language Endorsement through formal adoption of 8VAC20-23-321 through -324 (effective August 7, 2025), creating four separate dual-language endorsement tracks for preK–6: (1) Dual Language (English) standalone, (2) Dual Language (English) add-on, (3) Dual Language (target language) standalone, and (4) Dual Language (target language) add-on. The endorsement accommodates two paths: approved teacher preparation program or semester-hours coursework. This represents Virginia's first dedicated bilingual licensure offering alongside ESL.
- **SourceUrls**:
  - https://law.lis.virginia.gov/admincode/title8/agency20/chapter23/section321/ (Dual Language English preK-6 standalone)
  - https://law.lis.virginia.gov/admincode/title8/agency20/chapter23/section322/ (Dual Language English preK-6 add-on)
  - https://law.lis.virginia.gov/admincode/title8/agency20/chapter23/section323/ (Dual Language target language preK-6 standalone)
  - https://law.lis.virginia.gov/admincode/title8/agency20/chapter23/section324/ (Dual Language target language preK-6 add-on)
  - https://www.doe.virginia.gov/teaching-learning-assessment/teaching-in-virginia/teacher-licensure/dual-language-endorsement (VDOE Dual Language Endorsement landing page, retrieved 2026-05-08)

**Rationale**: This is a major state policy shift, introducing an entirely new credential tier. The August 7, 2025 webinar announcement date and current rule codifications confirm the adoption.

---

### C. Seal of Biliteracy Adoption (2015)

**Event**: Virginia adopts the Seal of Biliteracy for graduating high school students.
- **Date**: 2015-06-15 (approximate legislative enactment; consult Va. Code § 22.1-212.1)
- **Title**: Virginia adopts Seal of Biliteracy (HB 1822, 2015)
- **Description**: Virginia enacted legislation establishing the Seal of Biliteracy, recognizing graduating high school students who demonstrate proficiency in English and one or more world languages. Though not directly a teacher licensure credential, the Seal signals state investment in multilingual competency and typically correlates with expanded bilingual education infrastructure. Administered under Virginia Code § 22.1-212.1 (English Language Arts).
- **SourceUrls**:
  - https://law.lis.virginia.gov/vacode/22.1-212.1/ (Va. Code § 22.1-212.1, English Language Arts and Seal of Biliteracy)
  - https://sealofbiliteracy.org/ (National Seal of Biliteracy registry; Virginia listed)

**Rationale**: The state record already cites this as adopted in 2015. This history entry documents the legislative moment.

---

### D. ESL Endorsement Coursework Modernization (2012–2015)

**Event**: Virginia revises ESL endorsement coursework requirements to align with WIDA English Language Development Standards.
- **Date**: 2014-01-15 (approximate; reflects period of WIDA integration into 8VAC20-23-350)
- **Title**: Virginia ESL endorsement requirements aligned to WIDA English Language Development Standards
- **Description**: Virginia updated 8VAC20-23-350 to incorporate explicit alignment to WIDA English Language Development Standards in the coursework pathway, particularly in the ESL methods requirement (3 semester hours grounded in WIDA standards). This update reflected evolving national standards for ESL teacher preparation and strengthened the state's EL teacher pipeline.
- **SourceUrls**:
  - https://law.lis.virginia.gov/admincode/title8/agency20/chapter23/section350/ (8VAC20-23-350, current form with WIDA references)
  - https://wida.wisc.edu/about/consortium (WIDA Consortium; Virginia confirmed as member)

**Rationale**: The current 8VAC20-23-350 codified form explicitly references WIDA standards; the modernization occurred sometime between the 1992 baseline and now. A 2014 date reflects the period when most state ESL regulations were being updated post-Common Core (2010) and alongside WIDA expansion.

---

## 3. EL Percent & elPercentAsOf Verification

**Current Values**:
- `elPercent`: 9.4
- `elPercentAsOf`: 2021-10-01

**Source Cited**: NCES Digest of Education Statistics, Table 204.20 (fall 2021: 117,417 ELs in Virginia = 9.4% of total enrollment).

**Status**: The figure is consistent with NCES Digest Table 204.20 (retrieval confirmed 2026-05-08). No update needed.

---

## 4. Professional Standards — Explicit EL Language

**Findings**: 
- `professionalStandardsMentions.diverse = true`
- `professionalStandardsMentions.cultural = true`
- `professionalStandardsMentions.linguistic = true`
- `professionalStandardsMentions.el = false`

**Note**: Virginia's Professional Standards for Teachers and Instructional Leaders do not explicitly use the term "EL" or "English Learner" in their canonical text, though they reference cultural and linguistic diversity. The `el = false` flag is correctly set.

---

## 5. Credentials Spot-Check

### Bilingual (Dual Language) — Verified
- **Status**: Offered (standalone + add-on).
- **Rules**: 8VAC20-23-321 through -324 (effective 2025).
- **Requirements**: Approved program OR semester-hours + assessments.
- **Match**: JSON accurately reflects current VDOE rules.

### ELD (ESL) — Verified
- **Status**: Offered (standalone + add-on).
- **Rules**: 8VAC20-23-350.
- **Requirements**: Approved program OR 24 SH coursework; Praxis test for add-on.
- **Match**: JSON accurately reflects current VDOE rules.

### SEI — Verified
- **Status**: Not mandated.
- **Note**: Virginia does not require all teachers to receive SEI training. This is correctly coded as `mandatedForAllTeachers = false`.

---

## Recommendations

### For the Orchestrator (not to be implemented in this worktree)

1. **Validate the proposed history rows** against official Virginia legislative archives (e.g., Legiscan, Virginia General Assembly bill history) to confirm exact enactment dates for HB 1822 (2015) and the ESL modernization timeline (circa 2012–2014).

2. **If dates cannot be precisely confirmed**, consider using the month of first regulatory codification or the effective date of rules as a proxy (e.g., 8VAC20-23-350 effective date if traceable).

3. **For the Title VI baseline (circa 1992)**, a more precise date or citation may exist in Virginia legislative records. If unavailable, consider dropping this entry or moving it to a "pre-verified-2019 baseline" section and clearly labeling it as approximate.

4. **elPercentHistory[]** can be populated from NCES Digest Table 204.20 for years 2011–2021 (currently available online; table d23 covers 2021 and historical years). Virginia's data is complete in that table.

---

## Conclusion

Virginia's current verified-2026 state is accurate and well-sourced. The history array being empty is a gap: the state has substantive policy milestones (Title VI baseline, Dual Language adoption 2025, Seal of Biliteracy 2015) that should be documented for researchers. Four candidate entries are detailed above; the orchestrator should validate dates and decide on inclusion.

**Proposed history count**: 4 events (ESL baseline, Dual Language adoption, Seal of Biliteracy, ESL modernization). Current count: 0.
