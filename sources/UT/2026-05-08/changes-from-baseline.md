# Utah — changes from baseline-2019 (verified 2026-05-08)

SEA: Utah State Board of Education (USBE). WIDA member; ELP assessment is
WIDA ACCESS for ELLs (unchanged).

## Sources retrieved (2026-05-08)

1. `usbe-esl-endorsement-app.pdf` — USBE English as a Second Language
   Endorsement application (ADA-Compliant 7/10/2023). Defines the five
   ESL endorsement requirement areas (Language, Culture, Assessment,
   Instruction, Family & Community Engagement) and the four allowed
   demonstrations of competency per area: university course,
   competency-based USBE-approved LEA program, Master's degree with
   ESL major/minor (or out-of-state ESL license), or Praxis II 5362
   (English to Speakers of Other Languages, score ≥149).
2. `usbe-dli-app.pdf` — USBE Dual Language Immersion Endorsement
   application. Three requirement areas: Foundations of DLI, DLI
   Clinical Experience, World Language Oral Proficiency. Pathways
   include USBE-approved DLI minors at five Utah universities, a
   foundations course, or six competency-based microcredential
   modules; clinical experience via the same approved program OR at
   least one year teaching in an approved DLI/Bridge program; oral
   proficiency via ACTFL OPI Advanced-Mid, OPIc Advanced-Low, or a
   foreign-country bachelor's degree in the target language.
3. `usbe-world-languages-specs.pdf` — USBE World Languages Endorsement
   specifications. Read for context (related but distinct from DLI);
   confirms the ESL endorsement counts as the World Language Methods
   demonstration for the World Languages Endorsement, signalling
   USBE's continued treatment of ESL as a coherent specialization.
4. `usbe-uets.pdf` — Utah Effective Teaching Standards (UETS), ADA
   Compliance August 2023. The five professional teaching standards
   that ground educator evaluation. Searched for `diverse, cultural,
   culture, linguistic, English learner, ELL, second language,
   multilingual, bilingual`.

## Field-level diffs

- `elPercent`: `7.1` → `8.3` (NCES Digest 2023, Table 204.20, fall
  2021 — 57,334 EL students in Utah public schools, 8.3% of
  enrollment).
- `elPercentAsOf`: `2019-10-01` → `2021-10-01`.
- `credentials.bilingual.requirements.coursework`: `null` → `true`.
  DLI Foundations area can be satisfied by a university course
  (Foundations of DLI) — the application names specific courses at
  six approved universities, so the coursework pathway is now
  explicit on USBE's own form rather than implied.
- `credentials.bilingual.requirements.practicum`: `null` → `true`.
  The DLI Clinical Experience area is one of three named requirement
  areas, satisfied either by a USBE-approved DLI prep program/minor
  or by at least one year teaching in an approved DLI/Bridge
  program. A clinical/practicum component is a structural
  requirement of the endorsement, so the field is no longer
  unknown.
- `credentials.bilingual.requirements.test`: `null` → `false`. The
  DLI endorsement does not gate issuance on a test score; ACTFL
  OPI/OPIc are language-proficiency demonstrations and are listed as
  alternates to a foreign-country bachelor's degree, not as a Praxis
  content exam. Coded as language-proficiency rather than test.
- `credentials.bilingual.notes`: rewritten to name the DLI
  Endorsement explicitly and describe the three requirement areas.
- `credentials.eld.requirements.program`: `true` (unchanged). USBE
  retains the "Competency-based USBE-approved LEA Program" pathway
  for each of the five ESL standard areas.
- `credentials.eld.requirements.coursework`: `null` → `true`.
  University Course is the first listed pathway for each of the
  five ESL requirement areas; coursework is an explicit option, not
  an implied one.
- `credentials.eld.requirements.test`: `null` → `true`. Praxis II
  5362 (English to Speakers of Other Languages, passing score 149)
  is an explicit per-area demonstration of competency on the USBE
  application form.
- `credentials.eld.requirements.practicum`: stays `null`. Neither
  the application nor the four competency-demonstration pathways
  for the ESL endorsement reference a practicum/clinical
  requirement. Logged as unknown rather than `false` because the
  application form lists demonstrations of competency, not the
  full underlying USBE rule (R277-503 / R277-520), which we did
  not retrieve in this pass.
- `credentials.eld.notes`: added to summarize the five
  TESOL-aligned standard areas and the four-pathway competency
  model.
- `credentials.sei.mandatedForAllTeachers`: `false` (unchanged).
- `professionalStandardsMentions.diverse`: `true` (unchanged). UETS
  Standard 1 Element 3 explicitly references "learners' diverse
  backgrounds and perspectives as assets to the classroom
  community."
- `professionalStandardsMentions.cultural`: `false` (unchanged).
  UETS uses "classroom culture" but does not reference cultural
  background, cultural responsiveness, or culturally and
  linguistically diverse learners.
- `professionalStandardsMentions.linguistic`: `false` (unchanged).
  UETS does not contain the words "linguistic," "language
  acquisition," "second language," or "multilingual."
- `professionalStandardsMentions.el`: `false` (unchanged). UETS
  contains no reference to English learners, ELLs, ESL, or
  multilingual learners.
- `lastVerified`: `2019-11-15` → `2026-05-08`.
- `verificationStatus`: `baseline-2019` → `verified-2026`.

## Sources appended (not deleted)

- USBE — English as a Second Language Endorsement application
  (ADA-Compliant 7/10/2023).
- USBE — Dual Language Immersion Endorsement application.
- USBE — World Languages Endorsement specifications.
- USBE — Utah Effective Teaching Standards (UETS), August 2023.
- NCES Digest of Education Statistics 2023, Table 204.20 (English
  learners enrolled in public schools, fall 2021).

`leider-2021` baseline entries retained per skill rules.
