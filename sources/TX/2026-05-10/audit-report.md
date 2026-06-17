# Texas (TX) — Audit Report

Audit date: 2026-05-10  
Auditor: projectcert-2026 (orchestrator subagent)  
Branch: worktree-agent-a34c5ed5a70446da8  
Basis: `src/content/states/tx.json` as of commit `1a62e39`  
Sources directory: `sources/TX/2026-05-08/` (prior verification)  
NCES table: `sources/KS/2026-05-08/nces-table-204-20.html` (shared cross-state snapshot of NCES Digest Table 204.20, d23)

---

## 1. Critical findings (action required)

### 1.1 META_PROCESS_VIOLATION — `history[2]` is a process-meta row

The third history entry is:

```json
{
  "date": "2019-12-01",
  "title": "Baseline coding (Leider, Colombo & Nerlino, 2021)",
  "description": "Initial coding of the SEA's bilingual, ELD/ESL, and SEI credentials ...",
  "sourceUrls": ["https://doi.org/10.14507/epaa.29.5279"]
}
```

This row describes the *verification process*, not a substantive policy event. It survived commit `1a62e39` ("Drop process-meta history rows"), which removed a different TX process-meta row (the `2026-05-08` "Re-audited" row) but left this 2019-12-01 row untouched. The row violates the `history[]` intent established in that commit: "history is for substantive events," and the audit trail already lives in `sources/TX/*/changes-from-baseline.md`.

**Recommended fix:** Remove this row from `tx.json`; no substantive information is lost.

---

## 2. History rows — verification

### 2.1 Row 0: 1973-06-12 — Texas Bilingual Education and Training Act

| Field | Value | Assessment |
|---|---|---|
| date | 1973-06-12 | SB 121 signed June 12, 1973 (63rd Legislature). Plausible; session law date not independently re-verified from a bill-text URL but consistent with historical record. |
| title | "Texas Bilingual Education and Training Act enacted (SB 121, 63rd Legislature)" | Accurate. |
| description | Mentions SB 477 (1981) expansion and U.S. v. Texas (Civ. Action 5281). | Accurate and relevant. However, SB 477 (1981) is a distinct, substantive legislative event that arguably merits its own row (see §3 below). |
| sourceUrl | `https://statutes.capitol.texas.gov/Docs/ED/htm/ED.29.htm` | Codified TEC Chapter 29 — acceptable per project policy (codified URLs preferred over session-law numbers). The URL does not point to the original 1973 session law, but the codified chapter preserves the statutory backbone. |

**Status:** Acceptable as is. SB 477 bundling is a minor gap; see §3.1.

### 2.2 Row 1: 1981-06-23 — Castañeda v. Pickard

| Field | Value | Assessment |
|---|---|---|
| date | 1981-06-23 | 648 F.2d 989 (5th Cir. 1981). Decision date June 23, 1981. Confirmed. |
| title | Accurate. | |
| description | Correct summary of three-prong EEOA test. | |
| sourceUrl | `https://law.justia.com/cases/federal/appellate-courts/F2/648/989/` | Justia is the preferred source for federal cases per project policy. Confirmed. |

**Status:** Correct.

### 2.3 Row 2: 2019-12-01 — Baseline coding

META_PROCESS_VIOLATION — see §1.1.

---

## 3. Missing history events

The following substantive events are not currently represented in `history[]`. Events are listed in chronological order with recommended `sourceUrls`; all are grounded in information verifiable against the retrieved TAC source files or well-established public record.

### 3.1 1981 — SB 477 / U.S. v. Texas consent decree expansion

**What happened:** U.S. v. Texas (Civil Action 5281, E.D. Tex.), a class-action suit on behalf of Mexican-American students, produced a 1981 federal-court order that compelled Texas to expand its bilingual education mandate. In response, the 67th Legislature passed SB 477 (1981), extending the bilingual program requirement from K–3 to K–elementary (through at least Grade 5) and adding the requirement that districts offer ESL programs when bilingual program enrollment thresholds are not met. The current 20-students-same-grade-level-district-wide threshold in 19 TAC §89.1205(a) descends from SB 477.

