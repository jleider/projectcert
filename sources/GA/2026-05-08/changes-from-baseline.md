# GA — changes from baseline-2019

Refreshed 2026-05-08 against current GaPSC rules (2024-2026 effective)
and NCES Table 204.20 (Digest 2023).

Provenance: Georgia Professional Standards Commission (GaPSC, the
licensing body) governs teacher certification, and Georgia Department of
Education (GADOE, the SEA) administers the Seal of Biliteracy and ELP
program. GA is a current member of the WIDA Consortium (ACCESS for ELLs).

## elPercent

- 6.6 → **7.7** (NCES Table 204.20, fall 2021).
- elPercentAsOf: "2019-10-01" → **"2021-10-01"**.

The fall-2021 NCES figure is the most recent year published in the d23
edition; consistent with our cross-state convention.

## Bilingual credential

- No change. `bilingual.offered: false`, `standalone: false`, `addOn:
  false` retained.
- The current GaPSC field-codes sheet (revised January 2026) lists no
  Bilingual Education certification or endorsement field. The closest
  adjacent code, **Dual Immersion Elementary Education (863)**, is a
  dual-language-immersion endorsement targeting immersion-program
  teachers, not a bilingual EL credential, and remains outside the
  schema's `bilingual` definition.

## ELD (ESOL) credential

- `eld.offered`: unchanged (true).
- `eld.standalone`: unchanged (true). Confirmed by current code 885 in
  the P-12 Fields list ("Eng. To Speakers of Other Lang. (ESOL) – 885").
- `eld.addOn`: unchanged (true). Confirmed by current code 825 in the
  Teaching Endorsements list and by Rule 505-2-.166 (effective Jan 1, 2026).
- `eld.requirements.program`: **null → true**. Per Rule 505-2-.14, the
  primary route to a renewable ESOL endorsement is completing a
  state-approved educator preparation program. 505-3-.89 lays out the
  required program standards (effective Aug 15, 2023).
- `eld.requirements.coursework`: **null → true**. Rule 505-3-.89
  enumerates required content domains (English-language structures, SLA
  theory, language and culture, planning and assessment) that the program
  must address in syllabi.
- `eld.requirements.practicum`: **null → true**. Rule 505-3-.89 Standard
  5(iv) requires "field experiences to apply their knowledge and further
  develop their understanding of language, sociocultural context,
  planning and implementing instruction for ELs, and assessment and
  evaluation of ELs."
- `eld.requirements.test`: unchanged (true). GACE ESOL (Test 119) remains
  the GaPSC-approved content assessment for the ESOL field.
- `eld.requirements.languageProficiency`: unchanged (false). No required
  L2/world-language proficiency exam; ESOL is an English-instruction
  credential, not a bilingual one.

## SEI mandate

- `sei.mandatedForAllTeachers`: unchanged (false). Georgia has no
  state-wide SEI / sheltered-English mandate. ESOL endorsement is
  optional and credential-driven, not blanket-required of all teachers.

## Professional standards mentions

- `diverse`: unchanged (true). Term appears in current Rule 505-3-.03
  (Elementary Education program standards), although in a vocabulary
  definition rather than as a student-demographic descriptor.
- `cultural`: unchanged (false). The general elementary-prep standards
  rule contains no instances of "cultural" or "culturally." The ESOL-
  specific rule (505-3-.89) does, but that is a field-specific rule, not
  the general teacher-prep standards.
- `linguistic`: **false → true**. Rule 505-3-.03 (Elementary Education)
  Language and Literacy Professional Disposition (i): "Candidates
  promote language and literacy development for all students by using
  developmentally responsive practices and engaging in ethical and
  effective practices that honor all students' **linguistic**
  backgrounds." Multiple additional occurrences in the rule's literacy
  standards.
- `el`: unchanged (false). No mentions of "EL," "English learner,"
  "ELL," or "ESOL" in the general elementary teacher-prep rule (or in
  the umbrella EPP rule 505-3-.01, or the Code of Ethics 505-6-.01). EL
  references are concentrated in the ESOL-specific rule (505-3-.89).

## Seal of Biliteracy

- `adopted`: unchanged (true).
- `year`: unchanged (2016). Authorizing statute O.C.G.A. § 20-2-159.5
  (HB 879, 2016 Ga. Laws 618), effective July 1, 2016.
- `sourceUrl`: refined from generic `https://sealofbiliteracy.org/` to
  GADOE's authoritative program page
  (`https://gadoe.org/grants-awards-diploma-seals/seal-of-biliteracy/`).

## ELP assessment

- Unchanged. Georgia is a current WIDA Consortium member; ACCESS for
  ELLs remains the operational ELP test (also explicitly referenced as
  "WIDA Consortium English Language Development (ELD) standards and ELD
  assessment results" in Rule 505-3-.89 Standard 3(vi)).

## Sources

GADOE root URL (`http://www.gadoe.org` in Leider 2021) is now
`https://gadoe.org`; HTTP equivalents redirect. The Leider entries are
preserved as audit trail per skill rules. New 2026 entries appended:

- 505-2-.166 (ESOL endorsement certification rule)
- 505-2-.14 (general endorsements rule)
- 505-3-.89 (ESOL EPP program standards)
- 505-3-.03 (Elementary Education program — for professional-standards
  mentions)
- GaPSC Certificate Field Codes (Jan 2026 revision)
- NCES Digest Table 204.20 (d23)
- GADOE Seal of Biliteracy program page
- WIDA Consortium membership page

## Documents that disappeared since 2019

None of consequence. The only baseline source was `gadoe.org` (root
URL); it remains live and is now under HTTPS.
