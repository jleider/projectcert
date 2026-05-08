# Maryland — changes from baseline-2019 (refresh 2026-05-08)

SEA: Maryland State Department of Education (MSDE).
WIDA Consortium member; ELP assessment = ACCESS for ELLs (unchanged).

## Sources consulted today

- COMAR 13A.12.02.19 — ESOL (Pre-K–12) certification rule
  (http://mdrules.elaws.us/comar/13a.12.02.19) — primary, read in full.
- ESL Teacher Edu — Maryland TESOL certification overview
  (https://www.eslteacheredu.org/maryland/) — secondary corroboration
  for Praxis 5362 + dual standalone/add-on pathway.
- NCES Condition of Education 2024 — English Learners in Public Schools
  (https://nces.ed.gov/programs/coe/pdf/2024/cgf_508c.pdf) — read as PDF
  via Read tool.
- Global Seal of Biliteracy — Maryland page
  (https://theglobalseal.com/maryland-seal-of-biliteracy) — confirms
  2016 adoption (SB 781, Ch. 232; effective 1 July 2016).
- WIDA Consortium membership page (https://wida.wisc.edu/about/consortium)
  — confirms Maryland membership and ACCESS for ELLs use.

Attempted but not cited (per skill rule "don't cite a source you didn't
read"):

- MSDE "Preparing Educators for High Poverty / Culturally and
  Linguistically Diverse Schools" (2014) PDF returned 403 to WebFetch.
  Title is corroborating but bytes were not retrieved; not added to
  sources[]. The professionalStandardsMentions booleans remain
  baseline-coded; no demotion since the COMAR ESOL chapter and the
  general MSDE framing both reference cultural/linguistic diversity.

## Diffs vs. prior record

- elPercent: 9.2 → 11.2 (NCES COE 2024, fall 2021 reporting)
- elPercentAsOf: 2019-10-01 → 2021-10-01
- credentials.eld.requirements.program: null → true
  (COMAR 13A.12.02.19 specifies an approved-program credit pattern.)
- credentials.eld.requirements.coursework: null → true
  (COMAR 13A.12.02.19 §B–D enumerates 54 sem hrs of required coursework.)
- credentials.eld.requirements.practicum: null → true
  (COMAR 13A.12.02.19 §C requires 6 sh supervised observation/student
  teaching in ESOL OR 1 year of successful ESOL teaching.)
- credentials.eld.requirements.languageProficiency: false → true
  (COMAR 13A.12.02.19 §B requires 6 sh in a single modern foreign
  language at the college level for the *teacher candidate*. Baseline
  appears to have miscoded this as a student-language requirement.)
- credentials.eld.requirements.test: true → true (no change; Praxis
  ESOL 5362 still required).
- credentials.eld.offered/standalone/addOn: true/true/true (unchanged).
- credentials.bilingual.{offered,standalone,addOn}: false/false/false
  (unchanged — Maryland does not offer a separate bilingual education
  credential under COMAR 13A.12.02).
- credentials.sei.mandatedForAllTeachers: false (unchanged — Maryland
  has no statewide SEI mandate analogous to AZ/CA/MA).
- professionalStandardsMentions.{diverse,cultural,linguistic,el}: all
  true (unchanged; COMAR ESOL credential framing references all four).
- sealOfBiliteracy.adopted: true (unchanged), year: 2016 (unchanged),
  sourceUrl: tightened from generic sealofbiliteracy.org to
  https://theglobalseal.com/maryland-seal-of-biliteracy.
- elpAssessment.name: "ACCESS for ELLs" (unchanged)
- elpAssessment.consortium: "WIDA" (unchanged)
- elpAssessment.sourceUrl: unchanged.
- verificationStatus: baseline-2019 → verified-2026.
- lastVerified: 2019-11-15 → 2026-05-08.

## Notes worth carrying forward

- Maryland is one of the few states whose ELD (ESOL) credential
  explicitly requires teacher-candidate proficiency in a modern foreign
  language (6 sh, college level). Worth surfacing in copy when we
  discuss outliers on `languageProficiency`.
- No bilingual-education credential track exists in Maryland's COMAR
  certification chapter. Bilingual instruction in MD schools is
  delivered without a dedicated SEA credential; rolling-up DBE/DLBE/TBE
  here would misrepresent the SEA's scheme.
- The 2014 MSDE "Preparing Educators…CLD" PDF should be re-attempted
  next refresh — the 403 may be transient.
