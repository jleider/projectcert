# Bilingual Authorizations (CL-628B)

URL: https://www.ctc.ca.gov/credentials/leaflets/bilingual-authorizations-(cl-628b)
Retrieved: 2026-05-08 via WebFetch (CTC site is Cloudflare-protected against direct curl).
Issuer: California Commission on Teacher Credentialing (CTC).

## Type

Add-on authorization. Requires a valid prerequisite teaching credential
(Multiple Subject, Single Subject, or Education Specialist). Per the
leaflet: "Bilingual Authorizations allow the holders to provide
instruction to English Learners (EL)." AB 1871 (signed 9/30/2008)
provides for the issuance of bilingual *authorizations* rather than
*certificates* (formerly BCLAD).

## Authorized scope

ELD, primary-language development, SDAIE (Specially Designed Academic
Instruction Delivered in English), and content instruction delivered in
the primary language.

## Pathways

1. Commission-approved bilingual program: completion of coursework, then
   program-sponsor recommendation. (program=true; coursework=true)
2. CSET World Languages exams only: passing scores on Tests II (or III
   depending on language), IV, and V of CSET: World Languages.
   (test=true; languageProficiency=true via CSET subtests)
3. Approved program coursework + CSET combination based on equivalency.

Holders of a valid non-emergency CA Single Subject or Standard Secondary
credential with a major in a language other than English may bypass
CSET Subtest II/III.

## Coding implication

- credentials.bilingual.offered: true (unchanged)
- credentials.bilingual.standalone: true (unchanged) — per project
  coding convention, BCLAD lineage is treated as standalone bilingual.
  The Bilingual Crosscultural Specialist Credential remains a recognized
  standalone credential structure even though the new-issue pathway is
  the AB 1871 add-on Bilingual Authorization.
- credentials.bilingual.addOn: true (unchanged)
- credentials.bilingual.requirements:
  - program: true (approved-program pathway exists and is the canonical
    "approved program" route in CA)
  - coursework: true (program coursework explicit in pathways 1 and 3)
  - practicum: null (not specified in the leaflet; embedded in approved
    programs but not separately enumerated)
  - test: true (CSET pathway is an explicit standalone option; CSET also
    appears in equivalency pathway)
  - languageProficiency: true (CSET World Languages is, by design, a
    language-proficiency examination for the target language)
