# Alabama Administrative Code Chapter 290-3-2: Educator Certification

Source URL: `https://www.alsde.edu/sec/tcert/Resources/EDUCATOR-CERTIFICATION-Chapter%20290-3-2.pdf`
Snapshot: `290-3-2-educator-certification.pdf` / `290-3-2-educator-certification.txt`
Supplement: SUPP. NO. 16-1.

The companion rules chapter governing how the certificates defined in
290-3-3 are issued (paths, alternative routes, IECs, fees).

## What it tells us — ESOL certificate path

Rule 290-3-2-.09 (Interim Employment Certificate in a Teaching Field
Approach) confirms that ESOL is one of three Class A "areas" for which
an IEC may be issued (alongside Special Education and Reading
Specialist). For the ESOL IEC, the rule requires (line 2052):

> "(i) At least a valid Class B Professional Educator Certificate in
> any teaching field.
> (ii) Verification on the current application form for this approach
> of unconditional admission to a Class A State-approved program in
> ESOL as prescribed in the Educator Preparation Chapter of the
> Alabama Administrative Code."

This corroborates 290-3-3-.43: ESOL is structurally tied to a
Class B Professional Educator Certificate in another teaching field.
There is no path to an Alabama ESOL credential without first being
certified to teach another subject. Hence `eld.addOn: true`. The
credential is also issued in its own right (i.e., as the named field
of a Class A Professional Educator Certificate in ESOL), so
`eld.standalone: true`.

Rule 290-3-2-.13 (Class A) and Rule 290-3-2-.14 (Class AA) reference
ESOL among the certifiable areas. Rule 290-3-2-.05 requires holders of
all initial professional certificates to meet the Alabama Educator
Certification Assessment Program (AECAP) Praxis testing requirements,
which include the 5362 / 0361 ESL subject test for ESOL candidates.

## What it tells us — bilingual / SEI

Chapter 290-3-2 contains zero references to bilingual education or SEI
certification. The only "bilingual" word in the chapter is in the
generic alphabetical list of Pre-K curricular domains. There is no
universal SEI mandate.

## Schema mapping (from this source alone)

- Confirms `credentials.bilingual.offered: false` (no bilingual
  credential exists).
- Confirms `credentials.eld.standalone: true` and `addOn: true`
  (ESOL is issued as a Class A Professional Educator Certificate in
  its own field, but every ESOL candidate first holds a Class B in
  another teaching field).
- Confirms `credentials.eld.requirements.test: true` (AECAP / Praxis
  subject-area requirement under Rule 290-3-2-.05).
- Confirms `credentials.sei.mandatedForAllTeachers: false`.
