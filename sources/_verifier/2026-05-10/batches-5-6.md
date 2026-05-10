# Verifier report — batches 5+6 (2026-05-10)

Scope: 10 state audit reports — MD, ME, MI, MN, MO (batch 5); MS, MT, NC, ND, NE (batch 6).
Verifier: Claude Sonnet 4.6, 2026-05-10.

Note: The orchestrator's task description names audit reports at `/sources/<USPS>/2026-05-10/audit-report.md`, but no such directories exist for batches 5+6. The verification work for these states was documented at `/sources/<USPS>/2026-05-08/changes-from-baseline.md` (and for MD, also `/2026-05-08-reaudit/changes-from-baseline.md`). This report draws on those documents, the state JSONs at `src/content/states/<usps>.json`, and direct WebFetch verification of sampled URLs.

---

## 1. Baseline coding row — confirmed in all 10 states

All 10 batch 5+6 state JSONs contain the forbidden `"title": "Baseline coding (Leider, Colombo & Nerlino, 2021)"` history row with `"date": "2019-12-01"`. This is the universal META_PROCESS_VIOLATION confirmed across all 30 states audited in batches 1–6. No agent in batches 5+6 flagged it as a violation.

States confirmed: MD, ME, MI, MN, MO, MS, MT, NC, ND, NE — all contain the row.

Ruling: Remove from all 10 state JSONs as part of the coordinated site-wide sweep. This is not individually noted for each state below.

---

## 2. Specific investigations

### MD — elPercentHistory not compiled (confirmed)

The MD changes-from-baseline.md confirms the agent did not compile `elPercentHistory[]` data; no history of elPercent observations is present in md.json (only the current `elPercent: 11.2`, `elPercentAsOf: 2021-10-01`). **The orchestrator must backfill this manually.** The baseline value was 9.2% (2019-10-01); the updated value is 11.2% (2021-10-01). Both data points are available and can seed the array once the schema field is populated.

The MD re-audit (`2026-05-08-reaudit`) added one history row: the 2016-05-19 Maryland Seal of Biliteracy (SB 781, Ch. 232). This event row is substantive and well-sourced (`theglobalseal.com/maryland-seal-of-biliteracy`). Confirmed live: that URL resolves and cites the Maryland Seal of Biliteracy with SB 781 / Education Article §7-208.

No other issues with MD.

---

### ME — Broken source URLs (path migration)

**Finding confirmed: `/multilingual` → `/multilinguallearner` path migration is real, but the correction is incomplete in the current JSON.**

Direct WebFetch verification:

| Old URL (in `me.json` sources[]) | Status | New URL |
|---|---|---|
| `https://www.maine.gov/doe/learning/multilingual` | **HTTP 404** | `https://www.maine.gov/doe/learning/multilinguallearner` |
| `https://www.maine.gov/doe/learning/multilingual/staffing` | **HTTP 404** | `https://www.maine.gov/doe/learning/multilinguallearner/services` (not `/staffing`) |

The `me.json` sources[] currently still uses the old `/multilingual` path (retrieved 2026-05-08). Both the multilingual hub and the staffing guidance are now at the `/multilinguallearner/` base path. Additionally, the staffing page is at `/services`, not `/staffing` — the agent used `/staffing` in the history row `sourceUrls` and in `sources[]`, but the live URL that contains the staffing guidance content is `/multilinguallearner/services`.

**Action required:**
- In `sources[]`: update the "Maine DOE — Multilingual Learner program hub" URL from `/multilingual` to `/multilinguallearner` (HTTP 200 confirmed).
- In `sources[]`: update the "Maine DOE — Multilingual Services staffing guidance" URL from `/multilingual/staffing` to `/multilinguallearner/services` (HTTP 200 confirmed, content matches: staffing guidance for multilingual learners with WIDA proficiency minimums, ILAP requirements, etc.).
- In `history[]`: the 2025-10-09 DOE administrative letter row has `sourceUrls: ["https://www.maine.gov/doe/learning/multilingual/staffing"]` — update to `/multilinguallearner/services`.

