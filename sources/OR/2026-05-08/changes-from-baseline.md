# Oregon — changes from baseline-2019 (2026-05-08 refresh)

Verification status: `baseline-2019` → `verified-2026`.
SEA: Oregon Department of Education (ODE) for ELP assessment + standards;
Teacher Standards and Practices Commission (TSPC) for licensure rules.

## Field-level diffs

- `elPercent`: 8.8 → **9.5**
  Source: NCES Digest table 204.20 (Fall 2021), the latest cross-state row
  available. ODE's own EL Annual Report cited 10.4% as of May 2022; NCES is
  preferred for cross-state comparability per project rule.
- `elPercentAsOf`: 2019-10-01 → **2021-10-01**

- `credentials.bilingual.requirements.program`: null → **false**
  Bilingual Specialization (the broadest pathway) requires no approved
  program — only the ACTFL OPI/OPIc Advanced Mid+ language exam. Dual
  Language Specialization does require an approved program, but per project
  convention we code the broadest available pathway in the rolled-up
  `bilingual` credential. See `tspc-specializations.md`.
- `credentials.bilingual.requirements.coursework`: null → **false**
  Same rationale: Bilingual Specialization has no coursework requirement.
- `credentials.bilingual.requirements.practicum`: null → **false**
  Neither Bilingual nor Dual Language Specialization separately enumerates a
  practicum requirement.
- `credentials.bilingual.requirements.test`: null → **false**
  Neither pathway requires a Commission subject-matter test. ACTFL OPI is a
  language proficiency exam (captured in `languageProficiency`), not a
  subject-matter test. Confirmed against the TSPC Test Guide (rev. 3/2025).
- `credentials.bilingual.requirements.languageProficiency`: true → true
  (unchanged) Confirmed: ACTFL OPI/OPIc Advanced Mid+ required for both
  Bilingual and Dual Language Specializations.

- `credentials.eld.requirements.coursework`: null → **true**
  ESOL endorsement is a PCR (Program Completion Report) pathway endorsement
  per TSPC's "Adding Endorsements" doc — coursework is embedded in the
  approved program. The Multiple Measures-ESOL worksheet additionally
  enumerates ≥20 semester / 30 quarter hours aligned with ESOL standards as
  a structural component. See `tspc-adding-endorsements.md` and
  `tspc-mm-esol.md`.
- `credentials.eld.requirements.practicum`: null → **true**
  Multiple Measures-ESOL worksheet explicitly requires a practicum/field
  experience or completion of a TSPC-approved ESOL program, plus clinical
  experience observations. Practicum is also embedded in any
  TSPC-approved EPP per the Program Review and Standards Handbook.
- `credentials.eld.requirements.program`: true → true (unchanged)
- `credentials.eld.requirements.test`: true → true (unchanged)
  ORELA ESOL is the Commission-adopted subject-matter test. Multiple
  Measures option allows EPPs to document equivalent competency, but the
  test remains the default mastery measure.
- `credentials.eld.requirements.languageProficiency`: false → false (unchanged)

- `credentials.sei.mandatedForAllTeachers`: false → false (unchanged)
  Oregon does not mandate SEI training for all teachers (no equivalent of
  the AZ/CA/MA/NV mandate found in TSPC documents).

- `professionalStandardsMentions`: unchanged
  Re-read of the Oregon Model Core Teaching Standards (codified at OAR
  581-022-2415, aligned with InTASC). Hits for `diverse`, `cultural`,
  `linguistic`; zero explicit `EL` / `English learner` references — ELs
  remain folded into the general "diverse learners" framing.

- `sealOfBiliteracy.adopted`: true → true (unchanged)
- `sealOfBiliteracy.year`: 2016 → 2016 (unchanged; confirmed adoption date
  2016-04-14 via sealofbiliteracy.org/state/or/)
- `sealOfBiliteracy.sourceUrl`: tightened from generic
  `https://sealofbiliteracy.org/` to OR-specific
  `https://sealofbiliteracy.org/state/or/`.

- `elpAssessment.name`: "ELPA21" → "ELPA21" (unchanged; ODE brands the
  assessment "ELPA" in-state, but ELPA21 matches the consortium-recognized
  term and the existing baseline.)
- `elpAssessment.consortium`: "ELPA21" → "ELPA21" (unchanged; Oregon is a
  founding member.)
- `elpAssessment.sourceUrl`: replaced Wikipedia link with the primary ODE
  source page:
  `https://www.oregon.gov/ode/educator-resources/assessment/pages/english-language-proficiency.aspx`.

## Sources appended

1. ODE — English Language Proficiency Assessment page (ELPA / ELPA21).
2. TSPC — Adding Endorsements (rules effective 11/1/2023) — confirms ESOL
   is a PCR-pathway endorsement.
3. TSPC — Adding Specializations (rules effective 11/1/2023) — confirms
   Bilingual + Dual Language specialization requirements.
4. TSPC — Multiple Measures-ESOL Endorsement Testing Option Worksheet
   (June 2024 Commission Approval, rev. 9/13/24) — confirms coursework +
   practicum scaffolding for ESOL.
5. TSPC — Test Guide (rev. 3/2025) — confirms ORELA ESOL test for ESOL
   endorsement; ACTFL OPI for Bilingual Specialization.
6. Oregon Model Core Teaching Standards — keyword scan basis for the
   `professionalStandardsMentions` flags.
7. Sealofbiliteracy.org — Oregon state page (adoption date 2016-04-14).
8. NCES Digest of Education Statistics, Table 204.20 (Fall 2021) — basis
   for `elPercent` update.

No source returned 404. All Appendix A documents from Leider (2021) had
discoverable current equivalents on the ODE / TSPC sites. No gaps logged.