**Recommended row date:** `1981-06-01` (approximate; session ended May–June 1981, exact signing date not verified here).  
**Recommended sourceUrl:** `https://statutes.capitol.texas.gov/Docs/ED/htm/ED.29.htm` (same as the 1973 row).  
**Priority:** Low–Medium. The description in the 1973 row already mentions this; a standalone row would add precision.

### 3.2 1982-06-15 — Plyler v. Doe, 457 U.S. 202

**What happened:** The Supreme Court's landmark ruling in Plyler v. Doe originated in Texas (Tyler ISD). The Court held that the Equal Protection Clause prohibits states from denying a free public education to undocumented children. While Plyler does not directly address EL teacher certification, it established the constitutional floor for access to education that undergirds all subsequent EL-program obligations for undocumented EL students and is cited in TEA guidance. The case is referenced alongside Castañeda in federal oversight of Texas EL programs.

**Recommended sourceUrl:** `https://supreme.justia.com/cases/federal/us/457/202/`  
**Priority:** Medium. Plyer's Texas origin makes it directly relevant to the TX record, and other data-dense states' records include seminal cases. However, Plyler's connection to *teacher credentialing* is indirect.

### 3.3 2008 — TAC §74.4 English Language Proficiency Standards (ELPS) adopted

**What happened:** The State Board of Education adopted 19 TAC §74.4, the English Language Proficiency Standards, effective August 22, 2008. The ELPS established student linguistic expectations in four domains (listening, speaking, reading, writing) aligned to five proficiency levels, and required all content-area teachers — not just ESL/bilingual teachers — to integrate ELPS into instruction. The ELPS are referenced throughout 19 TAC §89.1210 (see retrieved HTML). The 2007 amendment to Chapter 89 (37 TexReg 3105 → 32 TexReg 6311) anticipated the ELPS framework. This is the structural precursor to the Science of Teaching Reading (STR) requirements being layered into bilingual/ESL certification under §233.2(f)–(g) (effective 2028).

**Recommended sourceUrl:** `https://statutes.capitol.texas.gov/Docs/ED/htm/ED.74.htm` (codified TEKS including §74.4) or the official TAC page `https://tea.texas.gov/sites/default/files/ch074dd.pdf`.  
**Priority:** High. The ELPS are the most consequential EL policy framework between 1996 and 2019 for Texas classroom teachers and are explicitly referenced in the current program rules.

### 3.4 2020-04-14 — 19 TAC Chapter 89 Subchapter BB amended (HB 3, 86th Legislature, 2019)

**What happened:** The 86th Texas Legislature (2019) passed HB 3 (omnibus school finance), which included structural amendments to TEC Chapter 29 Subchapter B regarding bilingual/ESL program models and accountability. The Commissioner's implementing rules took effect April 14, 2020 (45 TexReg 2415), amending §§89.1201, 89.1205, and 89.1210. Key changes included: clarifying the four bilingual program models (transitional early-exit, transitional late-exit, dual-language one-way, dual-language two-way) and the two ESL models (content-based, pull-out); aligning district obligations to the new school-finance allotments for emergent bilingual students; and revising LPAC procedures.

**Source confirmation:** All three retrieved txrules HTML files show "amended to be effective April 14, 2020, 45 TexReg 2415" in their Source Notes.  
**Recommended sourceUrl:** `https://statutes.capitol.texas.gov/Docs/ED/htm/ED.29.htm`  
**Priority:** High. This is a major regulatory amendment directly affecting the credential framework.

### 3.5 2023-08-09 — 19 TAC Chapter 89 Subchapter BB amended — "emergent bilingual" terminology (HB 1414, 88th Legislature)

