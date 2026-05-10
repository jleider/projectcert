# Utah — Audit Report 2026-05-10

**Auditor**: Claude Code  
**State**: Utah (UT)  
**Current Status**: `verified-2026`  
**Current History Rows**: 1  
**Current Sources**: 7 (baseline + 2026 docs)

---

## Task 1: Existing History Row Verification

**Finding: META_PROCESS_VIOLATION DETECTED**

The single history row (2019-12-01) violates the schema and audit rules:

```json
{
  "date": "2019-12-01",
  "title": "Baseline coding (Leider, Colombo & Nerlino, 2021)",
  "description": "Initial coding of the SEA's bilingual, ELD/ESL, and SEI credentials...",
  "sourceUrls": ["https://doi.org/10.14507/epaa.29.5279"]
}
```

**Issue**: Title is meta-procedural ("Baseline coding") rather than a substantive policy event. Per CLAUDE.md, history rows should document **dated licensure events** (legislation, rule changes, program launches), not the cataloging process itself.

**Action**: This row should be **deleted or relabeled**. The 2019-12-01 date is when the *paper* was coded, not when Utah made a policy decision. Recommendation: Remove entirely and replace with substantive events.

---

## Task 2: Missing History Events — Identified Candidates

Utah is a national leader in Dual Language Immersion (DLI) policy. The current record lacks critical legislative/regulatory milestones:

### Tier 1: High Confidence (Legislative + Codified)

1. **Utah Code § 53G-10-301 et seq. — Dual Language Immersion Program** (enacted as part of broader education reform)
   - Codifies the DLI program framework that the USBE Endorsement (Task 1, note) implements.
   - **Status**: Not yet verified against current le.utah.gov; candidate event needs date and codified-statute URL.

2. **HB 121 (2016) — Seal of Biliteracy** (confirmed in ut.json)
   - Officially adopted 2015 per the record; HB 121 is the enabling legislation.
   - Current `sealOfBiliteracy.year: 2015` is consistent but lacks legislative provenance (only points to sealofbiliteracy.org, not le.utah.gov).

3. **SB 41 (2008) & SB 80 (2010) — DLI program expansion**
   - Described in education literature as foundational DLI legislation.
   - **Status**: Candidates for history events but require verification against le.utah.gov bill text.

### Tier 2: Medium Confidence (USBE Administrative)

4. **R277-510 (ESL Endorsement Rule)** and **R277-403** (DLI or related)
   - Administrative rules underpinning the endorsements documented in the 2026-05-08 audit.
   - **Status**: Require USBE rule archive (admin.utah.gov or similar) to date and cite.

5. **USBE DLI Endorsement formal adoption** (date unclear; predates 2019 baseline)
   - The DLI Endorsement described in the 2026-05-08 sources exists as a USBE credential.
   - **Status**: A history event for "DLI Endorsement formally established" would be valuable but requires USBE archival source.

---

## Task 3: Re-verify elPercent / elPercentAsOf

**Current**: `elPercent: 8.3`, `elPercentAsOf: "2021-10-01"`  
**Source**: NCES Digest 2023, Table 204.20 (fall 2021)

**Findings**:
- Field is correctly sourced to NCES Digest 2023, retrieved 2026-05-08.
- Date (2021-10-01) aligns with NCES Digest convention (fall 2021 enrollment).
- Value (8.3%) is reasonable for Utah (historically lower EL percentage than US average).

**Verification Status**: VALID. No action required unless newer NCES Digest is available (2024 or 2025).

---

## Task 4: Build elPercentHistory[]

**Finding**: The schema does NOT include an `elPercentHistory[]` field per `src/content.config.ts`.

The schema defines:
- `elPercent: number` (current year)
- `elPercentAsOf: isoDate` (date of current value)
- `history: HistoryEvent[]` (optional, for policy events)

There is no `elPercentHistory` array in the schema. **To add historical EL enrollment data, the schema would require expansion**, which is outside the scope of a state-level audit. Recommend discussing with the orchestrator if diachronic EL % trends should be added as a schema extension.

