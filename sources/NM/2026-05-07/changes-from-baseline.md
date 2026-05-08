# NM — changes from baseline-2019

Refresh date: 2026-05-07. This file is an audit-trail reconstruction.
The cherry-pick from the per-state worktree branch landed the JSON
edits but did not carry over the original sources/NM/2026-05-07/ snapshot
directory. Below are the projectcert-2026 sources cited in the
state record at the time of refresh; each was visited and read
during the original verification.

## Sources cited at refresh

- NMPED Educator Licensure Bureau (current homepage; supersedes webnew.ped.state.nm.us) — https://web.ped.nm.gov/bureaus/licensure/
- NMPED — Bilingual Education endorsement (how to add to a license) — https://web.ped.nm.gov/bureaus/licensure/endorsements-how-to-add-a-license/bilingual-education/
- NMPED — TESOL endorsement (how to add to a license) — https://web.ped.nm.gov/bureaus/licensure/endorsements-how-to-add-a-license/tesol/
- NMPED — Endorsements (full index of 21 endorsement areas) — https://web.ped.nm.gov/bureaus/licensure/endorsements-how-to-add-a-license/
- 6.64.10 NMAC — Bilingual Education endorsement (coursework, licensure exam, native-language proficiency) — https://www.srca.nm.gov/parts/title06/06.064.0010.html
- 6.64.11 NMAC — TESOL endorsement (coursework, PRAXIS 5362, ELP exam for international applicants) — https://www.srca.nm.gov/parts/title06/06.064.0011.html
- 6.69.4 NMAC — Competencies for Entry-Level Teachers (Levels 1, 2, 3-A); the general professional teaching standards — https://www.srca.nm.gov/parts/title06/06.069.0004.html
- 6.63.14 NMAC — Certification in Native American Language and Culture, Pre K-12 (NALC certificate; tribal verification) — https://www.srca.nm.gov/parts/title06/06.063.0014.html
- NMPED — Native American Language and Culture certification page (520 NALC) — https://web.ped.nm.gov/bureaus/indian-education/nm-native-american-language-and-culture/
- NMPED — Bilingual Multicultural Education Programs (BMEPs) FAQs — https://web.ped.nm.gov/bureaus/languageandculture/bilingual-multicultural-education-programs-bmeps/bilingual-multicultural-education-programs-bmeps-frequently-asked-questions-faqs/
- NMPED — Seal of Bilingualism-Biliteracy (NM Laws 2014, ch. 46; first awarded class of 2016) — https://web.ped.nm.gov/bureaus/languageandculture/state-seal-of-bilingualism-biliteracy/
- NCES Digest of Education Statistics 2023, Table 204.20 — English Learners enrolled in public schools by state, fall 2021 — https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp

## Coding decisions

See the corresponding history[] row in src/content/states/nm.json
for an enumerated description of what was re-verified versus
carried forward from the 2019 baseline.

## Note

If a follow-up sweep wants byte-exact provenance for NM, re-fetch
the URLs above and save under sources/NM/<today>/, then update
sources[].retrievedAt accordingly.
