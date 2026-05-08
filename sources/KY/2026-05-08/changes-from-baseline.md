# Kentucky — Changes from baseline-2019

Refresh date: 2026-05-08
Retrieved by: projectcert-2026
SEA: Kentucky Department of Education (KDE), with educator licensure
administered by the Education Professional Standards Board (EPSB)
through the goteachky.com portal.

## Sources verified live (200 OK or content read via WebFetch)

1. NCES Digest 2023, Table 204.20 — English learners by state.
2. WIDA Consortium membership page (wida.wisc.edu/about/consortium).
3. KDE Assessments index (education.ky.gov/AA/Assessments/Pages/default.aspx).
4. 16 KAR 2:200 — Probationary endorsement for teachers for English as
   a second language (apps.legislature.ky.gov).
5. Go Teach KY — Endorsements (goteachky.com/resources/certification/endorsements/).
6. Go Teach KY — Kentucky Teacher Performance Standards
   (goteachky.com/about/kentucky-teacher-performance-standards/).
7. Seal of Biliteracy — Kentucky state page (sealofbiliteracy.org/state/ky/).
8. KDE Seal of Biliteracy guidance
   (education.ky.gov/curriculum/hsgradreq/Pages/Seal-of-Biliteracy.aspx).

## Sources that 404'd or moved

- **www.epsb.ky.gov/** — the EPSB has consolidated its educator-facing
  content under https://goteachky.com/. The legacy moodle URL
  (`/mod/page/view.php?id=137`) 301-redirects to goteachky. The
  baseline `https://education.ky.gov` root URL still resolves but is
  not source-of-record for licensure; we keep the leider-2021 entry
  for audit and add specific 2026 sources for each fact.

## Field diffs vs. baseline-2019

- **elPercent: 0.9 → 5.4**
  (NCES Digest 2023 Table 204.20, fall 2021 — the most recent state
  EL share for cross-state comparability. The 0.9% baseline figure is
  implausibly low; NCES shows KY at 2.7% in fall 2011 already, and
  the EL population has roughly doubled since then. Treating this as
  a correction of a baseline coding error rather than a real
  six-fold increase 2019 → 2021.)
- **elPercentAsOf: 2019-10-01 → 2021-10-01**
- **credentials.eld.requirements.program: null → true**
  (16 KAR 2:200 requires admission to "an EPSB approved preparation
  program for the endorsement for teaching English as a second
  language"; goteachky.com endorsements page corroborates that all
  endorsements require completion of an approved educator preparation
  program.)
- **credentials.eld.requirements.test: null → true**
  (goteachky.com endorsements page: "Passage of appropriate
  assessments for each endorsement" is a global requirement applied
  to ESL candidates. Praxis 5362 ESOL is the customary instrument
  but the test name is not stored in our schema; the affirmative
  flag captures the requirement.)
- **credentials.eld.notes:** updated from "SEA documentation limited;
  add-on info gathered from university websites." to a 2026 note
  citing 16 KAR 2:200 and goteachky.com directly.
- **sealOfBiliteracy.adopted: null → true**
  (sealofbiliteracy.org/state/ky/ confirms adoption.)
- **sealOfBiliteracy.year: null → 2021**
- **sealOfBiliteracy.sourceUrl:**
  https://en.wikipedia.org/wiki/Seal_of_Biliteracy →
  https://sealofbiliteracy.org/state/ky/
- **lastVerified: 2019-11-15 → 2026-05-08**
- **verificationStatus: baseline-2019 → verified-2026**

## Fields confirmed unchanged

- credentials.bilingual.{offered, standalone, addOn}: all `false`.
  KY does not offer a bilingual education endorsement (only ESL).
- credentials.eld.{offered, standalone, addOn}: true / false / true
  (P-12 add-on, requires base certificate).
- credentials.eld.requirements.coursework: true.
- credentials.eld.requirements.practicum: null (regulation does not
  enumerate; program-level requirement, not surfaced as a
  state-mandated flag).
- credentials.eld.requirements.languageProficiency: false.
- credentials.sei.mandatedForAllTeachers: false. No statewide SEI
  mandate located in 16 KAR or in KDE EL guidance.
- professionalStandardsMentions: diverse=true, cultural=true,
  linguistic=true, el=false (KTPS Standard 1 "linguistic", Standard
  2 "diverse cultures"; no explicit EL references).
- elpAssessment: ACCESS for ELLs / WIDA / wida.wisc.edu/about/consortium.

## Sources appended

The two leider-2021 source entries are retained. New projectcert-2026
entries appended for each of the eight live sources above.

## Gaps / unresolved

- `credentials.eld.requirements.practicum`: 16 KAR 2:200 routes the
  detailed program design to EPSB-approved providers rather than
  enumerating clinical-experience hours. Coded `null` rather than
  inferring `true` from typical program structure.
- The KDE-hosted assessments and seal-of-biliteracy pages serve a
  403/blocked response to direct `curl` from this client, so no HTML
  byte-snapshot was saved for those two URLs; their content was read
  via WebFetch and is summarized in kde-assessments.md and
  seal-of-biliteracy.md. The pages are otherwise live in a normal
  browser.
