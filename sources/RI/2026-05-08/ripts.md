# Rhode Island Professional Teaching Standards (RIPTS)

URL: https://ride.ri.gov/sites/g/files/xkgbur806/files/Portals/0/Uploads/Documents/Teachers-and-Administrators-Excellent-Educators/Educator-Certification/Cert-main-page/RIPTS-with-preamble.pdf
Retrieved: 2026-05-08
Approved: October 2007 (the 2007 RIPTS PDF remains the document RIDE
links from its certification main page; the 2025 Certification
Regulations Section 1.3 carry forward the same descriptor language)

## Mentions scan

Scanning the full 11-standard text + preamble for the four schema
keywords:

### diverse — TRUE

- Standard 4 title: "Teachers create instructional opportunities
  that reflect a respect for the **diversity of learners** and an
  understanding of how students differ in their approaches to
  learning."
- Preamble: "These standards refer repeatedly to 'all students.'
  These references really do mean all students and the multiple
  strengths, challenges and backgrounds that each student brings to
  the classroom."

### cultural — TRUE

- Standard 1: "Reflect a variety of academic, social, and **cultural
  experiences** in their teaching."
- Standard 4 descriptor: "Use their understanding of students (e.g.,
  individual interests, prior learning, **cultural background**,
  native language, and experiences)..."

### linguistic — TRUE

- Standard 4 descriptor: "Design instruction that accommodates
  individual differences (e.g., stage of development, learning style,
  **English language acquisition**, cultural background, learning
  disability)..."
- Standard 4 descriptor: "...prior learning, cultural background,
  **native language**, and experiences..."

### el — TRUE

- Preamble: "All students includes, but is by no means limited to
  **English Language Learners**, students with special learning
  needs, and students of all races, ethnicities, cultures and
  socioeconomic circumstances."
- Body of preamble: "For educators to teach in ways that address the
  needs of **English Language Learners**, they must have had
  opportunities to learn what those needs are and how they can be
  addressed in the classroom."

(The 2025 Certification Regulations Section 1.3 — currently in force
— additionally use the terms "Multilingual Learners" and
"Multilinguals" in their descriptors; even before the 2025 update,
the 2007 RIPTS already explicitly named "English Language Learners"
twice in the preamble.)

## Schema diff vs. baseline-2019

leider-2021 coded:
- diverse: true
- cultural: false
- linguistic: false
- el: false

Current reading from this same RIPTS document corrects three of those
to true. The 2007 document has been the operative standards text
throughout — leider-2021 appears to have been conservative in
coding (perhaps requiring an explicit phrase like "linguistic
diversity" rather than the embedded mentions present in the
descriptors). With the 2025 Cert Regulations Section 1.3 now also
embedding equivalent or stronger language, all four mentions
booleans flip to TRUE.

## Schema mapping

- professionalStandardsMentions.diverse = true (was true)
- professionalStandardsMentions.cultural = true (was false)
- professionalStandardsMentions.linguistic = true (was false)
- professionalStandardsMentions.el = true (was false)
