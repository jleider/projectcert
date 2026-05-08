# English Learner Authorization & CLAD Certificate (CL-628C)

URL: https://www.ctc.ca.gov/credentials/leaflets/english-learner-auth-clad-certificate-(cl-628c)
Retrieved: 2026-05-08 via WebFetch (CTC site is Cloudflare-protected against direct curl).
Issuer: California Commission on Teacher Credentialing (CTC).

## Type

Add-on authorization. Requires a valid prerequisite teaching credential.
ELA/CLAD authorizes departmentalized ELD instruction.

## Pathways

1. CTEL Examination: pass all three subtests of California Teacher of
   English Learners (CTEL) Examination ("Tests 1, 2, and 3"); scores
   no more than 10 years old. Plus a second-language requirement (waived
   for applicants with a bachelor's degree from a regionally-accredited
   institution).
2. Commission-approved CTEL program: completion of coursework + program
   sponsor recommendation.
3. CTEL program + exam equivalency.
4. Legacy ESL Supplementary Authorization (no longer issued after 7/1/1996)
   plus three SDAIE semester units OR a 45-hour SDAIE program.
5. SB 1969 Certificate of Completion or CCSD plus 9 upper-division
   semester units verified by an approved CTEL program.
6. National Board for Professional Teaching Standards certificate in
   ENL (Early/Middle Childhood or Early Adolescence/Young Adulthood).
7. Out-of-state equivalency.

## Coding implication (CA "eld" credential)

- offered: true (unchanged)
- standalone: true → false?
  ELA/CLAD is itself an add-on. However, the embedded EL preparation in
  every Multiple/Single Subject preliminary credential since 7/1/2002
  (AB 1059) makes EL authorization effectively part of the standalone
  initial credential. Coding standalone=true is defensible because all
  newly-issued initial credentials carry an embedded EL authorization.
  Keeping standalone=true, addOn=true (both pathways exist).
- requirements:
  - program: true (CTEL program is an explicit pathway; embedded
    preparation is the default for all new credentials per AB 1059)
  - coursework: true (CTEL program coursework; SDAIE coursework in
    pathway 4)
  - practicum: null (not enumerated as a separate requirement in the
    leaflet)
  - test: true (CTEL is an explicit standalone pathway; baseline coded
    test=true and remains true)
  - languageProficiency: false (the second-language requirement is
    waived for any applicant holding a bachelor's degree from a
    regionally-accredited institution, which is a prerequisite for the
    underlying teaching credential — so in practice no language
    proficiency is required of the EL Authorization candidate;
    baseline coded false and remains false)