The Maine DOE certification page (`https://www.maine.gov/doe/cert`) resolves (HTTP 200); no change needed for that source entry.

**Note on ME history rows:** The 2025-05-14 "Chapter 115 Part II amended" and 2025-10-09 "DOE administrative letter" history rows are SEA-side policy events (a rule amendment and an operational guidance letter), not meta-process entries. Both pass the forbidden-title test. Both sourceUrls need updating to the `/multilinguallearner/` paths as noted above.

---

### MI — No issues found

The MI JSON is clean. All changes in changes-from-baseline.md are well-grounded:
- `bilingual.requirements.languageProficiency: false → true` is backed by Standard 1.1 of the MDE Bilingual Education Preparation Standards (ACTFL OPI Advanced Low in both English and target language).
- `eld.standalone: false → true` is backed by the MDE Placement Guide and Adding-an-Endorsement page.
- `professionalStandardsMentions.linguistic: true` and `.el: true` are backed by the 2018/2024 PK-12 Professional Knowledge and Skills standards.

The 2018-01-01 "PK-12 Professional Knowledge and Skills standards adopted" history row `sourceUrls` points to `https://www.michigan.gov/-/media/Project/Websites/mde/educator_services/prep/standards/professional_knowledge_skills.pdf` — a URL that differs slightly from the one in sources[] (`Prep_Standards_for_PK-12_Teachers.pdf`). This is a minor inconsistency that does not affect substance; both refer to the same document family.

The 2017-01-01 "Bilingual Education Preparation Standards revised" history row `sourceUrls` is `https://www.michigan.gov/mde` (the MDE root), which is thin but acceptable for a 2017-era document where the specific PDF URL may not be stable. Not a blocking issue.

---

### MN — `bilingual.standalone: false` confirmed correct

**Confirmed via direct WebFetch of `https://www.revisor.mn.gov/rules/8710.4150/`:** Subpart 2 requires candidates to "hold a valid Minnesota elementary education or a grade 5 through 12 or grade 7 through 12 license in mathematics, a science field, social studies, or health education." The bilingual/bicultural credential is therefore structurally an add-on (requires a prerequisite license), not a standalone initial licensure field.

The MN changes-from-baseline.md correctly explains: "Rule 8710.4150 subp. 2 requires a prerequisite Minnesota license…Coding correction against the explicit rule text rather than a regulatory change since 2019 — the rule has been on the books since 2001 (last amended 2017)."

The `bilingual.standalone: true → false` coding correction is accurate and should be retained. The baseline-2019 miscoding of `standalone: true` was an error by the original paper; the 2026 correction is justified.

**MN elPercent:** 8.8% confirmed against NCES Digest d23 Table 204.20, fall 2021. ✓

**MN history rows:** All five rows pass the forbidden-title test. The 1980, 2014, 2022, and 2023 rows are substantive SEA-side events (statute, LEAPS Act, rule revision, PELSB compliance manual policy change). Source URLs for the 2022 row (`https://www.revisor.mn.gov/rules/8710.2000/`) confirmed live (HTTP 200, mentions MN ELD Standards Framework in Standard 4.A). Source URL for 2023 row (`https://mn.gov/pelsb/`) confirmed live.

**Minor: MN 2022 history row date is approximate.** The row uses `"date": "2022-01-01"` as a placeholder for the PELSB revision of Rule 8710.2000. The changes-from-baseline.md states "2022-era revision" without giving a precise promulgation or effective date. The revisor.mn.gov page was not inspected for an exact effective date. If the rule history is accessible on that page, a more specific date should replace the 2022-01-01 placeholder. This is a low-severity issue.

---

### MO — Seal of Biliteracy date: 2017-01-01 placeholder vs. HB 2280 codification

