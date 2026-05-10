# Verifier report — batches 3+4 (2026-05-10)

Scope: 10 state audit reports — GA, HI, IA, ID, IL, IN, KS, KY, LA, MA.
Verifier: Claude Sonnet 4.6, 2026-05-10.

---

## Confirmed findings (carry forward)

### Systemic: "Baseline coding" row confirmed in all 10 states

All 10 batch 3+4 state JSONs contain the forbidden `"title": "Baseline coding (Leider, Colombo & Nerlino, 2021)"` history row.

```
grep -l "Baseline coding" src/content/states/{ga,hi,ia,id,il,in,ks,ky,la,ma}.json
# Returns all 10 files
```

This confirms the finding from batches-1-2: the violation is universal across all states audited so far. The batch-1-2 conclusion stands — it is present in 50 of 51 state JSONs (ID was the single exception previously noted, but ID now appears in this batch and also has the row; the "ID is the single exception" note in the batches-1-2 report appears to be an error in that report, since `id.json` does contain the row). All 10 agents in batches 3+4 either called the row "acceptable," "VERIFIED," or "meta-process title acceptable per schema" (IA agent). Only the MA agent correctly identified it as a violation and recommended removal. Every other agent was wrong on this point. See Systemic Issues section.

### MA — BESE Bilingual Education Endorsement (2018-06-26) is correctly cited

The MA agent reports the Board of Elementary and Secondary Education adopted the Bilingual Education Endorsement on June 26, 2018. **Confirmed via WebFetch of `https://www.doe.mass.edu/licensure/endorsements/bilingual-ed.html`:** "On June 26, 2018, the Board of Elementary and Secondary Education promulgated regulations establishing the Bilingual Education Endorsement." The agent's proposed history row B is well-sourced and should be applied.

### MA — 603 CMR 7.00 amended May 20, 2025 is confirmed

