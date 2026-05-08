# Indiana — Changes from baseline-2019

Date of refresh: 2026-05-08
Refreshed by: projectcert-2026
SEA: Indiana Department of Education (IDOE)
WIDA member: Yes (ACCESS for ELLs is the state ELP assessment)

## Summary

Indiana's EL credential is the **English as a New Language (ENL)
Professional Educator License**. It is offered as both a standalone
license and as an add-on (content area) to an existing Professional
Educator License. The 2019 baseline coded `eld.standalone: false,
addOn: true`; this is updated to `standalone: true, addOn: true`
because IDOE's official "Required Tests by Licensure Content Area"
(Indiana CORE) and "License Areas, Corresponding Praxis Tests" both
list ENL ("English as a New Language" / "English Learners") as a
license content area in its own right, requiring (a) completion of an
approved educator preparation program and (b) passage of the ENL
licensure examination — Indiana CORE 019 (English Learners) or Praxis
5362 (English to Speakers of Other Languages). The same documents
explicitly state that the content area is added by program completion
("No — must complete approved educator preparation program"), not by
test alone.

The EL Teacher of Record (ToR) **Rubric** — a temporary alternate
qualification path for already-licensed teachers based on points for
SLA coursework, EL teaching years, and PD — closed to new candidates
on **September 1, 2022**. After that date, the only routes to qualify
as an EL Teacher of Record are (1) full ENL licensure, or (2) an ENL
**Emergency Permit** (one-year LEA-issued, must show progress toward
full licensure to renew). This narrows the path significantly compared
to the 2019 baseline.

No bilingual / dual language teaching credential is offered by IDOE;
the only listed world-language licenses are content-area teaching
licenses (Spanish, French, German, etc.), not bilingual education
endorsements that authorize content-area instruction in a language
other than English. Bilingual remains `offered: false`.

There is no general SEI (sheltered English immersion) mandate for all
Indiana teachers. The mandate that exists is narrower: every LEA must
designate a qualified **EL Teacher of Record** for the ELs it serves;
non-ENL-licensed classroom teachers may serve ELs as a Teacher of
Service (ToS) under ToR oversight. `sei.mandatedForAllTeachers`
remains `false`.

## Field-by-field diff

- elPercent: 5.4 → **7.0** (NCES Digest 2023, Table 204.20, fall 2021)
- elPercentAsOf: 2019-10-01 → **2021-10-01**
- credentials.bilingual: unchanged (`offered: false`, `standalone:
  false`, `addOn: false`). Indiana does not issue a bilingual
  education credential.
- credentials.eld.offered: true (unchanged)
- credentials.eld.standalone: false → **true**. The ENL Professional
  Educator License is itself a standalone license content area
  (Indiana CORE test 019; Praxis 5362), issued by program completion
  plus exam, and listed alongside other initial-practitioner content
  areas. The 2019 paper appears to have coded only the add-on path.
- credentials.eld.addOn: true (unchanged) — ENL can be added to an
  existing Professional Educator License via approved program +
  exam.
- credentials.eld.requirements.program: null → **true**. IDOE FAQ #7
  (May 2024) and the EL ToR memo (Aug 2019) both state ENL candidates
  must complete an "approved program / ENL coursework"; Indiana CORE
  and Praxis tables flag ENL as "No — must complete approved educator
  preparation program" (i.e., test alone is not sufficient).
- credentials.eld.requirements.coursework: null → **true**. Coursework
  is part of the approved program; the closed ToR Rubric (pre-2022-09)
  also required ≥15 SLA-coursework points, codified in the "Meeting EL
  ToR Requirements" rubric. Coursework requirements vary by
  university (FAQ #7).
- credentials.eld.requirements.practicum: null → **null** (no
  state-level requirement found; practicum content is set by each
  approved program at the institution level — IDOE does not specify a
  uniform clinical/practicum hour rule for ENL beyond standard initial-
  practitioner expectations).
- credentials.eld.requirements.test: null → **true**. ENL licensure
  requires passing a content-area exam: Indiana CORE 019 "English
  Learners" (cut score 220, no longer published in the current
  Indiana CORE table — listed without cut score because the
  preparation program also gates content addition) **or** Praxis 5362
  "English to Speakers of Other Languages" (cut score 155). Both are
  listed in IDOE's "License Areas, Corresponding Praxis Tests, and
  Test Fees" (updated 2026-02-26).
- credentials.eld.requirements.languageProficiency: false (unchanged) —
  no second-language proficiency exam is required; the ENL pathway is
  about teaching English to ELs, not bilingual instruction in a
  partner language.
- credentials.sei.mandatedForAllTeachers: false (unchanged). The 2019
  EL Program Staffing memo and the 2024 ToR FAQ both impose a per-LEA
  ToR/ToS structure, not a universal SEI/EL-coursework mandate on all
  Indiana teachers.

## Professional standards mentions

The 2019 baseline coded all four flags
(`diverse`/`cultural`/`linguistic`/`el`) as **true**. The current
publicly available Indiana document with the closest match is the
"Indiana Content Standards for Educators — English Learners (EL)"
(Dec 2010, still posted by IDOE), which is the credential-specific
standards rather than the general teacher standards (REPA / general
content standards). That EL-credential document references all four
concepts repeatedly (e.g., Std 3 "Culture", Std 1 "Linguistics", and
the entire credential is for EL teachers). However, the general
Indiana professional teaching standards (REPA) were not located in
this refresh as a current standalone document.

For consistency with the baseline coding methodology (which appears
to have inspected EL-relevant standards documents), the four flags
are retained as `true`. If a future refresh inspects the general
Indiana teacher standards specifically (rather than the EL credential
content standards), this should be revisited.

## Source disposition

- Existing baseline sources (`leider-2021`) retained.
- Appended 7 current IDOE / NCES sources retrieved 2026-05-08.
- No baseline source was found 404 with no equivalent. The generic
  IDOE homepage (https://www.doe.in.gov) is preserved as a baseline
  citation; current SEA URL is https://www.in.gov/doe/ but the legacy
  domain still redirects.

Verification status: **baseline-2019 → verified-2026**.
