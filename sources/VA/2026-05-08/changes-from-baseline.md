# Virginia — changes from baseline-2019

Verification date: 2026-05-08
Reviewer: projectcert-2026
SEA: Virginia Department of Education (VDOE)

## Summary of substantive changes

- **`credentials.bilingual.offered`: `false` → `true`**
  Virginia adopted a Dual Language Endorsement effective 2025
  (8VAC20-23-321 through 8VAC20-23-324). VDOE introduced it via the
  August 7, 2025 webinar "Introducing the Dual Language Endorsement
  and Data Management Updates." Both standalone and add-on routes
  exist for both the English and target-language pathways.
- **`credentials.bilingual.standalone`: `false` → `true`**
  8VAC20-23-321 (Dual language English preK-6) and 8VAC20-23-323
  (Dual language target language preK-6) are standalone endorsements
  that can be earned via approved program or via specified
  coursework/assessments.
- **`credentials.bilingual.addOn`: `false` → `true`**
  8VAC20-23-322 and 8VAC20-23-324 are explicit add-on endorsements
  to an existing Virginia teaching license.
- **`credentials.bilingual.requirements`** — populated for the first
  time:
  - `program: true` (approved teacher preparation program in dual
    language is one path)
  - `coursework: true` (alternate path = specified semester hours in
    target language, math, science, history/social science, culture)
  - `practicum: null` (regulation does not specify a separate
    practicum requirement beyond what an approved program already
    embeds; ambiguous from the VAC text alone)
  - `test: true` (target-language path requires either 12 SH above
    the intermediate level OR passing a qualifying assessment in the
    target language; English-pathway requires the elementary content
    assessment and reading-for-educators assessment)
  - `languageProficiency: true` (target-language pathway explicitly
    requires demonstrated target-language proficiency via coursework
    above the intermediate level OR a qualifying assessment)
- **`credentials.eld.requirements.program`: `null` → `true`**
  8VAC20-23-350(A) explicitly recognizes graduation from "an approved
  teacher preparation program in English as a second language" as a
  qualifying path. Coded as required-on-one-of-two-paths consistent
  with other states' approved-program coding.
- **`credentials.eld.requirements.coursework`: `null` → `true`**
  8VAC20-23-350(B) provides the 24-semester-hour coursework
  alternative (reading & writing, English linguistics, cross-cultural
  education, second language acquisition, ESL methods grounded in
  WIDA ELD Standards, ESL assessment, electives).
- **`credentials.eld.requirements.practicum`: `null` →
  remains `null`**
  The current regulation does not explicitly require a practicum
  separate from what is already embedded in an approved teacher
  preparation program. Ambiguous from public sources; left `null`
  per skill guidance.
- **`credentials.eld.requirements.test`: `true` → `true`** (no
  change). VDOE's "EL Education Related Programs" page states:
  "Add an ESL endorsement to an existing Virginia Teaching License by
  taking the Praxis English to Speakers of Other Languages Test."
- **`credentials.eld.requirements.languageProficiency`: `false`**
  (no change) — ESL endorsement does not require non-English language
  proficiency.
- **`credentials.eld.notes`** updated to reflect the current 24-SH
  composition (now includes WIDA ELD Standards-grounded methods, ESL
  assessment, cross-cultural education) rather than the legacy "24
  credits relevant coursework" phrasing.
- **`credentials.sei.mandatedForAllTeachers`: `false`** (no change).
  Virginia is not one of the AZ/CA/MA group with a universal SEI
  endorsement mandate.
- **`elPercent`: `9.1` → `9.4`**, **`elPercentAsOf`: `2019-10-01`
  → `2021-10-01`**. Source: NCES Digest of Education Statistics
  Table 204.20 (fall 2021 EL enrollment for Virginia: 117,417
  students = 9.4% of total public school enrollment).
- **`professionalStandardsMentions`** — re-verified against the
  Virginia Uniform Performance Standards and Evaluation Criteria for
  Teachers (Approved by the Virginia Board of Education on March 18,
  2021), referenced from VDOE's EL Education Related Programs page.
  Booleans unchanged from baseline (`diverse: true`, `cultural:
  true`, `linguistic: true`, `el: false`); the 2021 Uniform
  Performance Standards do not introduce explicit EL/ELL terminology
  beyond "diverse," "cultural," and "linguistic" categories that
  already triggered the baseline coding.
- **`elpAssessment`** confirmed: ACCESS for ELLs (WIDA Consortium).
  Virginia is and remains a WIDA member; this aligns with the WIDA
  ELD Standards-grounded methods coursework now baked into
  8VAC20-23-350(F).
- **`sealOfBiliteracy`** unchanged: adopted 2015.

## Sources retrieved (snapshots in this folder)

1. `vdoe-licensure.html` — VDOE Teacher Licensure landing page.
2. `vdoe-licensing-services.html` — VDOE Licensing Services
   (general components, VALO portal, paper applications).
3. `vdoe-licensing-forms.html` — VDOE Licensing Forms & Information
   (initial licensure, adding endorsements, reciprocity).
4. `vdoe-el-related-programs.html` — VDOE English Learner Education
   Related Programs and Resources (Title III, professional standards
   linking to 2021 Uniform Performance Standards, ESL endorsement
   add-on via Praxis).
5. `vdoe-dual-language-endorsement.html` — VDOE Dual Language
   Endorsement page (introduces the new endorsement effective 2025;
   cites 8VAC20-23-321 through 324 and -130).

Additional regulatory texts pulled live but not snapshotted as
HTML files (they are public Virginia Administrative Code citations
preserved by URL):

- 8VAC20-23-350 — English as a Second Language preK-12 endorsement
- 8VAC20-23-321/322/323/324 — Dual Language endorsements
- 8VAC20-23-130 — Professional studies requirements

## Disappearances / 404s

None. The 2019 baseline cited only the VDOE homepage
(`https://www.doe.virginia.gov`), which is still live. No source
URLs went dead.

## Notes for next refresh

- Re-check `sei.mandatedForAllTeachers` whenever the General
  Assembly revises Title 22.1 of the Code of Virginia — Virginia has
  not signaled an SEI mandate, but post-2025 Dual Language adoption
  shows VDOE is willing to act on EL teacher prep.
- The Dual Language Endorsement is brand-new (effective 2025); the
  count of teachers actually holding it will lag for several years.
- Practicum coding for both bilingual and ELD is left `null`. An
  approved-program path implicitly embeds supervised field
  experience under 8VAC20-23-130, but the endorsement-specific
  regulations do not call out a separate practicum requirement, so
  honest coding is `null` until VDOE clarifies.
