# NJ ESL Program Requirements (district-side)

Source: https://www.nj.gov/education/title3/district/program_eslrequirements.shtml
Retrieved: 2026-05-08
Retrieved by: projectcert-2026

## Key facts

- ESL is required in all LEAs serving 10 or more multilingual learners.
- Program must include "one period daily" of instruction by a certified
  teacher with an ESL endorsement.
- Instruction must align to the WIDA ELD Standards.
- Districts may use push-in or pull-out delivery models.

## Schema implications

- Confirms `eld.offered: true`.
- No statewide SEI mandate for *all* teachers; the requirement is that
  the *ESL teacher* hold an ESL endorsement, not that every general
  classroom teacher complete SEI training.
- Confirms `credentials.sei.mandatedForAllTeachers: false`.
- Reinforces that NJ uses the WIDA framework (ELD Standards), consistent
  with `elpAssessment` = ACCESS for ELLs / WIDA.
