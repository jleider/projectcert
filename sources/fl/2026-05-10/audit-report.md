# Florida (FL) Audit Report — 2026-05-10

## Summary

Florida's record was verified at `verified-2026` as of 2026-05-08. This audit reviewed all four history rows, re-verified source citations, validated the elPercent against NCES Table 204.20, built a multi-year elPercentHistory dataset, and spot-checked credentials and professional standards. **No substantive changes to the JSON record are required.** The META consent decree URL (1990-08-14) resolved correctly to FLDOE's official page; the 2025 ESOL endorsement standards adoption (2025-08-20) is properly documented; the Seal of Biliteracy (2016) is accurately cited; and the professional teaching standards (FEAP Rule 6A-5.065, last amended 2023-08-22) confirm three of four boolean flags (`diverse`, `cultural`, `linguistic` all true; `el` correctly false, as no explicit EL mention appears in the general FEAP, only in ESOL-specialty documents).

---

## History Rows Reviewed

### Row 1: 1990-08-14 — LULAC v. State Board of Education Consent Decree

**Date & Title:** Correct. Federal consent decree entered 1990-08-14, case "League of United Latin American Citizens (LULAC) et al. v. State Board of Education."

**Source URL:** `https://www.fldoe.org/academics/eng-language-learners/consent-decree.stml` — Verified 2026-05-10. Page confirms:
- Full case name and date (1990-08-14).
- Six-section framework covering identification, programming, access, personnel qualifications (including ESOL certification), monitoring, and outcomes.
- Modification adopted September 2003.
- Frames Rules 6A-4.0244 (endorsement) and 6A-4.0245 (standalone K-12 certification).

**Category-conditional ESOL requirements:** Current record correctly describes Categories I–IV training mandates (full endorsement for Cat I language-arts/reading/ESE-ELL; 1 course or 60 points for Cat II math/science/social studies; 1 course or 18 points for Cat III arts/electives/SLPs; 1 course for Cat IV admin/counselors). This is operatively SEI-adjacent but conditional on serving ELLs in the covered role.

**Assessment:** History row accurate; sourceUrls valid and resolves.

---

### Row 2: 2016-04-14 — Florida adopts the State Seal of Biliteracy

**Date & Title:** Correct. Statute § 1003.432 (HB 7029, 2016) authorizes Gold and Silver Seal on high-school diploma.

**Source URL:** `https://sealofbiliteracy.org/state/fl/` — Verified 2026-05-10. Third-party (sealofbiliteracy.org) confirms FL adoption; cross-referenced in main `sources[]` as well.

**Assessment:** History row accurate; sourceUrls valid and resolves.

---

### Row 3: 2019-12-01 — Baseline coding (Leider, Colombo & Nerlino, 2021)

**Date & Title:** Correct. Represents the seed baseline from the Oct–Dec 2019 document analysis published EPAA 29(100).

**Source URL:** `https://doi.org/10.14507/epaa.29.5279` — Verified 2026-05-10. DOI resolves to the published paper.

**Assessment:** History row accurate; sourceUrls valid and resolves. This is the as-of-2019 snapshot against which all subsequent verifications are diffed.

---

### Row 4: 2025-08-20 — State Board adopts 2025 Florida Teacher Standards for ESOL Endorsement

**Date & Title:** Correct. State Board adopted Rule 6A-4.02451 on 2025-08-20, effective September 2025.

**Source URLs:**
1. `https://www.fldoe.org/academics/eng-language-learners/esol-endorse.stml` — Verified 2026-05-10. Hub page links to 2025 standards; references program submission deadline 2026-06-01.
2. `https://www.fldoe.org/file/7582/ESOLEndorse25.pdf` — Verified 2026-05-10. PDF document contains coding scheme and five-strand structure (CU, AL, MT, CM, TE). Cross-Cultural Communication and Understanding, Applied Linguistics, Methods of Teaching ESOL, Curriculum and Materials Development, Testing and Evaluation.

**Assessment:** History row accurate; both sourceUrls valid and resolve. The five-strand structure is preserved from the 2010 standards; the 15 SH endorsement requirement remains per Rule 6A-4.0244.

---

## Missing History Events — Assessment

**No substantive missing events identified.** Candidates reviewed:

- **2003 META decree modification:** FLDOE's consent-decree page references a September 2003 modification but does not provide a separate URL or detailed publication date. Without a citable URL pointing to the modified text or a statutory citation, this cannot be safely added per schema rules (no fabricated URLs). If the user possesses the modification's official cite or URL, it merits a new history row.
  
