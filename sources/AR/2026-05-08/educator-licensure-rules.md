# AR — Rules Governing Educator Licensure

**URL:** https://dese.ade.arkansas.gov/Files/Educator_Licensure_(Effective_6-2-22)_Legal.pdf
**Snapshot:** `educator-licensure-rules.pdf` (+ `.txt`)
**Effective date in document:** June 2, 2022 (ADE 317-1, Agency #005.16)
**Retrieved:** 2026-05-08 by projectcert-2026

## Why this source

Defines all Arkansas educator licensure areas/levels and the pathways
(approved program of study vs. testing out) for each. Appendix A is the
canonical source for whether ESOL is offered, as a standalone vs.
add-on, and which pathways are permitted.

## Key findings

### ESOL endorsement is K-12, add-on only, both program-of-study and test-out paths

- §4-10.03.3: ESOL is one of five endorsements that may be added to an
  Ancillary License (along with Dyslexia, Library Media, etc.). For
  Standard License holders, it is added like any other endorsement.
- Appendix A, Chart 1 lists "ENGLISH FOR SPEAKERS OF OTHER LANGUAGES
  (ESOL) (K-12)" with X marks in both the "Available By Program of
  Study" and "Available By Testing Out (See Chart 2)" columns.
- Appendix A, Chart 2 shows ESOL (K-12) is reachable by testing out
  from any first-time license level (B-K, K-6, 4-8, 4-12, 7-12, K-12,
  K-12 SpEd).
- §4-11.01: "Endorsements may be added to a license through a program
  of study or by testing out, as provided in these rules."
- §4-11.02 + §4-11.02.3: For program-of-study path, applicants submit
  an official transcript "documenting successful completion of a
  program of study at an accredited approved educator preparation
  program, to include an internship if applicable." Internship is
  thus conditional on the program — not a state-stipulated practicum
  requirement of the ESOL endorsement itself.

### No bilingual endorsement

There is no bilingual-education endorsement in Appendix A's licensure
charts. World-language endorsements (Spanish, French, etc.) exist, but
those are foreign-language teaching credentials, not bilingual-program
credentials. → `bilingual.offered = false`.

### No standalone ESOL credential

Arkansas issues ESOL only as an endorsement on top of a Standard or
Ancillary License — never as a first-time/standalone license. →
`eld.standalone = false; eld.addOn = true`.

### No SEI / all-teacher EL mandate

Search of the rules text for "sheltered", "SEI", "all teachers",
"every teacher", and "professional development" tied to English
returns no all-teacher EL training mandate. The single phrase
referencing "ESL or Special Education teachers" appears in §3 as an
example of partner-district educational needs, not a teacher mandate.
→ `sei.mandatedForAllTeachers = false`.

### No language-proficiency exam for ESOL endorsement

The rules document does not require a non-English language proficiency
exam to add the ESOL endorsement (which is sensible — ESOL is
*teaching* English to non-English speakers; it is not bilingual). →
`eld.requirements.languageProficiency = false`.

### Practicum coding (null, not false)

The rules require an "internship if applicable" tied to the approved
program. The endorsement competencies document does not list a state
practicum-hour requirement. The test-out path requires no practicum.
Coding `practicum = null` (ambiguous: required only when going through
an approved program of study, not at the state level for the
endorsement itself).

### Coursework coding (null, not false)

The state does not list specific coursework hours for the ESOL
endorsement at the rules level — programs design coursework to cover
the ESL competencies, and the test-out path bypasses coursework
entirely. Coding `coursework = null`.

### Program coding (true)

A Division-approved program of study remains an available path, even
though test-out is also available. `program = true` (consistent with
the 2019 baseline).

### Test coding (true) — change from baseline

The 2019 baseline coded `test = null` for ESL. The current rules and
the licensure-assessments page show that Praxis 5362 (passing score
155) is the licensure assessment for ESOL, and that test-out is an
explicit Appendix A pathway. → `test = true`.

## Quotes

> 4-10.03 A licensure content area, endorsement, or level of licensure
> shall not be added to an existing Ancillary License, and the
> applicant must first obtain a Standard License, except upon meeting
> the requirements for the following endorsements: … 4-10.03.3 English
> for Speakers of Other Languages (ESOL) endorsement;

> 4-11.01 Endorsements may be added to a license through a program of
> study or by testing out, as provided in these rules. Endorsements
> that are not available by testing out are known as exception area
> endorsements.

> ENGLISH FOR SPEAKERS OF OTHER LANGUAGES (ESOL) (K-12) — X [Available
> By Program of Study] — X [Available By Testing Out (See Chart 2 For
> Eligibility)]
