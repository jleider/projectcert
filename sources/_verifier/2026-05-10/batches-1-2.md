# Verifier report — batches 1+2 (2026-05-10)

Scope: 10 state audit reports — AK, AL, AR, AZ, CA, CO, CT, DC, DE, FL.
Verifier: Claude Sonnet 4.6, 2026-05-10.

---

## Confirmed findings (carry forward)

- **AZ / Row 6 bill number is wrong** — The history row title reads "HB 2435 reduces daily SEI/ELD block from 4 hours to 2," but HB 2435 (54th Legislature, 1st Regular Session, 2019) is a **medical marijuana bill** ("medical marijuana; patient cards; fee"). The actual 2019 ELD-block reduction bill is **SB 1014** (54th Legislature, 1st Regular Session) — verified directly from `azleg.gov` bill text; SB 1014 amends A.R.S. §§ 15-756.01 through 15-756.04 and reduces the ELD block from "a minimum of four hours per day" to 120 minutes/day (K-6) or 100 minutes/day (7-12). The CLAUDE.md reference to "HB 2862" is also unconfirmed; HB 2862 (54th Leg.) returned 404 on azleg.gov. The correct citation is SB 1014.

- **CA / Row 7 "Baseline coding" is a META_PROCESS_VIOLATION** — Confirmed. The SKILL.md forbidden-title list explicitly names "Baseline coding" as one of the prohibited forms. This row's title ("Baseline coding (Leider, Colombo & Nerlino, 2021)") and description ("Initial coding … captured Oct–Dec 2019 for the EPAA 29(100) document analysis; this row is the as-of-2019 snapshot against which subsequent verifications are diffed") are textbook meta-process entries; they describe the catalog's QA workflow, not an SEA-side policy event.

- **CA / Row 6 source URL mismatch (Prop 58)** — Confirmed. The `sourceUrl` for the 2016 Prop 58 history row is `https://www.cde.ca.gov/ds/ad/cefelfacts.asp`, the CDE Facts About English Learners data-snapshot page. That page does not mention Proposition 58. The correct source is the codified EDC § 300 page at leginfo: `https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=EDC&sectionNum=300.`

- **CA / Row 2 source URL weak (Prop 227)** — Confirmed. The `sourceUrl` points to the generic leginfo Education Code search interface, not to §§ 300-340 where Prop 227 is codified. Replace with the section-level URL for EDC § 300 (same fix as Prop 58 row).

- **CA / Row 8 CSTP source 404** — Confirmed. `https://www.ctc.ca.gov/educator-prep/standards/cstp-2024.pdf` returns HTTP 404 as of 2026-05-10. Content is preserved locally in `sources/CA/2026-05-07/`. The CTC must have reorganized its URL structure. The orchestrator must find a stable replacement URL before next launch.

- **CO / Row 1 (1981 ELPA) source insufficient** — Confirmed. The `sourceUrl` `https://ed.cde.state.co.us/clde` is a landing page that confirms ELPA exists but does not cite HB 1166 or the 1981 enactment. Codified-statute reference (`C.R.S. §§ 22-24-101 to -106`) or a `leg.colorado.gov` session-law URL would be more authoritative per SKILL.md guidance.

- **AZ / Row 3 (HB 2064, 2006-04-28) date uncertain** — Plausible but unverified from a primary source. The agent correctly flags this. The signed-date should be confirmed on azleg.gov.

- **DC / Row 2 "Baseline coding" — agents disagree on status** — Confirmed violation. See systemic section below. The DC agent called it "acceptable in context" and the AZ agent called it "borderline." Both are wrong: the SKILL.md forbidden-title list is explicit and non-negotiable. See Systemic Issues.

- **AR / `professionalStandardsMentions.linguistic = true` is CORRECT** — The AR agent's recommendation to demote this to `false` is disputed and rejected. Direct WebFetch of the current Arkansas Teaching Standards document (2024 EEF PDF, the document cited in `sources[]`) found the following explicit quote in Standard #1 (Learner Development): "recognizing that patterns of learning and development vary individually within and across the cognitive, **linguistic**, social, emotional, and physical areas." The word "linguistic" appears explicitly as a developmental domain. Under the `el-cert-schema` skill definition (`linguistic` = "uses `language / linguistic`"), this satisfies the flag. The current `linguistic: true` coding is correct and should NOT be changed.

- **elPercent values confirmed for all 10 states** — NCES Digest d23, Table 204.20 (fall 2021) cross-checked via live WebFetch. All 10 values match: AK 10.8%, AL 4.7%, AR 8.1%, AZ 8.2%, CA 18.9%, CO 10.4%, CT 9.4%, DC 11.3%, DE 11.5%, FL 9.5%. No divergence in any state.

