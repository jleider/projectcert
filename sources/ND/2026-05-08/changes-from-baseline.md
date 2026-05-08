# North Dakota — changes from baseline-2019

Refresh date: 2026-05-08
Refreshed by: projectcert-2026
Prior status: baseline-2019 (lastVerified 2019-11-15)
New status: verified-2026

## Sources read this refresh (17 files in this folder)

- ESPB EL Endorsement page (`espb-el-endorsement.html` / `.md`)
- ESPB Types of Licenses page (`espb-types-licenses.html` / `.md`)
- ESPB-adopted InTASC Model Core Teaching Standards, Final August 2015
  (`espb-intasc-standards.pdf` / `.md`)
- NDAC Chapter 67.1-02-03 (Re-Education), incl. § 67.1-02-03-05
  Bilingual / ELD Endorsement (`ndac-67.1-02-03.pdf` / `.md`)
- NDDPI EL / Multicultural Education program page
  (`nddpi-el-multicultural.html` / `.md`)
- NDDPI ACCESS for ELLs page (`nddpi-access-ells.html` / `.md`)
- NDDPI EL Data and Reporting page (`nddpi-el-data-reporting.html`)
- NCES Digest Table 204.20, 2023 edition
  (`nces-el-table-204-20.html` / `.md`)
- Seal of Biliteracy ND state page (`seal-of-biliteracy-nd.html` / `.md`)

All 2019 baseline citations (NDDPI homepage, Leider 2021) are
preserved in `sources[]` per the audit-trail rule.

## Schema-recorded changes

- elPercent: 3.4 → 3.3
  (NCES Digest Table 204.20, 2023 ed., Fall 2021 ND row)
- elPercentAsOf: 2019-10-01 → 2021-10-01
  (Fall 2021 is the latest year published in current NCES table)
- credentials.bilingual.requirements.languageProficiency: null → true
  (NDAC 67.1-02-03-05 subsection 7 explicitly requires "16 semester
  hours in a language other than English OR documented proficiency
  in a language other than English" for the bilingual endorsement
  24500. Baseline was null; the regulation is unambiguous, so
  promoting to true.)
- credentials.eld.requirements.test: null → true
  (ESPB EL Endorsement page: "Teachers may pursue a Praxis test for
  English to Speakers of Other Languages instead of completing all
  coursework." A test-only / Praxis ESOL pathway exists for the ELD
  endorsement, so test = true.)
- credentials.eld.standalone: false → true
  (NDAC 67.1-02-03-05 codifies the ELD endorsement (24000) as its
  own credential — distinct credential code, complete on its own
  set of requirements 1–5. It is added to a primary teaching
  license like every ND endorsement, but is itself a fully
  specified standalone credential program. Baseline coded
  standalone=false; current SEA documentation supports
  standalone=true. addOn remains true since every ND endorsement
  attaches to a base license.)
- professionalStandardsMentions.linguistic: false → true
  (ESPB-adopted InTASC standards explicitly reference learners'
  "cognitive, linguistic, social, emotional, and physical
  development" in standard 1, and 8(k) "developmentally,
  culturally and linguistically...". The current operative
  standards document — already in force in 2019 — does contain
  the term. Coding the document as found.)
- professionalStandardsMentions.el: false → true
  (InTASC standard 2(e) explicitly: "incorporates tools of
  language development into planning and instruction, including
  strategies for making content accessible to English language
  learners..." Standard 2(i) addresses second-language acquisition
  processes. Coding the document as found.)

## Unchanged from baseline-2019

- credentials.bilingual.offered: true
- credentials.bilingual.standalone: true
- credentials.bilingual.addOn: true
- credentials.bilingual.requirements.coursework: true
- credentials.bilingual.requirements.practicum: true
- credentials.bilingual.requirements.test: false
  (NDAC chapter prescribes no state exam for the bilingual
  endorsement itself; Praxis ESOL only attaches to the ELD path.)
- credentials.bilingual.requirements.program: null
  (NDAC sets coursework areas, not "approved-program-only" pathway.)
- credentials.eld.offered: true
- credentials.eld.addOn: true
- credentials.eld.requirements.coursework: true
- credentials.eld.requirements.practicum: true
- credentials.eld.requirements.languageProficiency: false
  (ELD endorsement requires no language-other-than-English
  proficiency; that is a bilingual-only requirement.)
- credentials.eld.requirements.program: null
- credentials.sei.mandatedForAllTeachers: false
  (No general SEI requirement attached to ND base teaching
  license; ESPB Types of Licenses page lists no such mandate.)
- professionalStandardsMentions.diverse: true
- professionalStandardsMentions.cultural: true

## Out-of-schema findings (recorded here, not in JSON)

The current Zod schema (`src/content/config.ts`) does not include
`elpAssessment.{name,consortium,sourceUrl}` or
`sealOfBiliteracy.{adopted,year,sourceUrl}` fields. Per the
state-source-refresh skill ("Don't change the schema"), the
following confirmed facts are recorded here only and added as a
freeform `notes` string to `credentials.eld` so they are at least
visible on the state record:

- ELP assessment: ND uses WIDA ACCESS for ELLs as the annual
  English language proficiency assessment. Confirmed by NDDPI
  ACCESS for ELLs page. (WIDA member state — ND is in the WIDA
  consortium.)
- Seal of Biliteracy: ND adopted in 2019, operated by NDDPI as
  the North Dakota Seal of Biliteracy (NDSB). Confirmed by
  sealofbiliteracy.org state page and NDDPI EL/Multicultural
  Education program section.

If/when the schema is extended to add these fields (a separate
schema-change PR), this state should be updated to populate them.

## Source-URL changes since baseline

- The NDDPI homepage citation (https://www.nd.gov/dpi/) remains
  reachable. It is preserved in `sources[]` as the original
  baseline-2019 entry.
- Educator licensure has been administered by the Education
  Standards and Practices Board (ESPB), an independent body
  separate from NDDPI, throughout this period. The 2019 paper's
  bibliography pointed at NDDPI generally; the operative
  endorsement rules live in NDAC chapter 67.1-02-03 (ESPB
  jurisdiction). New citations capture both NDDPI (program/policy)
  and ESPB / NDAC (credentialing) accordingly.

## No 404s; no in-progress carry-over

All sources resolved to live pages or live PDF documents. No gaps
preventing promotion to `verified-2026`.
