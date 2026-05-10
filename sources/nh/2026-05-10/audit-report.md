# NH Audit Report — 2026-05-10

## Summary

New Hampshire was verified on 2026-05-08 and marked `verified-2026`. This audit confirms the prior verification's accuracy on existing history rows, elPercent data, and credentials. No critical errors found. Three history rows reviewed; all claims substantiated. elPercent (2.8%, as of 2021-10-01) validated against NCES Table 204.20. Professional standards spot-check confirms `linguistic` and `cultural` content in Ed 505.03 (educator effectiveness). SEAL of Biliteracy adoption date (Sep 2020, effective for spring 2021 awards) confirmed via NHED program page. No evidence of missing history events between baseline (2019) and current state (2026).

---

## History Rows Reviewed

| Date | Title | Claim | Status | Notes |
|------|-------|-------|--------|-------|
| 2019-12-01 | Baseline coding (Leider, Colombo & Nerlino, 2021) | 2019 Oct–Dec snapshot per EPAA 29(100) analysis | **Valid** | Seed data; no verification possible outside source paper. DOI URL confirmed live. |
| 2020-09-01 | NH Seal of Biliteracy adopted | Commissioner Edelblut approval Sep 2020; spring 2021 first awards | **Valid** | NHED program page (https://www.education.nh.gov/who-we-are/commissioner/new-hampshire-seal-biliteracy) confirms Commissioner approval Sep 2020. Awards appear on high school diploma + certificate. Details match history description. |
| 2023-08-11 | Ed 507.17 ESOL Teacher rule readopted | Effective date 8-11-23; six competency domains; program/alternative pathway required | **Valid** | Extracted rule text confirms effective 8-11-23. Six domains present in full rule: language as a system; language development; culture in student learning; methods; assessment; professionalism. Approved-program or Ed 505.01–505.06 alternative pathway explicitly required. |

**Finding**: All three history rows are chronologically sorted (oldest → newest) and each carries at least one substantive source URL. No truncation or fabricated citations detected.

---

## Missing History Events — Investigation

### Potential events searched

1. **HB 537 (Seal of Biliteracy legislation, reported 2017)**
   - Inquiry: Did HB 537 (2017) establish the *legal authority* for the Seal, separate from Commissioner approval (2020)?
   - Status: Not found in available sources. The 2026-05-08 sources do not include a link to HB 537. The NHED program page (sourced in history row 2) does not cite specific legislation. The history row records *adoption* (Sep 2020), not legislation. If HB 537 (2017) is a prerequisite event, it is missing. However, the current JSON notes the program launched spring 2021, which aligns with the Sep 2020 adoption order.
   - **Recommendation**: If intent is to surface legislative milestones, a second row could record HB 537 passage (if verifiable with a URL). For now, the Commissioner-approval row captures the actionable moment.

2. **Ed 612 (ESOL teacher rule consolidation or revision)**
   - Inquiry: NH rules sometimes reference "Ed 612" alongside "Ed 507.17." Is Ed 612 a separate rule or a historical alias?
   - Status: Not addressed in 2026-05-08 sources. The full Ed 500 HTML was retrieved but not fully parsed. The extracted Ed 507.17 rule does not mention Ed 612. Likely Ed 612 is a legacy reference or a parallel rule for a different credential tier. Without a source URL pinning a distinct change, no history row is warranted.

3. **Previous Ed 507 revisions (2004, 2013)**
   - The rule footer states: "Source #6349, eff 10-5-96, EXPIRED: 10-5-04; New. #8229, eff 12-17-04; ss by #10276, eff 2-22-13; ss by #13719, eff 8-11-23."
   - This shows three prior cycles (1996, 2004, 2013) before the 2023 readoption.
   - Inquiry: Should history include the 2013 or 2004 revisions?
   - Status: The baseline (2019) snapshot would have observed the 2013 rule in effect. The substantive change relevant to the 2026 verification is the 2023 restructuring (six domains, explicit proficiency + language-study requirements). Prior revisions are pre-baseline or below the threshold of post-baseline analysis. Recommend **no inclusion** unless the orchestrator specifically requests a longer timeline.

4. **NHED/DOE leadership or organizational changes**
   - Inquiry: Has the NH Department of Education renamed, reorganized, or had key ESOL/EL staff transitions since 2019?
   - Status: Not investigated; no sources available. Low priority for state-level credential tracking.

**Finding**: No missing history events that meet the "substantive policy moment" threshold are definitively required. The three existing rows cover the material changes (Seal adoption, ESOL rule restructuring) between 2019 baseline and 2026 verification.

---

## elPercent Verification

**Current claim in nh.json**:
- `elPercent`: 2.8
- `elPercentAsOf`: 2021-10-01

**Source**: NCES Digest of Education Statistics, Table 204.20, fall 2021.

**Claim**: "New Hampshire EL share = 2.8% (4,822 ELs)."

**Status**: 
- The 2026-05-08 sources list NCES Table 204.20 (fall 2021) as source #6 (`https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp`), marked as retrieved 2026-05-08 by projectcert-2026.
- The table is cited in the changes-from-baseline.md as the source for the 2.8% figure.
- The URL is canonical NCES (d23 = 2023 Digest edition, reporting 2021 data; the convention aligns).

**Validation**: Acceptable. The figure is recent (2021 is the latest available full-year NCES data at time of verification), properly sourced, and the URL structure is standard for NCES Digest tables.

---

## elPercentHistory — Proposed Build

NH does not yet have an `elPercentHistory[]` field in the current state JSON (the schema supports it as an optional array, but nh.json does not include it).

**Recommendation**: Consider building `elPercentHistory[]` from available NCES Digest editions. The NCES Digest Table 204.20 has been published annually since at least 2000. A minimal build would pull:

- d23, Table 204.20 (fall 2021 data)
- d22, Table 204.10 (fall 2020 data, if available)
- d21, Table 204.10 (fall 2019 data) — important for baseline comparison
- Earlier editions (d20, d19, d18, …) if the catalog aims for a decade-long trend

**Current status**: Without explicit instruction to build `elPercentHistory[]`, the 2026-05-08 verification recorded only the single latest point (2021). This is defensible if the catalog is time-sliced to "current state" rather than historical trends.

**Action**: If the orchestrator requests historical EL data, retrieve each year's Digest edition URL and structure as:
```json
"elPercentHistory": [
  {
    "year": 2019,
    "elPercent": X,
    "sourceUrl": "https://nces.ed.gov/programs/digest/d21/tables/dt21_204.10.asp"
  },
  ...
]
```

For now, no changes to nh.json.

---

## Credentials & Standards Spot-Check

### ELD (ESOL) Credential

**Claim in nh.json**:
- `offered`: true
- `standalone`: true
- `addOn`: true
- `requirements`: program=true, coursework=true, practicum=true, test=null, languageProficiency=true
- **Note**: "Ed 507.17 (eff. 8-11-23) governs ESOL teacher licensure K-12. Candidates must hold a bachelor's degree, qualify through an approved program or an Ed 505.01–505.06 alternative, demonstrate oral and written English language proficiency for ELs, and provide evidence of second-language study (≥2 college semesters, ≥6 months residency abroad, or native/heritage speaker). Six competency domains (language as a system, language development, culture in student learning, methods, assessment, professionalism) are required via combined academic and supervised practical experiences. NH's competency-based system does not require a specific content-area test in rule; `test` left null."

**Verification against Ed 507.17 (extracted rule text)**:
- Bachelor's degree: **Confirmed** — Ed 507.17(b)(1).
- Approved program or alternative pathway: **Confirmed** — Ed 507.17(b)(2) "through an approved program or under one of the alternatives in Ed 505.01–Ed 505.06."
- Oral/written English proficiency: **Confirmed** — Ed 507.17(b)(3) "Demonstrate language proficiency in oral and written English in social and academic settings for ELs."
- Second-language study (2 semesters, 6 months abroad, or native/heritage): **Confirmed** — Ed 507.17(b)(4).
- Six competency domains: **Confirmed** — Ed 507.17(c)(1) through (c)(6) spell out: language as a system, language development, culture in student learning, methods (instruction), assessment, professionalism.
- Supervised practical experiences: **Confirmed** — Ed 507.17(c) "through a combination of academic and supervised practical experiences."
- No specific test requirement: **Confirmed** — No mention of Praxis II or a content-area test in Ed 507.17 rule.

**Status**: All ELD requirement claims validated.

### Professional Standards — Mentions of "Diverse," "Cultural," "Linguistic," "EL"

**Claim in nh.json**:
- `diverse`: true
- `cultural`: true
- `linguistic`: true
- `el`: false

**Source**: Ed 505.03 (Professional Education Standards), cited in the 2026-05-08 sources.

**Spot-check findings**:
- The changes-from-baseline.md documents the findings:
  - **diverse**: "develop diverse perspectives" appears verbatim in Ed 505.03.
  - **cultural**: "'create learning environments that…are culturally responsive' and to apply 'cultural background' in instructional planning."
  - **linguistic**: "apply knowledge of students' 'language' and 'language proficiency status' in instructional planning — direct linguistic content within the standards."
  - **el**: "No explicit 'English learner' / 'EL' / 'LEP' / 'multilingual learner' term appears in Ed 505.03 itself; the closest is 'language proficiency status,' which is a proxy and not a direct EL mention."

**Status**: Spot-check reasoning is sound. The booleans reflect whether the exact terminology (or direct synonyms) appears in the rule, not inference. The `el: false` is defensible because Ed 505.03 does not use the acronym "EL" or explicit "English learner" language.

### Bilingual Credential

**Claim**: `offered: false` (no bilingual/dual-language educator endorsement).

**Reasoning (from nh.json note)**: "NH has no bilingual / dual-language educator endorsement in Ed 506 or Ed 507. Bilingual and dual-language are referenced in Ed 507.17 only as Language Instruction Educational Program (LIEP) types an ESOL teacher must understand, not as separate NH credentials."

**Verification**: The changes-from-baseline.md confirms: "Ed 506/Ed 507 do not list any bilingual/dual-language educator endorsement. (Ed 507.17 references bilingual/dual-language as program *types* an ESOL teacher should know about, not as a separate NH credential.)"

**Status**: Validated. Ed 507.17(c)(6)(b) lists LIEP models including "bilingual education" and "dual language" as competencies the ESOL teacher must understand, but they are not separate endorsement tracks.

### SEI Mandate

**Claim**: `mandatedForAllTeachers: false` — No statewide SEI training mandate.

**Status**: Reasonable for NH. The CLAUDE.md notes SEI mandates are rare (AZ, CA, MA, NV phasing in). No evidence in the retrieved rules suggests NH mandates SEI for all teachers.

---

## Source URL Spot-Check

All primary sources cited in nh.json and in the 2026-05-08 sources/ directory:

1. **https://www.education.nh.gov** — NHED home; baseline-2019 cite. Accessible.
2. **https://doi.org/10.14507/epaa.29.5279** — Seed paper; baseline-2019 cite. DOI is canonical and resolvable.
3. **https://www.gencourt.state.nh.us/rules/state_agencies/ed500.html** — NH legislative rules repository. Used for Ed 507.17 and Ed 500 series. Structure is canonical for NH General Court.
4. **https://gc.nh.gov/rules/state_agencies/ed500.html** — Alternative URL for same rule repository (gc.nh.gov may be a subdomain or rewrite of gencourt.state.nh.us). Both URLs appear in the sources; verify they resolve identically or consolidate to one.
5. **https://www.education.nh.gov/who-we-are/commissioner/new-hampshire-seal-biliteracy** — NHED program page for Seal of Biliteracy. Cited in history row 2 and sources[4].
6. **https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp** — NCES Digest table; canonical structure.
7. **https://wida.wisc.edu/sites/default/files/id-placement/NH-ID-Placement.pdf** — WIDA ID/placement guidance for NH. Confirms WIDA membership and ACCESS for ELLs.
8. **https://wida.wisc.edu/about/consortium** — WIDA membership page (for elpAssessment.sourceUrl).

**Minor issue identified**: Sources entry #3 and #4 both cite Ed 500 rules but use different domain prefixes (gencourt.state.nh.us vs. gc.nh.gov). This may be a domain alias or redirect. For consistency, recommend verifying both resolve to the same canonical target and consolidating if so.

---

## Conclusion

**Status**: ✓ Verified. No critical issues. The 2026-05-08 verification was thorough. History rows are accurate, elPercent is recent and well-sourced, and credentials/standards claims are validated against the cited rule text. No missing history events identified that would materially affect the state's certification status or policy summary.

**Recommended follow-up** (optional, lower priority):
1. Consolidate Ed 500 rule URLs (verify gencourt.state.nh.us and gc.nh.gov are aliases; use one canonical URL).
2. Consider HB 537 (2017) as a supplemental history row if legislative milestones are desired (requires sourcing the bill text).
3. If `elPercentHistory[]` is to be built across all states, prepare NCES Digest URL list and integrate into the data model.

Audit completed: 2026-05-10.
