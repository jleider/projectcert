# Wisconsin — changes from baseline-2019 (refresh 2026-05-08)

Baseline source: Leider, Colombo & Nerlino (2021), EPAA 29(100),
Tables 2-5 + Appendix A.

Refresh sources: see `sources[]` entries appended in `wi.json`. All
SEA documents under `sources/WI/2026-05-08/` were retrieved 2026-05-08
with HTTP 200 and read in full. Wisconsin's SEA is the Department of
Public Instruction (DPI). Wisconsin is a charter WIDA Consortium
member; WIDA is headquartered at UW-Madison.

## Field-by-field diff

- `elPercent`: 6.2 → 5.9
  (NCES Digest 2023, Table 204.20 (Fall 2021): Wisconsin 49,303 ELs =
  5.9% of total enrollment. Preferred over baseline for cross-state
  comparability per state-source-refresh skill; see
  `nces-table-204-20.html`.)
- `elPercentAsOf`: 2019-10-01 → 2021-10-01
- `credentials.bilingual.standalone`: true → false
  (Wisconsin's Bilingual-Bicultural Education credential (subject
  code 1023, formerly 023) is, and has always been under PI 34, a
  *supplemental* license that requires the candidate to already hold
  an underlying Tier II/III/IV teaching license. It is not standalone.
  Authoritative current sources: PI 34.078(1) — "A license issued
  under this section authorizes an individual to teach in a
  bilingual-bicultural educational program in the license area of any
  teaching license the individual holds or obtains at a later date";
  DPI Supplementary Teaching Licenses page (lists PI 34.078
  bilingual-bicultural under "supplementary"); DPI 2017 Language
  Instruction Guidance PDF — "Supplemental – Bilingual/bicultural
  Education (023): Teacher holds a license in a subject area and
  seeks the 023 license as a supplemental license." The 2019 baseline
  coding of `standalone: true` was incorrect; corrected here under
  current SEA documentation.)
- `credentials.bilingual.requirements.coursework`: null → true
  (PI 34.078(2)(c) requires "an approved program in
  bilingual-bicultural education at the grade level of the license
  being sought" with coursework in cultural/cross-cultural studies,
  foundations, theory and methodology, and "Language study which
  develops knowledge related to phonology, morphology, and syntax in
  the target language as these elements contrast with English." See
  `pi34-078-bilingual-bicultural.html`.)
- `credentials.bilingual.requirements.practicum`: null → true
  (PI 34.078(2)(c)4 requires "Bilingual-bicultural field experiences
  in the community of the target group" and (2)(c)8 requires "A
  clinical program in bilingual-bicultural education" meeting the
  PI 34.023 student-teaching standards. See
  `pi34-078-bilingual-bicultural.html`.)
- `credentials.bilingual.requirements.test`: null → true
  (DPI 2017 Language Instruction Guidance: candidates must complete
  "Content test in the subject area of the primary license" plus
  edTPA in that subject area. While there is "no Bilingual test
  adopted for state," the underlying primary-license content test is
  load-bearing for the bilingual-bicultural license because the
  bilingual-bicultural license cannot be issued without that primary
  license. Coding `test: true` reflects the test gate that exists in
  the pathway. See `language-instruction-guidance-2017.pdf`.)
- `credentials.eld.addOn`: false → true
  (Per PI 34.052(6), "An individual holding an elementary and middle
  school license, a special education license, or an equivalent
  license may add a license in English as a second language ... by
  passing the applicable content knowledge test approved by the state
  superintendent." The ESL credential (subject 1395, formerly 395) is
  thus available both as a standalone EC-A license earned through an
  approved program and as an add-on by content-test for holders of
  certain primary licenses. The 2019 baseline coding of
  `addOn: false` did not capture the PI 34.052(6) test-only add-on
  pathway. See `pi34-052-additional-licenses.html` and
  `dpi-what-can-i-teach.html`.)
- `credentials.eld.requirements.program`: null → true
  (PI 34.047(1)(a) requires "an approved program in the subject area
  of the license sought" for the standalone ESL license issued under
  PI 34.047(3)(e); DPI 2017 Language Instruction Guidance lists
  "Complete approved ESL licensure program based on WI Content
  Guidelines." See `pi34-047-teaching-areas.html` and
  `language-instruction-guidance-2017.pdf`.)
- `credentials.eld.requirements.coursework`: null → true
  (Implicit in the approved-program pathway under PI 34.047 and the
  DPI 2017 Language Instruction Guidance, which routes ESL candidates
  through a WI-Content-Guidelines-aligned program covering
  ESL/ELD-specific subject matter. See sources above.)