**Finding:** The MO changes-from-baseline.md records the Seal adoption as 2017 (from `sealofbiliteracy.org`) and the history row uses `"date": "2017-01-01"` as a placeholder. The orchestrator noted a "minor calendar ambiguity" about HB 2280 2018 codification. Investigation:

1. The DESE ELD page (`dese.mo.gov/college-career-readiness/curriculum/english-language-development`) states the Missouri Seal of Biliteracy "has encouraged and recognized students for high levels of proficiency in English and at least one additional language **since 2017**." This confirms 2017 as the program's operational start year.

2. The DESE Seal of Biliteracy page (`dese.mo.gov/.../missouri-seal-biliteracy`) makes no reference to HB 2280 or any specific bill, and provides no adoption date.

3. `sealofbiliteracy.org/states/` returned a page without state-specific adoption timelines in the fetched content.

**Assessment:** The 2017-01-01 date in the MO history row is consistent with the DESE's own framing ("since 2017") but is a January 1 placeholder, not a specific legislative or administrative date. If HB 2280 (2018) was the codifying legislation (i.e., the Seal was operated by executive/DESE action in 2017 but was codified by statute in 2018), then two events exist: the 2017 operational launch and the 2018 statutory codification. The current JSON records only the 2017 row. The 5 CSR 20-400.570 effective date (August 1, 2017) is for the ELL endorsement rule, not the Seal.

**Recommendation:** The 2017-01-01 date should be refined, but there is insufficient evidence from the current sources to establish the exact date. The DESE page and sealofbiliteracy.org both affirm 2017. If HB 2280 (2018) is a real legislative event that codified the Seal, a second history row dated appropriately to HB 2280's effective date would be the correct approach — but this requires confirming HB 2280's existence and effective date against `https://www.senate.mo.gov/18info/BTS_WEB/Bill.aspx?SessionType=R&BillID=...` or similar. Leave 2017-01-01 as-is until a precise date is confirmed; the January 1 placeholder is a hygiene issue, not a factual error.

**MO elPercent:** 3.8% confirmed against NCES Digest d23 Table 204.20, fall 2021. ✓

---

### MS — LAS Links → ELPA21 effective date (2024-08-01)

**Partially verified.**

The ms.json history row uses `"date": "2024-08-01"` for the ELP assessment migration from LAS Links to ELPA21. This is an inferred date (start of the 2024-25 academic year), not an explicit date in the sourced documents.

Evidence reviewed:
- The MDE ELPT page text (retrieved 2026-05-08, in `mde-elpt-page.txt`) states "Whom to contact at ELPA 21" and cites "Mississippi Testing Accommodations Manual, February 2026" — confirming ELPA21 is current.
- The prior MDE ELPT FAQ from the LAS Links era (`elpt-las-links-faq-2023.pdf`) is in sources as evidence of the transition.
- The ELPA21 Spring 2025 Insider Newsletter (retrieved and read in full) explicitly names Mississippi as ELPA21's "newest partner state" in the context of the AMTESOL 2025 conference. The newsletter was published May 8, 2025, and refers to AMTESOL as an "earlier this year" event (January 2025). This confirms Mississippi joined before January 2025.
- No source specifies the exact transition date. The 2024-08-01 date is a reasonable inference for the start of the 2024-25 academic year, consistent with how state ELP assessment transitions typically take effect (at the start of the school year).

**Assessment:** The 2024-08-01 effective date is plausible and well-reasoned but not explicitly confirmed from a primary source. The history row description correctly notes the evidence basis ("MDE ELPT page now references ELPA 21…ELPA21's Spring 2025 newsletter named Mississippi the consortium's 'newest partner state'"). The date carries an implicit uncertainty; the row should include a note that the 2024-08-01 date is the inferred start of the first year ELPA21 was administered in Mississippi, pending confirmation of an MDE official transition announcement.