**What happened:** The 88th Texas Legislature (2023) passed HB 1414, which replaced "English learner (EL)" with "emergent bilingual (EB)" as the statutory student term throughout TEC Chapter 29 and related provisions. The Commissioner's implementing rules took effect August 9, 2023 (48 TexReg 4247), amending §§89.1201, 89.1205, and 89.1210. This is the most recent substantive amendment to the Chapter 89 Subchapter BB framework.

**Source confirmation:** All three retrieved txrules HTML files show "amended to be effective August 9, 2023, 48 TexReg 4247" in their Source Notes. The current rule text uses "emergent bilingual" throughout (confirmed in all three HTML snapshots).  
**Recommended sourceUrl:** `https://statutes.capitol.texas.gov/Docs/ED/htm/ED.29.htm`  
**Priority:** High. The terminology shift has downstream effects on how the record describes the student population, and the JSON `notes` already acknowledges this change.

---

## 4. `elPercent` / `elPercentAsOf` verification

**Recorded:** `elPercent: 20.2`, `elPercentAsOf: "2021-10-01"`  
**Source:** NCES Digest of Education Statistics 2023, Table 204.20, Fall 2021.

Cross-check against the KS NCES table snapshot (`sources/KS/2026-05-08/nces-table-204-20.html`), which is a complete state-by-state HTML rendering of Table 204.20, d23. Texas row confirmed: Fall 2021 = **20.2%**.

**Verdict:** Correct. No change needed.

### 4.1 NCES `elPercentHistory[]` data (schema field not yet defined)

The table covers Fall 2011–Fall 2021. TX percentage column values (all confirmed from NCES d23 HTML parse):

| Year (fall) | EL % | EL count |
|---|---|---|
| 2011 | 14.9 | 747,422 |
| 2012 | 15.2 | 773,732 |
| 2013 | 15.7 | 809,582 |
| 2014 | 16.4 | 860,513 |
| 2015 | 16.8 | 892,000 |
| 2016 | 17.2 | 921,937 |
| 2017 | 17.1 | 926,236 |
| 2018 | 17.8 | 966,522 |
| 2019 | 18.6 | 1,021,540 |
| 2020 | 19.3 | 1,034,543 |
| 2021 | 20.2 | 1,093,968 |

Notable: Fall 2017 shows a slight dip (17.1%) from Fall 2016 (17.2%). Texas is the only state with absolute EL enrollment above 1 million as of Fall 2021. This data is available whenever the schema gains an `elPercentHistory[]` field.

For years predating 2011, TEA's PEIMS (Public Education Information Management System) annual reports would be the primary source. PEIMS data was not retrieved in this session.

---

## 5. Credentials and standards spot-check

### 5.1 Bilingual credentials

