# RIDE — Regulations Governing the Certification of Educators in Rhode Island (2025)

URL: https://ride.ri.gov/sites/g/files/xkgbur806/files/2025-06/Certification-Regulations-2025.pdf
Retrieved: 2026-05-08
Source format: PDF, 475 KB. Text extracted with `pdftotext -layout`
(see `ride-certification-regulations-2025.txt`).

This is the authoritative Council on Elementary and Secondary
Education regulation governing all RI educator certificates. It is
the document of record behind the live HTML "Certificate Areas and
Requirements" page.

## What the regs confirm

### Section 1.3 — Standards descriptors

The regulations themselves embed teaching-standards descriptors. In
the section corresponding to RIPTS Standard 4 (diversity of learners
/ approaches to learning), the regs include:

- "Design grade-level instruction and create scaffolds for individual
  differences (e.g., stage of development, **English language
  acquisition**, cultural background, learning differences)..."
- "Use understanding of students (e.g., **language proficiency**,
  individual interests, prior learning, cultural background, **native
  language**, experiences)..."
- "Draw the cultural and **language assets of Multilinguals and
  Multilingual Learners** to engage them in rigorous academic
  instruction and discourse"
- "Integrate academic language and content..."

The regs (not just the older 2007 RIPTS PDF) thus explicitly mention
diverse, cultural, linguistic, AND EL/Multilingual Learners as a
named group.

### Bilingual / Dual Language Education — every grade band

Subsections 1.9.1.D (Early Childhood PK-3), 1.9.2.D (Elementary K-6),
1.9.3.H (Middle 5-8), 1.9.4.M (Secondary 6-12), and 1.9.5.R (All
Grades PK-12) all share a near-identical requirements list:

- "Has completed an approved program in this certification area"
- Bachelor's degree from regionally accredited institution
- "minimum of forty-five (45) hours of practicum in this area"
- Content/pedagogical competencies per RIDE-approved national
  professional associations
- "Has met all content testing requirements for this certification
  area"
- **"Has demonstrated proficiency in the first (1st) and second (2nd)
  languages of instruction"**

The proficiency clause is the affirmative language-proficiency
requirement that justifies `bilingual.requirements.languageProficiency
= true`.

### English to Speakers of Other Languages — All Grades PK-12 (Section 1.9.5.S)

- "Has completed an approved program in this certification area"
- Bachelor's degree
- "minimum of one (1) year of practical residency or the equivalent
  in this area and a minimum of sixty (60) hours field experience"
- Content/pedagogical competencies per RIDE-approved national
  professional association
- Standards-based instruction & assessment proficiency
- "Has met all content testing requirements"

No second-language proficiency requirement. (ESOL is the
English-language-teaching credential, not the bilingual one.)

The All Grades ESOL certificate carries a teaching-of-record
restriction: holders restricted to ELD support unless also certified
in the relevant content area.

### MLL Integrated Content Teacher (alternative path)

Sections C of each grade band (e.g., 1.9.1.C "Early Childhood MLL
Integrated Content Teacher") add a category that *extends* an
existing grade-band certificate via coursework in:

- Second Language Acquisition Theory and Practice
- Linguistics and the Structure of English for Language Teaching
- Socio-Cultural Studies in Teaching Diverse Learners
- Foundations of MLL Content-Based Instruction and Assessment
  (including instructional technology)
- Introduction to Content-Based Oracy and Literacy Development for
  Multilingual Learners

Plus 45 hours of practicum and a content test. This is the
add-on/endorsement style path for content-area teachers to integrate
MLL instruction.

### District-Level Administrator — Multilingual Learners (1.10.C)

PK-12 support certificate; out of scope for the three-credential
schema but documents that RI has a leadership pipeline specifically
for MLL.

### SEI mandate — explicit search

Searching the regs text for "sheltered english", "SEI mandate",
"all teachers" (in the EL context) yielded no statewide requirement.
RI has no SEI mandate analogous to AZ/CA/MA.

## Schema confirmations grounded in this PDF

- bilingual.offered = true (six grade-band certificates exist)
- bilingual.standalone = true (each is its own certificate area)
- bilingual.addOn = true (each requires holding the matching general
  grade-band certificate first; functionally an add-on layered onto
  base certification)
- bilingual.requirements.program = true (Section X.D.2.b explicit)
- bilingual.requirements.coursework = true (program approval implies
  it; specific coursework lists in MLL Integrated Content variants)
- bilingual.requirements.practicum = true (45 hrs explicit)
- bilingual.requirements.test = true (Section X.D.2.g explicit)
- bilingual.requirements.languageProficiency = true (Section X.D.2.h
  explicit: "demonstrated proficiency in the first (1st) and second
  (2nd) languages of instruction")
- eld.offered = true (All Grades ESOL + MLL Integrated Content)
- eld.standalone = true (All Grades ESOL = own certificate)
- eld.addOn = true (MLL Integrated Content + MLL Endorsement)
- eld.requirements.program = true
- eld.requirements.coursework = true
- eld.requirements.practicum = true (45 hrs + 1 yr residency + 60
  hrs field experience)
- eld.requirements.test = true (Praxis 5362)
- eld.requirements.languageProficiency = false (no L2 requirement)
- sei.mandatedForAllTeachers = false (regs do not impose this)

## Standards mentions (for professionalStandardsMentions)

Searching Section 1.3 of the 2025 regs:
- "diverse" / "diversity of learners": **TRUE**
- "cultural" / "cultural background": **TRUE**
- "linguistic" / "linguistics" / "language proficiency" / "native
  language": **TRUE**
- "English language acquisition" / "Multilingual Learners" /
  "Multilinguals" / "English Learners": **TRUE**

All four professionalStandardsMentions booleans set to TRUE based on
explicit mentions in the current 2025 regulations text.
