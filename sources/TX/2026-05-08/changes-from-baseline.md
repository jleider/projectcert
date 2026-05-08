# Texas (TX) — changes from baseline-2019

Verification date: 2026-05-08. Verified by: projectcert-2026.
SEAs: Texas Education Agency (TEA) for program rules; State Board for
Educator Certification (SBEC), administered by TEA, for educator
credentials.

## Sources retrieved 2026-05-08

Saved under `sources/TX/2026-05-08/`:

1. `txrules-89-1201.html` — 19 TAC §89.1201 (Policy: identifies emergent
   bilingual students, requires bilingual education or ESL programs).
   <https://txrules.elaws.us/rule/title19_chapter89_sec.89.1201>
2. `txrules-89-1205.html` — 19 TAC §89.1205 (Required Bilingual Education
   and ESL Programs: bilingual program required when 20+ EBs same
   language same grade level district-wide; ESL otherwise).
   <https://txrules.elaws.us/rule/title19_chapter89_sec.89.1205>
3. `txrules-89-1210.html` — 19 TAC §89.1210 (Program Content and Design:
   four bilingual program models and two ESL models, each requiring
   appropriately certified teachers under TEC §29.061).
   <https://txrules.elaws.us/rule/title19_chapter89_sec.89.1210>
4. `ch089bb.pdf` — TEA-curated PDF compilation of 19 TAC Chapter 89,
   Subchapter BB (Commissioner's Rules Concerning State Plan for
   Educating Emergent Bilingual Students).
   <https://tea.texas.gov> (PDF version of the rules above).
5. `ch233.pdf` — TEA-curated PDF of 19 TAC Chapter 233, Categories of
   Classroom Teaching Certificates (May 2024 update). Confirms
   §233.6 Bilingual Education Supplemental and §233.7 English as a
   Second Language Supplemental cert categories; §233.2(f)–(g) add
   Core/Bilingual-Spanish-with-STR EC-6 and Core/ESL-Supplemental-
   with-STR EC-6 categories effective Sept 1, 2028; §233.8(a) adds a
   Bilingual Special Education Supplemental EC-12 category effective
   Sept 1, 2027.
6. `eb-certification-pathways.pdf` — TEA flier "Bilingual/ESL
   Certification Pathways" listing the three pathways (emergency
   permit, intern, probationary/standard), and the exams required for
   intern certification: Bilingual Target Language Proficiency
   (BTLPT), Bilingual Supplemental, Core Subjects EC–6, plus PPR or
   edTPA for probationary/standard.
7. `required-test-chart.pdf` — TEA "Texas Examinations of Educator
   Standards (TExES) Educator Certification Examinations" chart
   showing the required exams per certificate category (BTLPT 190,
   Bilingual Supplemental 164, ESL Supplemental 154, etc.). Read for
   confirmation that test pathway is required for both Bilingual
   Education Supplemental and ESL Supplemental certificates.
