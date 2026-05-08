# ARM 10.57.412 — Class 1 and 2 Endorsements

- URL: https://www.law.cornell.edu/regulations/montana/Mont-Admin-r-10.57.412
- Retrieved: 2026-05-08

## What the rule does

Lists the endorsement areas a Class 1 or Class 2 licensee may add
to their teaching license. "English as a second language K-12" is
named as one such endorsement area. The rule does not enumerate
specific coursework hours, practicum hours, or a required test for
each individual endorsement; instead, it requires applicants to
"provide verification of completion of an approved educator
preparation program" with supervised teaching experience (or, for
some pathways, a degree-major / minor / National Board / PRAXIS
substitute under ARM 10.57.301 — but per ARM 10.57.301, English as
a second language K-12 is **excluded** from those alternative
pathways).

## Schema implications for `eld.requirements.*`

- `program: true` — completion of an OPI-approved educator
  preparation program is the operative pathway. ARM 10.57.301
  explicitly excludes ESL from the degree-major / portfolio /
  PRAXIS-only / National Board pathway, so an approved program is
  effectively required.
- `coursework: null` — the rule itself does not specify hours; the
  approved-program requirement subsumes coursework but the rule does
  not state coursework hours as a freestanding requirement at the
  state level.
- `practicum: true` — "supervised teaching experience" is required as
  part of the approved program completion verification.
- `test: null` — Montana does not mandate a state ESL/PRAXIS test for
  the ESL endorsement. The rule is silent on a required exam, and
  no exam is listed in ARM 10.57.412 for ESL specifically. Coded
  null because absence-from-rule is not equivalent to an
  affirmative "no test" statement.
- `languageProficiency: false` — the rule contains no language-
  proficiency exam requirement (ESL endorsees teach English; they
  are not required to demonstrate proficiency in any non-English
  language).

## Cross-reference

ARM 10.57.301 (Endorsement Information) explicitly names "English as
a second language (K-12)" as an endorsement area not available
through the degree-major / portfolio / PRAXIS-only / National Board
substitute pathway, reinforcing that the approved program route is
mandatory.
