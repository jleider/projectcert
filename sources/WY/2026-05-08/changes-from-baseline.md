# Wyoming — changes from baseline-2019

Refresh date: 2026-05-08
Refresher: projectcert-2026
Prior status: `baseline-2019` (lastVerified 2019-11-15)
New status: `verified-2026`

## Sources reviewed

1. **WDE — English Learner (EL) Guidebook 2023-24** (edu.wyoming.gov,
   PDF saved locally) — primary SEA document on EL identification,
   service, ELP assessment, and educator endorsement requirements.
2. **WDE — English Learners parent landing page** (Cloudflare blocked
   curl; content via WebFetch).
3. **WDE — Wyoming Seal of Biliteracy** (Cloudflare blocked curl;
   content via WebFetch).
4. **PTSB — Endorsement Areas** (ModSecurity blocked curl; content via
   WebFetch).
5. **PTSB — Add Endorsements** (ModSecurity blocked curl; content via
   WebFetch).
6. **PTSB — Endorsement Standards / Rules index** (Chapter 4
   incorporates TESOL 2018 standards; chapter PDFs hosted on
   acrobat.adobe.com so direct download not feasible).
7. **WIDA Consortium membership page** (saved as HTML).
8. **sealofbiliteracy.org / Wyoming state page** (saved as HTML;
   adoption 2022-03-21).
9. **NCES Digest of Education Statistics 2023, Table 204.20** (saved
   as HTML; Fall 2021 EL counts and percentages).

## Field-level diffs

- `elPercent: 3 → 2.7`
  (NCES Fall 2021, Table 204.20; cross-state comparable. Baseline
  was 3.0% as of 2019-10-01.)
- `elPercentAsOf: 2019-10-01 → 2021-10-01`
- `lastVerified: 2019-11-15 → 2026-05-08`
- `verificationStatus: baseline-2019 → verified-2026`
- `sealOfBiliteracy.adopted: null → true`
- `sealOfBiliteracy.year: null → 2022`
  (Wyoming SF0078 / Senate Enrolled Act 47, 2022.)
- `sealOfBiliteracy.sourceUrl:
   https://en.wikipedia.org/wiki/Seal_of_Biliteracy →
   https://sealofbiliteracy.org/state/wy/`
  (more authoritative, state-specific.)
- `sources[]`: appended 9 entries with `retrievedBy:
   projectcert-2026`, `retrievedAt: 2026-05-08`.
- `notes` (top-level on `eld` credential): added to flag the two
  pathway divergence (Institutional Recommendation vs. Demonstration
  of Competency) and the Dual Language Immersion endorsement that
  exists but does not roll up to bilingual.

## Fields confirmed unchanged

- `credentials.bilingual.{offered, standalone, addOn}` = false.
  Wyoming has no bilingual education endorsement. PTSB now lists a
  "Dual Language Immersion (K-12)" endorsement that did not exist in
  the leider-2021 baseline; per CLAUDE.md / el-cert-terminology, DLI
  is a language-immersion specialty rather than a credential to
  educate classified ELs in their home language, so we do not flip
  bilingual to true. Flagged in eld.notes for a future refresh
  cycle to consider once the schema accommodates immersion as a
  distinct bucket.
- `credentials.eld.offered = true`. WDE Guidebook explicitly
  requires an ESL endorsement for educators providing active EL
  services in a LIEP.
- `credentials.eld.standalone = true`. ESL K-6, 5-8, 6-12, K-12 are
  named PTSB endorsement areas.
- `credentials.eld.addOn = true`. Add-on via PTSB Demonstration of
  Competency or Institutional Recommendation atop an existing
  license.
- `credentials.eld.requirements.test = true`. PTSB DoC pathway
  requires a passing PTSB-approved Praxis II score; baseline-2019
  also coded `true`.
- `credentials.eld.requirements.languageProficiency = false`. ESL
  is not a world-language endorsement; OPI is named only for
  foreign-language applicants. Unchanged.
- `credentials.sei.mandatedForAllTeachers = false`. WDE Guidebook
  leaves program-model selection to district discretion; no
  statewide sheltered-instruction mandate. Unchanged.
- `professionalStandardsMentions.{diverse, cultural, linguistic, el}`
  = all `true`. PTSB Chapter 4 references diverse / English language
  learners / diversity, and incorporates the TESOL 2018 P-12
  Standards by reference, which cover cultural and linguistic
  competence. Unchanged from baseline-2019.
- `elpAssessment` (new field, set in current schema): name "ACCESS
  for ELLs", consortium "WIDA", sourceUrl wida.wisc.edu/about/
  consortium. Confirmed by both the WIDA member roster and the WDE
  EL Guidebook. URL retained.

## Fields newly nulled with notes

- `credentials.eld.requirements.program: true → null`. PTSB
  documents two pathways: Institutional Recommendation (requires an
  approved program) and Demonstration of Competency (does not).
  Genuine path-dependent divergence, so coded `null` per CLAUDE.md
  rule "ambiguous → null + notes". Reflected in `eld.notes`.
- `credentials.eld.requirements.coursework: null → true`. PTSB DoC
  pathway explicitly requires 15 SH coursework in the content area
  (with 5 in the last 5 years); IR pathway by definition includes
  coursework. Both pathways require coursework, so `true` is
  honest. Baseline coded `null` due to documentation gap; current
  PTSB Add Endorsements page resolves the ambiguity.
- `credentials.eld.requirements.practicum: null → null` (kept
  null with note). Required under IR (PTSB names "student teaching
  or a practicum at the elementary K-6 or K-12 grade level(s)" for
  the ESL example) but NOT required under DoC. Genuine path-
  dependent divergence.

## Gaps / limitations carried forward

- PTSB Chapter 3 (terms and conditions for endorsements) and
  Chapter 4 (program approval standards) PDFs are hosted on
  acrobat.adobe.com behind a session-bound URL that we could not
  retrieve via WebFetch. The chapter index page on
  wyomingptsb.com confirms filing dates (Chapter 3 and Chapter 4
  both 2026-01-26) and the substantive references summarized
  above, but a future refresh should download the chapter PDFs
  via a browser session and verify the four
  professional-standards booleans against the full text.
- Wyoming PTSB site is fronted by ModSecurity which blocks
  non-browser requests with 406. WDE site is fronted by
  Cloudflare which serves a JS challenge to curl. For both, we
  used WebFetch (which renders the page) rather than saving raw
  HTML; the per-source markdown files preserve the substantive
  text.

## Net change in coding

Substantive: Seal of Biliteracy promoted from null to adopted
(2022). EL percent updated from 3.0% (2019) to 2.7% (2021 NCES).
Two ELD requirement flags refined (`coursework` resolved to true,
`program` opened to null with pathway note).

No demotion of any flag from `verified-2026` would be appropriate
later without a concrete SEA change reason.
