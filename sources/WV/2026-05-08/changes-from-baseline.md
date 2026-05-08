# West Virginia — changes from baseline-2019

Refresh date: 2026-05-08
Verifier: projectcert-2026
SEA: West Virginia Department of Education (WVDE)

## Sources reviewed (2026-05-08)

1. WVBE Policy 5202, "Minimum Requirements for the Licensure of
   Professional/Paraprofessional Personnel" (126CSR136). Filed
   2024-12-12, effective 2025-01-11. WV Secretary of State e-filing.
   Saved as `policy-5202-current.pdf`; OCR'd to
   `policy-5202-ocr.txt`. Scanned/image-only PDF — text extracted
   via tesseract.
2. WVBE Policy 5100, "Approval of Educator Preparation Programs"
   (126CSR114). Filed 2023-11-08, effective 2023-12-11. Saved as
   `policy-5100-current.pdf`; OCR'd to `policy-5100-ocr.txt`.
3. WVBE Policy 5310, "Performance Evaluation of Professional
   Personnel and Athletic Coaches" (126CSR142). Filed 2023-09-13,
   effective 2023-10-16. This rule houses the West Virginia
   Professional Teaching Standards (WVPTS) at §13.1. Saved as
   `policy-5310-current.pdf` (= the previously-saved
   `policy-5310.pdf`); OCR'd to `policy-5310-ocr.txt`.
4. NCES Condition of Education, "English Learners in Public Schools"
   indicator (Fall 2021). Confirms WV at 0.8 percent (range floor).
5. Wikipedia, "Seal of Biliteracy" — state-by-state adoption table.
   WV does not appear among adopting states (through 2022 / current
   article state).
6. Wikipedia, "WIDA Consortium" — member-state list. WV is not a
   WIDA member, consistent with WV's use of ELPA21 (per the user
   directive and prior coding).

## Field-level diff vs. baseline-2019

- elPercentAsOf: 2019-10-01 → 2021-10-01.
  Value unchanged at 0.8 percent (NCES still reports WV as the
  national floor at 0.8 percent for Fall 2021).
- credentials.bilingual: no change (offered=false, standalone=false,
  addOn=false). Policy 5202 lists no bilingual specialization or
  endorsement; only ESL Pre-k-Adult appears as the EL-related
  specialization.
- credentials.eld.requirements: filled in from null/false to:
  - program: null → true. Policy 5100 §6.6 requires WVBE-approved
    EPPs aligned to TESOL national standards for the ESL
    specialization; §10.1.c.2.A.2 of Policy 5202 ties licensure to
    completion of a state-approved program plus the content Praxis.
  - coursework: null → true. Policy 5100 prescribes content-area
    coursework aligned to the national TESOL standards.
  - practicum: null → true. Policy 5100 §6.7.b and §6.8 require
    field-based and yearlong residency clinical experiences for all
    initial-licensure programs (including ESL).
  - test: null → true. Policy 5202 §10.1.c.2.A.2 requires a Content
    Specialization (Praxis) test for each specialization; ESL is a
    listed specialization. §21.2 also allows additional-endorsement
    issuance based on the appropriate content-proficiency Praxis
    score, which presupposes a test.
  - languageProficiency: false → false (unchanged). Policy 5202 and
    Policy 5100 do not require an English (or other) language
    proficiency exam for the ESL specialization; language
    proficiency requirements appear only for ASL and the modern
    foreign languages.
- credentials.eld.standalone, .addOn: unchanged (true / true).
  Policy 5202 retains ESL Pre-k-Adult as a standalone teaching
  specialization (§9 issuance) and as an additional endorsement
  under §21.1 / §21.2 for an existing teaching certificate.
- credentials.sei.mandatedForAllTeachers: unchanged (false). No
  SEI mandate appears in Policy 5202, 5100, or 5310. WV continues
  to rely on the ESL-endorsed specialist model.
- professionalStandardsMentions: diverse: true → false; cultural:
  true → false; linguistic: true → false; el: false → false.
  Rationale: the current Policy 5310 (effective 2023-10-16) sets
  forth the WVPTS at §13.1 in five summary elements; none of the
  five elements explicitly references "diverse," "cultural,"
  "linguistic," or English Learners. Element 2.1 ("the teacher
  understands and responds to the unique characteristics of
  learners") is the closest, but does not include the trigger
  terms verbatim. The 2019 baseline coding (true / true / true /
  false) was likely drawn from a separate WVPTS rubric/indicators
  artifact rather than the policy text itself; that artifact is
  not currently available on the WVDE site under any URL we could
  resolve. Coding is grounded only in sources we read today.
- sealOfBiliteracy.adopted: null → false. WV is absent from the
  Wikipedia state-by-state Seal of Biliteracy adoption table; no
  WV statute or BoE rule was found establishing one. year and
  sourceUrl unchanged.
- elpAssessment: unchanged (name "ELPA21", consortium "ELPA21",
  Wikipedia source URL). WV is not a WIDA member (Wikipedia
  WIDA-Consortium list); consistent with use of ELPA21.
- verificationStatus: baseline-2019 → verified-2026.
- lastVerified: 2019-11-15 → 2026-05-08.

## Notes / open items

- Policy 5202 and Policy 5310 are scanned PDFs without a text
  layer; OCR via tesseract was used. Cited line numbers refer to
  the OCR'd `*-ocr.txt` files in this directory.
- The WVPTS rubric/indicators document referenced internally by
  WVDE (typically used for educator-preparation alignment) was
  not retrievable at any of the candidate URLs tried on
  2026-05-08. If/when that rubric is located, the four
  professionalStandardsMentions booleans should be re-coded
  against that source and notes updated accordingly.
