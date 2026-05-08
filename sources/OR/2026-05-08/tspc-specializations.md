# TSPC — Adding Specializations (rules in effect 11/1/2023)

Source: https://www.oregon.gov/tspc/LIC/Documents/Specialization%20Requirements.pdf

A specialization is distinct from an endorsement: an endorsement is required
to teach in the subject area, while a specialization is "added value" — it
indicates specialized expertise but is not required to work in the area.

Specializations available:
- Adapted Physical Education
- American Sign Language
- Autism Spectrum Disorder
- **Bilingual**
- **Dual Language**
- Early Childhood Education
- Mathematics Instructional Leader: PK-8
- Mathematics Instructional Leader: 6-12
- Talented and Gifted

## Bilingual specialization

Requirements:
- Hold an active and valid non-provisional Oregon educator license.
- **Official certification of a passing score on the ACTFL Oral Proficiency
  Interview (OPI or OPIc) — Advanced Mid or higher** in the language being
  added.
- For American Indian languages: tribal letter from a sponsoring Oregon
  tribe certifying the applicant's bilingual qualification.

No coursework, no program, no practicum requirement. **Language proficiency
exam is the only requirement** beyond holding the underlying license.

## Dual Language specialization

Requirements:
- Hold an active and valid non-provisional Oregon Teaching license.
- Complete a Commission-approved Dual Language specialization program
  (≥50% of coursework within five years prior to application).
- PCR submitted by the college.
- Official transcripts.
- Official certification of a passing score on a Commission-approved
  language proficiency exam.

So Dual Language requires: approved program + transcripts (coursework) +
language proficiency exam. (Test of subject-matter pedagogy is not separately
required; the program is the gating mechanism.)

## Implications for `bilingual` credential coding

Oregon offers two distinct bilingual credentials, both as "specializations"
(add-ons), and the Bilingual Specialization is also available on standalone
non-teaching licenses (counselor, psychologist, etc.):

- **Bilingual Specialization**: language proficiency exam (ACTFL OPI/OPIc
  Advanced Mid+) is the only requirement → `languageProficiency: true`,
  `program: false`, `coursework: false`, `practicum: false`, `test: false`
  (the ACTFL OPI is a language proficiency exam, not a subject-matter test).
- **Dual Language Specialization**: approved program + coursework (via
  transcripts) + language proficiency exam → `program: true`,
  `coursework: true`, `languageProficiency: true`.

Because the schema collapses these two into one `bilingual` credential, we
code the *broadest available pathway* — i.e., a teacher can earn a bilingual
credential via the language-proficiency-only Bilingual Specialization. So:
- `program: false` (one of the two paths — Bilingual Spec — has no program)
- `coursework: false` (Bilingual Spec has none)
- `practicum: false` (neither path explicitly requires a separate practicum)
- `test: false` (neither path requires a Commission subject-matter test;
  ACTFL OPI is a language proficiency exam, captured below)
- `languageProficiency: true` (both paths require ACTFL OPI Advanced Mid+)

Both `standalone: true` and `addOn: true` because Bilingual Spec attaches to
a wide range of licenses (incl. non-teaching) and Dual Language attaches to
teaching licenses; neither is a standalone license type by itself, but the
existing baseline coded standalone:true to indicate the Bilingual track
exists independently of any specific endorsement subject. Retain that.
