# Alabama Administrative Code Chapter 290-3-3: Educator Preparation

Source URL: `https://www.alsde.edu/sec/tcert/Resources/EDUCATOR-PREP-Chapter%20290-3-3.pdf`
(also reachable via `https://www.alabamaachieves.org/wp-content/uploads/2024/04/EDUCATOR-PREP-Chapter-290-3-3.pdf`)
Snapshot: `290-3-3-educator-preparation.pdf` / `290-3-3-educator-preparation.txt`
Supplement number visible on snapshot pages: SUPP. NO. 21-4
(supplement reflects the 2021-08-12 readoption with effective date 2021-10-15).

This is the State Board of Education rules chapter governing approved
educator preparation programs. Read in full for EL-credential and
professional-standards mapping.

## What it tells us — credentials

Rule 290-3-3-.43 — **English for Speakers of Other Languages (ESOL,
Grades P-12)** — Class A (master's-degree-level) program, aligned to
the TESOL International Association standards. Key paragraphs:

- **(1) Unconditional Admission**: applicant must hold "at least a
  valid bachelor's-level professional educator certificate in a
  teaching field." Initial ESOL certification is *Class A only*. There
  is **no Class B (bachelor's-level) ESOL certificate**, so under our
  schema ESOL is *not* a standalone initial license — every Alabama
  ESOL teacher first holds a Class B certificate in another teaching
  field.
- **(2) Program Curriculum** is broken into five TESOL strands:
  Knowledge about Language; ELLs in the Sociocultural Context;
  Planning and Implementing Instruction; Assessment and Evaluation;
  Professionalism and Leadership. (Lines 8214-8294 of snapshot.)
- **(3) Requirements for Certification of Teachers of ESOL**:
  - (a) earned master's degree from a regionally accredited institution;
  - (b) survey-of-special-education course (or, if taken at a prior
    level, a diversity course on "methods of accommodating instruction
    to meet the needs of students with exceptionalities in inclusive
    settings, multicultural education, **teaching English language
    learners**, rural education, or urban education");
  - (c) satisfactory completion of a State-approved program (3.0 GPA,
    or 3.25 for candidates unconditionally admitted on/after
    2017-07-01);
  - (d) "Competence to teach English for speakers of other languages
    as demonstrated in an internship, with an ESOL certified
    cooperating teacher, of at least 300 clock hours";
  - (e) a valid Class B Professional Educator Certificate in a
    teaching field unless the candidate completes an Alternative Class
    A program in ESOL.
- **(4) Testing**: "Applicants for initial certification in English
  for speakers of other languages through the completion of a Class A
  program must meet the Praxis requirements of the Alabama Educator
  Certification Assessment Program (AECAP) as a precondition for
  certification."

History trail at the foot of Rule 290-3-3-.43: most recent revision
"repealed and adopted new 08-12-21, effective 10-15-21" — this is the
current version still in force per the SUPP. NO. 21-4 supplement.

There is **no bilingual education credential** under Chapter 290-3-3.
The only mention of "bilingual" in the entire 12,230-line chapter
(line 2076) is in the Pre-Kindergarten standards' description of
"physical, cognitive, social and emotional, and linguistic domains,
including bilingual/multilingual" — not a credential.

There is no Sheltered English Immersion (SEI) mandate for all Alabama
teachers. No rule under 290-3-3 imposes EL coursework on candidates
seeking certification in non-ESOL teaching fields beyond the diversity
course at (3)(b) — and that is satisfied by *any one* of five topics,
EL being only one option, not a requirement.

## What it tells us — professional standards mentions

Rule 290-3-3-.04 (the Alabama Core Teaching Standards, modified from
the InTASC Model Core Teaching Standards) is searched for the four
schema words:

- **diverse**: many hits, e.g. "diverse cultures and communities to
  ensure inclusive learning environments" (line 1186), "values diverse
  languages and dialects" (1223), "diverse social and cultural
  perspectives" (1374), "respects learners' diverse strengths and
  needs" (1532). → **true**
- **cultural**: many hits, e.g. "diverse cultures and communities"
  (1186), "personal, family, and community experiences and cultural
  norms" (1198), "language, culture, family, and community values"
  (1214), "values of diverse cultures" (1215), "integrate culturally
  relevant content" (1323), "cultural diversity" (1520),
  "developmentally, culturally, and linguistically appropriate"
  (1578). → **true**
- **linguistic**: hits include "cognitive, linguistic, social,
  emotional, and physical areas" (1141, 1145, 1155); "developmentally,
  culturally, and linguistically appropriate instructional strategies"
  (1578-1579). → **true**
- **EL / English language learner**: explicit at line 1200 — "scaffold
  instruction, including strategies for making content accessible to
  **English language learners**." → **true**

All four `professionalStandardsMentions` flags remain `true`. This
matches the baseline-2019 coding.

## Schema mapping (from this source alone)

- `credentials.bilingual.offered`: false (no bilingual credential
  defined anywhere in 290-3-3).
- `credentials.bilingual.standalone`: false.
- `credentials.bilingual.addOn`: false.
- `credentials.eld.offered`: true (ESOL P-12 in Rule 290-3-3-.43).
- `credentials.eld.standalone`: true — Alabama issues an ESOL
  Professional Educator Certificate in the field of ESOL (Class A).
  However, eligibility is conditioned on first holding a Class B
  Professional Educator Certificate in another teaching field, so in
  practice every ESOL teacher rides on a primary certificate. We code
  `standalone: true` because Alabama issues an ESOL-specific
  Professional Educator Certificate (i.e., it is the certificate's
  named field), and `addOn: true` because the credential structure
  also functions as an add-on to the prerequisite Class B. This
  matches the baseline-2019 coding and is documented at length in
  `notes`.
- `credentials.eld.addOn`: true (it adds on to a Class B teaching-field
  certificate; for candidates already holding a Class A, ESOL is
  routinely earned as an add-on Class A field).
- `credentials.eld.requirements.program`: true — "satisfactory
  completion of a State-approved program with a minimum GPA of 3.25"
  (3)(c) is the **only** pathway named in the rule. There is no
  alternate coursework-only or test-only pathway for ESOL in Alabama.
  Baseline-2019 had this `null`; current rule is unambiguous, so
  flipping to `true`.
- `credentials.eld.requirements.coursework`: true — the program-
  curriculum block (2)(a)-(e) defines mandatory coursework strands
  that the State-approved program must include. Baseline had this
  `null`; flipping to `true`.
- `credentials.eld.requirements.practicum`: true — (3)(d) requires
  "an internship, with an ESOL certified cooperating teacher, of at
  least 300 clock hours." Baseline had this `null`; flipping to
  `true`.
- `credentials.eld.requirements.test`: true (Praxis subject-area test
  via AECAP, per (4)). Unchanged from baseline.
- `credentials.eld.requirements.languageProficiency`: false — the rule
  contains no second-language proficiency requirement for the ESOL
  candidate. Unchanged from baseline.
- `credentials.sei.mandatedForAllTeachers`: false. Nothing in 290-3-3
  imposes EL/SEI coursework on every teacher candidate. Unchanged from
  baseline.
- `professionalStandardsMentions.{diverse,cultural,linguistic,el}`:
  all true (see word search above). Unchanged from baseline.
