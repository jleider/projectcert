# NM — changes from baseline-2019 (refreshed 2026-05-07)

Baseline source: Leider, Colombo & Nerlino (2021), *EPAA* 29(100),
Tables 2–5 + Appendix A. Single citation in baseline `sources[]` was
`https://webnew.ped.state.nm.us` (now redirects/410s — replaced by
`https://web.ped.nm.gov`, the current NMPED domain).

## Domain migration

- NMPED migrated from `webnew.ped.state.nm.us` to `web.ped.nm.gov`
  (sometime 2023–2024). Old URL no longer resolves to a working
  homepage. Replaced with current homepage and several deep links to
  the Educator Licensure Bureau and Language and Culture Division.

## Bilingual endorsement (`credentials.bilingual`)

No structural change vs. baseline:

- Still offered, still both standalone and add-on (initial Level 1
  license adds 24–36 semester hours; existing license holders add
  12 semester hours).
- `requirements.coursework`: true (unchanged) — 6.64.10 NMAC.
- `requirements.test`: true (unchanged) — bilingual education
  licensure exam under 6.60.5 NMAC required for all pathways.
  NMPED-facing language uses "Prueba" (Spanish proficiency exam) for
  the language route; NMAC additionally requires the bilingual
  education licensure exam.
- `requirements.languageProficiency`: true (unchanged) — 6.64.10.9
  NMAC explicitly requires "at least a minimum of an eighth grade
  level of proficiency in oral and written language" in the target
  non-English language.
- `requirements.practicum`: false (unchanged) — no separate practicum
  requirement appears in 6.64.10 NMAC.
- `requirements.program`: null (unchanged) — PED-approved
  endorsement programs exist (24–36 semester hours through IHEs) but
  the add-on pathway permits coursework outside of a single approved
  program; ambiguous.
- Native American / Indigenous language pathway: confirmed via
  6.63.14 NMAC (Native American Language and Culture, Pre K-12
  certificate, "520 NALC"). Tribal verification of competence and
  language proficiency replaces the standard licensure exam for that
  certificate. Note refreshed.

## ELD/TESOL endorsement (`credentials.eld`)

No structural change vs. baseline. Refresh confirms 6.64.11 NMAC:

- Still offered, both standalone (initial Level 1, 24 hrs) and add-on
  (existing license, 12 or 24 hrs).
- `requirements.coursework`: true (unchanged).
- `requirements.test`: true (unchanged) — PRAXIS English to Speakers
  of Other Languages (5362) required.
- `requirements.languageProficiency`: false (unchanged) — only a
  voluntary credit-hour waiver pathway lets candidates document
  non-English language proficiency; an "English language proficiency
  examination" is required only for international reciprocal license
  holders (6.64.11.8.D), not for typical candidates.
- `requirements.practicum`: null (unchanged) — 6.64.11 NMAC does not
  list a separate practicum.
- `requirements.program`: null (unchanged).

## SEI mandate (`credentials.sei`)

`mandatedForAllTeachers`: false (unchanged).

NM has been under intense litigation pressure from the consolidated
*Yazzie/Martinez v. State of New Mexico* case (2014 filing; 2018
ruling; ongoing remediation through 2026). Plaintiffs filed
objections to the State's Comprehensive Remedial Action Plan in
February 2026 and asked the court to order a rewrite, citing in
part the persistent shortage of bilingual-endorsed teachers and the
absence of a universal EL-instruction mandate. As of 2026-05-07,
NMAC Title 6 still does NOT require all teachers to obtain a
bilingual, TESOL, or SEI endorsement. The bilingual and TESOL
endorsements remain voluntary specializations; there is no
analogue to the MA SEI endorsement.

A 2019 bill that would have required new teachers to be certified
in bilingual or TESOL did not become law; it is sometimes
incorrectly summarized in third-party guides as if it had passed.
Notes field updated to flag this and the *Yazzie/Martinez*
remediation context.

## Professional standards mentions (`professionalStandardsMentions`)

**Material change from baseline.** Re-coded against the current
general teacher competencies regulation, 6.69.4 NMAC ("Competencies
for Entry-Level Teachers; Levels 1, 2, and 3-A"):

- `diverse`: true (unchanged) — "diverse learners", "diverse
  learning styles, needs, interests, and levels of readiness".
- `cultural`: true (unchanged) — competency 6.69.4.12.A.3.a:
  "communicating with students in a manner that is appropriate to
  their culture, language, and level of development".
- `linguistic`: false → **true preserved as false-equivalent**.
  The word "linguistic" does not appear anywhere in 6.69.4 NMAC.
  However, "language" appears in the cultural-responsiveness
  competency above. The baseline coded `linguistic: true` likely on
  the strength of "language, and level of development". This is a
  judgment call — for consistency with how "linguistic" is coded in
  other states (which look for the word "linguistic" or
  "linguistically diverse" explicitly), set to **false**.
- `el`: true → **false**. 6.69.4 NMAC contains zero mentions of
  "English learner", "EL", "ELL", "second language", or
  "bilingual" as competency descriptors. The baseline coding of
  `el: true` likely reflected the existence of separate
  TESOL/bilingual endorsement competencies (6.64.10, 6.64.11
  NMAC) rather than the general professional teaching standards.
  Per the project's professionalStandardsMentions definition
  (general teacher standards), set to **false**.

So:

- `professionalStandardsMentions.linguistic`: true → **false**
- `professionalStandardsMentions.el`: true → **false**

## Seal of Bilingualism-Biliteracy (`sealOfBiliteracy`)

No change. NM was a Seal of Biliteracy state from Laws 2014, ch. 46,
§ 1; first awarded class of 2016. `adopted: true`, `year: 2014`
(unchanged).

## WIDA membership (`widaMember`)

No change. NM remains a WIDA Consortium member; ACCESS for ELLs is
the state's annual ELP assessment.

## EL percentage (`elPercent`)

**Material change.** NCES Digest of Education Statistics 2023,
Table 204.20 (English Learners enrolled in public schools, fall
2021): NM = **18.8%**. Baseline value was 16.3% (asOf 2019-10-01).

- `elPercent`: 16.3 → 18.8
- `elPercentAsOf`: 2019-10-01 → 2021-10-01

## Sources refreshed

Twelve new entries appended to `sources[]` (URLs retrieved 2026-05-07,
`retrievedBy: projectcert-2026`). The two `leider-2021` entries are
preserved as the audit trail for the baseline-2019 record. The old
`webnew.ped.state.nm.us` URL is preserved verbatim in the
`leider-2021` entry; it does not resolve today, but the citation
records what Leider et al. consulted in November 2019.
