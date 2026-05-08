# MT — Changes from baseline-2019

Refresh date: 2026-05-08
Retrieved by: projectcert-2026
SEA: Montana Office of Public Instruction (OPI)

## Sources verified live (200 OK)

1. https://opi.mt.gov (SEA homepage — corroborates baseline source)
2. https://opi.mt.gov/Educators/Licensure/Educator-Licensure/Educator-Licenses
3. https://opi.mt.gov/Portals/182/Page%20Files/School%20Accreditation/FY2026%20Endorsement%20Codes.pdf
4. https://www.law.cornell.edu/regulations/montana/Mont-Admin-r-10.57.412
5. https://www.law.cornell.edu/regulations/montana/Mont-Admin-r-10.58.501
6. https://opi.mt.gov/Families-Students/Family-Student-Support/English-Learners
7. https://opi.mt.gov/Portals/182/Page%20Files/English%20Language%20Learners/Docs/EnglishLearnerGuidanceForSchoolDistricts.pdf
8. https://bpe.mt.gov/Seal-of-Biliteracy/Seal-of-Biliteracy
9. https://opi.mt.gov/Portals/182/Seal%20of%20Biliteracy%20FAQs.pdf
10. https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp

The legacy leider-2021 source URL (https://opi.mt.gov) is still
live. It has been retained in `sources[]` for audit-trail purposes;
the operative documents are now items 2–10 above.

## Field diffs vs. baseline-2019

- **elPercent: 2.2 → 2.4**
  (NCES Digest 2023 Table 204.20, Fall 2021 — most recent NCES
  state-level figure for cross-state comparability)
- **elPercentAsOf: 2019-10-01 → 2021-10-01**
- **credentials.eld.requirements.program: null → true**
  (ARM 10.57.412 + 10.57.301: ESL K-12 is excluded from the
  degree-major / portfolio / PRAXIS-only / National Board pathway,
  so an OPI-approved educator preparation program is the operative
  affirmative pathway)
- **credentials.eld.requirements.practicum: null → true**
  (ARM 10.57.412: applicants must verify completion of an approved
  program that includes "supervised teaching experience")
- **credentials.eld.requirements.coursework: null (unchanged)**
  (Rule does not specify a freestanding state-level coursework hour
  count separate from the approved-program requirement; ambiguous,
  so kept null per workflow rule)
- **credentials.eld.requirements.test: null (unchanged)**
  (Montana does not mandate a state ESL/PRAXIS test for the ESL
  endorsement; the rule is silent on a required exam. Coded null
  rather than false because absence-from-rule is not the same as an
  affirmative "no test" statement)
- **credentials.eld.requirements.languageProficiency: false (unchanged)**
  (No language-proficiency exam required; ESL endorsees teach
  English)
- **professionalStandardsMentions.el: false → true**
  (ARM 10.58.501 explicitly names "English Language Learners (ELL)"
  in the diversity standard — change from the 2014-era predecessor
  standards that did not enumerate ELL)
- **professionalStandardsMentions.diverse / cultural / linguistic:
  all true (unchanged)**
- **sealOfBiliteracy.adopted: null → true**
  (Board of Public Education adopted the Seal in July 2021)
- **sealOfBiliteracy.year: null → 2021**
- **sealOfBiliteracy.sourceUrl: Wikipedia → bpe.mt.gov/Seal-of-Biliteracy/Seal-of-Biliteracy**
  (SEA-of-record source replaces generic Wikipedia URL)
- **elpAssessment.sourceUrl: WIDA consortium roster → opi.mt.gov English Learners page**
  (more specific, MT-of-record source; WIDA membership corroborated
  in OPI EL page)
- **lastVerified: 2019-11-15 → 2026-05-08**
- **verificationStatus: baseline-2019 → verified-2026**

## Sources appended

The two leider-2021 source entries are retained. Eight new
projectcert-2026 entries appended, covering: licensure framework,
endorsement codes, ARM 10.57.412 (endorsement rule),
ARM 10.58.501 (teaching standards), OPI EL landing page, OPI EL
guidance, BPE Seal of Biliteracy, NCES Digest.

## Gaps / unresolved

- `credentials.eld.requirements.coursework` and
  `credentials.eld.requirements.test` are coded `null` rather than
  `false`. The state-level rule (ARM 10.57.412) delegates these
  specifics to OPI-approved educator-preparation programs; what is
  knowable at the SEA-policy level is that no state-level
  coursework-hour count or required exam is named. This is the
  honest coding for the schema.
- `bilingual.offered = false` is preserved. Montana has world-
  language and tribal-language endorsements, but no bilingual-
  education credential per the FY2026 endorsement code list. If the
  Class 7 American Indian Language and Culture Specialist license
  later evolves into a bilingual-education credential, that would
  be the place to revisit this.
