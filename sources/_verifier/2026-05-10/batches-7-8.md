# Verifier report — batches 7+8 (2026-05-10)

Scope: 10 state audit reports — NH, NJ, NM, NV, NY (batch 7); OH, OK, OR, PA, RI (batch 8).
Verifier: Claude Sonnet 4.6, 2026-05-10.

---

## Confirmed findings (carry forward)

### Systemic: "Baseline coding" row confirmed in all 10 states

All 10 state JSONs contain the forbidden `"title": "Baseline coding (Leider, Colombo & Nerlino, 2021)"` history row at date `2019-12-01`. This confirms the universal pattern from batches 1–6. Every state in batches 7+8 must have this row removed before launch.

### NM / history[1] — wrong bill number AND wrong NMAC citation (confirmed)

The history row at `2014-03-05` ("New Mexico State Seal of Bilingualism-Biliteracy enacted") states:

> "NM Laws 2014, ch. 46 (Senate Bill 159)"

**SB 159 is the wrong bill.** Direct WebFetch of the NM Legislature bill page for SB 159, 2014 Regular Session, confirms: SB 159 is titled "EDUCATION TECHNOLOGY INFRASTRUCTURE FUNDING," sponsored by Candelaria and Stewart, signed March 6, 2014 as Chapter 28. It allocates up to $10 million annually from the Public School Capital Outlay Fund for technology hardware deficiencies. It has nothing to do with a Seal of Biliteracy. The correct bill number for NM Laws 2014, ch. 46 is a different measure that created the State Seal of Bilingualism-Biliteracy — the Chapter number and the SB/HB number are being conflated.

**The NMAC citation is also wrong.** The history row says "NMPED rules at 6.32.2 NMAC implement the program." WebFetch of both sections confirms:
- 6.32.2 NMAC = "Guidelines for Implementing Bilingual Multicultural Education Programs" (Bilingual Multicultural Education Programs / BMEP — not the Seal).
- 6.32.3 NMAC = "Seal of Bilingualism-Biliteracy on New Mexico Diploma of Excellence" — **this is the correct implementing regulation**, effective September 15, 2015.

The NMPED Seal of Bilingualism-Biliteracy page (`web.ped.nm.gov`) cites NMSA 22-1-9.1 as the statutory authority and 6.32.3 NMAC as the implementing rule.

**Action required:** Correct the history row to remove "Senate Bill 159" (identify the correct bill number for NM Laws 2014, ch. 46) and replace "6.32.2 NMAC" with "6.32.3 NMAC".

### NM / history row source URLs are indirect

The Yazzie/Martinez row (2018-07-20) cites the BMEP FAQ page as its source — that page mentions the litigation but does not provide primary court record. This is a thin citation (equivalent to the CO "landing page" issue flagged in batches 1-2). For a consequential court ruling this is the best available state-facing URL; acceptable but worth noting for future improvement.

### NM / 6.64.11 NMAC (2022 replacement) is confirmed substantively correct

WebFetch of `https://www.srca.nm.gov/parts/title06/06.064.0011.html` confirms: 6.64.11 NMAC was effective 7/1/2022 (replacing the 2000 version). It regulates TESOL endorsement requirements. Initial Level 1 candidates: 24 semester hours + content knowledge assessment. Existing-license holders: pass assessment + 12 semester hours (or 24 hours alone). International reciprocal holders: additionally pass an English language proficiency exam. The JSON's TESOL coding (`coursework: true`, `test: true`, `languageProficiency: false` for domestic candidates) is accurate against the live regulation. The 2022 update is correctly dated in the history description.

### NV / `sei.mandatedForAllTeachers: false` is confirmed

WebFetch of `https://www.leg.state.nv.us/nac/nac-391.html` found no universal mandate that all teachers must hold an ELAD endorsement. NAC 391.237 establishes the ELAD endorsement as a voluntary specialization. The agent's coding — and the JSON's `mandatedForAllTeachers: false` with the note that "the phased rule did not result in a universal credential requirement" — is correct. The 2019-07-01 history row documenting the non-implementation of the phase-in is an appropriate and accurate historical note.

### NY / Seal of Biliteracy year coding is defensible; signed date in JSON is correct

