# Mississippi (MS) — changes from baseline-2019

Refresh date: 2026-05-08
Refreshed by: projectcert-2026
SEA: Mississippi Department of Education (MDE)

## Summary

MS migrated its annual English Language Proficiency assessment from
LAS Links to the ELPA21 consortium between the 2023 ELPT FAQ
(LAS Links era) and the current MDE ELPT page (ELPA21). The state
joined ELPA21 in time to be highlighted as the consortium's "newest
partner state" at the AMTESOL conference in early 2025
(elpa21-newsletter-spring-2025). The MDE EL page now lists
"Interpreting ELPA21 Score Reports" as a webinar topic and the
contact section reads "Whom to contact at ELPA 21" on the MDE ELPT
page.

The credentialing landscape is unchanged: ESL (177, K-12) remains
the only EL-related endorsement, available either by Praxis Subject
Assessment or by completion of an MDE-approved program. There is no
bilingual endorsement and SEI is not mandated for all teachers.

NCES Fall 2021 EL share for MS is 3.08% (CCD/EDFacts, Digest 204.20),
up from the 2.7% baseline.

## Field-by-field diffs vs. ms.json

- elPercent: 2.7 -> 3.1
  (NCES Digest 2023 table 204.20, Fall 2021 unrounded 3.0762%)
- elPercentAsOf: 2019-10-01 -> 2021-10-01
- elpAssessment.name: "LAS Links" -> "ELPA21 Summative"
  (MDE ELPT page now references ELPA 21; ELPA21 May 2025 newsletter
  identifies MS as their newest partner state)
- elpAssessment.consortium: null -> "ELPA21"
- elpAssessment.sourceUrl:
  https://www.mdek12.org/OAE/OEAS/EnglishLearners ->
  https://www.mdek12.org/OSA/ELPT (current MDE ELPT page)
- credentials.eld.requirements.program: null -> true
  (Appendix A of the K-12 Licensure Guidelines lists 177 ESL K-12
  as available via Completion of an Approved Program in addition
  to Praxis; this was implicit in baseline but is now explicit)
- credentials.eld.requirements.coursework: null -> false
  (no 18-hour coursework path is listed for the 177 endorsement;
  it requires either Praxis or an approved program)
- credentials.eld.requirements.practicum: null -> false
  (no separate practicum requirement called out beyond the approved
  program route, which subsumes student teaching)
- credentials.eld.requirements.languageProficiency: false -> false
  (unchanged; ESL endorsement does not require language proficiency
  exam since it is for English instruction)
- credentials.eld.requirements.test: true -> true (unchanged)
- credentials.bilingual.*: unchanged (not offered in MS)
- credentials.sei.mandatedForAllTeachers: false (unchanged)
- professionalStandardsMentions.cultural: true -> false
  (the current MDE Teacher Growth Rubric, July 2018, used for PGS
  evaluations as of 2024-25, does not mention "cultural", "diverse",
  "linguistic", or "English learner" anywhere in the rubric body.
  The companion "Examples of Evidence" document mentions
  "family, community, culture, language" only in a single footnote
  on student experience — too incidental to count as a standards
  reference. Demoting from baseline.)
- professionalStandardsMentions.{diverse,linguistic,el}: false
  (unchanged)
- sealOfBiliteracy.adopted: true (unchanged)
- sealOfBiliteracy.year: 2019 (unchanged; MDE EL page still links
  to the Mississippi Seal of Biliteracy policy)
- sealOfBiliteracy.sourceUrl: kept at sealofbiliteracy.org since
  the MDE-specific page returned 404 on this fetch.
- verificationStatus: baseline-2019 -> verified-2026
- lastVerified: 2019-11-15 -> 2026-05-08

## Sources retrieved 2026-05-08

- mde-elpt-page (HTML): the MDE ELPT page, references ELPA 21 as
  contact and "Mississippi Testing Accommodations Manual, February
  2026". https://www.mdek12.org/OSA/ELPT
- mde-english-learners (HTML): MDE EL services page, lists
  "Interpreting ELPA21 Score Reports" webinar and links to MS Seal
  of Biliteracy. https://www.mdek12.org/OAE/EL
- mde-add-endorsement (HTML): MDE supplemental endorsements table.
  Confirms 177 - English as a Second Language (K-12) by Praxis or
  Approved Program. https://www.mdek12.org/OEL/EL/AddEndorsement
- mde-licensure-pathways (HTML): four pathways (Traditional,
  Alternate, CTE, Reciprocity). https://www.mdek12.org/OEL/EL/Pathways
- mde-pgs (HTML) + mde-pgs-teacher-growth-rubric (PDF, July 2018):
  Mississippi Educator and Administrator Professional Growth System
  rubric. No diverse/cultural/linguistic/EL mentions in the rubric.
  https://www.mdek12.org/OTL/OEE
- mde-rubric-evidence (PDF): Teacher Growth Rubric Examples of
  Evidence. Single footnote references "family, community, culture,
  language".
- mde-pgs-2024-2025 (PDF): district notice confirming PGS is the
  current 2024-25 evaluation system.
- ms-licensure-guidelines-k12-2025-12 (PDF): K-12 Educator Licensure
  Guidelines, December 2025 revision. Appendix A confirms 177 ESL
  endorsement routes.
- el-administrator-resource-manual (PDF): MDE EL Administrator
  Resource Manual. General EL programs guidance (cultural awareness
  glossary, etc.).
- elpt-las-links-faq-2023 (PDF): prior MDE ELPT FAQ from the
  LAS Links era — kept as evidence the assessment changed.
- elpa21-newsletter-spring-2025 (HTML): explicitly names Mississippi
  as ELPA21's "newest partner state" at AMTESOL 2025.
  https://elpa21.org/elpa21-insider-newsletter-spring-2025/
- nces-coe-english-learners (HTML): NCES Condition of Education,
  English Learners in Public Schools (Fall 2021). MS = 3.0762%.
- nces-table-204-20-d23 (HTML): NCES Digest table 204.20 (2023).

## Gaps / caveats

- Seal of Biliteracy MDE page returned 404 on this fetch; we kept
  sealofbiliteracy.org as the canonical sourceUrl. The MDE EL
  services page text confirms the policy is still in force.
- MDE secondary-education licensure-page URL also 404'd; the
  licensure-pathways and add-endorsement pages are the live entry
  points for licensure content.
- "Approved program" route for the 177 ESL endorsement is confirmed
  by Appendix A of the licensure guidelines. We do not have the
  per-IHE program syllabi to confirm whether each MS-approved
  TESOL/ESL prep program embeds a practicum; we coded
  practicum: false because the SEA does not impose a separate
  practicum requirement on top of the approved-program completion.
