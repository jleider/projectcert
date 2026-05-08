# NV — changes from baseline-2019

Refresh date: 2026-05-07. This file is an audit-trail reconstruction.
The cherry-pick from the per-state worktree branch landed the JSON
edits but did not carry over the original sources/NV/2026-05-07/ snapshot
directory. Below are the projectcert-2026 sources cited in the
state record at the time of refresh; each was visited and read
during the original verification.

## Sources cited at refresh

- NDE — ELAD (English Language Acquisition and Development) endorsement requirements one-pager — https://webapp-strapi-paas-prod-nde-001.azurewebsites.net/uploads/English_Language_Acquisition_Development_ELAD_22f6394114.pdf
- NDE — Bilingual Education endorsement requirements one-pager — https://webapp-strapi-paas-prod-nde-001.azurewebsites.net/uploads/Bilingual_Education_90148d04bc.pdf
- NAC 391.237 — Endorsements to teach English language acquisition and development; ESL; ELAD specialist — https://www.leg.state.nv.us/nac/nac-391.html
- NAC 391.242 — Endorsements to teach in a program of bilingual education (and NAC 391.059 language-proficiency exam) — https://www.leg.state.nv.us/nac/nac-391.html
- Nevada Educator Performance Framework (NEPF) Evaluation System 2024-25 — School Administrator and Teacher Protocols — https://webapp-strapi-paas-prod-nde-001.azurewebsites.net/uploads/sa_tch_nepf_protocols_2024_25_final_32f2285a6e.pdf
- NCES Digest of Education Statistics 2023, Table 204.20 — English learners enrolled in public schools by state, fall 2021 — https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp

## Coding decisions

See the corresponding history[] row in src/content/states/nv.json
for an enumerated description of what was re-verified versus
carried forward from the 2019 baseline.

## Note

If a follow-up sweep wants byte-exact provenance for NV, re-fetch
the URLs above and save under sources/NV/<today>/, then update
sources[].retrievedAt accordingly.