The NY changes-from-baseline.md records: "The legislation was signed July 31, 2012 and first awards issued 2015–16, but the conventional 'adopted year' cited by sealofbiliteracy.org and most secondary sources is 2013." The JSON records `history[2].date = "2012-12-17"` and `"title": "New York State Seal of Biliteracy enacted"` with `sealOfBiliteracy.year = 2013`. **There is an internal inconsistency:** the `history[2].date` is `2012-12-17` (December 17, 2012) but the description states the legislation was "signed July 31, 2012." These are two different dates — one of them is wrong. The changes-from-baseline.md says July 31, 2012; the JSON history row says December 17, 2012. The sealofbiliteracy.org page could not be fetched to arbitrate; NYSED's own page did not expose the signing date in the WebFetch response. The `history[2].date` and the description's claim ("signed 2012-12-17") are internally consistent in the JSON, but the changes-from-baseline says July 31. One of these two documents has a transcription error. This needs to be resolved via direct check of the Chapter 416 chaptered law date at `legislation.nysenate.gov` or `public.leginfo.state.ny.us`. **The `sealOfBiliteracy.year: 2013` (first-award year) is a defensible convention consistent with project practice; the issue is the history row date.**

### NY / `elpAssessment.consortium: null` and `name: "NYSESLAT"` are confirmed correct

Changes-from-baseline confirms NY uses NYSESLAT (state-developed since 2003), not WIDA ACCESS. The prior baseline coding of WIDA was wrong. The 2026-05-08 correction is accurate. The agent's statement "NY uses NYSESLAT, never WIDA" is confirmed — this is correctly coded.

### OH / ODEW rename date confirmed correct

WebFetch of `https://education.ohio.gov/Topics/Student-Supports/English-Learners` confirms the agency now displays as "Ohio Department of Education and Workforce" (ODEW). The JSON history row for the rename is dated `2023-07-04` and cites HB 33 (FY24-25 biennial budget). The changes-from-baseline.md says "HB 33, FY24-25 budget bill, July 2023." The July 4, 2023 signing date for a budget bill is credible (the FY24 Ohio budget cycle); no contrary evidence found. The sourceUrl for this row (`https://education.ohio.gov/Topics/Student-Supports/English-Learners`) is a landing page that confirms ODEW branding but does not cite HB 33 directly — a more authoritative citation would be the Ohio General Assembly enrolled bill page or the Governor's press release, but the current URL is functional and the ODEW name is visibly confirmed there.

### PA / CSPG #68 source URL in history[2] is too generic — confirmed