MDE pages (`mdek12.org/OSA/ELPT` and `mdek12.org/OAE/EL`) return HTTP 403 to the fetch tool — content is blocked by server-side restrictions. This is a fetch-tool limitation, not a URL-validity issue (the MDE ELPT page text was successfully captured at `sources/MS/2026-05-08/mde-elpt-page.txt`).

**MS elPercent:** 3.1% confirmed against NCES Digest d23 Table 204.20, fall 2021. ✓

**MS professionalStandardsMentions.cultural: true → false** demotion: The changes-from-baseline.md explains that the current MDE Teacher Growth Rubric (July 2018) does not mention "cultural," "diverse," "linguistic," or "English learner" in the rubric body. A single footnote in the companion "Examples of Evidence" document mentions "family, community, culture, language" — deemed too incidental. The demotion is defensible and documented. No agent contradicted it.

---

### MT — IEFA / Class 7 history rows; date verification

**Finding: The 1999-04-21 IEFA date in mt.json is plausible but the sourced URL has moved.**

The MT history row for the 1999 Indian Education for All Act uses `"date": "1999-04-21"` and `sourceUrls: ["https://opi.mt.gov/Educators/Teaching-Learning/Indian-Education-for-All"]`.

Direct WebFetch of that URL: HTTP 200, the OPI IEFA page exists. However, the page provides IEFA resources and a "legislative update document (SB181)" but does not show the original HB 528 (1999) enactment date.

The statute (MCA 20-1-501) was verified via `mca.legmt.gov`: the page confirms the statute was "originally enacted in 1999 and has been amended twice, most recently in 2025." This corroborates the 1999 enactment year. However, the April 21, 1999 specific date (claimed as the HB 528 chaptered date) was not confirmed from a primary source in the available materials. The MT changes-from-baseline.md does not cite this date explicitly — the date "1999-04-21" is in the JSON history row without a direct citation to the chaptered bill.

**Issue:** The description says "HB 528, codified at MCA 20-1-501" and cites the OPI IEFA page. That page does not mention HB 528 by name or provide a 1999-04-21 effective date. The MCA page confirms 1999 enactment but not the specific April 21 date.

**Recommendation:** The 1999 year is confirmed. The April 21 date should be verified against the 1999 Montana session law record (`leg.mt.gov/bill/actions/BillActions.html` for the 56th Legislature, 1999 session) before publication. If verification is not feasible, round the date to `1999-01-01` (year-level precision) with a note, rather than citing a specific chaptered date that cannot be confirmed from the current sourceUrl. This is a source-precision issue, not a factual error in substance.

**MT Class 7 not in history rows (by design):** The MT JSON does not have a history row for the Class 7 American Indian Language and Culture Specialist license. The changes-from-baseline.md notes this license exists but is not a bilingual-education credential (it is a language-content credential). No row for it is warranted. The MT changes-from-baseline.md also does not discuss a separate Class 7 history event. This is correct.

**MT Seal of Biliteracy (2021):** The BPE Seal page confirmed via WebFetch: "In July 2021, the Board of Public Education voted unanimously to approve the Seal of Biliteracy in Montana." The mt.json uses `"date": "2021-07-01"` — consistent with "July 2021." ✓

**MT elPercent:** 2.4% confirmed against NCES Digest d23 Table 204.20, fall 2021. ✓

---

### NC — dpi.nc.gov URL recovery confirmed

**Both sampled NC URLs resolve:**

1. `https://www.dpi.nc.gov/educators/educators-licensure/areas-licensure` → HTTP 200. Page lists ESL under both Elementary (K-6) and Special Subjects (K-12) licensure categories. ✓
2. `https://www.dpi.nc.gov/educators/educators-licensure` → HTTP 200. Full educator licensure hub. ✓

The changes-from-baseline.md states that the 2019 baseline URL (`http://www.ncpublicschools.org`) now redirects to `https://www.dpi.nc.gov` — this is consistent with the NC source list in nc.json, which retains the original leider-2021 entry and adds 15 new projectcert-2026 entries across dpi.nc.gov.