- **FL — all four history rows confirmed accurate**. Source URLs for the 1990 META Consent Decree, 2016 Seal of Biliteracy, and 2025 ESOL Standards adoption all verified. The `el: false` coding for Florida's FEAP (general teaching standards) is explicitly supported: no "EL", "ELL", "ESL", or "ESOL" appears in the general FEAP rule, only in the specialty ESOL document.

- **CT — bilingual endorsement correction (`offered=true, standalone=false, addOn=true`) is justified** — Confirmed. The 2026-05-08 CSDE source documents the bilingual cross-endorsement as an add-on only (no standalone bilingual license in CT). Correcting from the baseline-2019 miscoding of `offered=false` is appropriate per the skill guidance.

---

## Disputed findings (do not apply)

- **AR / Demote `professionalStandardsMentions.linguistic` to `false`** — REJECTED. The agent's claim that "no explicit reference to 'linguistic' was found in the general teaching standards" is incorrect. The 2024 EEF Arkansas Teaching Standards document explicitly uses the word "linguistic" in Standard #1 ("cognitive, linguistic, social, emotional, and physical areas"). This satisfies the schema definition. Do not change this field.

- **AZ / Row 7 "Baseline coding" is "OK" or "borderline"** — DISPUTED. The AZ agent called this row "OK (but is a process row, not an SEA event)" and said the description framing it as a "source document date" makes it "acceptable." This framing is special pleading. The row's title is explicitly listed as forbidden in SKILL.md. The fact that 50 of 51 state JSONs contain this row does not make it correct; it makes it a systemic issue (see below).

- **CO / Row 5 "Baseline coding" is "not a forbidden meta-process title"** — REJECTED. The CO agent explicitly concluded "The title 'Baseline coding' is not a forbidden meta-process title (e.g., 'Re-verified', 'Refreshed', 'Phase 2 verification')." This reading ignores the SKILL.md text, which reads: "The following titles and the prose patterns behind them are **forbidden**: 'Re-verified against current X sources', 'Refreshed against current SEA sources', 'Re-audit (history events captured)', 'Phase 2 verification (verified-2026)', 'Standards verified — promoted to verified-2026', 'Re-confirmed', 'Re-checked', 'Re-audited' … **and any other framing that describes the catalog's QA workflow rather than an SEA-side event.**" "Baseline coding" describes the catalog's coding workflow — it is the textbook case of what the skill prohibits, even though it isn't in the illustrative list. The CO agent's reasoning ("the description correctly frames it as the as-of-2019 snapshot") does not change the character of the row. A description of why you coded the data is still about the coding, not about an SEA action.

- **DC / Summary: "elPercentAsOf correctly marked as verification date (2026-05-08)"** — The agent's summary line contains a factual error. The DC JSON has `"elPercentAsOf": "2021-10-01"` — the data-snapshot date, not the verification date. The verification date is `"lastVerified": "2026-05-08"`. The agent's description of what `elPercentAsOf` represents is wrong ("the verification date"), but the actual JSON value (`2021-10-01`) is correct. This is an agent comprehension error in the report summary, not an error in the JSON itself. The JSON is fine; the agent's framing is confused.

- **AL / Agent notes professional-standards flags "should be re-confirmed"** — Treated as advisory, not a finding. The agent stopped short of verifying the AL Core Teaching Standards document (290-3-3-.04) due to PDF accessibility issues. This is an incomplete audit, not a confirmed error. The current flags (`diverse: true, cultural: true, linguistic: true, el: true`) remain as coded from the 2026-05-08 verification.

---

## Findings the agents missed (escalate)

- **AZ / Bill number error in history row 6 is more severe than flagged** — The AZ agent noted the bill number "needs confirmation" and described the concern as a "hygiene note." This understates the severity: HB 2435 is a medical marijuana bill, not an education bill at all. The history row cites a factually incorrect bill number for a consequential policy event in the catalog's public timeline. This is a content error, not a formatting issue. The orchestrator must correct the title and description to cite "SB 1014" and update the `sourceUrls` to cite `https://www.azleg.gov/legtext/54leg/1R/bills/SB1014P.htm` or the chaptered law equivalent.

- **"Baseline coding" row is present in 50 of 51 state JSONs** — No agent in batches 1+2 flagged this as a site-wide issue requiring a coordinated fix. Only the CA agent flagged it as a META_PROCESS_VIOLATION; several other agents explicitly called it "OK" or "borderline acceptable." This is incorrect. See Systemic Issues.

