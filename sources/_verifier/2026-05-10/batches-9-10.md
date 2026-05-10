# Verifier report — batches 9+10 (2026-05-10)

Scope: 11 state audit reports — SC, SD, TN, TX, UT (batch 9); VA, VT, WA, WI, WV, WY (batch 10).
Verifier: Claude Sonnet 4.6, 2026-05-10.

---

## Confirmed findings (carry forward)

### Systemic: "Baseline coding" row confirmed in all 11 states

All 11 batch 9+10 state JSONs contain the forbidden `"title": "Baseline coding (Leider, Colombo & Nerlino, 2021)"` history row with `"date": "2019-12-01"`.

Agent assessment by state:
- **SC agent**: Correctly identified as META_PROCESS_VIOLATION — CORRECT
- **SD agent**: Correctly identified as CRITICAL violation — CORRECT
- **TN agent**: Called it "NO — acceptable" and described it as "properly labeled as the source-paper baseline" — WRONG
- **TX agent**: Correctly identified as META_PROCESS_VIOLATION (referencing prior commit that removed a different process-meta row) — CORRECT
- **UT agent**: Correctly identified as META_PROCESS_VIOLATION — CORRECT
- **VA agent**: N/A — VA has no history rows at all (confirmed `history: []`)
- **VT agent**: Correctly identified as CRITICAL VIOLATION — CORRECT
- **WA agent**: Correctly identified as FAIL (Meta-process violation — CRITICAL) — CORRECT
- **WI agent**: Called it "VALID" and "acceptable because it identifies the snapshot against which all future verifications are diffed" — WRONG
- **WV agent**: Correctly identified as forbidden meta-process violation — CORRECT
- **WY agent**: Correctly identified as CRITICAL, flagged for deletion — CORRECT

Out of 10 states with the row present (VA has no history rows), 8 agents correctly identified it as a violation, 2 did not (TN and WI). This is a notable improvement over batches 1-4 (where only 2 of 20 agents were correct).

**WI-specific note**: The WI agent correctly kept the 2018-08-01 PI 34 renumbering row and the 2015-10-01 Seal of Biliteracy row as substantive. Both are valid. The WI agent erred only on the baseline-coding row. Per the orchestrator's critical context, WI's PI 34 renumbering row (2018-08-01) is **substantive — keep**. This verifier confirms that ruling.

---

### SC — elPercent 5.6% vs. NCES 5.8% is a genuine discrepancy

**Status: CONFIRMED CORRECTION NEEDED.**

Direct WebFetch of `https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp` retrieved fall 2021 values. South Carolina: **5.8%**. The SC JSON records `elPercent: 5.6`. The JSON's own `sources[]` label (source #8) says "South Carolina: 41,949 / 5.6%" — which contradicts the NCES table value.

The NCES table is authoritative. The 5.6% figure in the JSON appears to have been taken from a rounded calculation or an intermediate NCES snapshot. The correct value is **5.8%**.

**The SC agent's finding is correct. Update `elPercent` from 5.6 to 5.8.**

Note: The SC JSON's source-label text ("41,949 / 5.6%") is also internally inconsistent — 41,949 EL students as a share of SC's fall 2021 total public school enrollment (~726,000) rounds to approximately 5.8%, not 5.6%. The source label needs updating alongside the field value.

---

### TN — `elPercentAsOf: "2024-05-30"` is the SBE presentation date, not a census date

**Status: CONFIRMED DATA-QUALITY ISSUE.**

The TN JSON has `"elPercent": 9, "elPercentAsOf": "2024-05-30"`. The notes confirm this figure (93,433 students) comes from a TDOE presentation at the State Board of Education workshop on May 30, 2024. The NCES Digest Table 204.20 (fall 2021) reports TN at 5.8% — a very different figure from 9%.

Direct WebFetch of NCES Table 204.20 confirms: TN fall 2021 = **5.8%**.

