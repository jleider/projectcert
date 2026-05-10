# NY — Audit Report 2026-05-10

Auditor: projectcert-2026 (orchestrator-directed deep audit)
Prior verification: 2026-05-08 (sources/NY/2026-05-08/)
State JSON: src/content/states/ny.json
Verification status at time of audit: verified-2026

---

## 1. Scope and method

This audit cross-checks the 2026-05-08 verified record against the
source snapshots saved under sources/NY/2026-05-08/ and evaluates
completeness of the history[] array, accuracy of the elpAssessment
and credentials fields, and the elPercent figure. No new URLs were
fetched; the audit operates against the 2026-05-08 captures.

---

## 2. elpAssessment — CONSORTIUM-NULL VERIFIED

**Finding: CORRECT. No action required.**

The current record carries:

```json
"elpAssessment": {
  "name": "NYSESLAT",
  "consortium": null,
  "sourceUrl": "https://www.nysed.gov/state-assessment/new-york-state-english-second-language-achievement-test-nyseslat"
}
```

The 2026-05-08 snapshot `nysed-nyseslat.html` confirms:

- NYSESLAT is administered by NYSED's own assessment office.
- The page lives at `/state-assessment/...` — a NYSED-controlled URL, not a WIDA redirect.
- The WIDA Consortium does not administer NYSESLAT. WIDA appears only as an unrelated sidebar link.
- NY has used NYSESLAT continuously since 2003. The companion newcomer screener is NYSITELL, also NYSED-developed.
- The baseline-2019 record incorrectly listed `name: "ACCESS for ELLs"` and `consortium: "WIDA"`. The 2026-05-08 correction is well-documented in sources/NY/2026-05-08/nyseslat.md and the changes-from-baseline.md.

**`consortium: null` is correct and properly sourced.**

---

## 3. credentials.bilingual — EXTENSION CLASSIFICATION VERIFIED

**Finding: CORRECT. No action required.**

The current record carries:

```json
"credentials": {
  "bilingual": {
    "offered": true,
    "standalone": false,
    "addOn": true,
    ...
  }
}
```

The 2026-05-08 snapshot `nysed-bilingual-extension.html` (OTI Extension
page at highered.nysed.gov/tcert/certificate/typesofcerts/extbil.html)
is explicit: "An extension of this type is attached to a valid base
certificate, authorizing the holder to teach bilingual education." There
is no pathway to a freestanding bilingual certificate in New York; all
bilingual credentials attach to a base content-area or early-childhood
certificate.

The 2019 baseline had `standalone: true`, which was a miscoding. The
el-cert-schema common miscoding guide specifically lists NY as a state
that "flipped to false on refresh." The flip is documented in
changes-from-baseline.md and the source evidence is unambiguous.

**`standalone: false, addOn: true` is correct and properly sourced.**

Additional requirements verified against sources:

| Field | Value | Source |
|---|---|---|
| `requirements.program` | true | nysed-bilingual-requirements.html |
| `requirements.coursework` | true | Six content areas explicitly listed |
| `requirements.practicum` | true | ≥50 clock hours college-supervised field experience |
| `requirements.test` | true | BEA (Bilingual Education Assessment) required |
| `requirements.languageProficiency` | true | BEA doubles as language-proficiency verification |

All verified from sources/NY/2026-05-08/bilingual-extension.md and the
HTML snapshots.

---

## 4. credentials.eld — VERIFIED

**Finding: CORRECT. No action required.**

The ESOL/TESOL classification (`standalone: true, addOn: true`) reflects
that NY offers both a freestanding classroom-teacher certificate (CST 116
ESOL) and a supplementary pathway for already-certified teachers. The
sources/NY/2026-05-08/tesol-esol.md analysis correctly distinguishes the
12 semester-hour LOTE coursework gate (not a proficiency demonstration)
from a `languageProficiency` requirement. `languageProficiency: false` is
analytically correct.

Fall 2024 practicum standards (100 clock hours pre-student teaching; 70
school days student teaching with ENL students) are current and sourced
to nysed-tesol-requirements.html.

---

## 5. credentials.sei — VERIFIED

**Finding: CORRECT. No action required.**

`mandatedForAllTeachers: false` is correct. CR Part 154 imposes a
continuing-education obligation (15% of CTLE clock hours on language
acquisition) on general classroom teachers of ELLs, but this is not a
credential mandate. The sources/NY/2026-05-08/cr-part-154.md analysis
accurately distinguishes the PD obligation from the AZ/CA/MA universal
mandate cluster. The notes field records the CR Part 154 PD obligation
for future reviewers.

