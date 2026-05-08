# FL — changes from baseline-2019 → verified-2026

Verification date: 2026-05-08.
Verifier: projectcert-2026.
SEA: Florida Department of Education (FLDOE), Bureau of Student
Achievement through Language Acquisition (SALA).

## Summary

Florida's EL teacher-certification architecture is unchanged in
substance from the baseline-2019 record: bilingual is not a separate
credential, ESOL is offered as both a K-12 standalone certification
and an academic endorsement, and SEI is not mandated for *all*
teachers (the Consent Decree applies role/category-conditional
training). The State Board did, however, **adopt new ESOL endorsement
standards on 2025-08-20** (Rule 6A-4.02451, effective Sep 2025),
replacing the 2010 standards. The structural strand layout (5 areas ×
3 SH each = 15 SH) under Rule 6A-4.0244 is preserved.

## Field-level diffs

- `elPercent`: **10.1 → 9.5** (NCES Digest 2023, Table 204.20, Fall
  2021 = 269,534 ELs / 9.5%). The leider-2021 figure was Fall 2019.
- `elPercentAsOf`: **2019-10-01 → 2021-10-01**.
- `credentials.eld.requirements.coursework`: **null → true**. Rule
  6A-4.0244 explicitly mandates 15 semester hours across five named
  content areas for the academic endorsement; this is firmly
  documented in the rule text and in the 2025 standards. (The
  alternate district inservice add-on path mirrors the SH split.)
- `credentials.eld.requirements.program`: **null → null** (no change).
  An approved program is *one* pathway, not the only one — district
  inservice add-on programs are also accepted. We keep `null` to
  signal "not strictly required."
- `credentials.eld.requirements.practicum`: **null → null** (no
  change). Neither Rule 6A-4.0244 nor the 2025 standards mandate a
  practicum at the endorsement level; practicum is at the
  approved-program institution's discretion.
- `credentials.eld.requirements.test`: **true → true** (no change).
  FTCE 047 is the K-12 ESOL exam and remains the standard test path
  for the standalone certification.
- `credentials.eld.requirements.languageProficiency`: **false → false**
  (no change). No LOTE proficiency is required for ESOL credentials in
  Florida.
- `credentials.eld.notes`: NEW — added pointer to the 2025 standards
  and the FTCE 047 path.
- `credentials.bilingual`: **offered=false, standalone=false,
  addOn=false** (no change). FL has no separate bilingual education
  certificate or endorsement; bilingual instruction is delivered by
  ESOL-credentialed teachers paired with World Language certifications
  as needed.
- `credentials.sei.mandatedForAllTeachers`: **false → false** (no
  change). The Consent Decree mandates ESOL training conditional on
  category (I-IV) and on teaching ELLs, not for all teachers
  regardless of role. NEW notes added documenting the Decree.
- `professionalStandardsMentions.diverse`: **true → true** (FEAPs 2.h
  references "differing needs and diversity of students").
- `professionalStandardsMentions.cultural`: **true → true** (FEAPs 2.d
  "Respects students' cultural linguistic and family background").
- `professionalStandardsMentions.linguistic`: **true → true** (same
  FEAPs 2.d clause).
- `professionalStandardsMentions.el`: **false → false**. Current FEAPs
  (Rule 6A-5.065, last amended 2023-08-22) contain no explicit
  EL/ELL/English Learner reference. The mentions are general
  ("cultural linguistic", "diversity") rather than EL-specific.
- `sealOfBiliteracy.adopted`: **true → true** (no change).
- `sealOfBiliteracy.year`: **2016 → 2016** (no change; F.S.
  § 1003.432, signed 2016-04-14).
- `sealOfBiliteracy.sourceUrl`: now the FL state page on
  sealofbiliteracy.org.
- `elpAssessment`: ACCESS for ELLs / WIDA (no change). Florida joined
  WIDA in 2020-21 after retiring CELLA; this was already coded.

## New verified-2026 sources appended

1. FLDOE ESOL Endorsement page (Rule 6A-4.02451 hub).
2. 2025 Florida Teacher Standards for ESOL Endorsement (PDF).
3. Rule 6A-4.0244, F.A.C. (ESOL endorsement specialization).
4. Rule 6A-4.0245, F.A.C. (ESOL K-12 certification specialization).
5. FLDOE Consent Decree page (LULAC v. SBE, 1990-08-14).
6. Rule 6A-5.065, F.A.C. (FEAPs, current text last amended
   2023-08-22).
7. NCES Digest 2023, Table 204.20 (Florida Fall 2021 EL data).
8. Seal of Biliteracy — Florida state page.
9. WIDA Consortium membership page.
10. FTCE ESOL K-12 (047) test page (Pearson/NESINC).

leider-2021 entries retained per project rule.

## No 404s / no in-progress flags

All sources resolved and were read in full. Verification status moves
from `baseline-2019` to `verified-2026`.
