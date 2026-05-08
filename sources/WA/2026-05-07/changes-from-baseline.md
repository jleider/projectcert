# WA — changes from baseline-2019

Refresh date: 2026-05-07. This file is an audit-trail reconstruction.
The cherry-pick from the per-state worktree branch landed the JSON
edits but did not carry over the original sources/WA/2026-05-07/ snapshot
directory. Below are the projectcert-2026 sources cited in the
state record at the time of refresh; each was visited and read
during the original verification.

## Sources cited at refresh

- OSPI homepage (current) — https://ospi.k12.wa.us/
- PESB — English Language Learner (ELL) endorsement competencies (2015) — https://www.pesb.wa.gov/preparation-programs/standards/endorsement-competencies/ell/
- PESB — Bilingual Education endorsement competencies (Pre-Fall 2021 + NDLETPS Post-Fall 2021) — https://www.pesb.wa.gov/preparation-programs/standards/endorsement-competencies/bilingual-education/
- PESB — Endorsement competencies index (lists ELL and Bilingual Education among ~40 endorsements) — https://www.pesb.wa.gov/preparation-programs/standards/endorsement-competencies/
- PESB — Adding an endorsement (test-only vs approved-program-plus-test lists; ELL and Bilingual require approved program plus test) — https://www.pesb.wa.gov/current-educators/assignment/endorsements/
- WAC 181-82A-204 — Endorsement requirements (state-approved program route, content-test route, out-of-state route, field-experience at provider discretion) — https://app.leg.wa.gov/WAC/default.aspx?cite=181-82A-204
- OSPI — Migrant and Multilingual Education program landing page — https://ospi.k12.wa.us/student-success/access-opportunity-education/migrant-and-multilingual-education
- OSPI — Transitional Bilingual Instruction Program (TBIP) guidance (RCW 28A.180.020 reporting authority) — https://ospi.k12.wa.us/student-success/access-opportunity-education/migrant-and-multilingual-education/multilingual-education-program/transitional-bilingual-instruction-program-guidance
- PESB — CCDEI (Cultural Competency, Diversity, Equity, Inclusion) standards page (adopted March 2022 per ESSB 5044) — https://www.pesb.wa.gov/innovation-policy/ccdei/
- PESB CCDEI Standards for Educators (PDF, adopted March 2022) — https://drive.google.com/file/d/1_1nf9XWXJKT_a3lOP169VmVc3U0l1ze0/view
- PESB — Role standards (Washington adopts InTASC Model Core Teaching Standards as residency teacher role standards) — https://www.pesb.wa.gov/preparation-programs/standards/role-standards/
- InTASC Model Core Teaching Standards and Learning Progressions for Teachers 1.0 (CCSSO, April 2013) — adopted by PESB — https://learning.ccsso.org/intasc-model-core-teaching-standards-and-learning-progressions-for-teachers
- RCW 28A.300.575 — Washington State Seal of Biliteracy (originally enacted 2014 c 102 s 2; amended 2024 c 202 s 4) — https://app.leg.wa.gov/RCW/default.aspx?cite=28A.300.575
- WIDA Consortium membership roster (Washington listed as current member) — https://wida.wisc.edu/about/consortium
- NCES Digest of Education Statistics 2023, Table 204.20 — English learners enrolled in public schools by state, fall 2021 (WA = 11.4%) — https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp

## Coding decisions

See the corresponding history[] row in src/content/states/wa.json
for an enumerated description of what was re-verified versus
carried forward from the 2019 baseline.

## Note

If a follow-up sweep wants byte-exact provenance for WA, re-fetch
the URLs above and save under sources/WA/<today>/, then update
sources[].retrievedAt accordingly.