The PA history row at `2023-07-01` (CSPG #68 revision) cites `sourceUrl: "https://www.pa.gov/agencies/education.html"`. WebFetch confirms this is the generic PDE homepage — it shows general departmental navigation and press releases, with no specific policy document about CSPG #68. The correct, specific URL is already in `sources[]`:

```
https://www.pa.gov/agencies/education/programs-and-services/educators/certification/certification-staffing/staffing-guidelines/cspg-68-english-as-a-second-language-esl-program-specialist-pk-12.html
```

WebFetch of this URL confirms it is titled "CSPG 68 - English as a Second Language (ESL) Program Specialist PK-12" and shows "Modified: July 1, 2023." The generic homepage should be replaced with this specific URL in history[2].sourceUrls.

### RI / 2025-06-01 history row sourceUrl is too generic — confirmed

The RI history row at `2025-06-01` ("RIDE Certification Regulations (June 2025) finalized") cites `sourceUrl: "https://www.ride.ri.gov/"`. WebFetch confirms this is the RIDE homepage — Commissioner's message, attendance stats, press releases, no direct link to the June 2025 Certification Regulations PDF. The correct URL — already in `sources[]` — is:

```
https://ride.ri.gov/sites/g/files/xkgbur806/files/2025-06/Certification-Regulations-2025.pdf
```

The generic homepage should be replaced with the PDF URL in history[2].sourceUrls.

### NJ / `bilingual.standalone: false` is confirmed

WebFetch of `https://www.law.cornell.edu/regulations/new-jersey/N-J-A-C-6A-9B-11-5` confirms the NJ Bilingual/Bicultural Education endorsement requires the candidate to "possess or be eligible for a CE, CEAS, or standard New Jersey instructional certificate" before adding the bilingual endorsement. This is an add-on structure — not standalone. The 2026-05-08 correction from `standalone: true` to `false` is accurate and should be kept.

### Cross-state bilingual consistency — NJ + NY + MA all have `standalone: false`

Confirmed from the three JSONs:
- NJ: `bilingual.standalone: false` (corrected 2026-05-08 from true) — add-on endorsement on instructional cert
- NY: `bilingual.standalone: false` (corrected 2026-05-08 from true) — Bilingual Education Extension is add-on only
- MA: `bilingual.standalone: false` (from batches-3-4 verification) — BESE Bilingual Education Endorsement is add-on

All three correctly coded as add-on only. No inconsistency.

### NJ / `eld.standalone: false` is confirmed

Changes-from-baseline is explicit: ESL is an endorsement under N.J.A.C. 6A:9B-11.6 and must be added to an underlying NJ instructional certificate. The correction from `standalone: true` to `false` is accurate.

### All 10 elPercent values confirmed against NCES d23 Table 204.20

Direct WebFetch of `https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp` returned all 10 fall 2021 values. All match JSON values exactly:

| State | JSON | NCES d23 Table 204.20 |
|-------|------|----------------------|
| NH | 2.8 | 2.8% ✓ |
| NJ | 8.2 | 8.2% ✓ |
| NM | 18.8 | 18.8% ✓ |
| NV | 13.8 | 13.8% ✓ |
| NY | 9.7 | 9.7% ✓ |
| OH | 3.8 | 3.8% ✓ |
| OK | 9.3 | 9.3% ✓ |
| OR | 9.5 | 9.5% ✓ |
| PA | 4.6 | 4.6% ✓ |
| RI | 12.5 | 12.5% ✓ |

---

## Disputed findings (do not apply)

None in batches 7+8. The agents did not make affirmative findings that would require rejection; the main issues are omissions and one clear factual error (NM SB 159).

---

## Findings the agents missed (escalate)

### NM / Wrong bill number for 2014 Seal of Biliteracy is unambiguously wrong (most severe finding in this batch)

This is a factual error in a public-facing history row. NM Laws 2014, ch. 46 is cited as "Senate Bill 159" in the JSON, but SB 159 (2014) is the Education Technology Infrastructure Funding bill (Chapter 28). The Seal of Bilingualism-Biliteracy bill was a different 2014 measure — the chapter number (ch. 46) and the bill number (SB 159 → ch. 28) are both inconsistent with each other. The statutory authority is NMSA 22-1-9.1; the implementing rule is 6.32.3 NMAC (not 6.32.2 NMAC as coded). Before correcting the JSON, the orchestrator must identify the actual bill number (likely HB or SB in the 2014 session) that became NM Laws 2014, ch. 46. Neither the bill number nor the correct NMAC section can be inferred with confidence from available data — a targeted lookup against nmlegis.gov for "NM Laws 2014 ch. 46" is needed.

### NM / Implementing NMAC section is wrong in the history row text

`6.32.2 NMAC` is a bilingual-program guideline, not the Seal regulation. `6.32.3 NMAC` is the Seal. This correction can be applied without waiting for the bill number resolution — the NMAC section error is confirmed and independent.

### NJ / history[0] sourceUrl resolves to generic NJAC index, not the bilingual education statute

The NJ history row for the 1975 Bilingual Education Act cites:
```
"sourceUrls": ["https://www.law.cornell.edu/regulations/new-jersey/N-J-A-C-6A-15"]
```
WebFetch confirms this URL resolves to the top-level Cornell LII New Jersey Administrative Code index page (all titles), not to any specific bilingual education regulation. Two separate fixes are warranted:

1. The sourceUrl for the 1975 Bilingual Education Act should cite the statute (N.J.S.A. 18A:35-15), not the administrative code. A stable URL for this statute is not available from the fetch attempts in this session (njleg.state.nj.us and Justia both returned 404/403), but `https://www.nj.gov/education/title3/district/program_blerequirements.shtml` (already in sources[]) references N.J.A.C. 6A:15 (the bilingual program regulation) and is a reasonable interim citation for the event.

2. The history row date is `1975-01-06` and the title says "enacted (P.L. 1974, c. 197)." P.L. 1974, c. 197 means it was enacted during the 1974 legislative session; January 6, 1975 plausibly reflects when the new Legislature convened or the act took effect. The date should be confirmed against primary sources.

The orchestrator should note that the sourceUrl is currently non-functional as a pointer to the statute and should be updated to a working N.J.S.A. 18A:35-15 URL when one is available.

### NV / `sealOfBiliteracy.sourceUrl` is still the generic sealofbiliteracy.org root

NV's `sealOfBiliteracy.sourceUrl` is `https://sealofbiliteracy.org/` (generic root). Per patterns established across other states (OR uses `sealofbiliteracy.org/state/or/`, OH uses `sealofbiliteracy.org/state/ohio/`), it should be `https://sealofbiliteracy.org/state/nevada/` for consistency and precision. The history row at 2015-06-09 already uses `https://sealofbiliteracy.org/state/nevada/`; the top-level `sealOfBiliteracy.sourceUrl` field should match.

### RI / `sealOfBiliteracy.sourceUrl` is also the generic root

Same issue: RI's `sealOfBiliteracy.sourceUrl` is `https://sealofbiliteracy.org/` but the RI history row and the `sources[]` entry both correctly use `https://sealofbiliteracy.org/state/ri/`. The top-level field should be updated to the state-specific URL. (See same pattern: NV, PA both use the generic root; PA's seal page is also worth tightening to `sealofbiliteracy.org/state/pa/`.)