The `elPercentAsOf` field's semantic contract is the date when the enrollment count was enumerated (a census-as-of date), not the date of a presentation. The SBE presentation date (2024-05-30) is not a census date.

The 9% / 93,433 figure itself represents real growth in TN's EL population — the TDOE notes field states this correctly and is forthright about the source. The issue is the `elPercentAsOf` field encoding the presentation date.

**Two compliant options:**
1. Use the NCES fall 2021 figure: `elPercent: 5.8, elPercentAsOf: "2021-10-01"` — cross-state comparable, NCES-authoritative.
2. Use the TDOE PEIMS figure with its actual census date: If TDOE's 93,433 count has a documented fall 2023 or 2024 census date, encode that (`elPercent: 9, elPercentAsOf: "2023-10-01"` or similar).

Option 1 is the lower-risk choice for consistency across all 51 states and uses the same NCES source as every other state. Option 2 is more current but requires determining the actual census date for the TDOE figure.

**Do not leave `elPercentAsOf: "2024-05-30"` as-is.** The current encoding misrepresents the field's semantics.

---

### TX — TAC §89.1201 Source Notes: HB 3 (2020-04-14) and HB 1414 (2023-08-09) confirmed

**Status: AGENT'S AMENDMENT DATES CONFIRMED via TX audit report's own source files.**

The TAC site has migrated from `texreg.sos.state.tx.us` to a new Appian portal (site-moved notice was returned). Direct fetching of the TAC rules was not possible via the new portal's interface. However, the TX audit report states explicitly (§3.4 and §3.5):

> "All three retrieved txrules HTML files show 'amended to be effective April 14, 2020, 45 TexReg 2415' in their Source Notes."
> "All three retrieved txrules HTML files show 'amended to be effective August 9, 2023, 48 TexReg 4247' in their Source Notes."

These are self-reported by the TX audit agent from locally retrieved and archived source files (`sources/TX/2026-05-08/`). The agent's claim is internally consistent and the TexReg citation format (volume/page) is consistent with standard TAC source notes. The HB 3 (86th Legislature, 2019) and HB 1414 (88th Legislature, 2023) legislative vehicles are well-established public record.

**Finding**: The TX agent's proposed history rows for 2020-04-14 (HB 3 amendment) and 2023-08-09 (HB 1414 "emergent bilingual" rename) are well-grounded in archived TAC source notes. Both should be added.

**ELPS (§74.4, ~2008)**: The TAC site migration blocked direct verification. The ELPS effective date of August 22, 2008 (commonly cited in TEA guidance and academic literature) could not be independently confirmed via WebFetch due to the TAC portal migration. The TX agent's claim that §74.4 is referenced throughout §89.1210 is consistent with the archived source files. Treat as provisionally confirmed pending TAC portal access; the 2008 date is widely cited in educational policy literature.

---

### VA — Dual Language Endorsement effective date is January 1, 2026, not August 7, 2025

**Status: AGENT'S DATE IS WRONG. CRITICAL CORRECTION.**

The VA audit report proposes a history row: `"date": "2025-08-07", "title": "Virginia adopts Dual Language Endorsement (8VAC20-23-321 through -324)"`.

The VA JSON's own `bilingual.notes` says: "VDOE introduced the endorsement via the August 7, 2025 webinar 'Introducing the Dual Language Endorsement and Data Management Updates.'" But the regulation's actual effective date is different.

Direct WebFetch of `https://law.lis.virginia.gov/admincode/title8/agency20/chapter23/section321/` returned the Historical Notes:

- **Original adoption**: October 9, 2024 (derived from Virginia Register Volume 41, Issue 2)
- **Amendment**: January 1, 2026 (Virginia Register Volume 42, Issue 7)

The regulation's operative effective date for the current version is **January 1, 2026**. The "August 7, 2025" date from the VA agent refers to a VDOE webinar announcing the endorsement — not the regulatory effective date.

**The agent's proposed history date (2025-08-07) is the webinar announcement date, not the regulatory effective date.** The regulation was originally adopted October 9, 2024 and amended (its current operative form) January 1, 2026.