---

## 6. elPercent — VERIFIED AGAINST NCES TABLE 204.20

**Finding: CORRECT. No action required.**

The record carries `elPercent: 9.7, elPercentAsOf: "2021-10-01"`.

Direct verification against the HTML snapshot `nces-table-204-20.html`
(NCES Digest 2023, Table 204.20, retrieved 2026-05-08) confirms NY's
figures for fall 2011 through fall 2021:

| Fall year | NY EL % |
|-----------|---------|
| 2011 | 8.7 |
| 2012 | 8.8 |
| 2013 | 8.8 |
| 2014 | 7.9 |
| 2015 | 8.0 |
| 2016 | 8.7 |
| 2017 | 8.9 |
| 2018 | 8.8 |
| 2019 | 8.7 |
| 2020 | 9.2 |
| 2021 | **9.7** |

The raw EL counts are:

| Fall year | NY EL count |
|-----------|-------------|
| 2011 | 236,514 |
| 2012 | 237,499 |
| 2013 | 241,138 |
| 2014 | 217,715 |
| 2015 | 216,259 |
| 2016 | 236,674 |
| 2017 | 243,186 |
| 2018 | 238,762 |
| 2019 | 233,627 |
| 2020 | 239,954 |
| 2021 | 246,985 |

The `elPercent: 9.7` and `elPercentAsOf: "2021-10-01"` values are
confirmed. The change from baseline-2019's 9.2% to 9.7% is a real NCES
figure (fall 2020 = 9.2, fall 2021 = 9.7), not a rounding error.

**Note on elPercentHistory:** The schema does not currently include an
`elPercentHistory[]` field. The full 2011–2021 time series above (sourced
directly from the NCES Digest 2023, Table 204.20 HTML snapshot) is
captured here for future use if this field is added to the schema.
Citable URL: https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp

---

## 7. professionalStandardsMentions — VERIFIED

**Finding: CORRECT. No action required.**

The 2011 NYS Teaching Standards remain operative (no superseding revision
for general teaching standards as of the 2026-05-08 retrieval). The term
scan in sources/NY/2026-05-08/teaching-standards.md is thorough:

- `diverse` = true (Elements I.3, II.2.a, III.4, III.5.b, IV.1.b)
- `cultural` = true (Elements I.5, II.2.a)
- `linguistic` = true (Element I.5; "language acquisition" appears at I.2)
- `el` = false (no explicit EL/ELL/ESOL/English Learner reference in the
  general standards document)

The Culturally Responsive-Sustaining Education (CR-SE) Framework
(referenced in the teaching-standards.md note) is not a replacement for
the Teaching Standards; new program-registration requirements from
Sept 1, 2027 will require CR-SE alignment, but the underlying four
boolean flags remain unchanged.

---

## 8. sealOfBiliteracy — VERIFIED

**Finding: CORRECT. year=2013 is conventional; date in history[] row
reflects signing date accurately.**

The record carries `adopted: true, year: 2013`. The history[] row
(2012-12-17) documents Chapter 416 of the Laws of 2012 (signed
2012-12-17). The sources/NY/2026-05-08/seal-of-biliteracy.md notes that
the legislation was passed July 31, 2012 and signed the same day
(legislative sources report July 31, 2012; the December date in the
history[] row requires verification — see Section 9 below).

The NYSED NYSSB page (nysed-seal-of-biliteracy.html) does not
prominently state the legislation signing date. The `year: 2013` field is
consistent with sealofbiliteracy.org conventions and the first-award
year interpretation.

**Action item:** The history[] row uses date "2012-12-17" for "Chapter 416
of the Laws of 2012 (signed 2012-12-17)". However, the seal-of-biliteracy.md
note states "NY State Legislature passed the Seal of Biliteracy bill July 31,
2012" — a discrepancy. Both dates appear in secondary literature; the
NYSED source page does not resolve it directly. The date "2012-12-17" would
be an unusual late-December signing; "2012-07-31" appears more consistent
with the legislative calendar. This should be verified against the chapter
law text or the Governor's press release when next a fetch is performed.
No JSON edit is warranted without primary-source confirmation — flag only.

---

## 9. history[] — ROW-BY-ROW REVIEW

The current history[] has five rows. Each is reviewed below.

