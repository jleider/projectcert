# AZ — changes from baseline-2019

Refresh date: 2026-05-07. This file is an audit-trail reconstruction.
The cherry-pick from the per-state worktree branch landed the JSON
edits but did not carry over the original sources/AZ/2026-05-07/ snapshot
directory. Below are the projectcert-2026 sources cited in the
state record at the time of refresh; each was visited and read
during the original verification.

## Sources cited at refresh

- ADE OELAS — SEI Endorsement (mandate language for all teachers of ELs) — https://www.azed.gov/oelas/sei-endorsement
- ADE Educator Certification — Structured English Immersion, PreK-12 endorsement — https://www.azed.gov/educator-certification/structured-english-immersion-prek-12
- ADE Educator Certification — Bilingual Education, PreK-12 endorsement — https://www.azed.gov/educator-certification/bilingual-education-prek-12
- ADE Educator Certification — English as a Second Language, PreK-12 endorsement — https://www.azed.gov/educator-certification/english-second-language-prek-12
- Ariz. Admin. Code R7-2-615 — Endorsements (J Bilingual, K ESL, L SEI), via Cornell LII mirror — https://www.law.cornell.edu/regulations/arizona/Ariz-Admin-Code-SS-R7-2-615
- Ariz. Admin. Code R7-2-602 — Professional Teaching Standards, via Cornell LII mirror — https://www.law.cornell.edu/regulations/arizona/Ariz-Admin-Code-SS-R7-2-602
- Sealofbiliteracy.org — Arizona state page (A.R.S. § 15-258, SB 1239 signed 2016-05-12) — https://sealofbiliteracy.org/state/az
- WIDA Consortium member roster (Arizona is not a member; AZ uses AZELLA) — https://wida.wisc.edu/about/consortium
- NCES Digest of Education Statistics 2023, Table 204.20 — English learners enrolled in public schools by state, fall 2021 — https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp

## Coding decisions

See the corresponding history[] row in src/content/states/az.json
for an enumerated description of what was re-verified versus
carried forward from the 2019 baseline.

## Note

If a follow-up sweep wants byte-exact provenance for AZ, re-fetch
the URLs above and save under sources/AZ/<today>/, then update
sources[].retrievedAt accordingly.