- **AZ / Seal of Biliteracy sunset risk** — Both the AZ audit report and the changes-from-baseline.md note that A.R.S. § 15-258's Seal of Biliteracy program "sunsets July 1, 2026 per § 41-3102(E) unless reauthorized." Today's date is 2026-05-10. The sunset is 52 days away. No agent escalated this as a time-critical action item requiring a legislative monitoring check before launch. If the AZ legislature does not reauthorize by June 30, the `sealOfBiliteracy.adopted: true` field will be factually incorrect at site launch.

- **CO / HB14-1298 history row suggestion is well-cited and should be applied** — The CO agent suggested adding a history row for HB14-1298 (2014-05-21, ELPA re-enactment), with `sourceUrls: ["https://ed.cde.state.co.us/clde/elpa"]`. The CDE page explicitly dates this event to May 21, 2014. This is a substantive policy event (statute amendment) that the current record lacks. The source URL is thin (a landing page, not a statute text), but the event is real and the landing-page citation is the same quality as other existing CO history sources.

---

## Systemic issues

### The "Baseline coding" row in 50 of 51 state history arrays

**Status: Definitive violation requiring coordinated remediation across all state JSONs.**

The `history[]` array in 50 of 51 state JSON files contains a row with `"title": "Baseline coding (Leider, Colombo & Nerlino, 2021)"` and `"date": "2019-12-01"`. Only one state (`id.json`, which did not appear in this batch) does not have it.

The SKILL.md prohibition is explicit and unambiguous:

> "Don't add rows that describe the verification process itself. The following titles and the prose patterns behind them are **forbidden** … and **any other framing that describes the catalog's QA workflow rather than an SEA-side event.**"

The standard description for these rows reads: "Initial coding of the SEA's bilingual, ELD/ESL, and SEI credentials … Captured Oct–Dec 2019 for the EPAA 29(100) document analysis; this row is the as-of-2019 snapshot against which subsequent verifications are diffed." Every phrase of this description ("initial coding," "as-of-2019 snapshot," "against which subsequent verifications are diffed") describes the catalog's QA mechanics. The SKILL.md explicitly states: "The audit trail belongs in `sources/<USPS>/<date>/changes-from-baseline.md`, not in `history[]`."

The provenance for the 2019 baseline is already correctly recorded in each state's `sources[]` array via the `leider-2021` entries. The `history[]` rows are redundant, non-compliant, and should be removed from all 50-51 states before public launch.

**Why agents disagreed:**
- CA agent: correctly flagged as META_PROCESS_VIOLATION.
- AZ agent: called it "OK (but is a process row)," arguing the description framing it as a "source document date" makes it acceptable. This reasoning is post-hoc rationalization.
- CO agent: incorrectly stated "the title 'Baseline coding' is not a forbidden meta-process title."
- AL, AR, CT, DC, DE, FL agents: marked the row as "OK" or "VALID" without analysis.

**Conclusion:** The CA agent is correct. The other agents are wrong. This is the single highest-priority remediation item for the orchestrator. A single-pass script can remove these rows across all 51 states.

### elPercentHistory schema status

All 10 agents proposed `elPercentHistory[]` data but noted (correctly) that the field is not in the current schema. This is consistent — the schema does define `ElPercentObservation` and `elPercentHistory: z.array(ElPercentObservation).optional()` in `src/content.config.ts`. The field is schema-valid but optional and not yet populated. Agents were correct to propose without applying.

---

## High-value recommendations

1. **[Critical] Remove all "Baseline coding (Leider, Colombo & Nerlino, 2021)" history rows from all 51 state JSONs.** This is a site-wide META_PROCESS_VIOLATION affecting 50 states (50 of 51 confirmed). The Leider-2021 provenance is already in `sources[]`; these history rows are redundant and forbidden by SKILL.md. Run a coordinated patch before public launch.

2. **[Critical] Correct AZ history row 6 bill number from HB 2435 to SB 1014.** HB 2435 is a medical marijuana bill. The ELD-block reduction bill is SB 1014 (54th Legislature, 1st Regular Session, 2019). Update the title, description, and `sourceUrls` (add `https://www.azleg.gov/legtext/54leg/1R/bills/SB1014P.htm`). The event date (2019-07-09) should also be confirmed against the chaptered law — SB 1014 was prefiled January 2, 2019; the signed/effective date needs to be verified.

3. **[High] Fix CA Prop 58 sourceUrl (Row 6).** Replace `https://www.cde.ca.gov/ds/ad/cefelfacts.asp` with `https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=EDC&sectionNum=300.` (EDC § 300, which explicitly references the Prop 58 amendment).