**NC professionalStandardsMentions.linguistic: true** requires scrutiny. The changes-from-baseline.md explains: "Standard IV: 'Teachers understand the influences that affect individual student learning (development, culture, **language proficiency**, etc.)' — language theme is present though the word 'linguistic' is not used verbatim." Per the `el-cert-schema` skill definition, `linguistic` = "uses `language / linguistic`." The phrase "language proficiency" does use the word "language" and meets the schema definition. However, this is a borderline case — "language proficiency" in the context of student learning influences is not the same as naming "linguistic" as a developmental domain. The prior verifier reports upheld similar codings (AR, ME) where the word "linguistic" was explicitly present; the NC justification relies on "language proficiency" rather than "linguistic." This is weaker than other confirmed `linguistic: true` cases but not clearly wrong. Flag for orchestrator review: if a stricter reading of the schema requires the literal word "linguistic," NC's `linguistic: true` may need review.

**NC elPercent:** 8.0% confirmed against NCES Digest d23 Table 204.20, fall 2021. ✓

---

### ND — No major issues; note on out-of-schema fields resolved in JSON

The ND changes-from-baseline.md explicitly flagged `elpAssessment` and `sealOfBiliteracy` as out-of-schema and recorded them only as notes. However, the current `nd.json` already contains these fields populated (`elpAssessment.name: "ACCESS for ELLs"`, `consortium: "WIDA"`; `sealOfBiliteracy.adopted: true`, `year: 2019`). The schema does support these fields (they are present across all verified-2026 states). The agent's note about "out-of-schema" fields reflects an earlier schema uncertainty that is now resolved; the JSON is correct as committed.

**ND ESPB URLs confirmed:**
1. `https://www.nd.gov/espb/licensure/endorsement-information/english-learner-el-endorsement` → HTTP 200. Shows EL endorsement requirements, Praxis ESOL pathway. ✓
2. `https://www.nd.gov/espb/licensure/license-information/types-licenses` → HTTP 200. Lists types of ND teaching licenses. ✓

Both ND ESPB URLs resolve. The agent's claim that these URLs were "recovered" is confirmed — they are live.

**ND elPercent:** 3.3% confirmed against NCES Digest d23 Table 204.20, fall 2021. ✓

---

### NE — Broken URL claim vs. reality

**The claim that "all 6 broken URLs were recovered" requires qualification.**

The NE changes-from-baseline.md lists sources, all with new 2024-05/2024-06 paths. Direct WebFetch of two key URLs:

1. `https://www.education.ne.gov/wp-content/uploads/2024/06/Clean-Rule-24-2024.pdf` → **HTTP 404** (not found at the `/2024/06/` path tested).
2. `https://www.education.ne.gov/natlorigin/serving-english-learners/` → **HTTP 200** ✓ (confirms ELPA21 as NE's ELP assessment, including "ELPA21 Summative scores 4 and/or 5 on all domains").
3. `https://www.education.ne.gov/worldlanguage/nebraska-seal-of-biliteracy/` → **HTTP 200** ✓ (NeSoBL program page exists).
4. `https://www.education.ne.gov/educatorprep/` → **HTTP 200** ✓ (NDE Educator Preparation homepage exists; June 2025 Praxis waiver content not directly surfaced in fetch output, but the page was accessible and the announcement is documented in the changes-from-baseline.md).
5. `https://www.education.ne.gov/educatorprep/endorsements-offered-in-nebraska/` → **HTTP 404** (endorsement list URL not accessible at this path).

**Assessment:** Two of the 5 sampled NE URLs (the Rule 24 PDF and the endorsement list) returned 404. The agent claims these were "recovered" but the Rule 24 PDF at `/2024/06/` does not resolve. The NDE serving-ELs page and the NeSoBL page resolve correctly. The NDE educatorprep homepage resolves.

**Action required:** The Rule 24 PDF URL in NE's `sources[]` (`https://www.education.ne.gov/wp-content/uploads/2024/06/Clean-Rule-24-2024.pdf`) should be re-verified. The PDF may be at a `/2025-04/` or other date-stamped path, or may require the NDE Rule 24 landing page rather than a direct PDF URL. The endorsement list page also needs a URL check. The substantive data (Rule 24 §006.09 Bilingual and §006.23 ESL requirements) is well-documented in `sources/NE/2026-05-08/rule-24-endorsements.txt` (the local copy), so the coding is correct regardless; this is a source-URL hygiene issue.

**NE elPercent:** 7.3% confirmed against NCES Digest d23 Table 204.20, fall 2021. ✓

---

## 3. Hidden meta-process language in 2024+ history rows

Checked all history rows dated 2024 or later across all 10 state JSONs for catalog-workflow framing:

| State | Row date | Title | Assessment |
|-------|----------|-------|------------|
| ME | 2025-05-14 | Chapter 115 Part II amended; ESOL coursework floor reduced 24 → 15 SH | Clean — describes a rule amendment (SEA event). |
| ME | 2025-10-09 | DOE administrative letter on multilingual-services staffing | Clean — describes a DOE policy letter (SEA event). |
| MN | 2023-08-01 | MTLE content/pedagogy/basic-skills tests no longer required for MN program completers | Clean — describes a PELSB policy change (SEA event). |
| MO | 2025-08-01 | Missouri's Teacher Standards revised (August 2025) | Clean — describes a DESE standards revision (SEA event). |
| MS | 2024-08-01 | ELP assessment migration: LAS Links → ELPA21 Summative | Clean — describes an assessment transition (SEA event). Date is inferred (see MS section). |
| MT | 2020-07-01 | ARM 10.58.501 revised to enumerate ELL | Clean — describes a rule revision (SEA event). |
| MT | 2021-07-01 | Montana Board of Public Education adopts Seal of Biliteracy | Clean — describes a BPE adoption (SEA event). |
| NE | 2024-06-02 | Rule 24 (92 NAC 24) endorsement framework readopted | Clean — describes a regulatory readoption (SEA event). |
| NE | 2025-06-04 | Praxis content-test waiver for approved-program completers | Clean — describes a certification policy change (SEA event). |

**No new meta-process violations found in any 2024+ history rows across batches 5+6.** The IA "domain rebrand" pattern (where the description explicitly frames the row as a catalog maintenance action) is not replicated here. All 2024/2025 rows describe genuine SEA-side policy or regulatory events.

---

## 4. elPercent verification

All 10 state values confirmed against NCES Digest d23, Table 204.20, fall 2021:

| State | JSON value | NCES d23 fall 2021 | Match |
|-------|-----------|-------------------|-------|
| MD | 11.2 | 11.2% | ✓ |
| ME | 3.1 | 3.1% | ✓ |
| MI | 6.4 | 6.4% | ✓ |
| MN | 8.8 | 8.8% | ✓ |
| MO | 3.8 | 3.8% | ✓ |
| MS | 3.1 | 3.1% | ✓ |
| MT | 2.4 | 2.4% | ✓ |
| NC | 8.0 | 8.0% | ✓ |
| ND | 3.3 | 3.3% | ✓ |
| NE | 7.3 | 7.3% | ✓ |

No divergence in any state. All values match exactly.

---

## 5. Disputed findings (do not apply)

None from these batches rise to the level of disputed findings that require explicit do-not-apply rulings. No agent proposed a clearly incorrect coding change. The primary issues are hygiene (broken URLs) and a date-precision concern (MO Seal, MT IEFA).

---

## 6. Findings the agents missed (escalate)

### ME — Source URLs in `sources[]` and `history[]` use broken paths

The ME verification agent set `sourceUrls` and `sources[]` entries using the old `/multilingual` path, which now returns 404. The agent either did not verify these URLs post-retrieval or retrieved the content before the path migration took effect. The broken paths are:
- `sources[]` entry for the Multilingual Learner program hub: `/doe/learning/multilingual` → should be `/doe/learning/multilinguallearner`
- `sources[]` entry for the Multilingual Services staffing guidance: `/doe/learning/multilingual/staffing` → should be `/doe/learning/multilinguallearner/services`
- `history[]` 2025-10-09 row `sourceUrls`: same broken `/multilingual/staffing` path

These are in the committed `me.json` and need correction before launch.

### NE — Rule 24 PDF sourceUrl is 404

`https://www.education.ne.gov/wp-content/uploads/2024/06/Clean-Rule-24-2024.pdf` returns HTTP 404. This is the primary citation for the NE bilingual and ESL endorsement requirements (92 NAC 24 §§006.09 and 006.23). The local copy is preserved at `sources/NE/2026-05-08/rule-24-endorsements.pdf`, so the coding is correct; only the published sourceUrl is broken. The agent did not flag this; it was detected during URL spot-checking.

### MT — 1999-04-21 IEFA date needs primary source confirmation

The history row date for HB 528 (1999 Indian Education for All Act) is `1999-04-21`. The MCA 20-1-501 page confirms 1999 enactment but not April 21. The OPI IEFA page does not cite HB 528 or the chaptered date. This specific date is unsupported by the current sourceUrl and should be confirmed or rounded.

### MS — ELPA21 effective date is inferred

The `2024-08-01` date in the MS ELPA21 transition history row is not explicitly confirmed from a primary source; it is inferred as the start of the 2024-25 academic year. The description is transparent about this but the date itself should be noted as approximate pending MDE confirmation. MDE pages return HTTP 403 to external fetch tools.

### NC — `professionalStandardsMentions.linguistic: true` is borderline

The NC coding relies on "language proficiency" in Standard IV, not the word "linguistic" itself. This is weaker than the confirmed cases (ME, ND) where "linguistic" appears explicitly as a developmental domain. Orchestrator should review whether NC meets the schema threshold.

---

## 7. High-value recommendations

1. **[Critical — systemic] Remove all "Baseline coding" history rows from all 10 batch 5+6 state JSONs** as part of the coordinated 51-state sweep confirmed in batches 1–4.

2. **[High — ME] Fix broken `/multilingual` → `/multilinguallearner` paths in `me.json`** (two `sources[]` entries and one `history[]` sourceUrls entry). The staffing guidance specifically is at `/multilinguallearner/services`, not `/multilinguallearner/staffing`.

3. **[High — NE] Find and fix the Rule 24 PDF sourceUrl.** The current URL (`/2024/06/Clean-Rule-24-2024.pdf`) returns 404. The local PDF is at `sources/NE/2026-05-08/rule-24-endorsements.pdf`. A working URL is needed for the published record; the NDE may have reorganized the path.

4. **[Medium — MD] Backfill `elPercentHistory[]` manually.** Two data points available: 9.2% (2019-10-01, baseline) and 11.2% (2021-10-01, verified-2026). Once the schema field is being populated across states, MD should be included.

5. **[Medium — MO] Confirm the Missouri Seal of Biliteracy date.** The 2017-01-01 placeholder is consistent with the DESE's "since 2017" framing but is not a precise legislative date. If HB 2280 (2018) codified the Seal, a second history row dated to HB 2280's effective date may be appropriate. Recommend checking `www.senate.mo.gov` or `revisor.mo.gov` for HB 2280.

6. **[Medium — MT] Confirm or round the 1999-04-21 IEFA date.** MCA 20-1-501 confirms 1999 enactment; April 21 is unconfirmed from the current sourceUrl. Check the 1999 Montana session law (56th Legislature) for HB 528's chaptered date, or round to `1999-01-01` with a note.

7. **[Low — MS] Note ELPA21 transition date as inferred.** The 2024-08-01 date in the history row is not explicitly sourced. Add a parenthetical to the description ("effective date inferred as 2024-08-01, the start of the first year ELPA21 was administered in Mississippi; MDE has not published an official transition announcement URL"). This is already partially done in the current description.

8. **[Low — NC] Review `professionalStandardsMentions.linguistic: true`.** The justification ("language proficiency" in Standard IV) does not use the word "linguistic." If the schema threshold requires the literal term, this coding may need to be revised to `false`.

9. **[Low — MN] Confirm Rule 8710.2000 effective date for the 2022 history row.** The `"date": "2022-01-01"` is a year-level placeholder. The revisor.mn.gov page for Rule 8710.2000 should list the promulgation date. Replace if a more precise date is available.

10. **[Informational] All 10 elPercent values are correct.** No divergence from NCES Digest d23 Table 204.20, fall 2021. The MS value (3.1%) was also internally consistent — the changes-from-baseline.md noted the NCES Digest value of 3.0762% which rounds to 3.1%.

---

## Verification notes: Key URL results

- `https://www.maine.gov/doe/learning/multilinguallearner` → **HTTP 200** ✓ (new path)
- `https://www.maine.gov/doe/learning/multilingual` → **HTTP 404** ✗ (old path — broken)
- `https://www.maine.gov/doe/learning/multilinguallearner/services` → **HTTP 200** ✓ (staffing guidance page)
- `https://www.maine.gov/doe/learning/multilingual/staffing` → **HTTP 404** ✗ (old path — broken)
- `https://www.maine.gov/doe/learning/multilinguallearner/staffing` → **HTTP 404** ✗ (wrong new path — also broken)
- `https://www.dpi.nc.gov/educators/educators-licensure/areas-licensure` → **HTTP 200** ✓ (lists ESL credentials)
- `https://www.dpi.nc.gov/educators/educators-licensure` → **HTTP 200** ✓
- `https://www.education.ne.gov/natlorigin/serving-english-learners/` → **HTTP 200** ✓ (confirms ELPA21)
- `https://www.education.ne.gov/worldlanguage/nebraska-seal-of-biliteracy/` → **HTTP 200** ✓
- `https://www.education.ne.gov/educatorprep/` → **HTTP 200** ✓
- `https://www.education.ne.gov/wp-content/uploads/2024/06/Clean-Rule-24-2024.pdf` → **HTTP 404** ✗
- `https://www.education.ne.gov/educatorprep/endorsements-offered-in-nebraska/` → **HTTP 404** ✗
- `https://www.revisor.mn.gov/rules/8710.4150/` → **HTTP 200** ✓ (subp. 2 confirms prerequisite license requirement)
- `https://www.revisor.mn.gov/rules/8710.2000/` → **HTTP 200** ✓ (Standard 4.A mentions MN ELD Standards Framework)
- `https://www.nd.gov/espb/licensure/endorsement-information/english-learner-el-endorsement` → **HTTP 200** ✓
- `https://www.nd.gov/espb/licensure/license-information/types-licenses` → **HTTP 200** ✓
- `https://bpe.mt.gov/Seal-of-Biliteracy/Seal-of-Biliteracy` → **HTTP 200** ✓ (confirms July 2021 BPE adoption)
- `https://mca.legmt.gov/bills/mca/title_0200/chapter_0010/part_0050/section_0010/0200-0010-0050-0010.html` → **HTTP 200** ✓ (MCA 20-1-501; confirms 1999 enactment)
- `https://dese.mo.gov/college-career-readiness/curriculum/english-language-development` → **HTTP 200** ✓ ("since 2017")
- `https://dese.mo.gov/college-career-readiness/curriculum/english-language-development/missouri-seal-biliteracy` → **HTTP 200** ✓ (no bill number, no specific date)
- `https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp` → **HTTP 200** ✓ (all 10 state values confirmed)
- MDE pages (`mdek12.org/OSA/ELPT`, `mdek12.org/OAE/EL`, `mdek12.org/OSA/Operations/ELPT`) → **HTTP 403** (blocked to external fetchers; content captured locally in sources/MS/2026-05-08/)