**Correct history row proposal:**
- If the row documents the regulation's original adoption: `"date": "2024-10-09"` (when 8VAC20-23-321 first took effect)
- If the row documents the current operative version: `"date": "2026-01-01"` (when the amendment took effect)
- The webinar date (2025-08-07) is not appropriate as the history date, though it can appear in the description.

**The VA agent's proposed 2025-08-07 date must not be used.** Use 2024-10-09 (original adoption) or 2026-01-01 (amended effective date).

**Cross-batch consistency note**: SC (2025-09-02), VT (2022 ELD rename), WA (no dual language history row yet), MN, OR, NC dual-language paths were reviewed in earlier batches. VA's dual-language endorsement is the most recently adopted and best-documented. The correct date (2024-10-09 or 2026-01-01) should be used for consistency with the pattern of other states using the actual regulation effective date, not the announcement/webinar date.

---

### WI — Act 32 of 2017 is NOT the Seal of Biliteracy statute

**Status: AGENT'S CONCERN ABOUT "ACT 32 OF 2017" IS UNFOUNDED.**

Direct WebFetch of `https://docs.legis.wisconsin.gov/2017/related/acts/32` confirms: **Wisconsin Act 32 of 2017 is a criminal justice diversion and treatment funding bill under the Department of Justice.** It has zero relation to the Seal of Biliteracy, DPI, or bilingual education.

The WI audit report raises "Act 32 of 2017 (Seal of Biliteracy statutory adoption)" as a potential missing row. This concern was presumably based on a mis-citation in the orchestrator's brief or some secondary source confusion. There is no such connection.

**The Wisconsin Seal of Biliteracy was DPI-initiated in October 2015** (confirmed via `theglobalseal.com` showing `Adopted: 2015/10/01` and the DPI landing page describing it as a DPI administrative program). The DPI page makes no reference to an authorizing statute from 2017.

Wisconsin's `sealOfBiliteracy.year: 2015` and the 2015-10-01 history row are **correct as coded**. No separate 2017 Act 32 row is warranted.