- `credentials.eld.requirements.practicum`: null → true
  (DPI 2017 Language Instruction Guidance: ESL candidates must
  "Complete a clinical student teaching experience and the testing
  requirements." See `language-instruction-guidance-2017.pdf`.)
- `credentials.eld.requirements.test`: null → true
  (DPI 2017 Language Instruction Guidance: "Praxis II - English to
  Speakers of Other Languages (0360), Passing score - 530" plus
  "edTPA - Teaching Students of Other Languages." PI 34.047(1)
  cross-references the assessment requirements in PI 34.021(1)(c)
  and (d). The PI 34.052(6) add-on pathway is gated by passing the
  approved content knowledge test. See sources above.)
- `professionalStandardsMentions.linguistic`: true → false
  (Wisconsin's 10 Educator Standards (WTS, aligned to InTASC 2013)
  do not explicitly use the word "linguistic." Standard 1 mentions
  "central concepts, tools of inquiry, and structures of the
  disciplines"; Standard 2 references "individual pupil differences
  and diverse cultures and communities"; Standard 3 references
  "diverse learners"; the standards do not enumerate
  cognitive/linguistic/social/emotional/physical domains the way the
  full InTASC Standard 1 does. The 2019 baseline coded `true` likely
  because Wisconsin's standards are described as "aligned to InTASC,"
  but the operative state-adopted text does not contain "linguistic."
  Coding `false` reflects the literal SEA-adopted text. See
  `dpi-educator-standards.html`.)
- `professionalStandardsMentions.el`: true → false
  (The 10 Wisconsin Educator Standards do not use the terms
  "English learner," "English language learner," or "EL." Diversity
  is referenced abstractly ("diverse cultures and communities,"
  "individual pupil differences"). The 2019 baseline coding of `true`
  appears to have been generous; corrected to `false` against the
  literal text of the current standards. See
  `dpi-educator-standards.html`.)
- `sealOfBiliteracy.sourceUrl`: updated from
  https://sealofbiliteracy.org/ to the operative DPI program page
  https://dpi.wi.gov/english-learners/wi-seal-of-biliteracy
  (more authoritative; see `dpi-seal-biliteracy.html`).

## Unchanged from baseline

- `credentials.bilingual.offered: true`
- `credentials.bilingual.addOn: true`
- `credentials.bilingual.requirements.program: true`
  (PI 34.078(2)(c) "approved program" gate.)
- `credentials.bilingual.requirements.languageProficiency: true`
  (PI 34.078(2)(b): "proficient in English and in the target
  language." DPI 2017 guidance: "Each EPP must measure English
  proficiency and target language proficiency (could use ACTFL).")
- `credentials.eld.offered: true`
- `credentials.eld.standalone: true`
  (PI 34.047(3)(e) lists ESL among teaching-area subjects eligible
  for a kindergarten through grade 12 standalone license.)
- `credentials.eld.requirements.languageProficiency: false`
  (Wisconsin's ESL license does not require an ACTFL OPI or other
  named language-proficiency exam — confirmed by DPI 2017 guidance
  PDF.)
- `credentials.sei.mandatedForAllTeachers: false`
  (No Wisconsin statute, rule, or DPI policy mandates SEI-style
  training for all teachers; SEI is described in DPI guidance as one
  of several program models districts may run, taught by
  ESL-licensed staff.)
- `professionalStandardsMentions.diverse: true`
  (Wisconsin Standard 2 explicitly: "diverse cultures and
  communities"; Standard 3 references "diverse learners.")
- `professionalStandardsMentions.cultural: true`
  (Wisconsin Standard 2: "diverse cultures and communities.")
- `sealOfBiliteracy.adopted: true`
- `sealOfBiliteracy.year: 2015`
  (DPI initiated the Wisconsin Seal of Biliteracy in 2015; corroborated
  by sealofbiliteracy.org state-WI page (Adopted: 2015-10-01).)
- `elpAssessment` (ACCESS for ELLs / WIDA): unchanged. Wisconsin is
  a charter WIDA Consortium member; WIDA is housed at the Wisconsin
  Center for Education Research at UW-Madison. See
  `wida-consortium.html`.

## Sources retrieved (2026-05-08, all HTTP 200)

- DPI educator licensing landing page (`dpi-licensing.html`)
- DPI English learners landing page (`dpi-english-learners.html`)
- DPI Bilingual-Bicultural programs page (`dpi-bilingual-bicultural.html`)
- DPI "What Can I Teach with My License?" (`dpi-what-can-i-teach.html`)
- DPI Supplementary Teaching Licenses (`dpi-supplementary-licenses.html`)
- DPI Wisconsin Seal of Biliteracy (`dpi-seal-biliteracy.html`)
- DPI Wisconsin Educator Standards (`dpi-educator-standards.html`)
- DPI 2017 ESL/Bilingual-Bicultural/World Languages guidance PDF
  (`language-instruction-guidance-2017.pdf`) — read in full
- Wis. Admin. Code Chapter PI 34 table of contents (`pi34-toc.html`)
- Wis. Admin. Code PI 34.078 — Bilingual-bicultural education
  (`pi34-078-bilingual-bicultural.html`)
- Wis. Admin. Code PI 34.047 — Teaching areas (incl. ESL)
  (`pi34-047-teaching-areas.html`)
- Wis. Admin. Code PI 34.052 — Additional license areas
  (`pi34-052-additional-licenses.html`)
- WIDA Consortium membership map (`wida-consortium.html`)
- Global Seal of Biliteracy state-WI page (`seal-biliteracy-wi-globalseal.html`)
- NCES Digest 2023 Table 204.20 (Fall 2021 EL %) (`nces-table-204-20.html`)

## History events filed

- 2015-10-01: Wisconsin Seal of Biliteracy initiated by DPI.
- 2017-09-15: DPI Language Instruction guidance issued, formalizing
  the licensing crosswalk between ESL (1395), Bilingual-Bicultural
  (1023), and World Language credentials and program-model types.
- 2018-08-01: Chapter PI 34 reorganized (the bilingual-bicultural
  rule moved from PI 34.33(3) to PI 34.078; the ESL teaching-area
  rule moved from PI 34.30(g) to PI 34.047(3)(e); add-on pathways
  consolidated under PI 34.052). Filed as a single rule-renumbering
  event.

## Open items / gaps

- DPI does not publish a single canonical "ESL licensure rule" page;
  the regime is split across PI 34.047 (standalone teaching-area
  pathway), PI 34.052 (add-on by content test), and PI 34.078
  (bilingual-bicultural supplemental). The diff above reflects the
  composite reading.
