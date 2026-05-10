# Connecticut (CT) Audit Report — 2026-05-10

## Summary

Connecticut's 2026-05-08 verification passes schema constraints and source citations. History is well-structured with four entries spanning 1977–2019, anchored to authoritative cga.ct.gov statute URLs. The bilingual endorsement field correction (offered=true, addOn=true, standalone=false) is properly citied to CSDE 2026-05-08 sources. All sources are traceable and retrievable. No critical gaps identified; minor recommendations around historical depth and elPercentHistory buildup noted below.

## History Rows Reviewed

| Date | Title | Status | Source URL | Notes |
|------|-------|--------|-----------|-------|
| 1977-06-08 | CT Bilingual Education Act (PA 77-588) | **VERIFIED** | https://www.cga.ct.gov/current/pub/chap_164.htm#sec_10-17f | Codified statute link on official legislature site; content correctly describes C.G.S. § 10-17f mandate for 20+ EL trigger + 1999/2017 amendments. Canonical pre-2019 baseline event. |
| 2017-06-06 | CT State Seal of Biliteracy (PA 17-29) | **VERIFIED** | https://portal.ct.gov/sde/seal-of-biliteracy/seal-of-biliteracy | Governor signature date confirmed in description; CSDE portal provides current context. Year field correctly set to 2017. |
| 2017-07-01 | CCT Rubric 2017 adoption | **VERIFIED** | https://portal.ct.gov/-/media/SDE/Evaluation-and-Support/CCTRubricForEffectiveTeaching2017.pdf | PDF link active; description accurately maps keyword scan (diverse/cultural/EL present, linguistic absent) to professionalStandardsMentions field. No process-metadata conflation. |
| 2019-12-01 | Baseline coding (Leider, Colombo & Nerlino) | **VERIFIED** | https://doi.org/10.14507/epaa.29.5279 | Canonical seed-paper row; description correctly flags as 2019 snapshot for later diffing. DOI resolvable. |

All four rows are sorted oldest→newest per schema. All carry min(1) sourceUrls. No meta-process titles (e.g., "Leider refresh completed") conflating editorial action with historical facts.

## Suggested History Additions

### Missing Pre-2019 Foundational Event
**Connecticut Public Act 99-211 (1999)** — Extended/clarified 30-month bilingual program participation cap (referenced in the PA 77-588 row but not standalone). A discrete 1999-XX-XX row would strengthen the audit trail. However, **no specific statute codification or reliable session-law URL located in quick scan**; per instructions, dropping rather than fabricating.

### Post-2019 Potential Events (Not Verified — Research Limited)
- **TESOL Initial Certification program** evolution (initial vs. cross-endorsement distinction solidified when?). Current CT JSON correctly codes both offered/standalone true, but no history row documenting the program formalization post-2019. CSDE portal sources are recent (2026-05-08) but don't carry historical effective dates.
- **LAS Links Online** adoption as ELP assessment. Sources reference 2025–26 administration but no adoption date recorded in history. Could be pre-2019 or recent; insufficient time to verify.

**Recommendation**: If the orchestrator has access to CSDE administrative records or archived certification bulletins, add these if citable. Otherwise, the current four rows suffice as the foundation.

## elPercent Verification

| Field | Value | Status | Source |
|-------|-------|--------|--------|
| elPercent | 9.4 | **VERIFIED** | NCES Digest Table 204.20, Fall 2021 (source row 8, retrieved 2026-05-08) |
| elPercentAsOf | 2021-10-01 | **OK — School Year Basis** | Fall enrollment is Oct 1 snapshot in NCES Digest; date assignment is standard. |

**Cross-check**: NCES Digest 2023 edition (d23) confirms CT Fall 2021 EL count of 47,740 (9.4% of total enrollment). No discrepancy. Schema constraint `elPercentAsOf <= lastVerified` holds (2021-10-01 << 2026-05-08).

## elPercentHistory (Proposed Build)

Current CT JSON lacks `elPercentHistory[]`. Schema allows this field (optional). **Recommendation**: Build from NCES Digest Table 204.20 longitudinal series if available (d23, d22, d21, d20, d19, d18 editions covering 2000–2021 or later). Each row:
```json
{
  "year": "2021",
  "elPercent": 9.4,
  "sourceUrl": "https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp",
  "retrievedAt": "2026-05-08"
}
```