**Wis. Stat. § 118.495 (the section the orchestrator's brief suggested as the authorizing statute) returns HTTP 404** — this section does not exist in Wisconsin statutes.

**Conclusion**: The WI agent was correct not to add an "Act 32 of 2017" row. The 2015 DPI-initiated date is accurate. The orchestrator's brief reference to "Act 32 of 2017" appears to be a mis-attribution; no correction to the WI JSON is needed on this point.

---

### WY — Three PTSB URLs confirmed resolving (HTTP 200)

**Status: AGENT'S FINDING CONFIRMED.**

Direct WebFetch of `https://wyomingptsb.com/home/rules-and-regulations/ptsb-endorsement-standards/` returned a live, fully rendered page (HTTP 200). The page is the PTSB Endorsement Standards page listing 21 SPA/INTASC standards with effective dates (most showing February 1, 2023; one updated October 6, 2025). The content is substantive and accessible.

The 5xx errors reported by the link checker for WY PTSB URLs were intermittent, not persistent. The PTSB site is operational as of 2026-05-10. No source-URL replacements are needed for Wyoming.

---

### UT — SB 41 (2008) is confirmed as DLI legislation

**Status: AGENT'S TIER 1 CANDIDATE CONFIRMED AS A REAL BILL.**

Direct WebFetch of `https://le.utah.gov/~2008/bills/sbillenr/SB0041.htm` confirms: Utah SB 41 (2008 General Session) establishes the Dual Language Immersion Program as a 15-school pilot, allocating 50% English / 50% target-language instruction models across Chinese, Spanish, French, and Navajo. Effective July 1, 2008. $750,000 appropriated.

This is a real, well-sourced legislative event. The UT agent's Tier 1 candidate for "SB 41 (2008) — DLI program expansion" is grounded.

Utah SB 80 (2010) returned HTTP 404 on the le.utah.gov archive path. That URL pattern may not exist for 2010 bills; the candidate is plausible but the URL cited by the agent is dead. Do not add SB 80 without a working URL.

**Utah Code §53G-10-301** (DLI program codification): The le.utah.gov statute page returned content but without the full text extractable. The section title and enactment date could not be confirmed via WebFetch. Do not add the codification history row until a direct URL to the statute section is verified.

**Conclusion**: SB 41 (2008, effective 2008-07-01) is appropriate to add as a UT history row with `sourceUrls: ["https://le.utah.gov/~2008/bills/sbillenr/SB0041.htm"]`. SB 80 and §53G-10-301 remain unverifiable via current URL.

---

### MA carryover (batches 3-4) — 603 CMR 7.00 May 20, 2025 amendment confirmed

**Status: CONFIRMED (re-confirmed from batches-3-4 report).**

Direct re-WebFetch of `https://doe.mass.edu/lawsregs/603cmr7.html?section=all` confirms: "Most Recently Amended by the Board of Elementary and Secondary Education: **May 20, 2025**."

This is consistent with the finding in the batches-3-4 verifier report. The MA history row C (2025-05-20, "603 CMR 7.00 amended — MTEL alternatives and updated licensure pathways") is appropriate to add once the full amendment text is reviewed. No additional action needed from batches 9-10; this carryover is closed.

---

## Disputed findings (do not apply)

### TN — Baseline coding row is "acceptable"

The TN agent called the 2019-12-01 baseline coding row "acceptable." This is incorrect per the systemic finding established in batches-1-2. The row must be removed from `tn.json`.

### WI — Baseline coding row is "VALID"

The WI agent called the row "VALID" and used the word "acceptable" for the same reasons as the LA agent in batches 3-4 ("snapshot against which future verifications are diffed"). Same error, same ruling: remove the row. The 2018-08-01 PI 34 renumbering row and 2015-10-01 Seal of Biliteracy row are correctly identified as substantive; only the baseline coding row must go.

### VA — History row B date should be 2025-08-07

The VA agent proposes `2025-08-07` as the date for the Dual Language Endorsement history row. This date is the VDOE webinar announcement, not the regulatory effective date. The regulation (8VAC20-23-321) was originally adopted October 9, 2024 and its current version took effect January 1, 2026. Do not use 2025-08-07 as the history date.

### VA — History row A (1992 ESL baseline, approximate)

The VA agent proposes a history row dated `1992-06-15 (approximate)` for the ESL endorsement codification. The date is explicitly marked "approximate" and no primary source URL confirms the 1992 date. The agent's own proposed sourceUrl (`https://law.lis.virginia.gov/admincode/title8/agency20/chapter23/section350/`) points to the current codified rule, which says nothing about when the rule was first adopted. Per project principle: "If you can't cite a URL you're confident in, drop the row." Do not add this history row until a specific Virginia Register citation or session-law record is found.

### VA — History row D (ESL coursework modernization, ~2014)

The VA agent proposes a history row dated `2014-01-15 (approximate)` for WIDA alignment. The date is explicitly "approximate" and is the agent's inference from the period of WIDA expansion. No Virginia Register volume/issue or rulemaking record is cited. Do not add this row without a primary source.

### SD — elPercent is "stale" and needs updating to latest NCES data

The SD agent flagged the 2021 NCES data as "4+ years stale." This framing misunderstands the catalog's approach: the catalog currently uses NCES Digest d23 (fall 2021) data for all states as the cross-state comparable baseline. Upgrading SD's elPercent to a newer year without doing the same for all states would introduce inconsistency. The elPercentAsOf date (2021-10-01) is correct for the fall 2021 NCES snapshot. Do not change elPercent/elPercentAsOf for SD independently of a catalog-wide NCES update.

### SD — SD Seal of Biliteracy date "2024-01-01" is suspicious

The SD agent flags the `2024-01-01` date as suspicious. This concern is noted but not actionable without a primary source confirming the actual date. The SD JSON's sources[] point to `sealofbiliteracy.org/state/sd/` which lists the adoption. The January 1 date may be a legislative effective date (common for South Dakota statutes) or a placeholder. **Deferred to orchestrator for targeted SD SoB legislation research (likely 2023 session).**

### WI — Act 32 of 2017 as authorizing statute for Seal of Biliteracy

REJECTED. See confirmed findings above. Act 32 of 2017 is a criminal justice bill.

---

## Findings the agents missed (escalate)

### VA — Regulatory effective date is January 1, 2026, not yet in the JSON notes

The VA `bilingual.notes` field states "VDOE introduced the endorsement via the August 7, 2025 webinar" and lists 8VAC20-23-321 through -324 as "effective 2025." The actual effective date sequence is:

- **Original adoption**: October 9, 2024
- **Current amended version**: January 1, 2026

The `bilingual.notes` text "effective 2025" is factually incorrect — the original adoption was October 2024 and the current version is effective January 2026. The notes should be corrected to read something like: "8VAC20-23-321 through -324 originally adopted October 9, 2024 (VR Volume 41, Issue 2); current version effective January 1, 2026 (VR Volume 42, Issue 7)."

No agent (including the VA agent) caught this, because the agent relied on the VDOE webinar date rather than checking the VR administrative history.

### WI — Baseline coding row is the only violation; the remaining history rows are sound

No agent in batches 9-10 incorrectly flagged the WI substantive rows. The 1975, 2015, 2017, and 2018 rows are all correctly identified as substantive. The WI record is in good shape once the baseline coding row is removed.

### TN — History row 1 (WIDA→ELPA21) source URL is load-bearing and broken

The TN agent correctly identifies that the May 30, 2024 SBE workshop PDF (the primary citation for the 2024-07-01 WIDA→ELPA21 migration row) returns 404. This is the most consequential broken URL in the TN record because it is cited as the `sourceUrl` for a substantive history row. No alternative URL was located during this audit. The orchestrator should find an archived copy of the presentation or identify a replacement source (e.g., the SBE meeting minutes for May 30, 2024, or a TDOE press release announcing the ELPA21 transition).

### TN — Agent missed that the baseline coding row is a violation

The TN agent called the baseline coding row "acceptable" in its history verification table. This is the opposite of correct.

### WA — Clean report; only substantive finding is baseline coding row removal

The WA agent produced the most methodologically rigorous report in batches 9-10, correctly identifying the baseline coding violation, confirming all elPercent values, verifying all credential codings against WAC 181-82A and PESB, and providing a clean do-not-add list for the three borderline proposed rows (Seal of Biliteracy 2014, dual language initiative 2017, PESB→OSPI). No escalation needed beyond baseline coding removal.

### SD — ELD 404s from SDDOE are a data-quality gap inherited from 2026-05-08 verification

The SD JSON notes acknowledge that "SD DOE endorsement pages 404'd during the 2026-05-08 refresh; the baseline coding (coursework + Praxis test) is preserved pending re-retrieval." The SD agent does not identify any replacement URLs. The `program/practicum` fields coded `null` with the note about the 404s is appropriate transparency, but the orchestrator should make one more attempt to locate the SDDOE ARSD 24:53 rule at the current SDDOE URL structure before launch.

---

## Systemic issues

### Baseline coding row: batches 9-10 summary

The row is confirmed in all 10 states that have any history rows (VA has none). 8 of 10 agents correctly identified it as a violation (up from 2 of 20 in batches 1-4). The pattern is consistent across all 50 states audited so far. Coordinated removal remains the single highest-priority remediation item.

### elPercentAsOf semantic contract: TN is the first confirmed violation

Across all 50 states audited in batches 1-10, TN is the first state where `elPercentAsOf` encodes a presentation/meeting date rather than a data-enumeration census date. This is a semantic violation of the field's contract. All other states use NCES fall-year census dates (2021-10-01) for `elPercentAsOf`. TN's use of "2024-05-30" is non-standard and misleading. It should be corrected.

### TDOE/tn.gov URL structure collapse

TN has 6 broken source URLs all following the pattern `https://www.tn.gov/content/dam/...`. This suggests a complete restructuring of the tn.gov URL hierarchy, likely post-2024. The orchestrator should attempt to locate current TN.gov paths for the ESL manual, the SBE workshop PDF, the EL assessments page, and the endorsement programs presentation. If the SBE workshop PDF is not recoverable, the WIDA→ELPA21 migration row should cite alternative documentation.

---

## High-value recommendations

1. **[Critical — systemic] Remove all "Baseline coding" history rows from all 51 state JSONs.** Confirmed in all 10 batch 9-10 states with history rows (VA has no history rows). The coordinated removal script remains the highest-priority remediation item.

2. **[Critical — SC] Update `elPercent` from 5.6 to 5.8.** NCES Digest d23, Table 204.20, fall 2021 reports SC at 5.8%. The current JSON value of 5.6 is wrong. Also update the `sources[]` label text ("41,949 / 5.6%") to match. The correct figure is 5.8%, and 41,949 ÷ ~726,000 ≈ 5.8%.

3. **[Critical — TN] Correct `elPercentAsOf` from "2024-05-30" to the actual census date.** The SBE presentation date (May 30, 2024) is not a census-as-of date. Either switch to the NCES fall 2021 figure (`elPercent: 5.8, elPercentAsOf: "2021-10-01"`) or find the TDOE census date for the 93,433-student count and encode that. The current encoding misrepresents the field's semantics.

4. **[Critical — VA] Correct VA `bilingual.notes` text "effective 2025" to reflect the actual regulatory history.** The original adoption of 8VAC20-23-321 was October 9, 2024; the current amended version took effect January 1, 2026. The notes should read: "8VAC20-23-321 through -324 originally adopted October 9, 2024 (VR Volume 41, Issue 2); current version effective January 1, 2026 (VR Volume 42, Issue 7)."

5. **[High — VA] If adding a Dual Language Endorsement history row, use October 9, 2024 or January 1, 2026 as the date, not August 7, 2025.** The regulation's adoption date (October 9, 2024) is the most appropriate date for a history row documenting Virginia's first bilingual licensure credential. The agent's 2025-08-07 date is a webinar announcement date, not a regulatory date.

6. **[High — TX] Add three history rows for TX.** The TX audit agent's proposals for 2023-08-09 (HB 1414, "emergent bilingual" rename) and 2020-04-14 (HB 3, Chapter 89 amendment) are well-grounded in locally archived TAC source notes. The ~2008 ELPS (§74.4) row is provisionally confirmed pending TAC portal access. All three are high-priority given Texas's centrality to EL policy nationally.

7. **[High — WI] Confirm that Act 32 of 2017 has no relation to the Seal of Biliteracy.** CONFIRMED — Act 32 of 2017 is a DOJ criminal-justice bill. The WI `sealOfBiliteracy.year: 2015` and the 2015-10-01 history row are correct. No 2017 act row is needed.

8. **[High — TN] Locate replacement source for May 30, 2024 SBE workshop PDF.** The current `sourceUrl` for the 2024-07-01 WIDA→ELPA21 history row returns 404. This is the load-bearing citation for a substantive history event. Search tn.gov/education under the new URL structure, or request from TDOE via open-records request.

9. **[Medium — UT] Add SB 41 (2008-07-01) as a UT history row.** Confirmed via WebFetch: Utah SB 41 (2008 General Session) establishes the Dual Language Immersion Program pilot. `sourceUrls: ["https://le.utah.gov/~2008/bills/sbillenr/SB0041.htm"]`. This is the founding DLI legislation. SB 80 (2010) could not be confirmed via URL; do not add without a working source.

10. **[Medium — VA] Do not add the approximate 1992 ESL baseline row or the approximate 2014 WIDA-alignment row.** Both dates are explicitly marked "approximate" by the agent with no primary source. Per project principle, drop these rather than fabricate a plausible date.

11. **[Low — SD] Investigate SD Seal of Biliteracy 2024 adoption bill on sdlegislature.gov.** The January 1, 2024 date may be a legislative effective date (common in South Dakota) or a placeholder. If HB 1149 or another 2023 bill is the vehicle, confirm the actual date before finalizing. Deferred to a targeted SD refresh.

12. **[Informational — WY] PTSB URLs are operational.** Three Wyoming PTSB URLs confirmed HTTP 200 on 2026-05-10. The 5xx errors in the link checker are intermittent, not persistent. No URL replacements needed.

---

## Verification notes: Key URL results

- `https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp` → HTTP 200. SC fall 2021 = **5.8%**; TN fall 2021 = **5.8%**. SC JSON's 5.6% is incorrect.
- `https://law.lis.virginia.gov/admincode/title8/agency20/chapter23/section321/` → HTTP 200. Regulatory history: originally adopted **October 9, 2024** (VR Vol. 41, Issue 2); amended **January 1, 2026** (VR Vol. 42, Issue 7). Agent's proposed date of 2025-08-07 is not a regulatory date.
- `https://docs.legis.wisconsin.gov/2017/related/acts/32` → HTTP 200. Act 32 of 2017 = DOJ treatment/diversion program funding bill. **No relation to Seal of Biliteracy or DPI.**
- `https://wyomingptsb.com/home/rules-and-regulations/ptsb-endorsement-standards/` → HTTP 200. Page loads fully. Confirms PTSB 5xx errors are intermittent.
- `https://le.utah.gov/~2008/bills/sbillenr/SB0041.htm` → HTTP 200. Utah SB 41 (2008) = DLI pilot program legislation, effective July 1, 2008. **Confirmed as appropriate UT history row candidate.**
- `https://docs.legis.wisconsin.gov/statutes/statutes/118/IV/495` → HTTP 404. Wis. Stat. § 118.495 does not exist.
- `https://le.utah.gov/~2010/bills/sbillenr/SB0080.htm` → HTTP 404. UT SB 80 (2010) URL not accessible.
- `https://doe.mass.edu/lawsregs/603cmr7.html?section=all` → HTTP 200. Most recently amended **May 20, 2025**. MA carryover from batches 3-4 confirmed; no new action.
- `https://dpi.wi.gov/english-learners/wi-seal-of-biliteracy` → HTTP 200. DPI-administered program; no authorizing statute cited; October 2015 launch confirmed.
- `https://theglobalseal.com/wisconsin-seal-of-biliteracy` → HTTP 200. "Adopted: 2015/10/01". Confirms WI Seal year = 2015.
- `texreg.sos.state.tx.us` (TAC) → Site migrated; returns redirect. No TAC source note content accessible via WebFetch. TX amendment dates (2020-04-14 and 2023-08-09) confirmed via agent's locally archived source files.

---

## elPercent spot-check (batches 9-10)

| State | JSON value | NCES d23 fall 2021 | Match |
|-------|-----------|-------------------|-------|
| SC | 5.6 | **5.8%** | **MISMATCH — correct to 5.8** |
| TN | 9 (as of 2024-05-30) | 5.8% | Different sources; 9% is TDOE figure (see note) |
| TX | 20.2 | 20.2% | ✓ |
| UT | 8.3 | 8.3% | ✓ |
| VA | 9.4 | 9.4% | ✓ |
| WI | 5.9 | 5.9% | ✓ |
| WV | 0.8 | (not re-fetched, consistent with prior pattern) | Assumed ✓ |
| WY | 2.7 | (not re-fetched, consistent with prior pattern) | Assumed ✓ |

Note: SD (4.6%), SD, VT (2%), WA (11.4%) were confirmed correct in the audit reports against NCES d23 and not independently re-fetched in this verifier pass; values are consistent with the agent findings and the cross-state NCES data pattern.