### PA / `sealOfBiliteracy.sourceUrl` is the generic sealofbiliteracy.org root

PA's `sealOfBiliteracy.sourceUrl` is `https://sealofbiliteracy.org/` — should be `https://sealofbiliteracy.org/state/pa/`.

### NY / history[2].date needs resolution against primary source

The JSON records the NY Seal of Biliteracy signing date as `2012-12-17`, but the changes-from-baseline.md records "signed July 31, 2012." These two sources are mutually inconsistent. The description in the history row says "(signed 2012-12-17)" — so the JSON is internally self-consistent, but contradicts the agent's prose. The correct signed date for Chapter 416 of the Laws of 2012 should be verified directly. The simplest check: `https://legislation.nysenate.gov` or `https://public.leginfo.state.ny.us` would show the governor's sign date for Chapter 416 of 2012. Until resolved, `history[2].date = "2012-12-17"` should be treated as uncertain.

### OR / Bilingual Specialization `standalone: true` may be an overstatement

OR's JSON records `bilingual.standalone: true` with the note "Two distinct add-ons: Bilingual Specialization … and Dual Language Specialization." The changes-from-baseline describes both as "add-ons" to an existing Oregon teaching license. Yet the JSON field `standalone: true` implies OR issues a standalone bilingual certificate that does not require an underlying license. If both Oregon bilingual pathways are add-ons requiring an existing license, `standalone` should be `false`. The changes-from-baseline does not explicitly resolve this; it is consistent with both interpretations (the Bilingual Specialization is acquired by adding it to a teaching license, like OR's ESOL). This should be confirmed against the TSPC source documents (`tspc-specializations.md`) before any change.

---

## Systemic issues

### "Baseline coding" row — present in all 10 states

Confirmed for all 10 states in batches 7+8, consistent with the universal finding established in batches 1–6. No new analysis needed; removal is required before launch across all 51 states.

### Generic sealofbiliteracy.org root URL is used in 3 of 10 states (NV, RI, PA)

The top-level `sealOfBiliteracy.sourceUrl` field uses the generic `https://sealofbiliteracy.org/` in NV, RI, and PA. The state-specific sub-pages (`sealofbiliteracy.org/state/<name>/`) are better citations and are already used in history rows for the same states. These should be normalized across all states in a final pass.

---

## Per-state summary table

| State | History violations | Key correction needed | elPercent | Status |
|-------|-------------------|----------------------|-----------|--------|
| NH | Baseline coding row (1) | Remove baseline row | 2.8% ✓ | Clean otherwise |
| NJ | Baseline coding row (1) | Fix history[0] sourceUrl (generic index); remove baseline row | 8.2% ✓ | bilingual/eld standalone corrections confirmed accurate |
| NM | Baseline coding row (1); wrong bill + NMAC in Seal row | Fix SB 159 → correct bill; fix 6.32.2 → 6.32.3 NMAC | 18.8% ✓ | Most errors in batch |
| NV | Baseline coding row (1) + phase-in row (not a violation — it's a legitimate historical note) | Tighten sealOfBiliteracy.sourceUrl to state-specific | 13.8% ✓ | SEI mandate non-implementation confirmed |
| NY | Baseline coding row (1) | Resolve 2012-12-17 vs July 31 2012 signing date | 9.7% ✓ | NYSESLAT correction confirmed; bilingual standalone confirmed |
| OH | Baseline coding row (1) | Strengthen ODEW rename sourceUrl to GA bill page | 3.8% ✓ | Clean otherwise |
| OK | Baseline coding row (1) | None (only 2 history rows, both clean) | 9.3% ✓ | Minimal history — acceptable |
| OR | Baseline coding row (1) | Investigate bilingual.standalone: true vs. add-on reality | 9.5% ✓ | Multiple substantive history rows clean |
| PA | Baseline coding row (1) | Fix history[2].sourceUrls to CSPG #68-specific URL; tighten sealOfBiliteracy.sourceUrl | 4.6% ✓ | CSPG confirmed accurate |
| RI | Baseline coding row (1) | Fix history[2].sourceUrls to PDF URL not RIDE homepage | 12.5% ✓ | Strongest source set in batch |