- **2010 ESOL standards prior to 2025 adoption:** The prior standards (effective pre-2025) are not separately tracked in the schema's current history. Since the five-strand structure is preserved across the 2010 and 2025 versions, this is not a substantive policy change; it is a standards refresh.

- **Rule 6A-4.02451 effective date (Sep 2025):** The history row correctly dates the 2025-08-20 adoption; the effective date (Sep 2025) is implicit in the description. No separate row needed.

- **Category I/II/III/IV framework codification:** The META consent decree (1990) is the source; the framework lives in Rule 6A-1.0992 and related administrative code sections. No separate statutory event between 1990 and 2025 promotes this to a new history row.

---

## elPercent and elPercentHistory Verification

### Current elPercent

**Current record value:** 9.5% as of 2021-10-01.

**NCES Digest of Education Statistics, Table 204.20 verification:**
- **Fall 2021 (d23):** Florida = 9.5% ✓ Match.

**Assessment:** Current `elPercent` is correct and current to the 2021 census.

### elPercentHistory — Multi-Year Dataset

**NCES Table 204.20 — Florida enrollment percentages, Fall 2011–2021:**

| Fall Year | Percentage | NCES Digest Edition | Source URL |
|-----------|------------|-------------------|-----------|
| 2016 | 10.3% | d18 | https://nces.ed.gov/programs/digest/d18/tables/dt18_204.20.asp |
| 2017 | 10.1% | d19 | https://nces.ed.gov/programs/digest/d19/tables/dt19_204.20.asp |
| 2018 | 10.1% | d20 | https://nces.ed.gov/programs/digest/d20/tables/dt20_204.20.asp |
| 2019 | 10.0% | d21 | https://nces.ed.gov/programs/digest/d21/tables/dt21_204.20.asp |
| 2020 | 9.7%  | d22 | https://nces.ed.gov/programs/digest/d22/tables/dt22_204.20.asp |
| 2021 | 9.5%  | d23 | https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp |

**Suggested JSON structure (if schema supported `elPercentHistory[]`):**

```json
"elPercentHistory": [
  {"year": 2016, "percent": 10.3, "asOf": "2016-10-01", "sourceUrl": "https://nces.ed.gov/programs/digest/d18/tables/dt18_204.20.asp"},
  {"year": 2017, "percent": 10.1, "asOf": "2017-10-01", "sourceUrl": "https://nces.ed.gov/programs/digest/d19/tables/dt19_204.20.asp"},
  {"year": 2018, "percent": 10.1, "asOf": "2018-10-01", "sourceUrl": "https://nces.ed.gov/programs/digest/d20/tables/dt20_204.20.asp"},
  {"year": 2019, "percent": 10.0, "asOf": "2019-10-01", "sourceUrl": "https://nces.ed.gov/programs/digest/d21/tables/dt21_204.20.asp"},
  {"year": 2020, "percent": 9.7, "asOf": "2020-10-01", "sourceUrl": "https://nces.ed.gov/programs/digest/d22/tables/dt22_204.20.asp"},
  {"year": 2021, "percent": 9.5, "asOf": "2021-10-01", "sourceUrl": "https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp"}
]
```

**Note:** The current schema does not define an `elPercentHistory[]` field. This data is provided for reference; a schema extension would be required to incorporate it into the JSON structure.

---

## Credentials & Standards Spot-Check

### Bilingual Credentials

**Record:** `offered: false`, `standalone: false`, `addOn: false`.

**Finding:** Accurate. Florida has no separate bilingual certification or endorsement. Bilingual program delivery is staffed by ESOL-credentialed teachers, often paired with a World Language certification (e.g., Spanish K-12) where appropriate. No change.

### ELD Credentials

**Record:**
- `offered: true`
- `standalone: true` (ESOL K-12 certification, Rule 6A-4.0245, FTCE 047 or major in ESOL)
- `addOn: true` (ESOL academic endorsement, Rule 6A-4.0244, 15 SH across five areas or district-approved inservice program)
- `requirements.program: null` (unknown whether approved program is required for standalone path; test-only path exists via FTCE 047)
- `requirements.coursework: true` (15 SH for endorsement path)
- `requirements.practicum: null` (not explicitly cited in rules; inservice programs may include practicum)
- `requirements.test: true` (FTCE 047 for standalone; endorsement program coursework suffices without test)
- `requirements.languageProficiency: false` (no LOTE exam required)

**Verification against sources:**
- Rule 6A-4.0245 (standalone K-12 ESOL): "FTCE 047 ESOL K-12 subject area exam or major in ESOL" ✓
- Rule 6A-4.0244 (endorsement): 15 SH required across five areas (Methods, Curriculum and Materials, Cross-Cultural Communication, Applied Linguistics, Testing and Evaluation) ✓
- 2025 ESOL Endorsement Standards: Five strands (CU, AL, MT, CM, TE) align to the Rule 6A-4.0244 five areas ✓