8. `lii-89-1205.html` — Cornell LII landing for the Texas
   Administrative Code (cross-reference / fallback URL; substantive
   content is in #1–#3).
9. `sos-tac-19-2-89-BB.html` — Texas Secretary of State / Appian portal
   shell for 19 TAC Part 2 Chapter 89 Subchapter BB. Page is a SPA
   shell; substantive content in this domain is dynamically rendered,
   so we relied on the txrules.elaws.us mirror (#1–#3) and the
   TEA-curated PDFs (#4–#7) as the primary sources of record.

All snapshots were read; substantive coding is grounded in #1–#7. Files
#8 and #9 are landing/shell pages saved for chain-of-custody only.

## Re-coding decisions

### `bilingual` (Bilingual Education Supplemental + Core/Bilingual EC-6)

| field | baseline-2019 | verified-2026 | rationale |
| --- | --- | --- | --- |
| offered | true | true | Unchanged. §233.6 still authorizes a Bilingual Education Supplemental; §233.2(f) adds an integrated Core/Bilingual-Spanish-with-STR EC-6 base certificate effective Sept 1, 2028. |
| standalone | true | true | The Core/Bilingual-Spanish-with-STR EC-6 (§233.2(f)) functions as a standalone base certificate path; the Supplemental (§233.6(a)) still attaches to a base classroom cert. |
| addOn | true | true | Bilingual Education Supplemental (§233.6) is the primary and most common pathway and is explicitly a supplemental (add-on) cert. |
| requirements.program | null → true | Set to true. EB Certification Pathways flier and §233.6 require completion of an approved educator preparation program (EPP) for probationary/standard certification (Pathway #3). Emergency permit (#1) is a temporary fallback, not the standard route. |
| requirements.coursework | null → true | Set to true. Emergency-permit minimum requires "six semester hours in bilingual education for targeted language" or a passed language-proficiency test; standard pathway requires EPP completion which incorporates required bilingual coursework. |
| requirements.practicum | null → null | Unable to confirm a stand-alone practicum requirement separate from the EPP clinical experience from these sources alone. Left null with explanation here. |
| requirements.test | true | true | Unchanged. Bilingual Target Language Proficiency (BTLPT, exam 190), Bilingual Supplemental (exam 164), Core Subjects EC-6, and PPR/edTPA all required (per EB Certification Pathways flier and required-test-chart). |
| requirements.languageProficiency | null → true | Set to true. BTLPT is an explicit target-language proficiency exam required for all bilingual education certification pathways (intern, probationary, standard). Emergency-permit route also requires a language proficiency test (BTLPT or ACTFL) when six bilingual semester hours not held. |

### `eld` (ESL Supplemental + Core/ESL EC-6)

| field | baseline-2019 | verified-2026 | rationale |
| --- | --- | --- | --- |
| offered | true | true | §233.7 still authorizes ESL Supplemental; §233.2(g) adds Core/ESL-Supplemental-with-STR EC-6 effective Sept 1, 2028. |
| standalone | false | false | The §233.7 ESL Supplemental remains supplemental-only. The 2028 Core/ESL-Supplemental-with-STR EC-6 is technically a "supplemental … combined with" base certificate, not a standalone ESL license, so we keep this false. Re-evaluate when the 2028 cert begins issuance. |
| addOn | true | true | ESL Supplemental is by definition an add-on cert. |
| requirements.program | null → true | Set to true. Standard ESL Supplemental requires completion of an approved EPP (same Pathway #3 framework as bilingual). |
| requirements.coursework | null → true | Set to true. Approved EPPs include required ESL coursework as part of program approval; emergency-permit minimums imply coursework or test-out. |
| requirements.practicum | null → null | Same reasoning as bilingual — cannot independently confirm stand-alone practicum requirement separate from EPP clinical experience. |
| requirements.test | true | true | Unchanged. ESL Supplemental exam (154) plus PPR/edTPA. |
| requirements.languageProficiency | false → false | Unchanged. Texas does not require a non-English target-language proficiency exam for the ESL Supplemental (BTLPT is bilingual-only). |

### `sei`

| field | baseline-2019 | verified-2026 | rationale |
| --- | --- | --- | --- |
| mandatedForAllTeachers | false | false | Unchanged. Texas does not require all classroom teachers to complete SEI training. Bilingual / ESL programs are mandated for emergent bilingual students (TEC Chapter 29 Subchapter B; 19 TAC §89.1205), but those services are delivered through the supplemental-certified bilingual or ESL teacher, not through a universal SEI requirement on all teachers. |

### `professionalStandardsMentions`

| field | baseline-2019 | verified-2026 | rationale |
| --- | --- | --- | --- |
| diverse | true | true | Unchanged. Texas Educator Standards and Chapter 89 Subchapter BB explicitly reference student diversity. |
| cultural | true | true | Unchanged. §89.1210(b)(1)(A)–(B) requires programs to "incorporate the cultural aspects of the students' backgrounds." |
| linguistic | true | true | Unchanged. ELPS (English Language Proficiency Standards) and §89.1210 are framed around linguistic accommodation. |
| el | true | true | Unchanged — and reinforced. Texas now uses "emergent bilingual" (EB) as the canonical student term per 2023 amendments to Chapter 89; references to ELs/EBs are pervasive. |

### `elPercent`

Left at the baseline (`18` as of 2019-10-01) for now. NCES "English
Learners in Public Schools" indicators have been published more
recently, but a current NCES snapshot was not retrieved in this
session. Not a verification blocker — flag for the next NCES sweep.

## Net effect

- bilingual.requirements.program: null → true
- bilingual.requirements.coursework: null → true
- bilingual.requirements.languageProficiency: null → true
- eld.requirements.program: null → true
- eld.requirements.coursework: null → true
- All other fields unchanged from baseline-2019.

## Schema note

The instructions for this refresh anticipated that the active content
schema (`src/content/config.ts`) had been extended with
`elpAssessment.{name,consortium,sourceUrl}` and
`sealOfBiliteracy.{adopted,year,sourceUrl}` blocks. On this branch the
schema does NOT yet include those fields — the only state schema
shipping today is the original `usps / name / elPercent / elPercentAsOf
/ credentials / professionalStandardsMentions / sources / lastVerified
/ verificationStatus` shape. Adding `elpAssessment` / `sealOfBiliteracy`
to `tx.json` without first adding them to the Zod schema would fail
`npm run validate`. So:

- Texas does use TELPAS (Texas English Language Proficiency Assessment
  System) — state-specific, not consortium-based — and Texas does
  award a Performance Acknowledgment for bilingualism/biliteracy on
  the high school transcript (19 TAC §74.14). When the schema gains
  those fields, populate as: `elpAssessment.name = "TELPAS"`,
  `elpAssessment.consortium = null`; `sealOfBiliteracy.adopted = true`,
  with appropriate sourceUrls.
- For now, those facts are recorded here in the changes file (and in
  the JSON `notes`) so they're retrievable when the schema lands.