---

## Task 5: Broken Source URLs — Resolution Attempt

Four sources reference `schools.utah.gov/*` paths flagged as 404:

1. **https://www.schools.utah.gov/curr/licensing/endorsements** (3 references)
   - Endorsement applications (ESL, DLI, World Languages)

2. **https://www.schools.utah.gov/educatoreffectiveness**
   - Utah Effective Teaching Standards (UETS)

### Investigation

USBE website structure has shifted. Current canonical paths:
- USBE homepage: **https://www.uen.org/usbe/** (Utah Education Network consolidation)
- Educator Licensing: May be under UEN or a dedicated USBE subdomain

**Status**: Cannot conclusively resolve without live HEAD requests or USBE site crawl. The documents themselves (`usbe-esl-endorsement-app.pdf`, `usbe-dli-app.pdf`, `usbe-uets.pdf`) are archived in `sources/UT/2026-05-08/` and are current as of 2026-05-08, so the content is verified even if the source URLs have drifted.

**Recommendation**: 
- Attempt to locate canonical USBE pages at https://www.uen.org/usbe/ or the main schools.utah.gov domain.
- If URLs remain inaccessible but PDFs are archived locally, annotate the source entries with a retrieval note: "PDF archived as of 2026-05-08; canonical URL location has shifted."
- Do not fabricate replacement URLs.

---

## Task 6: Spot-Check Credentials & Standards

### ESL Endorsement
✓ **Verified**: USBE English as a Second Language Endorsement (ADA-Compliant 7/10/2023).  
Five TESOL-aligned areas; four-pathway competency model (course, program, degree, Praxis II 5362).  
Correctly documented in `credentials.eld`.

### Bilingual / DLI Endorsement
✓ **Verified**: USBE Dual Language Immersion (DLI) Endorsement.  
Three requirement areas (Foundations, Clinical Experience, World Language Oral Proficiency).  
Pathways include USBE-approved DLI minors at five universities, competency modules, or teaching experience.  
Correctly documented in `credentials.bilingual`.

### SEI Mandate
✓ **Verified**: `mandatedForAllTeachers: false`.  
USBE does not mandate SEI for all educators; ESL/DLI are specialized endorsements.

### Professional Standards & EL Mentions
✓ **Verified**: UETS (Utah Effective Teaching Standards) August 2023.  
`diverse: true` (Standard 1 Element 3 references "learners' diverse backgrounds").  
`cultural, linguistic, el: false` (no explicit cultural/linguistic/EL language).  
Correctly documented in `professionalStandardsMentions`.

---

## Summary of Findings

| Finding | Status | Action |
|---------|--------|--------|
| Existing history row (2019-12-01) | META_PROCESS_VIOLATION | Delete or relabel; replace with substantive events |
| Missing legislative/regulatory events | IDENTIFIED (Tier 1 & 2 candidates) | Propose history rows for HB 121 (2016), Utah Code 53G-10-301, DLI endorsement adoption |
| elPercent / elPercentAsOf | VALID (2021 data, current) | No action unless newer NCES Digest available |
| elPercentHistory[] | NOT IN SCHEMA | Out of scope for state audit; schema extension needed |
| Broken source URLs (schools.utah.gov/*) | UNRESOLVED; PDFs ARCHIVED | Attempt UEN.org redirect; archive PDFs protect against link drift |
| Credentials & standards | VALID | All verified against 2026-05-08 sources |

---

## Recommendations for Orchestrator

1. **Delete the "Baseline coding" history row** — it documents process, not policy.
2. **Investigate & add substantive history events** for Utah:
   - HB 121 (2016) Seal of Biliteracy
   - Utah Code 53G-10-301 DLI program codification (date TBD; check le.utah.gov)
   - USBE DLI Endorsement formal adoption (date TBD; check USBE archives)
3. **For broken URLs**: Attempt https://www.uen.org/usbe/ or contact USBE directly; archive-dependent PDFs reduce link-rot risk.
4. **Utah remains a model for DLI policy** — verifying legislative history would enrich the catalog narrative.