4. **[High] Fix CA Prop 227 sourceUrl (Row 2).** Replace the generic leginfo Education Code search interface URL with the section-level URL for EDC § 300 (same URL as above — both Prop 227 and Prop 58 are reflected in the current text of § 300).

5. **[High] Fix CA CSTP source URL (Row 8 and sources[] entry).** The URL `https://www.ctc.ca.gov/educator-prep/standards/cstp-2024.pdf` returns 404. Find the current CTC landing page for the 2024 CSTP (the PDF content is preserved locally at `sources/CA/2026-05-07/2024-cstp.pdf`). Until a stable URL is confirmed, do not remove the row — document the 404 in `notes`.

6. **[High] Monitor AZ Seal of Biliteracy sunset.** A.R.S. § 15-258 sunsets July 1, 2026 unless reauthorized. With today's date 2026-05-10, the sunset is 52 days away. Check the 54th Legislature's session calendar (55th Legislature, 1st Regular Session ended June 2025; 55th Legislature, 2nd Regular Session is live). If reauthorization has not passed by site launch, set `sealOfBiliteracy.adopted: false` and add a history row noting the sunset.

7. **[Medium] Strengthen CO history row 1 sourceUrl (1981 ELPA).** Current source is the CDE CLDE landing page. Preferred: codified-statute URL at `C.R.S. §§ 22-24-101 to -106` on `leg.colorado.gov` or `content.leg.colorado.gov`.

8. **[Medium] Add CO history row for HB14-1298 (2014-05-21).** The agent's proposed row for the 2014 ELPA re-enactment is well-grounded (CDE ELPA page cites the date and event explicitly). Low source-URL strength, but on par with existing CO history entries.

9. **[Low] Do not apply AR `professionalStandardsMentions.linguistic: true → false`.** The AR agent's recommendation is based on a missed quote. The current coding is correct. No change needed.

10. **[Informational] DC elPercentAsOf is correctly `2021-10-01` in the JSON.** The DC agent's summary line confused `elPercentAsOf` (data-snapshot date = `2021-10-01`) with `lastVerified` (verification date = `2026-05-08`). The JSON value is correct. No action needed except to note that the DC audit report summary line is misleading if read in isolation.

---

## Verification notes: AZ bill number research

The following URLs were tested to determine the correct bill for the 2019 ELD-block reduction:

- `https://www.azleg.gov/legtext/54leg/1R/bills/HB2435P.htm` → confirms HB 2435 is "medical marijuana; patient cards; fee" (amends A.R.S. §§ 36-2803, 36-2804.02). Definitively NOT the ELD bill.
- `https://www.azleg.gov/legtext/54leg/1R/bills/HB2862P.pdf` → 404 Not Found. Bill does not exist in this form.
- `https://www.azleg.gov/legtext/54leg/1R/bills/SB1014P.htm` → confirms SB 1014 is "English language learners; instruction; budgeting." Amends A.R.S. §§ 15-241, 15-756.01 through 15-756.04, 15-756.07, 15-756.08, 15-756.10, 15-756.12, and 41-1279.03. Replaces "minimum of four hours per day" with "One hundred twenty minutes per day" (K-6) and "One hundred minutes per day" (7-12). This is the correct bill.
- `https://www.azleg.gov/legtext/54leg/1R/bills/SB1014H.htm` → 404 (chaptered version not accessible at that URL pattern).
- The CLAUDE.md mention of "HB 2862" was not corroborated. No 2019 AZ bill matching "HB 2862" and ELD instruction was located.

## Verification notes: AR teaching standards

Direct WebFetch of `https://dese-admin.ade.arkansas.gov/Files/62._Arkansas_Teaching_Standards_Updated_2024_EEF_EEF.pdf` retrieved the binary PDF. The model extracted: **"recognizing that patterns of learning and development vary individually within and across the cognitive, linguistic, social, emotional, and physical areas"** — this explicit use of "linguistic" in Standard #1 satisfies the `el-cert-schema` definition (`linguistic` = "uses `language / linguistic`"). The agent's claim that the document contains "no explicit reference to 'linguistic'" is factually incorrect.

## Verification notes: DC elPercentAsOf

The DC JSON field `elPercentAsOf` = `"2021-10-01"` — the NCES fall 2021 data-snapshot date, not the verification date. `lastVerified` = `"2026-05-08"`. The schema constraint `elPercentAsOf <= lastVerified` holds (2021-10-01 < 2026-05-08). The agent's summary stated "elPercentAsOf correctly marked as verification date (2026-05-08), not data date" — this is inverted. The agent confused which field is which in the narrative, but the JSON values are correct.
