# AR — Arkansas Teaching Standards (Updated 2024)

**URL:** https://dese-admin.ade.arkansas.gov/Files/62._Arkansas_Teaching_Standards_Updated_2024_EEF_EEF.pdf
**Snapshot:** `arkansas-teaching-standards-2024.pdf` (+ `.txt`)
**Companion (2023 prior version):** `arkansas-teaching-standards-2023.pdf` (+ `.txt`),
https://dese.ade.arkansas.gov/Files/63._Arkansas_Teaching_Standards_2023_EEF.pdf
**Retrieved:** 2026-05-08 by projectcert-2026

## Why this source

This is the document used to populate the four
`professionalStandardsMentions` booleans (diverse, cultural,
linguistic, el) — the AR-published all-teacher standards.

## Adoption

Per the document: "The Arkansas Department of Education has adopted
the 2011 Model Core Teaching Standards developed by Interstate Teacher
Assessment and Support Consortium (InTASC) to replace the Arkansas
Standards for Beginning Teachers (1995)."

Ten standards across four categories (Learner & Learning, Content,
Instructional Practice, Professional Responsibility). The published
document contains only the standard headers and short descriptions —
not the InTASC expanded performance-criteria language.

## Keyword scan (current 2024 doc)

| Flag | Present? | Evidence |
|---|---|---|
| `diverse` | yes | Standard 2: "uses understanding of individual differences and **diverse** cultures and communities to ensure inclusive learning environments" |
| `cultural` | yes | Standard 2: "diverse **cultures** and communities" |
| `linguistic` | yes | Intro + Standard 1: "cognitive, **linguistic**, social, emotional, and physical" development |
| `el` / "English Learner" / "English language learner" / "ELL" | **no** | Term does not appear anywhere in the document |

## Implication

- `professionalStandardsMentions.el` should be coded **false** based
  on a strict reading of the AR-published standards. EL-specific
  language is present in the *separate* ESL endorsement competencies,
  but not in the all-teacher Arkansas Teaching Standards.
- This is a change from the baseline-2019 record, which had `el: true`.
  The baseline likely credited the underlying InTASC source (where EL
  is mentioned in the expanded performance criteria), but Arkansas's
  own published document does not include those expansions.

The 2023 version is included for diff context. The ten-standard text
is identical between the 2023 and 2024 versions; the 2024 update is
formatting/branding.
