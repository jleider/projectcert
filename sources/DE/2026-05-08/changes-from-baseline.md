# DE — changes from baseline-2019

Refreshed 2026-05-08 against current Delaware Department of Education
sources, the Delaware Administrative Code regulations 14 DE Admin
Code 1561 (Bilingual Teacher) and 1562 (Teacher of English Learners),
the Delaware Professional Teaching Standards, the DDOE English
Learner Guidebook (Jan 2024 update), and NCES Digest 2023.

## elPercent

- 9.1 → **11.5** (NCES "English Learners in Public Schools",
  Digest 2023 table 204.20, fall 2021).
- elPercentAsOf: "2019-10-01" → **"2021-10-01"**.

## Bilingual credential (14 DE Admin Code 1561)

- bilingual.requirements.program: null → **true**
  (current 1561-4.1.1 explicitly enumerates approved-program pathways,
  including Department-approved educator preparation programs and
  CAEP-approved bilingual ed programs requiring 30 semester hours.)
- bilingual.requirements.test: null → **true**
  (Praxis Subject Assessment ESOL ETS #5362, passing score 149,
  required for the Bilingual Teacher Standard Certificate per
  1561-4.1.4.)
- All other bilingual fields unchanged.

## ELD credential (14 DE Admin Code 1562 — Teacher of English Learners)

- eld.requirements.program: null → **true**
  (1562-4.1.1 enumerates approved-program pathways including a
  Department-approved educator preparation program and a CAEP-approved
  educator preparation program requiring 30 semester hours of TEL
  coursework.)
- eld.requirements.languageProficiency: false → **true**
  (1562-4.1.2 requires either an English-medium U.S. accredited degree
  or ACTFL OPI/WPT in English at "Advanced Mid"; the existing notes
  field "English proficiency requirement explicit." matches this.
  Boolean updated to match.)
- All other eld fields unchanged. Praxis 5362 test requirement
  re-confirmed (was already coded true).

## SEI mandate

- sei.mandatedForAllTeachers: unchanged (false). Delaware does not
  have a statewide SEI/sheltered-instruction credential mandate
  comparable to AZ, CA, or MA. The 2024 EL Guidebook treats SEI as
  one service model among several; "all teachers" language (the EL
  Plan reference) is operational, not a credentialing rule.

## Professional standards mentions

- linguistic: false → **true**
- el: false → **true**
  Both upgrades are recoding the same 2003 Delaware Professional
  Teaching Standards document the baseline used. Knowledge components
  3.1.5 ("second language acquisition... students whose first
  language is not English") and 3.1.6 ("culturally and/or
  linguistically diverse students") plus the glossary entry for
  "Culturally and/or Linguistically Diverse" satisfy both flags
  unambiguously on re-read. The baseline appears to have required a
  literal "EL" abbreviation, which the standards document doesn't
  use; the operational definition (L2 acquisition / non-English-first-
  language students) is squarely there.
- diverse: unchanged (true). cultural: unchanged (true).

## Seal of Biliteracy

- Unchanged. Adopted 2017 via House Joint Resolution 4 of the 149th
  General Assembly; the official Delaware program name is
  "Certificate of Multi-literacy", first issued in school year
  2017-18.

## ELP Assessment

- Unchanged. Delaware is a WIDA Consortium member; uses ACCESS for
  ELLs 2.0 (and Alternate ACCESS) annually.

## Source URL changes / 404s

- Baseline source `https://www.doe.k12.de.us` is now a 307 redirect
  to `https://education.delaware.gov/` (the DDOE rebranded its
  primary domain). Old URL retained in `sources[]` for audit;
  current URL added as a new source.
- No required source returned a hard 404 with no equivalent. Promotion
  to verified-2026 is appropriate.
