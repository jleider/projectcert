# NH refresh — changes from baseline-2019

Date: 2026-05-08
Retriever: projectcert-2026

## Sources reviewed

1. `nh-ed-507-17-extracted.txt` — Ed 507.17 ESOL Teacher (eff. 8-11-23, current
   version of NH's standalone ESOL/ELD educator licensure rule).
2. `nh-ed500-administrative-rules.html` — Full Ed 500 series (NH Code of
   Administrative Rules, educator licensure). Used to confirm Ed 505.03
   professional education standards content and to confirm there is no
   bilingual/dual-language-specific endorsement in Ed 506 / Ed 507.
3. `wida-nh-id-placement-guidance.pdf` — NH/WIDA EL identification & placement
   guidance, confirms NH is a WIDA member state and uses ACCESS for ELLs as
   the annual ELP assessment (and W-APT/WIDA Screener for identification).
4. NH Department of Education, "New Hampshire Seal of Biliteracy" page
   (`https://www.education.nh.gov/who-we-are/commissioner/new-hampshire-seal-biliteracy`):
   confirms Commissioner Edelblut approved adoption in September 2020;
   first awards spring 2021.
5. NCES Digest of Education Statistics, Table 204.20 (fall 2021):
   New Hampshire EL share = 2.8% (4,822 ELs).

## Field-level diff vs. baseline

- `elPercent`: 2.8 (2019-10-01) → 2.8 (fall 2021, NCES Table 204.20).
  Value unchanged; updated `elPercentAsOf` to `2021-10-01` to reflect current
  NCES vintage.
- `credentials.bilingual`: still `offered: false`. Ed 506/Ed 507 do not list
  any bilingual/dual-language educator endorsement. (Ed 507.17 references
  bilingual/dual-language as program *types* an ESOL teacher should know
  about, not as a separate NH credential.) No change.
- `credentials.eld`:
  - `offered: true` — confirmed (Ed 507.17, current).
  - `standalone: true` — confirmed; Ed 507.17 establishes standalone ESOL
    teacher licensure K-12.
  - `addOn: true` — kept; NH licensure is competency-based and Ed 505.01–
    505.06 alternative pathways permit experienced licensed educators to
    add the ESOL endorsement by demonstrating Ed 507.17 competencies.
  - `requirements.program`: null → true. Ed 507.17(b)(2) explicitly requires
    qualifying "through an approved program or under one of the
    alternatives in Ed 505.01–Ed 505.06."
  - `requirements.coursework`: null → true. Ed 507.17(c) enumerates required
    competencies "through a combination of academic and supervised practical
    experiences" across six domains.
  - `requirements.practicum`: null → true. Ed 507.17(c) requires "supervised
    practical experiences" alongside academic work.
  - `requirements.test`: null. NH does not list a content-area test in
    Ed 507.17 (NH dropped statewide Praxis II content-test requirements
    several rule cycles ago and competency-based pathways dominate).
    Left null — ambiguous from the rule text alone.
  - `requirements.languageProficiency`: false → true. Ed 507.17(b)(3)
    requires the candidate "Demonstrate language proficiency in oral and
    written English in social and academic settings for ELs," and (b)(4)
    requires study of a second language (≥2 college semesters, 6+ months
    abroad, or native/heritage speaker evidence).
- `credentials.sei.mandatedForAllTeachers`: false. Confirmed; NH has no
  blanket SEI mandate (no AZ/CA/MA-style requirement). No change.
- `professionalStandardsMentions` (Ed 505.03, current rule text):
  - `diverse`: true → true. "develop diverse perspectives" appears verbatim.
  - `cultural`: false → true. Ed 505.03 requires educators to "create
    learning environments that…are culturally responsive" and to apply
    "cultural background" in instructional planning.
  - `linguistic`: false → true. Ed 505.03 requires applying knowledge of
    students' "language" and "language proficiency status" in instructional
    planning — direct linguistic content within the standards.
  - `el`: false → false. No explicit "English learner" / "EL" / "LEP" /
    "multilingual learner" term appears in Ed 505.03 itself; the closest
    is "language proficiency status," which is a proxy and not a direct
    EL mention. Held at false to keep the booleans literal.
- `sealOfBiliteracy.adopted`: null → true.
  `sealOfBiliteracy.year`: null → 2020 (Commissioner approval Sep 2020,
  first awards spring 2021). `sourceUrl` updated to NHED page.
- `elpAssessment`: unchanged. NH is a WIDA member; ACCESS for ELLs is the
  required annual ELP assessment.

## Disappeared / moved sources

None of the baseline (leider-2021) entries point to specific deep links
that need to be remapped — the baseline only cites `education.nh.gov`
home and the EPAA paper. Both still resolve.

## Net status

Promoted to `verified-2026`.