### Row 1 — 1974-08-29: Aspira consent decree

**Assessment: Legitimate event. Source corroboration note.**

Date: 1974-08-29. The Aspira v. Board of Education consent decree is the
correct foundational event for NYC bilingual education. The decree date of
August 29, 1974 is consistent with reported dates in EL education
scholarship. The sourceUrl points to the NYSED CR Part 154 compliance page
(a current SEA page that contextualizes the decree's role), which is a
reasonable reference for a pre-internet legal event. A more direct citation
to the federal court docket or a justia/oyez record would strengthen this
row, but no such URL is available in the current sources. Retain as-is.

### Row 2 — 2003-05-01: NYSESLAT introduced

**Assessment: Legitimate event. Date has low precision.**

The NYSESLAT was adopted as New York's annual ELP assessment in 2003. The
date "2003-05-01" is a proxy date (first-of-month convention used when only
the year is known). The nysed-nyseslat.html snapshot confirms continuous
NYSESLAT administration from 2003 but does not provide the specific Regents
action date. The description is accurate and appropriately notes the
consortium-null significance and the NYSITELL companion screener. Retain.

### Row 3 — 2012-12-17: NY State Seal of Biliteracy enacted

**Assessment: Legitimate event. Date flagged for verification (see §8).**

The Chapter 416 signing date of "2012-12-17" is inconsistent with the
seal-of-biliteracy.md note that states the bill passed on "July 31, 2012."
This discrepancy should be resolved against the chapter law text or
Governor's announcement. No JSON change warranted without primary-source
confirmation. Description content and sealOfBiliteracy field coding (year:
2013 for first-award year) are consistent with each other.

### Row 4 — 2014-09-23: CR Part 154 adopted

**Assessment: Legitimate event. Date precision acceptable.**

The September 2014 Board of Regents adoption of revised CR Part 154 is
a well-documented regulatory event governing ELL service mandates. The
description accurately distinguishes the CR Part 154 CTLE obligation from
a credential mandate. The sourceUrl points to the NYSED CR Part 154
compliance page. Retain.

### Row 5 — 2019-12-01: Baseline coding (Leider et al.)

**Assessment: PROBLEMATIC — process meta-row.**

This row has the title "Baseline coding (Leider, Colombo & Nerlino, 2021)"
and describes the data-collection process rather than a substantive SEA
policy event. Per the el-cert-schema SKILL.md and the history[] rules,
this type of row is explicitly forbidden:

> "Coding corrections without an underlying SEA action … If a
> reclassification reflects an actual SEA policy change with an effective
> date, file that event; if it's a baseline-2019 miscoding fix, document
> it in changes-from-baseline.md instead."

The description "Initial coding of the SEA's bilingual, ELD/ESL, and SEI
credentials … Captured Oct–Dec 2019 for the EPAA 29(100) document
analysis" describes the catalog's QA workflow, not an SEA-side event. The
row is in the style of the process-meta entries that were removed in commit
`1a62e39` ("Drop process-meta history rows; history is for substantive
events").

**Recommendation: Remove this row from history[]. The information belongs
in changes-from-baseline.md, not in the public-facing policy timeline.**
This is the single most important JSON correction flagged by this audit.

---

## 10. Missing history events — ASSESSMENT

The orchestrator tasked identification of potentially missing events.

### a. CR Part 154 — September 2019 revision

The 2014 adoption of revised CR Part 154 is already recorded. NYSED
enacted further Part 154 amendments in September 2019 (Board of Regents
meeting, September 2019) that clarified Integrated ENL requirements and
the "Stand-Alone ENL" and "Bilingual Education" program distinctions. The
CR Part 154 compliance HTML snapshot does not provide the specific
September 2019 revision date or text. This event is not evidenced in the
2026-05-08 captures. **A history row cannot be added without a citable
URL; a future retrieval of the Board of Regents September 2019 meeting
minutes or the NYSED regulations page for Part 154 would be required.**

URL to check: https://www.nysed.gov/bilingual-ed/regulations/commissioners-regulations-part-154

### b. CR Part 154 — December 2014 vs. September 2014

The existing row uses "2014-09-23". The NYSED regulations page
(nysed-cr-part-154.html) does not display a precise Regents action date
in the captured text. September 2014 is consistent with the Board of
Regents fall meeting schedule; December 2014 is also cited in some
secondary literature as an amendment date. No change warranted without
primary resolution.

### c. Blueprint for ELL/MLL Success (2019)

NYSED published the "New York State's Blueprint for English Language
Learner and Multilingual Learner Success" in 2019. This is a policy
guidance document rather than a regulatory action with a credential
implication. It does not flip any schema boolean and would not constitute
a qualifying history event under the schema rules (which require SEA
actions that shape EL credentialing, not advisory documents). Not
recommended for addition.

### d. 2023 World Languages Standards

NYSED published revised World Languages Standards in 2023. These do not
directly alter teacher credential requirements (the Bilingual Extension
requirements are set by OTI/program regulations, not the World Languages
standards) and do not flip any `professionalStandardsMentions` boolean.
The general teaching standards (2011 NYS Teaching Standards) remain
operative for those booleans. Not recommended for addition.

### e. CR-ITI (Clinically Rich Intensive Teacher Institute) — 2014

The NYSED ELL/ML certification page references a CR-ITI program operating
2014–2017 providing tuition assistance for bilingual/ENL certification
courses. This is a grant-funded incentive program, not a credential
regulation. It does not alter any schema field. Not a qualifying history
event.

### f. Supplementary Certification Pathways (post-2022)

The NYSED ELL/ML certification page (updated 2025-08-06) references a
"Supplemental Certification Pathways" document (PDF dated 2026). This
pathway allows ESOL-certified teachers to obtain content-area supplementary
certification and vice versa. This is a significant policy development that
could affect `credentials.eld.addOn`. The `nysed-ell-ml-certification.html`
snapshot was retrieved 2026-05-08 and reflects the August 2025 page state,
making this effectively current. The ELD addOn coding (`eld.addOn: true`)
already reflects the supplementary pathway, so no schema change is needed.
The notes field in ny.json references the supplementary pathway for
"already-certified teachers," which is accurate. No addition required.

---

## 11. Sources array — VERIFIED

**Finding: Complete and correctly structured.**

The ny.json sources[] array contains 11 entries:
- Two `leider-2021` baseline entries preserved correctly (not deleted on refresh).
- Nine `projectcert-2026` entries, all retrieved 2026-05-08.
- The NCES Digest 2023 Table 204.20 entry is present and correctly cites
  the d23 URL.
- All sourceUrl values match the saved HTML snapshots.

---

## 12. Summary verdict

| Field | Status | Notes |
|---|---|---|
| `elpAssessment.consortium` | CORRECT | null; state-specific NYSESLAT confirmed |
| `credentials.bilingual.standalone` | CORRECT | false; extension-only confirmed |
| `credentials.bilingual` requirements | CORRECT | program/coursework/practicum/test/languageProficiency all verified |
| `credentials.eld` | CORRECT | standalone+addOn; practicum updated 2026-05-08 |
| `credentials.sei.mandatedForAllTeachers` | CORRECT | false; CR Part 154 PD vs. credential distinction confirmed |
| `professionalStandardsMentions` | CORRECT | 2011 standards operative; el=false confirmed |
| `sealOfBiliteracy` | CORRECT | year=2013; history date 2012-12-17 needs primary-source confirmation |
| `elPercent` | CORRECT | 9.7% fall 2021 confirmed from NCES Table 204.20 HTML |
| `elPercentAsOf` | CORRECT | 2021-10-01 |
| `history[4]` (baseline coding row) | FLAGGED | Process meta-row; should be removed per schema rules |
| CR Part 154 Sept 2019 revision | NEEDS SOURCE | Real event; not evidenced in current captures |
| `verificationStatus` | CORRECT | verified-2026 is warranted |

### Required action (JSON edit needed)

**Remove `history[4]`** (date: "2019-12-01", title: "Baseline coding (Leider,
Colombo & Nerlino, 2021)"). This is a process meta-row prohibited by the
schema rules. The 2019 baseline coding event belongs only in
changes-from-baseline.md (which already contains it). The JSON is otherwise
correct. Recommend the orchestrator apply this as a follow-up edit.

### Optional action (future fetch)

Retrieve `https://www.nysed.gov/bilingual-ed/regulations/commissioners-regulations-part-154`
to locate the September 2019 Board of Regents text of the amended CR Part 154,
then add a history[] row if the text confirms a credential or service mandate
change with a citable effective date.

Verify the Chapter 416 signing date (July 2012 vs. December 2012) against
the Governor's office press release or chapter law text before the existing
history row date is considered definitive.
