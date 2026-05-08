# IL — Changes from baseline-2019

Refresh date: 2026-05-08
Retrieved by: projectcert-2026
SEA: Illinois State Board of Education (ISBE)

## Sources verified live (200 OK)

1. https://www.isbe.net/Documents/ESL-Lic-Path.pdf
   (ISBE one-pager dated May 2026 — the most current pathways doc)
2. https://www.isbe.net/Pages/Subsequent-Teaching-Endorsements.aspx
   (Bilingual + ESL endorsement requirements: 18 SH coursework,
   100-hr practicum, language-proficiency test for bilingual only)
3. https://www.isbe.net/pages/educator-license-with-stipulations.aspx
   (ELS-TBE pathway)
4. https://www.law.cornell.edu/regulations/illinois/Ill-Admin-Code-tit-23-SS-228.30
   (TBE/TPI program-establishment rule — 20-student threshold)
5. https://www.law.cornell.edu/regulations/illinois/Ill-Admin-Code-tit-23-SS-24.130
   (Illinois Professional Teaching Standards, operative through
   2026-06-30)
6. https://www.isbe.net/Documents_PEAC/IL_prof_teaching_stds.pdf
   (ISBE PDF copy of the 2013 IPTS)
7. https://www.isbe.net/Documents/Illinois-Professional-Educator-Standards-Transition-Guide.pdf
   (Transition guide for the new 24.140 standards)
8. https://wida.wisc.edu/about/consortium/il
   (WIDA Consortium — Illinois page; confirms ACCESS for ELLs)
9. https://sealofbiliteracy.org/state/il/
   (IL adopted the Seal in 2013; state-specific page)
10. https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp
    (NCES Digest Table 204.20 — Illinois EL % Fall 2021 = 12.8%)

The legacy leider-2021 sources (ISBE homepage, EPAA paper) are
retained.

## Sources that 404'd or have moved

- https://www.isbe.net/Documents/PreK-12-Bilingual-ESL-Matrix.pdf —
  WebFetch returned 404 today, but the URL is still surfaced by ISBE
  search and the matrix's content is reproduced on the
  Subsequent-Teaching-Endorsements page (above) and in the May 2026
  ESL-Lic-Path one-pager. Coding is grounded in the live pages, not
  the 404'd matrix. Logging the disappearance per skill guidance.
- https://www.isbe.net/Pages/AccessforELL.aspx — 404. ISBE has
  reorganized EL content under /Pages/Multilingual-Services.aspx
  (live). Used the WIDA Consortium page as the canonical
  cross-reference.

Neither 404 blocks promotion to verified-2026: each disappeared page
has a current equivalent and the field-level coding is grounded in
documents that are live today.

## Field diffs vs. baseline-2019

- **elPercent: 11.3 → 12.8**
  (NCES 2023 Digest Table 204.20, Fall 2021 — current cross-state
  comparable figure; baseline used a 2019 number.)
- **elPercentAsOf: 2019-10-01 → 2021-10-01**
- **credentials.bilingual.requirements.test: false → false (unchanged)**
  (No separate content test for the subsequent bilingual
  endorsement; the language-proficiency test is captured under
  `languageProficiency`, not `test`.)
- **credentials.bilingual.requirements.languageProficiency: true (unchanged)**
  (Target Language Proficiency test still required, with Seal of
  Biliteracy as a recognized substitute since the 2018 amendment.
  Same as baseline.)
- **credentials.bilingual.requirements.program: null (unchanged)**
  (Coursework path exists; entitlement-program path also exists.
  No affirmative "approved program required.")
- **credentials.eld.requirements.test: null → false**
  (Current ISBE Subsequent-Teaching-Endorsements page is explicit
  that no language-proficiency test or content test is required for
  the ESL endorsement. Baseline coded this as `null`; current source
  is unambiguous, so flipping to `false`. The ELS-VIT pathway does
  require an English Language Proficiency test, but that's a
  different credential, and `eld.requirements` is the requirement
  set for the standard endorsement path, not the ELS variants.)
- **credentials.eld.requirements.languageProficiency: false (unchanged)**
- **credentials.sei.mandatedForAllTeachers: false (unchanged)**
  (Illinois has no SEI mandate; TBE/TPI is district-level program
  policy under 105 ILCS 5/14C and 23 IAC 228, not a teacher-
  credential mandate.)
- **professionalStandardsMentions.{diverse,cultural,linguistic,el}: all true (unchanged)**
  (2013 IPTS / 23 IAC 24.130 remains operative on refresh date and
  explicitly references "English language learners (ELL)." Re-flag
  for next refresh: 24.140 takes effect 2026-07-01 and drops
  explicit ELL language; the `el` boolean may need to flip to
  `false` after that date.)
- **sealOfBiliteracy.{adopted: true, year: 2013}: unchanged**
- **sealOfBiliteracy.sourceUrl:**
  https://sealofbiliteracy.org/ →
  https://sealofbiliteracy.org/state/il/
  (state-specific page; same fact)
- **elpAssessment.{name: "ACCESS for ELLs", consortium: "WIDA"}: unchanged**
- **elpAssessment.sourceUrl:**
  https://wida.wisc.edu/about/consortium →
  https://wida.wisc.edu/about/consortium/il
  (state-specific page; same fact)
- **lastVerified: 2019-11-15 → 2026-05-08**
- **verificationStatus: baseline-2019 → verified-2026**

## Sources appended

The two leider-2021 source entries are retained. Six new
projectcert-2026 entries appended to `sources[]`:

1. ISBE Subsequent Teaching Endorsements page
2. ISBE ELS / TBE page
3. ISBE Pathways to Teaching ESL (May 2026 one-pager)
4. 23 IAC 24.130 (Illinois Professional Teaching Standards)
5. WIDA Consortium — Illinois
6. Seal of Biliteracy — Illinois
7. NCES Digest Table 204.20

(Seven appended; total `sources[]` length = 9 including the two
baseline entries.)

## Notes added to JSON

- TBE / TPI district-level mandates preserved as a quirk worth
  flagging (105 ILCS 5/14C; 20+ same-language ELs at an attendance
  center triggers TBE; ≤ 19 triggers TPI).
- Standards-transition flag: 23 IAC 24.140 effective 2026-07-01 may
  flip professionalStandardsMentions.el at next refresh.

## Gaps / unresolved

None. All four schema-required boolean groups for IL are grounded in
live documents read today. The two 404s do not block any field —
each has a live equivalent.
