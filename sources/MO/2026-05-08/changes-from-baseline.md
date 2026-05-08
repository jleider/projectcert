# Missouri (MO) — Changes from baseline-2019

Retrieved: 2026-05-08. Verified by: projectcert-2026.

## Sources reviewed

1. `csr-5-20-400.pdf` — Missouri Code of State Regulations, Title 5,
   Division 20, Chapter 400 (Office of Educator Quality), full
   chapter PDF (66 pages) covering all educator certification rules
   including 5 CSR 20-400.500 (general requirements) and
   5 CSR 20-400.570 (Certification Requirements for English Language
   Learners, K-12). Effective date of ELL rule: August 1, 2017.
2. `dese-eld-page.html` — DESE "English Language Development" landing
   page. Confirms ACCESS for ELLs as the annual ELP assessment, the
   Missouri ELD Standards (WIDA-based), and Missouri Seal of
   Biliteracy program operated by DESE.
3. `dese-seal-of-biliteracy.html` — DESE "Missouri Seal of
   Biliteracy" page describing the SoBL and Distinguished SoBL
   program; lists annual reports back to 2020-21 and 127
   participating districts.
4. `mo-teacher-standards-2025.pdf` — "Missouri's Teacher Standards"
   (August 2025 revision). Replaces the older Missouri Teacher
   Standards used in the 2019 baseline.
5. `teacher-standards-page.html` — DESE Teacher Standards landing
   page (mostly nav; the substance is in the PDF).
6. `nces-table-204-20.html` — NCES Digest Table 204.20, "English
   learners (ELs) enrolled in public elementary and secondary
   schools, by state or jurisdiction: Fall 2011 through fall 2021"
   (2023 release). Missouri Fall 2021 = 3.8%.
7. `sealofbiliteracy-org.html` — sealofbiliteracy.org / Wikipedia
   adoption-by-year list. Confirms Missouri adopted the Seal in 2017.
8. `wida-consortium.html` — wida.wisc.edu/about/consortium. Confirms
   Missouri as a current WIDA Consortium member state.

## Diffs vs. baseline-2019

- `elPercentAsOf`: `2019-10-01` -> `2021-10-01` (most recent NCES
  Table 204.20 reporting year is Fall 2021; MO value unchanged at
  3.8%).
- `credentials.eld.requirements.program`: `null` -> `true`
  (5 CSR 20-400.500 requires recommendation from a department-approved
  educator preparation program; 5 CSR 20-400.570 incorporates that
  general requirement).
- `credentials.eld.requirements.test`: `null` -> `true`
  (5 CSR 20-400.570(1)(B)3 requires a qualifying score on the
  required exit assessment(s) per 5 CSR 20-400.310 and
  5 CSR 20-400.440).

## No-change confirmations

- `credentials.bilingual.offered`: false. No bilingual / dual-language
  / TBE certification or endorsement appears anywhere in
  5 CSR 20-400. The closest credential is World Language; that is
  not bilingual education and is out of scope.
- `credentials.eld.standalone`: false. The ELL credential is an
  add-on requiring a prior valid Missouri permanent or professional
  certificate (5 CSR 20-400.570(1)(A)1). It is not a standalone
  initial license.
- `credentials.eld.addOn`: true. ELL is an add-on endorsement
  (K-12) per 5 CSR 20-400.570.
- `credentials.eld.requirements.coursework`: true (18 hours of
  content knowledge across linguistics, language and culture, second
  language acquisition, methods, curriculum, and assessment, plus
  3 hours psychology of the exceptional child and 6 hours literacy
  per 5 CSR 20-400.570(1)(B)-(C)).
- `credentials.eld.requirements.practicum`: true (3 semester hours of
  field/clinical experience including a culminating clinical
  experience working with ELL students in elementary and secondary
  settings per 5 CSR 20-400.570(1)(D)).
- `credentials.eld.requirements.languageProficiency`: false. No
  applicant language proficiency exam is required for the ELL
  endorsement (only English Linguistics coursework).
- `credentials.sei.mandatedForAllTeachers`: false. No statewide SEI
  mandate appears in 5 CSR 20-400. Missouri remains in the majority
  of states without a universal SEI requirement.
- `professionalStandardsMentions.diverse`: true. The 2025 MO Teacher
  Standards explicitly include Standard 1.5 "Diverse social and
  cultural perspectives" and Standard 2 references "diverse
  learners" throughout.
- `professionalStandardsMentions.cultural`: true. Same standards
  reference "cultural perspectives" repeatedly (1.5, 2.6, 6.2).
- `professionalStandardsMentions.linguistic`: true. Standard 2.6 is
  "Language, culture, family and knowledge of community values" and
  Standard 6 references communication "with students whose first
  language is not Standard English." The word "linguistic" itself
  is not used, but the linguistic-difference concept is explicitly
  encoded as a quality indicator.
- `professionalStandardsMentions.el`: false. Neither "English
  Learner" nor "EL" nor "ELL" appears in the 2025 MO Teacher
  Standards. The closest reference is "students whose first
  language is not Standard English" (Standard 6.1, Proficient).
- `sealOfBiliteracy.adopted`: true, `year`: 2017. DESE confirms the
  Missouri Seal of Biliteracy program; sealofbiliteracy.org lists
  Missouri among 2017 adopters.
- `elpAssessment.name`: "ACCESS for ELLs", `consortium`: "WIDA".
  DESE ELD page references ACCESS for ELLs as the annual EL
  assessment; WIDA consortium membership confirmed on
  wida.wisc.edu/about/consortium.

## Outstanding questions / gaps

None. All baseline fields are now grounded in primary current SEA
sources, and the two `null` requirement flags resolved to `true` on
the basis of explicit text in 5 CSR 20-400.570 and the underlying
5 CSR 20-400.500.
