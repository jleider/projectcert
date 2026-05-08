# SEI Endorsement — ADE / OELAS

Sources retrieved 2026-05-07:

- ADE OELAS SEI Endorsement page (via Wayback Machine raw: site behind
  Cloudflare bot challenge for direct fetch):
  `https://www.azed.gov/oelas/sei-endorsement`
  (snapshot: `wb-id-oelas-sei-endorsement.html`)
- ADE Educator Certification — Structured English Immersion, PreK-12
  endorsement page (via Wayback raw):
  `https://www.azed.gov/educator-certification/structured-english-immersion-prek-12`
  (snapshot: `wb-id-educator-certification-structured-english-immersion-prek-12.html`)
- Ariz. Admin. Code R7-2-615 (Endorsements), via Cornell LII mirror:
  `https://www.law.cornell.edu/regulations/arizona/Ariz-Admin-Code-SS-R7-2-615`
  (snapshot: `r7-2-615-cornell.html`)

## Mandate language (verbatim from ADE OELAS page)

> "All Public School teachers working with English learners delivering
> required minutes of the SEI models are required to have an ESL, BLE,
> or SEI Endorsement. (AZ Board Rule, 7 A.A.C. 2.L)"

## Mandate language (verbatim from R7-2-615(L))

> "A Provisional or full Structured English Immersion (SEI)
> endorsement, or an English as a Second Language or Bilingual
> endorsement, shall be required of a teacher who is instructing
> students in a sheltered English immersion or structured English
> immersion model."

## Pathways for the full SEI endorsement (R7-2-615(L)(2) + ADE page)

Prerequisite certificate (any of): Elementary, Secondary, Special
Education, CTE, Early Childhood, Arts Education PreK-12, PreK-12
Physical Education, Subject Matter Expert, Specialized Secondary STEM,
Supervisor, Principal, or Superintendent.

PLUS Option A or B or C:

- Option A: 3 semester hours of courses related to the teaching of
  the ELL Proficiency Standards (incl. SEI strategies, ELP standards,
  ELL progress monitoring); OR
- Option B: 45 clock hours of professional development in same content
  through a training program meeting A.R.S. § 15-756.09(B); OR
- Option C (regulatory): passing score on the SEI portion of the
  Arizona Teacher Proficiency Assessment (ADE page does not currently
  list this option for new applicants — only A/B are described as
  active routes).

Provisional SEI endorsement: 1 semester hour OR 15 clock hours of
SEI training; valid 3 years; non-renewable. ADE page notes that AZ
SEI training providers and IHEs currently only offer the full-
endorsement coursework, not the provisional 15-hour option.

Fee: $60. Requires AZ DPS IVP Fingerprint Clearance Card.

## Statutory / historical context (verified by external sources)

- Origin: Proposition 203 (2000) replaced bilingual education with a
  default Structured English Immersion model. HB 2064 (2006) created
  the ELL Task Force and codified the 4-hour ELD block.
- 2019 modification: Per Civil Rights Project / UCLA analysis (Lillie
  & others) and contemporaneous reporting, in spring 2019 the
  legislature reduced the daily SEI ELD block from 4 hours to 2 hours
  and re-opened broader access to dual language / bilingual programs.
  The ADE site does not directly cite that bill on the SEI Endorsement
  page; it references A.R.S. § 15-756.09(B) as the operative training
  authority.

## Key takeaway for re-coding

The endorsement-level mandate ("any teacher delivering SEI minutes
must hold ESL, BLE, or SEI") survives. SEI endorsement is still the
broadest and easiest of the three to obtain (single course / 45
clock hrs). `mandatedForAllTeachers` should remain `true` in our
schema — *every* teacher of an EL student delivering SEI minutes
must hold one of the three EL endorsements; AZ is essentially the
canonical "universal mandate" state in the country.