**Confirmed via WebFetch of `https://www.doe.mass.edu/lawsregs/603cmr7.html?section=all`:** The page reads "Most Recently Amended by the Board of Elementary and Secondary Education: May 20, 2025." The amendment is titled "MTEL Alternatives and Other Updates." The MA agent correctly identifies this as an unrecorded event that affects the licensure framework. The subject-matter ESL MTEL (#54) is separate from the Communications & Literacy Skills test; `eld.requirements.test: true` is likely unaffected but the full amendment text must be retrieved before any coding change. **The history row C proposed by the MA agent is appropriate to add once the full amendment text is confirmed.** The agent's caution about not recoding credential fields without reading the full text is exactly right.

### MA — Baseline coding row correctly called a violation

The MA agent is the only agent in all 20 states audited so far to independently and correctly apply the SKILL.md prohibition to the baseline coding row without prompting. The MA agent explicitly states: "Meta-process row — should be removed per SKILL.md" and correctly explains that it "belongs in `changes-from-baseline.md`, not in `history[]`." This is the correct ruling.

### KS — ksde.org domain is deprecated; ksde.gov is current

The KS agent identifies that `https://www.ksde.org` is deprecated and sources should use `https://www.ksde.gov`. Direct WebFetch of `ksde.gov` returned an SSL certificate error (certificate not trusted at the fetch layer), but the KS JSON `sources[]` already uses `ksde.gov` URLs (updated 2026-05-08), and the `ksde.org` root appears only in the older baseline entry. The agent's finding that the org-domain is deprecated aligns with the current state JSON, which already contains the ksde.gov correction. No further action needed on the domain itself; the 2019 baseline source entry at `ksde.org` can remain as a historical provenance pointer (it represents the 2019 retrieval date and domain-change is an infrastructure fact, not a data error).

### IN — Broken IDOE PDFs confirmed as 404

Two of the seven broken IDOE PDF URLs were spot-checked via direct WebFetch:
- `https://www.in.gov/doe/files/EL-Program-Staffing-Memo.pdf` → **HTTP 404 Not Found** (confirmed)
- `https://www.in.gov/doe/files/License-Areas-Praxis-Tests-Fees.pdf` → **HTTP 404 Not Found** (confirmed)

The Wayback Machine is not accessible via the fetch tool used in this audit, so archival recovery could not be confirmed or denied. The IN agent's finding is correct: IDOE has restructured its `/files/` directory without leaving redirects. The underlying facts are still supportable via Indiana Code citations (IC 20-30-9-3 for EL ToR requirement). The agent's recommended fallback to `https://iga.in.gov/legislative/laws/statute/20/30/9` is a good approach; the IGA statute page loaded (though content extraction was incomplete). Seven PDFs total were flagged; the two spot-checked confirm the pattern.

### IL — ilga.gov URL for 1973 TBE Act is broken

The IL agent flags the `sourceUrl` for the 1973 history row:
```
https://www.ilga.gov/legislation/ilcs/ilcs4.asp?DocName=010500050HArt%2E+14C&ActID=1005&ChapterID=17
```
as returning 404. The agent correctly explains this is due to a deprecated query-string format on ilga.gov. The recommended replacement — a Cornell Law citation for 105 ILCS 5/14C — is consistent with the pattern already used in other IL sources (Cornell Law URL for 23 IAC 24.130). The Cornell path approach is the stronger fix.

### ID — Four SDE PDF URLs confirmed as 404

The ID audit correctly identifies four SDE PDF 404s. Direct WebFetch of `https://www.sde.idaho.gov/cert-psc/cert/files/general/List-Idaho-Endorsements.pdf` returns HTTP 404. The SDE Certification page at `https://www.sde.idaho.gov/cert-psc/cert/` does load and now lists an "Endorsement List" PDF, confirming the content has migrated to a different URL. The underlying data is accessible; the sources[] entries need URL updates. This is a source-hygiene issue, not a data-accuracy issue, as the ID agent correctly concludes.

### All 10 elPercent values confirmed against NCES d23 Table 204.20

Direct WebFetch of `https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp` retrieved all 10 states' fall 2021 percentages. All match the JSON values exactly:

| State | JSON value | NCES d23 fall 2021 | Match |
|-------|-----------|-------------------|-------|
| GA | 7.7 | 7.7% | ✓ |
| HI | 10.0 | 10.0% | ✓ |
| IA | 6.2 | 6.2% | ✓ |
| ID | 5.8 | 5.8% | ✓ |
| IL | 12.8 | 12.8% | ✓ |
| IN | 7.0 | 7.0% | ✓ |
| KS | 8.0 | 8.0% | ✓ |
| KY | 5.4 | 5.4% | ✓ |
| LA | 4.9 | 4.9% | ✓ |
| MA | 10.5 | 10.5% | ✓ |

No divergence in any state. The LA agent's calculation uncertainty (worrying that 58K/660K yielded 8.8%) was an arithmetic error on the agent's part; the NCES figure of 4.9% is correct.

---

## Disputed findings (do not apply)

### IL — `eld.requirements.languageProficiency: false` upgrade to `true` is REJECTED

The IL agent found a "MISMATCH" and suggested that ISBE guidance requires language proficiency demonstration for ENL and ESL endorsements, arguing the field should be updated from `false` to `true`. This finding is **incorrect**.

Direct WebFetch of `https://www.isbe.net/Pages/Subsequent-Teaching-Endorsements.aspx` returned the ESL/ENL endorsement requirements explicitly. The page lists: 18 semester hours of credit in specified areas (linguistics, theoretical foundations, assessment, methods and materials, cross-cultural studies, elective) plus 100 clinical clock hours or 3 months of teaching experience. **There is no language proficiency test or assessment requirement specified for ESL/ENL candidates.** The page explicitly distinguishes ESL/ENL from World Language endorsements, which do reference proficiency testing.

The current `languageProficiency: false` for IL's ELD credential is correct. The agent was confused, possibly by reading the bilingual credential's language proficiency requirement (which is correctly coded `true` for IL bilingual) and attributing it to the ESL/ENL credential. Do not apply this change.

### KY — EPSB → KDE merger (2022-06-30) as history row: UNCERTAIN, insufficient evidence

The KY agent proposes adding an "Education and Workforce Development Cabinet merger (EPSB absorbed into KDE)" history row dated 2022-06-30, citing HB 200 (2022). Investigation found:

1. The KDE website (`education.ky.gov`) shows EPSB navigation still present under the KDE structure, with EPSB listed with "Board Members," "Meetings," and "Educator Certification" subsections.
2. The `goteachky.com` portal is run by the "Office of Educator Licensure and Effectiveness" under KDE, and makes no mention of EPSB — the standards are cited to "16 KAR 1:010" and the page was last updated January 22, 2026.
3. The 16 KAR 2:200 text (retrieved via WebFetch) still references EPSB as an independent entity responsible for approving preparation programs.
4. The KY HB 200 (2022) PDF was retrieved but not text-extractable.

**Assessment:** The operational picture is murky — EPSB may have been administratively restructured under KDE without being formally abolished, or the KDE website may still refer to EPSB for historical/legal continuity while functions have been transferred. The regulation text (16 KAR 2:200) still names EPSB, which is either outdated or indicates EPSB retains formal authority. **There is insufficient evidence to confirm the specific merger date of 2022-06-30 or that HB 200 accomplished this.** Per project principle "If you can't cite a URL you're confident in, drop the row." Do not add this history row until:
- The HB 200 (2022) bill text is confirmed in human-readable form
- A specific effective date for any EPSB consolidation is confirmed
- A stable URL (statute page or official KDE/EPSB press release) is available

### IA — Domain rebrand row (2023-07-01) is a META_PROCESS_VIOLATION

The IA audit report calls the "Iowa DOE rebrands to educate.iowa.gov domain" row "accurate" and notes it is "correctly positioned." This conclusion is disputed. The row as written in `ia.json` reads:

> "The Iowa Department of Education migrated from educateiowa.gov to educate.iowa.gov, with redirects in place. The 2019 baseline citation pointed at the bare educateiowa.gov homepage; **this refresh re-grounds field-level claims against the current primary documents.**"

The bolded phrase is explicit meta-process language: "this refresh re-grounds field-level claims" describes the catalog's verification workflow, not an SEA-side policy event. The domain migration itself (educateiowa.gov → educate.iowa.gov) was confirmed as real (the redirect is live), but a domain rebrand of this type — a URL infrastructure change — is at best marginal as a policy event, and the description as written explicitly frames it as a catalog maintenance action.

**Ruling:** This row should be removed. The domain migration is adequately captured in the fact that `sources[]` now uses educate.iowa.gov URLs (retrieved 2026-05-08). A bare domain-migration row adds nothing to a researcher's understanding of Iowa's EL teacher certification policy. Remove per SKILL.md's prohibition on catalog-workflow framing.

### GA — GA agent called the baseline coding row "Correct; standard baseline row"

The GA agent explicitly wrote "✓ Correct; standard baseline row" for the 2019-12-01 baseline coding entry. This is incorrect per the systemic finding established in batches-1-2. The GA baseline coding row must be removed along with all others.

### HI — HI agent called baseline coding row "VERIFIED"

Same error pattern. The HI agent marked the row "VERIFIED" in the history verification table. The baseline coding row is a META_PROCESS_VIOLATION in HI as in all other states.

### KS — KS agent called baseline coding row "No concerns"

The KS agent wrote "Content: Appropriate as methodology marker. No concerns." Same error.

### IN — IN agent called baseline coding row "Valid" 

The IN agent marked it "✓ Valid. DOI persistent." Same error.

### ID — ID agent called baseline coding row "Valid"

The ID agent noted it is "Valid" and cited the EPAA article as accessible. Same error.

### LA — LA agent called baseline coding row "Valid"

The LA agent wrote "✓ Valid. Meta-process event marking the 2019 snapshot. Proper EPAA citation. Required for diff/audit trail." The word "Required" is incorrect — the SKILL.md explicitly says this content belongs in `changes-from-baseline.md`, not in `history[]`.

---

## Findings the agents missed (escalate)

### IA domain rebrand row is itself a violation

No agent flagged this. The IA audit explicitly marked the row "Accurate" in the table. The description text ("this refresh re-grounds field-level claims against the current primary documents") is catalog-workflow language that violates SKILL.md's prohibition on meta-process rows. This is a second violation in `ia.json` beyond the baseline coding row — and it is a violation that was *added* during the Phase 2 verification, not inherited from the 2019 baseline. This is more concerning: it means the Iowa refresh agent introduced a new forbidden row.

### MA — SEI notes framing is slightly misleading (minor)

The MA JSON has `sei.notes`: "Statutory backbone: LOOK Act (2017)". The MA audit report correctly identifies this as "slightly misleading" — the SEI endorsement mandate predates the LOOK Act (it was created by RETELL in response to the 2011 DOJ settlement; 603 CMR 7.14(1) was promulgated then). The LOOK Act codified and expanded it. The note should read "SEI endorsement mandate created under RETELL (2012) and 603 CMR 7.14(1); codified and expanded by the LOOK Act (2017)." This is a low-severity nuance issue, but researchers citing the site should get the LOOK Act framing right.

### IL — 2026-07-01 history row sourceUrl points at the old rule, not the new one

The IL `history[]` row for 2026-07-01 (23 IAC 24.140 taking effect) has `sourceUrls` pointing to `https://www.law.cornell.edu/regulations/illinois/Ill-Admin-Code-tit-23-SS-24.130` — the **current** rule that 24.140 will replace, not 24.140 itself. The audit report notes this as "appropriate lag" but this framing is questionable: a history row for the enactment of 24.140 should cite the text of 24.140, not its predecessor. No agent flagged this as a source mismatch. The orchestrator should add a Cornell Law or ISBE citation for 24.140 itself once that rule is published.

### LA — Professional standards spot-check incomplete

The LA agent correctly flags that the LEADS (Louisiana Educator Rubric) PDF was not examined and that `professionalStandardsMentions` (all four flags `false`) requires confirmation against the PDF text. No agent went further to actually retrieve the PDF. The current `false` coding is the most restrictive defensible position, but the LEADS rubric should be reviewed before launch — a rubric released April 2024 for a state with an active bilingual tradition (CODOFIL) not mentioning "diverse," "cultural," or "linguistic" anywhere would be unusual. This warrants a targeted fetch of the LEADS PDF.

### HI — Kaiapuni pilot (1987) proposed row has a weak sourceUrl

The HI agent proposes adding a row for the Ka Papahana Kaiapuni launch at two pilot sites (1987-07-01). The proposed `sourceUrls` include `https://www.hawaiipublicschools.org/` — a general landing page with no specific Kaiapuni history content. The agent explicitly notes "moderate for hawaiipublicschools.org (general landing page; no specific Kaiapuni history URL reached)." Per project principle, a landing-page-only citation for a substantive historical event is the minimum acceptable, not the preferred standard. The second proposed URL (`https://capitol.hawaii.gov/hrscurrent/Vol05_Ch0261-0319/HRS0302H/`) confirms the 1986 Act 89 legal authority but does not document the 1987 program launch date. The row is a plausible addition but needs a more specific source before application.

### KY — "Seal of Biliteracy" date discrepancy requires clarification

The KY JSON shows `sealOfBiliteracy.year: 2021` and the history row title is "Kentucky adopts State Seal of Biliteracy" dated 2021-04-01. The KY audit report notes the seal was "authorized in 2021" and uses April 1 as the adoption date, which it describes as the "legislative effective date." However, the agent also notes that HB 51 (2018) established the authority for the seal and that the KRS 158.6453 effective date is July 1, 2021, not April 1. April 1 may be the date the bill was signed or when KDE published the guidance rather than the legislative effective date (July 1, 2021). No agent reconciled this discrepancy. The correct date should be verified against either the signed-bill date or the KRS effective date — currently both April 1, 2021 and July 1, 2021 appear in the audit report without resolution.

---

## Systemic issues

### The "Baseline coding" row is present in all 10 states; 9 of 10 agents missed the violation

Confirmed presence in all 10 batch 3+4 states via `grep -l "Baseline coding"`. 

Agent assessment breakdown:
- GA agent: "✓ Correct; standard baseline row" — WRONG
- HI agent: "VERIFIED" — WRONG
- IA agent: "Meta-process title acceptable per schema" — WRONG
- ID agent: "Valid" — WRONG
- IL agent: "VERIFIED" (DOI resolves correctly; seed paper) — WRONG
- IN agent: "✓ Valid" — WRONG
- KS agent: "No concerns" / "methodology marker" — WRONG
- KY agent: "VERIFIED" — WRONG
- LA agent: "✓ Valid. Required for diff/audit trail." — WRONG (and uses the word "Required" which is the opposite of the skill's ruling)
- **MA agent: Correctly identifies as META_PROCESS_VIOLATION and recommends removal** — CORRECT

Out of 20 states audited (batches 1-4), the baseline coding row has been correctly identified as a violation by 2 agents (CA in batch 1; MA in batch 4). The remaining 18 agents either called it acceptable or did not analyze it. The coordinated removal of this row from all 51 state JSONs remains the highest-priority remediation item for the orchestrator.

### Iowa "domain rebrand" row is a new category of meta-process violation

The IA `history[]` contains a row added during Phase 2 verification that describes the catalog's source-update workflow. This is the first confirmed case in batches 3+4 of a *new* meta-process row being introduced by a Phase 2 agent (as opposed to inheriting the baseline-2019 row). The orchestrator should audit all Phase-2-verified states for newly-introduced meta-process rows beyond the baseline coding row.

### IDOE and Idaho SDE PDF link rot is a pattern across adjacent states

Both IN (Indiana) and ID (Idaho) have substantial broken-PDF issues: IN has 7 of its IDOE PDFs 404; ID has 4 SDE PDFs 404. Both states' verification agents noted these issues. This suggests a broader infrastructure pattern of state DOE PDF directories restructuring without leaving redirects. The orchestrator should run a pass over all verified-2026 states to check for broken `projectcert-2026` source URLs, not just handle IN and ID in isolation.

---

## High-value recommendations

1. **[Critical — systemic] Remove all "Baseline coding" history rows from all 51 state JSONs.** Confirmed in all 10 batch 3+4 states; 50 of 51 states total. The Leider-2021 provenance is already captured in `sources[]` entries with `retrievedBy: "leider-2021"`. These `history[]` rows are redundant and forbidden per SKILL.md. A single-pass script is the right mechanism; removing manually state-by-state risks inconsistency.

2. **[Critical — IA] Remove the Iowa "domain rebrand" history row (2023-07-01) from `ia.json`.** This row was introduced during Phase 2 verification and contains explicit catalog-workflow language ("this refresh re-grounds field-level claims against the current primary documents"). It is a Meta_Process_Violation of the same category as the baseline coding row but introduced by the Phase 2 agent. Remove it; the domain migration is adequately captured in the updated `sources[]` URLs.

3. **[High — MA] Add history row B: BESE adopts Bilingual Education Endorsement (2018-06-26).** Confirmed via DESE bilingual-ed.html: "On June 26, 2018, the Board of Elementary and Secondary Education promulgated regulations establishing the Bilingual Education Endorsement." This is a significant, well-sourced, post-2019-baseline event that the MA agent correctly identified as missing. SourceUrl: `https://www.doe.mass.edu/licensure/endorsements/bilingual-ed.html` + `https://www.doe.mass.edu/lawsregs/603cmr7.html?section=all`.

4. **[High — MA] Add LOOK Act session-law URL to both 2017-11-22 history rows and to `sources[]`.** The MA agent correctly identifies that both LOOK Act rows cite DESE regulatory pages rather than the session law itself. The canonical URL `https://malegislature.gov/Laws/SessionLaws/Acts/2017/Chapter138` was confirmed by the MA agent to resolve and contain the correct content. This strengthens provenance for the most consequential policy event in MA's modern EL history.

5. **[High — IL] Fix the 1973 TBE Act `sourceUrl` in `history[0]`.** The current ilga.gov query-string URL returns 404. Replace with a Cornell Law citation for 105 ILCS 5/14C (consistent with the approach already used for 23 IAC 24.130 in the same state's `sources[]`). The IL agent's recommended replacement URL pattern is correct.

6. **[High — IN] Replace broken IDOE PDF sourceUrl in the 2019-08-09 history row with an Indiana Code citation.** The `EL-Program-Staffing-Memo.pdf` is confirmed 404. The IN agent's proposed fallback — `https://iga.in.gov/legislative/laws/statute/20/30/9` (IC 20-30-9 EL Teacher of Record definition) — is a valid statutory source. Apply this substitution for the 2019-08-09 row at minimum. The remaining 6 broken PDFs are `sources[]` entries (not load-bearing for `history[]` event citations) and can be remediated as a separate pass.

7. **[Medium — MA] Flag 603 CMR 7.00 May 2025 amendment for follow-up.** Confirmed: the amendment is dated 2025-05-20. The MA agent correctly identifies that the subject-matter ESL MTEL (#54) is separate from the C&L Skills test and is likely not waived by the amendment, but the full amendment text should be retrieved from BESE meeting materials before concluding `eld.requirements.test: true` is unaffected. Once confirmed, add history row C (2025-05-20, "603 CMR 7.00 amended — MTEL alternatives and updated licensure pathways").

8. **[Medium — KY] Verify Seal of Biliteracy adoption date (April 1 vs. July 1, 2021).** The JSON uses 2021-04-01 but the KRS 158.6453 effective date appears to be July 1, 2021. The audit report notes both dates without resolving the discrepancy. Confirm against the signed-bill record or the KRS page before the record is considered fully verified.

9. **[Low — IL] Correct the 2026-07-01 history row sourceUrl.** The row for 23 IAC 24.140 taking effect cites 23 IAC 24.130 (the rule being superseded) rather than 24.140. Once 24.140 is published at Cornell Law or ISBE, add the direct URL for the new rule.

10. **[Low — LA] Review LEADS PDF for professional standards flags.** All four `professionalStandardsMentions` flags are coded `false` for Louisiana. The LEADS rubric (April 2024) is in `sources[]` but was not examined. For a state with CODOFIL, an active French Immersion program, and a Bilingual Specialist add-on, all four flags being `false` would be unusual. This warrants a direct PDF review before launch.

---

## Do-not-apply list (summary)

| Claim | State | Ruling |
|-------|-------|--------|
| `eld.requirements.languageProficiency: false → true` | IL | REJECTED — ISBE page explicitly lists no LP requirement for ESL/ENL |
| EPSB → KDE merger row (2022-06-30) | KY | DEFERRED — insufficient citable evidence; bill text unconfirmed |
| Iowa DOE domain rebrand row (2023-07-01) is accurate | IA | DISPUTED — row contains explicit meta-process language; remove |
| Baseline coding row is "acceptable/valid/correct" | All 10 | WRONG — universal META_PROCESS_VIOLATION per SKILL.md |
| LA `elPercent: 4.9` is uncertain (agent's arithmetic error) | LA | CORRECT AS IS — NCES d23 confirms 4.9% for Louisiana fall 2021 |

---

## Verification notes: Key URL results

- `https://www.doe.mass.edu/licensure/endorsements/bilingual-ed.html` → HTTP 200, confirms "June 26, 2018, the Board…promulgated regulations establishing the Bilingual Education Endorsement." ✓
- `https://www.doe.mass.edu/lawsregs/603cmr7.html?section=all` → HTTP 200, confirms "Most Recently Amended…May 20, 2025." ✓
- `https://www.isbe.net/Pages/Subsequent-Teaching-Endorsements.aspx` → HTTP 200, **no language proficiency requirement** for ESL/ENL. Confirms `languageProficiency: false` is correct for IL ELD.
- `https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp` → HTTP 200, all 10 state elPercent values confirmed exact.
- `https://www.in.gov/doe/files/EL-Program-Staffing-Memo.pdf` → **HTTP 404** ✓ (confirms IN agent finding)
- `https://www.in.gov/doe/files/License-Areas-Praxis-Tests-Fees.pdf` → **HTTP 404** ✓ (confirms IN agent finding)
- `https://www.sde.idaho.gov/cert-psc/cert/files/general/List-Idaho-Endorsements.pdf` → **HTTP 404** ✓ (confirms ID agent finding)
- `https://www.sde.idaho.gov/cert-psc/cert/` → HTTP 200, endorsement list PDF link exists at new location.
- `https://apps.legislature.ky.gov/law/kar/titles/016/002/200/` → HTTP 200, 16 KAR 2:200 text visible, still references EPSB as independent entity.
- `https://educateiowa.gov` → 301 redirect to `https://educate.iowa.gov/` (domain rebrand infrastructure fact confirmed; redirect is live).
- `https://www.ksde.gov` → SSL certificate error (not accessible via fetch tool); KS JSON already uses ksde.gov in all current-era sources.
- Wayback Machine → not accessible via this tool; IDOE PDF archival recovery not confirmed or denied.
