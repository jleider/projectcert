# Iowa — changes from baseline-2019

Refreshed 2026-05-08 against current Iowa DOE, BoEE-via-DOE, IAC, NCES,
and ELPA21 sources. The 2019 baseline pointed at the bare
`educateiowa.gov` homepage (now redirected to `educate.iowa.gov`) plus
the seed paper, so most field-level claims are re-grounded here against
primary documents for the first time.

## elPercent

- `elPercent`: `6.1` → `6.2`
- `elPercentAsOf`: `2019-10-01` → `2021-10-01`

NCES Digest Table 204.20 (2023 edition) reports Iowa's fall-2021 EL
share at 6.2%. Switching to NCES for cross-state comparability per the
skill's elPercent guidance.

## credentials.bilingual

No category change; provenance now grounded in the Iowa DOE
endorsements list and the licenses-authorizations page rather than the
bare DOE homepage.

- `offered: false`, `standalone: false`, `addOn: false` — preserved.
  Iowa offers no Bilingual or Bicultural endorsement. The K-8 and 5-12
  world-language endorsements (Spanish, French, etc.) are
  language-content credentials, not bilingual-instruction credentials
  in our schema's sense (DBE/DLBE/TBE/heritage roll-up).
- The path Iowa offers for instruction in a non-English language is
  the **Native Language Teaching Authorization** (Limited Teaching
  category), which is not a bilingual-program credential. The existing
  baseline `notes` field captures this; preserved as-is.

## credentials.eld

- `offered: true`, `standalone: true`, `addOn: true` — preserved.
  Endorsement 104 (K-12 English Language Learners) is added to a
  primary teaching license, and educator-prep programs may build it
  into their initial-licensure pathway (so it can also be earned
  alongside an initial license — preserving the `standalone: true`
  framing the baseline used). It is fundamentally an endorsement, not
  a separate teaching license.
- `requirements.program: null → true` — **substantive correction.**
  IAC 282-13.26 expressly authorizes the recommendation/approved-
  program path; Endorsement 104 is offered by 18 Iowa
  teacher-preparation institutions.
- `requirements.coursework: true` — preserved. IAC 282-13.28(20)
  prescribes 18 semester hours across pedagogy, linguistics, cultural
  and linguistic diversity, and current issues.
- `requirements.practicum: null` — preserved. The rule does not
  prescribe a separate practicum at the state-minimums level; provider
  programs may include one at their discretion. Ambiguous → null.
- `requirements.test: null` — preserved. No content/Praxis test gates
  the ESL endorsement at the rule level. Ambiguous → null.
- `requirements.languageProficiency: false` — preserved. No
  demonstrated second-language proficiency is required.

## credentials.sei

- `mandatedForAllTeachers: false` — preserved. Iowa has no universal
  SEI / sheltered-instruction endorsement mandate. (Schema-permitted;
  Iowa is not in the AZ/CA/MA/NV cohort.)

## professionalStandardsMentions

- `diverse: true` — preserved. Iowa Teaching Standards (Iowa Code
  § 284.3) Standard 4 references "diverse needs."
- `cultural: false` — preserved. The eight-standard document does
  not use "cultural" in the cultural-competence sense (Standard 1's
  "classroom culture" and "school culture" are organizational-culture
  uses).
- `linguistic: false` — preserved. No occurrences of "linguistic" or
  "language" in the standards document.
- `el: false` — preserved. No mention of English Learners, ELs, ELL,
  or ESL in the standards.

The Iowa Teaching Standards document has not been amended since 2010.
No substantive change from baseline.

## sealOfBiliteracy

- `adopted: true`, `year: 2018` — preserved.
- `sourceUrl`: `https://sealofbiliteracy.org/` →
  `https://educate.iowa.gov/pk-12/standards/instruction/biliteracy-seal`
  (authoritative primary source).

Iowa Senate File 475 (2018), signed by Governor Reynolds, established
the Iowa Seal of Biliteracy. The Iowa DOE biliteracy-seal page
confirms.

## elpAssessment

- `name: "ELPA21"` — preserved.
- `consortium: "ELPA21"` — preserved.
- `sourceUrl`: `https://en.wikipedia.org/wiki/ELPA21` →
  `https://educate.iowa.gov/pk-12/standards/specialized-instruction/english-learners/elpa21`
  (authoritative primary source replaces the Wikipedia placeholder).

## URL changes

- `educateiowa.gov` → `educate.iowa.gov` (301 redirect; the DOE
  rebranded its public domain).
- `boee.iowa.gov` → `educate.iowa.gov/educator-licensure` (301
  redirect; BoEE web presence consolidated into the DOE as part of
  state government reorganization). The Board itself still exists
  under Iowa Code chapter 272.

## notes

The baseline-2019 `notes` field on `credentials.bilingual` is preserved
("Iowa requires an 'Authorization' to teach in a non-English
language."). No new top-level notes added — the BoEE-domain
consolidation is documented in this file but isn't load-bearing for any
schema field.

## Verification status

Promoting `baseline-2019` → `verified-2026`. All sources resolved (no
unrecovered 404s — the two domain changes were 301 redirects to
current canonical URLs). Every snapshot under
`sources/IA/2026-05-08/` was retrieved, saved, and read.
