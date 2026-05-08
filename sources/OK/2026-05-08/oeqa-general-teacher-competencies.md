# OEQA — General Teacher Competencies for Licensure (OAC 210:20-9-152)

Source URL: https://oklahoma.gov/oeqa/educator-preparation/accreditation/general-teacher-competencies-for-licensure.html
Retrieved: 2026-05-08

## Bottom line for `professionalStandardsMentions`

Oklahoma's General Teacher Competencies for Licensure are the InTASC
Model Core Teaching Standards (10 standards), codified at OAC
210:20-9-152. Keyword scan:

- **diverse** — "diverse cultures and communities" (Standard 2:
  Learner Differences) → `diverse = true`
- **cultural** — "diverse cultures" (Standard 2) → `cultural = true`
- **linguistic** — "linguistic… areas" (Standard 1: Learner
  Development) → `linguistic = true`
- **English learner / EL / ELL / LEP** — **no mentions** in the
  General Competencies themselves. The EL reference is in OEQA State
  Requirement 1 (separate document, see oeqa-state-requirements.md),
  which explicitly references "Emergent Bilingual (English Learner)
  students." → `el = true` (warranted by the operative state
  requirement that EPPs satisfy via EL knowledge/skills).

## Standards 1 and 2 — verbatim excerpts

Standard 1 (Learner Development): "The teacher understands how
learners grow and develop, recognizing that patterns of learning and
development vary individually within and across the cognitive,
linguistic, social, emotional, and physical areas..."

Standard 2 (Learner Differences): "The teacher uses understanding of
individual differences and diverse cultures and communities to ensure
inclusive learning environments..."

## Note on coding conservatism

`linguistic = true` is supported by Standard 1's literal use of
"linguistic." `el = true` rests on the EL-specific State Requirement 1
rather than the InTASC text itself. Both are part of OEQA's package
of standards governing teacher licensure in Oklahoma, so coding `el`
to `true` is faithful to the regulatory framework even though the
narrow InTASC adoption text doesn't say "English learner."
