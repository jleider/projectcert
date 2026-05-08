# NY — changes from baseline-2019 → verified-2026

Retrieval date: 2026-05-08
Reviewer: projectcert-2026
SEA: New York State Education Department (NYSED)

## Source snapshots saved 2026-05-08

- `nysed-nyseslat.html` — NYSESLAT program page (state-assessment/...)
- `nysed-cr-part-154.html` — CR Part 154 ELL/ML regulations & compliance
- `nysed-bilingual-extension.html` — OTI Extension (Bilingual) cert page
- `nysed-bilingual-requirements.html` — College/university program-specific requirements: Bilingual Education
- `nysed-tesol-requirements.html` — College/university program-specific requirements: ESOL/TESOL
- `nysed-ell-ml-certification.html` — Bilingual Ed Office "ELL and ML Educator Certification"
- `nysed-seal-of-biliteracy.html` — NYSSB program page
- `nys-teaching-standards-2011.pdf` — NY Board of Regents Teaching Standards (2011, still operative)
- `nces-table-204-20.html` — NCES Digest 2023, Table 204.20 (state EL%)

Reading notes for each source live in the companion `*.md` files in this folder.

## Diffs vs. baseline-2019

### elpAssessment — corrected (was miscoded as WIDA)

- `elpAssessment.name`: "ACCESS for ELLs" -> "NYSESLAT"
- `elpAssessment.consortium`: "WIDA" -> null
- `elpAssessment.sourceUrl`: wida.wisc.edu/about/consortium -> NYSED NYSESLAT page

NY administers its own state-developed annual ELP assessment (NYSESLAT) and has done so continuously since 2003. NY is not a WIDA Consortium member-state. The companion newcomer-screener (NYSITELL) is also NYSED-developed. The baseline record's WIDA/ACCESS coding was wrong. Source: `nysed-nyseslat.html`.

### credentials.bilingual — extension is add-on only

- `credentials.bilingual.standalone`: true -> false
- `credentials.bilingual.requirements.program`: null -> true
- `credentials.bilingual.requirements.practicum`: false -> true
- `credentials.bilingual.requirements.languageProficiency`: false -> true

NY's bilingual credential is the **Bilingual Education Extension**, which by its own definition "is attached to a valid base certificate." It is never issued standalone. An approved-program pathway exists (the program-specific requirements regulations are explicit), the program requires ≥50 clock hours of college-supervised field experience, and the Bilingual Education Assessment (BEA) functions as the language-proficiency instrument for the language other than English. Sources: `nysed-bilingual-extension.html`, `nysed-bilingual-requirements.html`.

Added `credentials.bilingual.notes` describing the extension-only nature and the BEA's dual exam/language-proficiency role.

### credentials.eld — practicum requirement made explicit

- `credentials.eld.requirements.program`: null -> true
- `credentials.eld.requirements.practicum`: null -> true

NY's ELD credential ("ESOL" in OTI listings, "TESOL" in higher-ed program names) is offered both as a standalone classroom-teacher certificate (CST 116 ESOL) and as a supplementary/add-on for already-certified teachers; baseline coding of `standalone: true, addOn: true` is preserved. The current program-specific requirements regulations require an approved program with ≥100 hours of pre-student-teaching field experience and ≥70 school days of student teaching with ELL students (Fall 2024+ enrollees). Sources: `nysed-tesol-requirements.html`, `nysed-ell-ml-certification.html`.

`languageProficiency` remains false — NY requires 12 LOTE semester hours as a coursework precondition for ESOL teaching, but this is not a target-language proficiency demonstration in the schema's sense (the credential authorizes teaching in English).

Added `credentials.eld.notes` to flag the dual brand naming (ESOL/TESOL) and CST 116.

### credentials.sei — unchanged

- `credentials.sei.mandatedForAllTeachers`: false (no change)

CR Part 154 imposes a CTLE professional-development obligation (15% of clock hours on language acquisition for ELLs) on general teachers of ELLs, but this is continuing education, not a credential mandate. NY does not belong to the AZ/CA/MA universal-mandate cluster. Source: `nysed-cr-part-154.html`.

Added `credentials.sei.notes` to record the CR Part 154 PD requirement so future reviewers don't mistake it for a mandate.

### professionalStandardsMentions — unchanged

The 2011 NYS Teaching Standards remain operative. Term scan: "diverse" yes, "cultural" yes, "linguistic"/"language" yes, "ELL/EL/ESOL/English Learner" no. No diff vs. baseline. Source: `nys-teaching-standards-2011.pdf`.

### sealOfBiliteracy — sourceUrl updated

- `sealOfBiliteracy.sourceUrl`: sealofbiliteracy.org aggregator -> NYSED NYSSB page

`adopted: true` and `year: 2013` retained. The legislation was signed July 31, 2012 and first awards issued 2015–16, but the conventional "adopted year" cited by sealofbiliteracy.org and most secondary sources is 2013. Source: `nysed-seal-of-biliteracy.html`.

### elPercent — refreshed to current NCES table

- `elPercent`: 9.2 -> 9.7
- `elPercentAsOf`: "2019-10-01" -> "2021-10-01"

NCES Digest 2023 Table 204.20, fall 2021 (most recent state-level table available). Source: `nces-table-204-20.html`.

## sources[] additions

Eight new entries appended (NYSED NYSESLAT, CR Part 154, bilingual extension OTI, bilingual program requirements, ESOL/TESOL program requirements, ELL/ML educator cert overview, NYSSB, NYS Teaching Standards 2011, NCES Table 204.20). The two `leider-2021` baseline entries are preserved untouched.

## Verification status

baseline-2019 -> verified-2026. All sources retrieved 200, read, and grounded against the schema fields above. No 404s without alternates.
