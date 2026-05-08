# Ohio (OH) — changes from baseline-2019

Date of refresh: 2026-05-08
Prior status: `baseline-2019` (lastVerified 2019-11-15)
New status: `verified-2026`

## SEA naming

The State Education Agency was renamed in 2023 from the Ohio Department
of Education (ODE) to the **Ohio Department of Education and Workforce
(ODEW)**. The `education.ohio.gov` domain still resolves and continues
to host all current K-12 content under the new agency banner; current
SEA pages display "Ohio Department of Education and Workforce" with
Director Stephen D. Dackin in the page footer. We therefore keep the
existing `education.ohio.gov` URLs but updated the source labels to
reference ODEW.

## Sources retrieved

All saved under `sources/OH/2026-05-08/`:

- `english-learners-page.html` / `.txt` — ODEW EL landing page
  (Student Supports > English Learners). States Ohio serves
  ~80,000 English learners with Spanish, Somali, Arabic, etc.
- `el-programs-page.html` / `.txt` — ODEW English Learner Programs
  page. Confirms Ohio English Language Proficiency Standards, OELPS
  (screener) and OELPA (annual summative). Page footer dated
  "Last Modified: 8/25/2025".
- `oelpa-page.html` / `.txt` — OELPA program page. Confirms ELPA21
  consortium ("Ohio works with a group of states led by English
  Language Proficiency Assessment for the 21st Century (ELPA21) to
  develop and maintain its English language proficiency assessments")
  and Ohio Administrative Code 3301-13-11 mandate. Page footer dated
  "Last Modified: 2/6/2026".
- `southernohio-esc-tesol-bilingual-guidance.pdf` — ODE August 2019
  one-page guidance, "Qualification for Teachers Providing Language
  Instruction Educational Programs for English Learners." Authoritative
  on the structure of TESOL and Bilingual licensure pathways:
  - Standard multi-age license OR endorsement available in TESOL and
    Bilingual Education;
  - Both routes require completion of an approved teacher-prep program
    at an accredited college/university;
  - **TESOL** also requires the Ohio Assessments for Educators (OAE)
    content exam;
  - **Bilingual Education** standard license/endorsement does not
    require a separate content exam (none currently exists in OAE);
  - Supplemental licenses: 1-year, renewable up to 3 years.
    - Supplemental TESOL: requires OAE content exam.
    - Supplemental Bilingual: no exam requirement; mentor required.
- `teaching-profession-standards.pdf` / `.txt` — Ohio Standards for the
  Teaching Profession. Standard 1 (Students), Element 1.4: "Teachers
  model respect for students' diverse cultures, language skills and
  experiences" — explicit indicators include "respect and value the
  native languages and dialects of their students" and "implement
  instructional strategies that support the learning of English as a
  second language and the use of standard English in speaking and
  writing in the classroom." Standard 4, Element 4.2 indicator c
  references how "language, culture and family influence student
  learning."
- `sealofbiliteracy-oh.html` / `.txt` — sealofbiliteracy.org Ohio
  page. Confirms Ohio adopted the Seal via Substitute Senate Bill 3
  (2016); program launched in 2017-18 academic year for the Class of
  2018 graduates. Adoption date listed as 2017-03-16.
- `nces-table-204-20.html` — NCES Digest of Education Statistics 2023,
  Table 204.20 (English learners enrolled in public elementary and
  secondary schools, by state). Ohio Fall 2021 = **3.8%** EL
  (63,879 students). 2019 was 3.6%; the prior record's 3.2% appears
  to predate this NCES release.

## Field-level changes

- `elPercent`: 3.2 -> 3.8
- `elPercentAsOf`: "2019-10-01" -> "2021-10-01" (NCES Fall 2021
  reporting; latest available in NCES Digest 2023 Table 204.20)
- `credentials.bilingual.requirements.coursework`: null -> true
  (approved teacher-prep program required for both standalone license
  and endorsement; the supplemental Bilingual license is the only
  route that bypasses the program requirement, and it is explicitly a
  temporary 1-3 year bridge to the standard route)
- `credentials.bilingual.requirements.practicum`: null -> true
  (approved Ohio teacher-prep programs include a clinical/student-
  teaching practicum as a structural requirement of any approved prep
  program)
- `credentials.bilingual.requirements.test`: null -> false
  (no Ohio Assessments for Educators content exam exists for Bilingual
  Education — only TESOL has an OAE content exam per the Aug-2019 ODE
  guidance)
- `credentials.bilingual.requirements.languageProficiency`: null ->
  null (no change; ODE/ODEW guidance does not name a separate language
  proficiency assessment for Bilingual Education licensure beyond the
  approved-program coursework. Leaving as null per "ambiguous -> null"
  rule.)
- `credentials.bilingual.notes`: added — clarifies dual-route structure
  (multi-age standalone license vs. endorsement on a primary license)
  and the supplemental-license bridge.
- `credentials.eld.requirements.coursework`: null -> true
  (approved teacher-prep program required for the standard TESOL
  multi-age license and the TESOL endorsement)
- `credentials.eld.requirements.practicum`: null -> true (same
  rationale as bilingual — practicum is a structural element of
  approved Ohio prep programs)
- `credentials.eld.requirements.test`: true (unchanged — OAE TESOL
  content exam required for the standard license, the endorsement,
  and the supplemental TESOL license)
- `credentials.eld.notes`: refined wording. Prior note used the older
  "Supplemental ESL licensure" phrasing; current ODE/ODEW guidance
  consistently uses "Supplemental TESOL." Also notes the 1-year valid,
  3-year maximum window.
- `credentials.sei.mandatedForAllTeachers`: false (unchanged — Ohio
  has no general SEI mandate for all licensed teachers)
- `professionalStandardsMentions`: all four flags remain `true`.
  Confirmed against current standards PDF: "diverse" (Standard 1
  preamble + 1.4), "cultural" (Element 1.4 narrative; 4.2 indicator
  c "language, culture and family"), "linguistic" (Element 1.4 native
  languages/dialects indicator), "el" / "English language" (1.4
  Accomplished indicator: "support the learning of English as a
  second language").
- `sealOfBiliteracy.adopted`: true (unchanged)
- `sealOfBiliteracy.year`: 2017 (unchanged; statute is 2016 SB 3,
  program launched 2017-18 — the existing `2017` reflects the
  effective/launch year, consistent with the rest of the dataset)
- `sealOfBiliteracy.sourceUrl`: updated to the Ohio-specific page
  on sealofbiliteracy.org instead of the generic landing page.
- `elpAssessment.name`: "OELPA" (unchanged)
- `elpAssessment.consortium`: "ELPA21" (unchanged — confirmed by the
  current OELPA page)
- `elpAssessment.sourceUrl`: updated to the canonical ODEW OELPA URL
  pattern that resolves today
  (`/Topics/Testing/Ohio-English-Language-Proficiency-Assessment-OELPA/Ohio-English-Language-Proficiency-Assessment-OELPA`).
  The prior URL was a near-equivalent legacy slug under the same
  domain.
- `sources[]`: appended seven `projectcert-2026` entries for the
  documents listed above. The two `leider-2021` entries are retained
  per the workflow rule (audit trail).
- `lastVerified`: "2019-11-15" -> "2026-05-08"
- `verificationStatus`: "baseline-2019" -> "verified-2026"

## Open notes / non-changes

- The August 2019 ODE guidance PDF is not superseded; it remains the
  most concise public summary of the TESOL/Bilingual licensure
  pathway structure. The underlying licensure rules in Ohio
  Administrative Code 3301-24 (educator licensure) have not been
  rewritten since 2019 in ways that change the schema-relevant flags.
- The agency rename to ODEW (HB 33, FY24-25 budget bill, July 2023)
  is structural; it did not alter EL-related teacher credentialing
  requirements.
- The EL student-percent in NCES (3.8% Fall 2021) trails ODEW's
  current self-reported "over 80,000 students" figure on the EL
  landing page, which would put Ohio closer to ~5% if total
  enrollment held steady. Per the workflow we prefer NCES for
  cross-state comparability and have logged the higher SEA-side
  figure here for context only.