**Bilingual Education Supplemental (§233.6):** Confirmed as the primary add-on credential pathway. Required exams: BTLPT (#190), Bilingual Supplemental (#164), Core Subjects EC-6, PPR/edTPA. All confirmed via retrieved test chart.

**Core/Bilingual Education Spanish with STR EC-6 (§233.2(f)):** New standalone base certificate, issuable September 1, 2028. Correctly coded: `standalone: true`, `addOn: true`. No change needed.

**Bilingual Special Education Supplemental EC-12 (§233.8(a)):** New credential effective September 1, 2027. Not separately coded in the schema (no dedicated field for special-ed variants), but noted in `bilingual.notes`. Acceptable.

**`languageProficiency: true`:** Confirmed. BTLPT is an explicit target-language proficiency test (Spanish or other covered language).

### 5.2 ELD credentials

**ESL Supplemental (§233.7):** Confirmed as add-on only. Required exam: ESL Supplemental (#154), PPR/edTPA. `standalone: false` is correct — the §233.7 credential is explicitly supplemental.

**Core/ESL Supplemental with STR EC-6 (§233.2(g)):** New credential, issuable September 1, 2028. Not standalone ESL; coded correctly as `addOn: true`, `standalone: false`.

**`languageProficiency: false`:** Confirmed. No target-language proficiency test required for ESL Supplemental.

### 5.3 SEI

**`mandatedForAllTeachers: false`:** Confirmed. TEC Chapter 29 Subchapter B mandates bilingual/ESL services, not a universal SEI training requirement. The ELPS (TAC §74.4) require all content-area teachers to address language proficiency standards, but this is curriculum integration, not an SEI credential mandate. No change needed.

### 5.4 Professional standards

**`diverse: true`, `cultural: true`, `linguistic: true`, `el: true`:** All confirmed. 19 TAC §89.1210(b)(1)(A)–(B) explicitly requires programs to "incorporate the cultural aspects of the students' backgrounds." The ELPS integrate linguistic expectations across all content areas. The 2023 amendments reinforce EL/EB mentions throughout.

### 5.5 Seal of Biliteracy

**`adopted: true`, `year: 2013`:** Confirmed. The cross-state seal-of-biliteracy provenance README (`sources/seal-of-biliteracy/2026-05-07/README.md`) records Texas as a 2013 adopter, consistent with sealofbiliteracy.org and the Wikipedia adoption table. HB 1547 (83rd Legislature, 2013) is the likely enabling legislation — year: 2013 is correct.

Note: The task prompt references "HB 1547, 2017" but this appears to be a labeling error in the prompt; the 85th Legislature (2017) would not match the 2013 adoption year recorded by all canonical sources. The JSON year: 2013 is the defensible figure.

**`sourceUrl: "https://sealofbiliteracy.org/"`:** Functional as a chain-of-custody link. A TX-specific URL (e.g., `https://tea.texas.gov/...` announcing the seal) would be stronger, but the current citation is adequate.

### 5.6 ELP assessment

**TELPAS (Texas English Language Proficiency Assessment System):** Confirmed as state-specific (`consortium: null`). Retrieved via TEA EL testing page (`sources/TX/2026-05-08/` does not contain a separate TELPAS snapshot, but the TEA source URL in `sources[]` is adequate).

---

## 6. Source provenance

All nine `sources[]` entries have `retrievedAt` dates and `retrievedBy` values. The two `leider-2021` entries use `retrievedAt: "2019-11-15"` (the baseline window). The seven `projectcert-2026` entries use `retrievedAt: "2026-05-08"` and all correspond to files in `sources/TX/2026-05-08/`.

**Gap:** No `sources/TX/2026-05-08/` directory entry for the NCES source (source #9 points to the d23 Table 204.20 URL). The NCES data was verified via the cross-state KS snapshot, which is in `sources/KS/2026-05-08/nces-table-204-20.html`. This is an acceptable cross-state shared source (analogous to the `sources/nces/` pattern used elsewhere). No integrity check violation expected.

---

## 7. Summary of recommendations

| Priority | Issue | Recommended action |
|---|---|---|
| **Critical** | `history[2]` — 2019-12-01 "Baseline coding" is a META_PROCESS_VIOLATION | Remove row from `tx.json` |
| High | Missing history: 2023-08-09 TAC Chapter 89 amended (HB 1414, "emergent bilingual" rename) | Add history row |
| High | Missing history: 2020-04-14 TAC Chapter 89 amended (HB 3, 86th Legislature) | Add history row |
| High | Missing history: TAC §74.4 ELPS adopted (~2008) | Add history row |
| Medium | Missing history: Plyler v. Doe (1982) | Add history row (optional; EL access rather than credentialing) |
| Low | SB 477 (1981) in description of 1973 row — could be its own row | Separate row would add precision; current bundling is acceptable |
| Informational | `elPercentHistory[]` data available from NCES d23 (Fall 2011–2021) | Populate when schema gains the field |
| Informational | `sealOfBiliteracy.sourceUrl` could be TX-specific rather than sealofbiliteracy.org | Low priority; current citation is adequate |

**No credential field changes needed.** All coded values are consistent with the retrieved 19 TAC Chapter 233 and Chapter 89 sources. `verificationStatus: "verified-2026"` is correctly set.
