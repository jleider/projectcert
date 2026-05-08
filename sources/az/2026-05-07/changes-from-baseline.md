# AZ — changes from baseline-2019

Refreshed 2026-05-07 against current ADE pages, R7-2-615 / R7-2-602
(via Cornell LII mirror; ADE pages via Wayback raw because
`www.azed.gov` returns Cloudflare bot challenges to non-browser
clients), NCES Table 204.20, WIDA Consortium roster, and
sealofbiliteracy.org.

## elPercent

- 8.1 → 8.2 (NCES Table 204.20, fall 2021, AZ row).
- elPercentAsOf: "2019-10-01" → "2021-10-01".
- Baseline 8.1 appears to have come from an ADE internal source;
  switching to NCES per project policy. Net change essentially
  noise (+0.1).

## Bilingual credential

- bilingual.requirements.program: null → true.
  Reason: R7-2-615(J)(4)(b) and the ADE page both list "Completion of
  a bilingual education program from an accredited institution" as
  Option A, alongside the 21-semester-hour coursework Option B. The
  baseline's null appears to reflect uncertainty; the regulation is
  unambiguous.
- bilingual.requirements.coursework: true → true. Unchanged.
- bilingual.requirements.practicum: true → true. Unchanged.
- bilingual.requirements.test: false → false. Unchanged.
  (Foreign-language exam options are *language-proficiency*
  verifications, not subject-knowledge exams.)
- bilingual.requirements.languageProficiency: true → true. Unchanged.
- bilingual.standalone: false. Unchanged. AZ has no standalone
  bilingual teacher license; it remains an endorsement.
- bilingual.addOn: true. Unchanged.

## ELD (ESL) credential

- eld.requirements.program: null → true.
  Reason: R7-2-615(K)(3)(b) lists "Completion of an ESL education
  program from an accredited institution" as Option A. The baseline
  null appears to reflect uncertainty; the regulation is explicit.
- eld.requirements.coursework: true → true. Unchanged.
- eld.requirements.practicum: true → true. Unchanged.
- eld.requirements.test: false → false. Unchanged.
- eld.requirements.languageProficiency: false → false. Unchanged.
  The ESL endorsement requires a "second language learning
  experience" (multiple non-proficiency-based options), distinct
  from a verified-proficiency mandate.
- eld.standalone: false. Unchanged.
- eld.addOn: true. Unchanged.

## SEI mandate

- mandatedForAllTeachers: true → true. Unchanged.
  Verified verbatim against (1) ADE OELAS page: "All Public School
  teachers working with English learners delivering required minutes
  of the SEI models are required to have an ESL, BLE, or SEI
  Endorsement (AZ Board Rule, 7 A.A.C. 2.L)"; and (2) R7-2-615(L):
  "A Provisional or full Structured English Immersion (SEI)
  endorsement, or an English as a Second Language or Bilingual
  endorsement, shall be required of a teacher who is instructing
  students in a sheltered English immersion or structured English
  immersion model."
- 2019 policy churn confirmed but does **not** change the schema flag:
  the 2019 legislation (analyzed by Lillie/UCLA Civil Rights Project)
  reduced the daily ELD instructional block from 4 hours to 2 hours
  and re-opened broader access to dual-language and bilingual
  programming. The teacher-credential mandate itself was not repealed.
  Notes field updated to record this nuance.

## Bilingual education access (historical concern, no schema change)

The Leider 2021 baseline correctly observed that AZ was the
post-Prop-203 paradigm of "bilingual eliminated." That eliminated-by-
default posture has substantially loosened since 2019: the
legislature reduced the SEI block, and ADE now actively maintains and
issues the Bilingual, PreK-12 endorsement (with seven language-
proficiency pathways including the ASU/UA Spanish Proficiency Exam,
American Indian language tribal verification, and ACTFL OPI). No
statutory rollback of Prop 203 itself, but the practical pathway to
bilingual instruction is operative again.

## Professional standards mentions

- professionalStandardsMentions.diverse: true. Unchanged.
- professionalStandardsMentions.cultural: true. Unchanged.
- professionalStandardsMentions.linguistic: true. Unchanged.
- professionalStandardsMentions.el: false → **true**.
  Reason: R7-2-602 explicitly references "English language learners"
  in Standard 2 ("strategies for making content accessible to English
  language learners"), plus references second-language acquisition
  processes and diverse languages/dialects. The baseline appears to
  have coded this as false against an earlier draft of the rule;
  the current text is unambiguous.

## Seal of Biliteracy

- adopted: true. Unchanged.
- year: 2016. Unchanged. (SB 1239, signed 2016-05-12, codified at
  A.R.S. § 15-258. Note: program sunsets July 1, 2026 per § 41-3102
  unless reauthorized — flag for mid-2026 review.)

## WIDA membership

- widaMember: false. Unchanged. AZ uses AZELLA, not WIDA ACCESS.

## Source URL hygiene

The baseline-2019 source list pointed to the bare ADE root
(`www.azed.gov`). That URL still resolves but is behind a
Cloudflare bot challenge that blocks scripted access; it is retained
in `sources[]` as audit trail per the skill rules. New entries point
to specific Educator Certification subpages (snapshots taken via
Wayback Machine raw, content verified by hand).
