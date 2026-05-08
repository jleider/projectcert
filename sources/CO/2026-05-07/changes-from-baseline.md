# CO — changes from baseline-2019

Refresh date: 2026-05-07. This file is an audit-trail reconstruction.
The cherry-pick from the per-state worktree branch landed the JSON
edits but did not carry over the original sources/CO/2026-05-07/ snapshot
directory. Below are the projectcert-2026 sources cited in the
state record at the time of refresh; each was visited and read
during the original verification.

## Sources cited at refresh

- CDE — Teacher Endorsement Requirements (CLDE and CLD Bilingual classified as 'added endorsements only') — https://ed.cde.state.co.us/cdeprof/endorsementrequirements
- CDE — Culturally and Linguistically Diverse (CLD) Education added endorsement worksheet (rev. 2023-08-01) — https://www.cde.state.co.us/cdeprof/cldaeworksheet
- CDE — Culturally and Linguistically Diverse (CLD) Bilingual Education added endorsement worksheet (rev. 2021-12-17) — https://www.cde.state.co.us/cdeprof/cldb_added-endorsement_worksheet
- CDE — English Learner PD Requirements: Information for Educators (45-hour rule effective 2025-09-01) — https://ed.cde.state.co.us/educatortalent/elpdeducators
- CDE — English Learner Educator Professional Development Requirements (pathways) — https://ed.cde.state.co.us/educatortalent/elpdpathways
- Colorado Teacher Quality Standards (State Council for Educator Effectiveness, 2011, current governing standards) — https://www.cde.state.co.us/sites/default/files/documents/educatoreffectiveness/downloads/colorado_quality_standards_for_teachers.pdf
- CDE — Office of Culturally and Linguistically Diverse Education (CLDE) landing page — https://ed.cde.state.co.us/clde
- CDE — Seal of Biliteracy / Diploma Endorsement for Biliteracy (SB17-123) — https://www.cde.state.co.us/cde_english/high-school-diploma-endorsement-for-biliteracy
- WIDA Consortium — Colorado member page (joined 2012; uses WIDA ACCESS for ELLs) — https://wida.wisc.edu/about/consortium/co
- NCES Digest of Education Statistics 2023, Table 204.20 — English learners enrolled in public schools by state, fall 2021 (Colorado: 91,907 / 10.4%) — https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp

## Coding decisions

See the corresponding history[] row in src/content/states/co.json
for an enumerated description of what was re-verified versus
carried forward from the 2019 baseline.

## Note

If a follow-up sweep wants byte-exact provenance for CO, re-fetch
the URLs above and save under sources/CO/<today>/, then update
sources[].retrievedAt accordingly.