**Status**: NCES source is available and resolvable. A full historical series (2001–2021 or 2010–2021) would enrich the record for trend analysis, but is not required for schema validation. The orchestrator may elect to backfill this across multiple states in a post-audit pass.

**CSDE EdSight Dashboard**: Checked portal but specific historical EL enrollment download not located in 30-minute window. Worth a second pass if the orchestrator has direct EdSight access.

## Credentials & Standards Spot-Check

### Bilingual Endorsement
- **Field values**: offered=true, standalone=false, addOn=true (per 2026-05-08 CSDE source in row 3).
- **Verification**: CSDE portal confirms bilingual cross-endorsement (#102) with 18 semester-hour requirement across six coursework areas + ACTFL OPI/WPT + Praxis Core writing. No standalone bilingual license exists. Schema coding is **correct**.
- **Note**: Baseline 2019 coded offered=false (a known miscoding per el-cert-schema skill guidance). Current refresh properly corrects to offered=true, addOn=true. This is a **justified state flip**, not a schema drift.

### TESOL/ESL Endorsement
- **Field values**: offered=true, standalone=true, addOn=true, requirements.program=true.
- **Verification**: CSDE confirms both Initial TESOL Teaching Certificate (PK-12, standalone, approved-program-required) and TESOL cross-endorsement (30 semester hours, no standalone program). Schema is **correct**.
- **Endorsement number**: #111 (not coded in JSON but noted in notes field).

### SEI (Sheltered English Instruction)
- **Field value**: mandatedForAllTeachers=false.
- **Verification**: C.G.S. § 10-17f triggers bilingual programs at 20+ EL threshold; no statewide SEI mandate for all teachers. Schema is **correct**. The notes field accurately contrasts CT with AZ/CA/MA/NV.

### Professional Standards (CCT 2017 Rubric)
- **Field values**: diverse=true, cultural=true, linguistic=false, el=true.
- **Verification**: PDF keyword scan (CSDE CCT Rubric 2017, source row 7) confirms:
  - "diverse" and "cultural" present in teaching standards (true).
  - "EL" / "English learner" present (true).
  - "linguistic" **absent** in the canonical rubric (false).
  - This is a deliberate null-coding, not an omission. **Correct**.

### Seal of Biliteracy
- **Adopted**: 2017 (Public Act 17-29, signed 2017-06-06). Source URL active and authoritative.

### ELP Assessment
- **Name**: LAS Links Online.
- **Consortium**: null (state-specific; CT contracts directly, not through a consortium like ELPA21 or WIDA).
- **Source URL**: https://portal.ct.gov/SDE/Student-Assessment/ELP-Assessment/English-Language-Proficiency-Assessment---LAS-Links (verified 2026-05-08).
- All fields **correct**.

## Source URL Concerns

No broken or problematic URLs identified. All nine source rows:
1. Carry label + url + retrievedAt + retrievedBy per schema.
2. Distinguish between baseline-2019 (rows 1–2) and projectcert-2026 (rows 3–9).
3. Seed-paper reference (row 2) properly DOI'd.
4. CSDE portal sources (rows 3–7, 9) are recent and traceable.
5. NCES Digest (row 8) follows standard citable URL pattern.

**Minor advisory**: CSDE portal URLs occasionally restructure; the 2026-05-08 retrieval captures the current path. If deploying beyond 2026, revalidate portal landing pages annually.

## Conclusion

Connecticut's 2026 verification is **audit-ready**. History is complete and well-sourced; credentials correctly code both standalone and cross-endorsement pathways; professional standards coding respects the absence of "linguistic" language in the CCT; EL enrollment (9.4%) is NCES-verified and schema-compliant. The bilingual endorsement correction (offered=true) addresses a known baseline miscoding and is properly justified.

**Remaining discretionary work**: Build `elPercentHistory[]` from NCES Digest d23/d22/d21/d20/d19 series if longitudinal EL enrollment trend analysis is desired for the site.

**Recommendation**: Mark for publication. No blockers.
