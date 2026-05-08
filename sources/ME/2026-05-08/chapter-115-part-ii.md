# Maine 05-071 Chapter 115 Part II — Requirements for Specific Certificates and Endorsements

- Source: https://www.maine.gov/doe/sites/maine.gov.doe/files/inline-files/State%20Board%20-%20Chapter%20115%20Part%202%20Amended%20-%205.14.2025.pdf
- Snapshot: `chapter-115-part-ii.pdf` (and extracted `chapter-115-part-ii.txt`)
- Issuer: Maine State Board of Education (State Board version, amended 5/14/2025; document footer reads `Chapter115Part2_Amended_15Apr2025`)
- Retrieved: 2026-05-08
- Read by: projectcert-2026

## Endorsement 660 — English for Speakers of Other Languages (ESOL) Teacher (Section 1.8)

Allows holder to teach ESOL pre-K–12. Five eligibility pathways, plus a conditional certificate. Verbatim summary of the requirements:

- **Pathway 1 (approved program):** Successful completion of a Maine-approved ESOL teacher preparation program with a formal recommendation from the preparing institution; bachelor's degree; completed an approved course for teaching students with exceptionalities in the regular classroom.
- **Pathway 2 (add-on for currently certified teacher):** Holds a valid Maine professional teaching certificate (pre-K-3, K-6, 5-8, 6-12, or pre-K-12); minimum **15 semester hours** of ESOL coursework, including 3 hrs linguistics, 3 hrs ESOL curriculum/assessment, 3 hrs ESOL teaching methods; 3 hrs diversity-centered content; 3 hrs human/educational psychology or child development; approved exceptionalities course.
- **Pathway 3 (transcript route, no prior cert):** Bachelor's; minimum **24 semester hours** of ESOL coursework with the same 3+3+3 core; 3 hrs diversity-centered content; 3 hrs human development; approved exceptionalities course; basic skills test in reading/writing/math under Chapter 13 *or* 3.0 GPA *or* successful portfolio review on Maine's Initial Teacher Standards; **one academic semester or 15 weeks of full-time student teaching** in this endorsement area (waivable after one full year of successful teaching under a conditional certificate).
- **Pathway 4 (World Language teacher):** Holds a valid Maine professional teaching certificate in any World Language; 3 hrs English grammar or English language linguistics; 3 hrs ESOL teaching methods.
- **Pathway 5 (portfolio):** Bachelor's; approved exceptionalities course; approved portfolio (per Part I §6) with prior approval from superintendent and Department.
- **Conditional certificate:** Bachelor's; minimum **15** semester hours of ESOL coursework with the same 3+3+3 core (remaining credits via coursework, CEUs, in-service hours, or summer institute hours); or approved portfolio process. (Red-line shows reduction from 24 → 15 sem hrs.)

## Schema-relevant coding for `credentials.eld`

- `offered`: **true** — ESOL endorsement 660 exists.
- `standalone`: **false** — Endorsement only; must accompany a base teacher certificate (or be earned alongside one through Pathway 3 with student teaching). Maine does not issue ESOL as a standalone primary certification — Pathway 3 produces the endorsement on a base certificate; Pathways 1, 2, 4, and 5 all assume or attach to a base teaching credential. (Conservative coding: standalone=false.)
- `addOn`: **true** — Pathways 2 and 4 explicitly bolt onto an existing certificate.
- `requirements.program`: **true** — Pathway 1 (Maine-approved program) and Pathway 5 (approved portfolio) are explicit program/approval routes; multiple pathways including 2 and 3 require specific approved coursework patterns.
- `requirements.coursework`: **true** — All pathways except 1 require an explicit credit-hour breakdown (15 or 24 semester hours).
- `requirements.practicum`: **true** for Pathway 3 (15 weeks student teaching). Other pathways either require an approved program (which itself includes practicum) or assume an existing base certificate (already met practicum). Coding **true** because practicum is required to earn the endorsement via the transcript-only route.
- `requirements.test`: **null** — Chapter 115 Part II §1.8 does not name a Praxis content test. References to "basic skills test" point to Chapter 13 (the general literacy/numeracy test, not an ESOL content test) and may be satisfied by GPA or portfolio. The Praxis-state-by-state listing on praxis.ets.org and third-party sites assert Praxis 5362 (ESOL, score 146) is required, but the controlling Maine rule (Chapter 115 Part II §1.8) does **not** mandate it for the endorsement. Until I see an SEA-issued list naming Praxis 5362 for endorsement 660, this stays `null` with a note. (leider-2021 coded `test: true`.)
- `requirements.languageProficiency`: **false** — No second-language proficiency exam (e.g., ACTFL OPI) is required for ESOL 660. Such requirements appear only for World Language endorsements elsewhere in Chapter 115.

## No bilingual education endorsement

A full-text search of Chapter 115 Part II for "bilingual" returns zero matches. Maine offers world-language endorsements (Spanish, French, etc.) but not a Bilingual Education credential. → `credentials.bilingual.offered: false` retained.

## SEI mandate

Chapter 115 Part II contains no general "sheltered English instruction" requirement applicable to all teachers. → `credentials.sei.mandatedForAllTeachers: false` retained.