**Assessment:** Record is accurate. The null values for `practicum` and `program` (for standalone) correctly reflect ambiguities in the public rule text.

### SEI Mandate

**Record:**
- `mandatedForAllTeachers: false`
- **Notes:** Category-conditional ESOL training under META consent decree (1990), not a universal SEI mandate.

**Verification:** Correct. Florida operates under the META consent decree's tiered model: Cat I (full endorsement/2 courses), Cat II (1 course/60 points), Cat III (1 course/18 points), Cat IV (1 course). This is conditional on serving ELLs in the covered role; it is not equivalent to the AZ/CA/MA all-teachers model.

**Assessment:** Accurate. No change.

### Professional Standards Mentions

**Record:**
- `diverse: true`
- `cultural: true`
- `linguistic: true`
- `el: false`

**FEAP (Rule 6A-5.065, last amended 2023-08-22) verification:**
- **"Diverse":** "accommodate the differing needs and diversity of students while ensuring..." (Section 2.h) ✓ TRUE
- **"Cultural":** "Respects students' cultural linguistic and family background" (Section 2.d) ✓ TRUE
- **"Linguistic":** Same citation "cultural linguistic" (Section 2.d); "content area literacy strategies" (Section 3.b) ✓ TRUE
- **"EL" (explicit):** Searched FEAP document for "EL", "English language", "LEP", "ELL", "ESL", "ESOL" — none found in the general FEAP. The ELL/ESOL-specific language appears only in the ESOL-specialty standards (2025 ESOL Endorsement Standards), not in the general teaching standards. ✓ FALSE (correct)

**Assessment:** All four booleans are accurate. No change.

### Seal of Biliteracy

**Record:**
- `adopted: true`
- `year: 2016`
- `sourceUrl: "https://sealofbiliteracy.org/state/fl/"`

**Verification:** Correct. Florida Statute § 1003.432 (HB 7029, 2016) authorizes the Seal; sealofbiliteracy.org confirms FL adoption in 2016.

**Assessment:** Accurate. No change.

### ELP Assessment

**Record:**
- `name: "ACCESS for ELLs"`
- `consortium: "WIDA"`
- `sourceUrl: "https://wida.wisc.edu/about/consortium"`

**Verification:** Correct. Florida administers ACCESS for ELLs (WIDA consortium). No migration to ELPA21 has occurred (unlike MS and TN). WIDA source confirms FL membership.

**Assessment:** Accurate. No change.

---

## Source URL Concerns

All twelve source entries in the JSON were verified or spot-checked:

1. **FLDOE homepage (2019-11-15):** Baseline source; URL structure unchanged.
2. **Leider, Colombo & Nerlino (2021):** DOI resolves; paper current.
3. **FLDOE ESOL Endorsement hub (2026-05-08):** Resolves; current.
4. **2025 ESOL Endorsement Standards PDF (2026-05-08):** Resolves; current.
5. **Rule 6A-4.0244 (2026-05-08):** Resolves; current.
6. **Rule 6A-4.0245 (2026-05-08):** Resolves; current.
7. **META Consent Decree page (2026-05-08):** Resolves; current.
8. **FEAP Rule 6A-5.065 PDF (2026-05-08):** Resolves; current (last amended 2023-08-22, per document footer).
9. **NCES Table 204.20 (2026-05-08):** Resolves; current (Fall 2021 data = 9.5%).
10. **Seal of Biliteracy FL page (2026-05-08):** Resolves; current.
11. **WIDA consortium (2026-05-08):** Resolves; current.
12. **FTCE ESOL K-12 (047) test page (2026-05-08):** Resolves; current.

**No broken links or outdated citations identified.**

---

## Changes from Baseline (2019)

**No substantive changes from baseline-2019.** The record reflects:

- Same bilingual status (not offered).
- Same ELD structure (standalone + add-on ESOL via endorsement).
- Same SEI framework (META consent decree, category-conditional, not all-teachers).
- Same professional standards mentions (diverse, cultural, linguistic all true; EL false).
- Updated elPercent (2019: 10.0% → 2021: 9.5%, per NCES Table 204.20).
- Incremental standards refresh (2010 ESOL standards → 2025 ESOL standards; five-strand structure preserved).

**All changes are updates, not corrections of baseline miscoding.**

---

## Conclusion

Florida's record is well-maintained and accurately reflects the state's EL credentialing landscape as of 2026-05-10. The `verified-2026` status is warranted. No edits to `src/content/states/fl.json` are required.
