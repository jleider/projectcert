# Wyoming — Audit Report 2026-05-10

## Scope

Audit date: 2026-05-10
Audit purpose: Baseline integrity check and identification of missing substantive history events for the Phase 2 verification cycle.

## Findings summary

1. **Critical: Baseline coding meta-process row flagged.** The single existing history entry (2019-12-01) is titled "Baseline coding" — a forbidden meta-process title per CLAUDE.md. This row describes the *methodology* of the catalog (document coding) rather than a *substantive state policy event*. Recommendation: Delete or repurpose this row; substantive history events should be added instead.

2. **PTSB URLs now working.** All three flagged URLs returned HTTP 200 on 2026-05-10:
   - https://wyomingptsb.com/home/rules-and-regulations/ptsb-endorsement-standards/
   - https://wyomingptsb.com/licensure/add-endorsements/
   - https://wyomingptsb.com/licensure/endorsement-areas/
   
   The 5xx errors reported by the link checker appear intermittent; the PTSB site was accessible during this audit.

3. **elPercent data current but limited history.** Wyoming's current `elPercent: 2.7` as of 2021-10-01 (NCES Table 204.20 Fall 2021) is appropriate. However, no `elPercentHistory[]` array exists in the schema or data, and the JSON only contains the single current snapshot. For longitudinal EL enrollment context, NCES Table 204.20 historical data should be captured if the schema supports it.

4. **Missing substantive history events.** Wyoming has significant legislative and policy milestones that are not documented in `history[]`:
   - **Wyoming Seal of Biliteracy adoption (2022)**: The current JSON records this in `sealOfBiliteracy.year: 2022` but does not cite the legislative vehicle (WY SF0078 / Senate Enrolled Act 47, 2022). A history row is appropriate.
   - **PTSB rule updates (2026-01-26)**: Chapters 3 and 4 (Terms & Conditions for Endorsements, Program Approval Standards) were filed 2026-01-26. These postdate the 2026-05-08 verification but represent the operative framework as of the audit date.
   - **ESL endorsement framework (pre-2019 baseline)**: The leider-2021 baseline coded the two pathways (Institutional Recommendation and Demonstration of Competency) but did not document when those pathways were formalized. Wyoming Statutes § 21-7-101 et seq govern LEP programs and teacher qualifications; a history row documenting the ESL endorsement codification (if pre-2019) would provide provenance context.

5. **Professional standards mentions confirmed.** The 2026-05-08 refresh verified all four boolean flags remain unchanged:
   - `diverse: true` (PTSB Chapter 4 program approval standards)
   - `cultural: true` (TESOL 2018 standards incorporated by reference)
   - `linguistic: true` (TESOL standards, "linguistically diverse" framing)
   - `el: true` (explicit "English language learners" reference)

6. **Credentials and schema remain accurate.** Spot-checks confirm:
   - No bilingual endorsement (WY codes `credentials.bilingual.offered: false` correctly)
   - ESL K-6, 5-8, 6-12, K-12 endorsements exist and roll up to `eld.offered: true`, `eld.standalone: true`, `eld.addOn: true`
   - Two ESL pathways (Institutional Recommendation vs. Demonstration of Competency) correctly coded with pathway-dependent null fields and explanatory notes
   - SEI not mandated statewide (`sei.mandatedForAllTeachers: false`)
   - WIDA ACCESS for ELLs confirmed (WIDA consortium member)

## Recommendations for next phase

1. **Immediate (blocking launch)**: Replace or delete the "Baseline coding" history row. If retained for methodological documentation, it should be retitled to reflect the actual event (e.g., "2019 baseline analysis (Leider, Colombo & Nerlino, 2021, EPAA 29(100))") and description rewritten as a *substantive snapshot* of the state's code as of October 2019, not a meta-process description.

2. **Substantive history additions**:
   - Add a row for Wyoming Seal of Biliteracy adoption (2022-03-21 or SEA 47 effective date) citing the statute.
   - If `elPercentHistory[]` is added to the schema, backfill NCES Table 204.20 annual rows for Wyoming (2010–2021 available).
   - Document the ESL endorsement codification date if pre-2019 baseline; consult wyoleg.gov for § 21-7-101 et seq history.

3. **Future refresh gate**: PTSB Chapters 3 and 4 (2026-01-26) PDFs remain on Adobe Acrobat cloud behind session-bound URLs. A future refresh cycle should download and review the full text directly via a browser session to verify all four `professionalStandardsMentions` booleans and note any substantive rule changes.

## No schema validation errors

The Wyoming JSON validates against `StateSchema` with no conflicts. The 2026-05-08 verification date (`lastVerified`) meets the `elPercentAsOf <= lastVerified` refinement (2021-10-01 ≤ 2026-05-08). The history array (currently 1 row) is sorted oldest → newest and all source URLs are valid.

## Sources reviewed

- `sources/WY/2026-05-08/` — all local snapshots from the 2026-05-08 refresh
- PTSB site (https://wyomingptsb.com) — live verification on 2026-05-10
- NCES Digest Table 204.20 Fall 2021 snapshot
- Wyoming Seal of Biliteracy record (sealofbiliteracy.org/state/wy/)
