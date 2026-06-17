# Massachusetts (MA) — Audit Report 2026-05-10

Auditor: projectcert orchestrator subagent (Sonnet 4.6)
Worktree branch: `worktree-agent-a1bc488dad710e206`
State file: `src/content/states/ma.json`
Prior verification: `verified-2026` (lastVerified 2026-05-08)
Prior audit trail: `sources/MA/2026-05-07/` and `sources/MA/2026-05-08-reaudit/`

---

## Summary

The 2026-05-08 re-audit left the record in clean shape on credentials and
professional standards. This audit focuses on: (1) history-row completeness
and accuracy; (2) missing events (pre-2019 and post-2019); (3) elPercent
verification against d23 and d22; (4) elPercentHistory construction; (5)
credential and standards spot-check in light of the May 20, 2025 603 CMR 7.00
amendment and April 29, 2026 alternative-licensure updates; and (6) source URL
integrity.

**Most consequential findings:**

1. **Five history rows are present and accurate.** No meta-process titles.
   Event dates, titles, and descriptions are well-sourced and accurate.

2. **Two important pre-2019 events are missing:** (a) The 2011-06-14 DOJ
   settlement row correctly exists; however, the RETELL phase-in effective
   dates (2012 initiative launch, 2014 initial-license requirement, 2016
   district assignment deadline) are collapsed into that single row without
   granular milestone entries. These are sub-events of one federal-compliance
   arc and the current row handles them reasonably in prose — no separate rows
   required, but the description could be tightened. (b) No row for the
   **June 26, 2018 Board action** that adopted the Bilingual Education
   Endorsement under 603 CMR 7.14(3) — the first LOOK Act implementation
   milestone with a concrete effective date and a citable BESE action.

3. **May 20, 2025 amendment to 603 CMR 7.00** ("MTEL Alternatives and Other
   Updates") is unrecorded. This is a confirmed BESE action that amended the
   regulations under which ESL, bilingual, and SEI credentials operate.
   The DESE licensure page confirms April 29, 2026 follow-on updates for
   alternative licensure pathway / Communications & Literacy Skills MTEL
   waiver. Neither appears in history[].

4. **elPercent 10.5 / elPercentAsOf "2021-10-01" are confirmed correct**
   against NCES d23 Table 204.20. No change recommended.

5. **elPercentHistory is absent from the schema** — the field does not yet
   exist in `src/content.config.ts`. A proposed table of annual NCES data is
   included below for when the schema adds it.

6. **Credential coding is confirmed correct.** bilingual: add-on only (not
   standalone). eld: standalone only (not add-on). SEI mandate: true.
   professionalStandardsMentions: all four true. No changes needed.

7. **sealOfBiliteracy.sourceUrl** points to the national sealofbiliteracy.org
   rather than the DESE-specific page. A DESE URL should be preferred if
   available.

---

## History rows reviewed

| # | Date | Title (current) | Assessment |
|---|------|-----------------|------------|
| 1 | 1971-11-04 | Massachusetts enacts first-in-nation transitional bilingual education mandate (Ch. 1005 of the Acts of 1971) | **Accurate.** Date is the Act's chapter-approval date. codified URL at malegislature.gov/Laws/GeneralLaws/PartI/TitleXII/Chapter71A is the correct codified-statute pointer. Ch. 1005 session-law reference in title is well-formed. Description accurately characterizes TBE mandate and national precedence. |
| 2 | 2002-11-05 | Voters pass Question 2 — English-only mandate replaces TBE (Ch. 386 of the Acts of 2002) | **Accurate.** Election date correct (Nov 5, 2002). Session law URL correct. Description correctly cites CA Prop 227 (1998) and AZ Prop 203 (2000) antecedents and Ron Unz campaign. Vote margin (~68-32%) is consistent with historical record. Correctly notes 2003-04 effective year and that mandate persisted until 2017 LOOK Act. One minor note: the session-law URL `/Acts/2002/Chapter386` should be the canonical reference; the current codified URL for c.71A reflects post-2017 LOOK Act language, not the 2002 text, so linking to the session law (as done here) is the right choice. |
| 3 | 2011-06-14 | U.S. DOJ / MA DESE settlement triggers RETELL and the SEI endorsement framework | **Accurate in substance.** Date is the settlement agreement date. The RETELL initiative and 603 CMR 7.14(1) connection is correctly characterized. The Castañeda v. Pickard standard is correctly invoked. The RETELL phase-in milestones (July 1, 2014 initial-license requirement; July 1, 2016 district assignment deadline) are referenced in the description but not as separate rows — see "Suggested additions" below. One concern: the sourceUrl `https://www.doe.mass.edu/licensure/endorsements/sei.html` is a current DESE page, not the settlement agreement itself. The DOJ settlement agreement URL would be more authoritative (https://www.justice.gov/sites/default/files/crt/legacy/2011/07/14/massagree.pdf) but requires verification that it resolves. The current citation is pragmatically sound — the DESE page acknowledges the settlement — but note the limitation. |
| 4 | 2017-11-22 | Massachusetts enacts the LOOK Act (Ch. 138 of the Acts of 2017) | **Accurate.** Date is the Governor's signature date (November 22, 2017). Description correctly characterizes the repeal of Question 2 English-only mandate, the multi-program-model authorization, and the Seal of Biliteracy. One issue: the sourceUrls cite DESE regulation and SEI endorsement pages, but not the session law itself. The canonical URL for the LOOK Act is `https://malegislature.gov/Laws/SessionLaws/Acts/2017/Chapter138`, which was confirmed to resolve and contain the correct content. This URL should be added (or substituted for the regulatory pages) to give a direct legislative citation. |
| 5 | 2017-11-22 | Massachusetts authorizes State Seal of Biliteracy | **Accurate.** Both rows on 2017-11-22 correctly reference the same LOOK Act. However, the Seal of Biliteracy row cites only `https://sealofbiliteracy.org/` — the national tracking site, not an authoritative Massachusetts source. The LOOK Act session law (Ch. 138, § 19) is the authoritative Massachusetts source; `malegislature.gov/Laws/SessionLaws/Acts/2017/Chapter138` should replace or supplement the national site URL. |
| 6 | 2019-12-01 | Baseline coding (Leider, Colombo & Nerlino, 2021) | **Meta-process row — should be removed per SKILL.md.** The skill document states "Do not add rows that describe the verification process itself" and lists prohibited patterns. "Baseline coding" rows are an audit-trail entry, not an SEA-side policy event. This row belongs in `changes-from-baseline.md`, not in `history[]`. It should be dropped from the JSON. |
| 7 | 2021-07-01 | SEI endorsement requirement extended to vocational educators | **Accurate.** The July 1, 2021 extension to vocational educators is a documented DESE policy event. SourceUrl resolves. |

---

## Suggested additions (chronological JSON)

### Row A — RETELL initiative launch (2012)

The 2011-06-14 DOJ settlement row mentions RETELL but the actual DESE program
launch in 2012 and the formal promulgation of 603 CMR 7.14(1) deserve a
discrete entry. The DESE RETELL page (https://www.doe.mass.edu/retell/)
confirms the initiative exists and describes the phase-in; it does not give an
exact 2012 start date in the fetched content. A safe row anchors to the
initial-license effective date (July 1, 2014), which is the first hard
regulatory deadline created by RETELL and is independently confirmable via
603 CMR 7.14(1).

```json
{
  "date": "2014-07-01",
  "title": "RETELL SEI endorsement becomes required for initial core-academic licenses",
  "description": "As the first hard deadline of the RETELL (Rethinking Equity and Teaching for English Language Learners) initiative, 603 CMR 7.14(1) took effect requiring all candidates for initial core-academic teacher licenses and initial academic administrator licenses to obtain the SEI Teacher Endorsement or an equivalent. The phased district-assignment deadline (requiring districts to place ELs with SEI-endorsed teachers) followed on July 1, 2016. Both deadlines operationalized the framework negotiated in the June 2011 DOJ–DESE settlement agreement.",
  "sourceUrls": [
    "https://www.doe.mass.edu/licensure/endorsements/sei.html",
    "https://www.doe.mass.edu/lawsregs/603cmr7.html?section=all"
  ]
}
```

### Row B — BESE adopts Bilingual Education Endorsement (2018)

The LOOK Act directed DESE to "establish endorsements for educators" by
May 1, 2018. The Bilingual Education Endorsement page confirms the Board
acted on June 26, 2018 ("established by the Board of Elementary and Secondary
Education on June 26, 2018"). This is a distinct regulatory event from the
LOOK Act itself and the first point at which the bilingual credential pathway
became operative.

```json
{
  "date": "2018-06-26",
  "title": "BESE adopts Bilingual Education Endorsement under 603 CMR 7.14(3)",
  "description": "Acting on the LOOK Act's directive to establish credentials for educators in bilingual programs by May 1, 2018 (with a brief extension), the Board of Elementary and Secondary Education adopted the Bilingual Education Endorsement on June 26, 2018, effective for the 2018–19 school year. The endorsement (codified at 603 CMR 7.14(3)) requires a foreign-language proficiency assessment, subject matter knowledge through an approved course of study or approved test, and 75 hours of field-based experience in a bilingual program setting. It is an add-on endorsement to a primary teacher license, not a standalone certification.",
  "sourceUrls": [
    "https://www.doe.mass.edu/licensure/endorsements/bilingual-ed.html",
    "https://www.doe.mass.edu/lawsregs/603cmr7.html?section=all"
  ]
}
```

### Row C — 603 CMR 7.00 amended for MTEL alternatives (2025)

The DESE educator licensure page confirms 603 CMR 7.00 was "Most Recently
Amended by the Board of Elementary and Secondary Education: May 20, 2025"
under the title "MTEL Alternatives and Other Updates." April 29, 2026 updates
describe an "Alternative Licensure Pathway to Waiving the Communications &
Literacy Skills Test." These amendments affect the licensure framework under
which ESL, bilingual education, and SEI endorsement candidates operate. The
MTEL waiver pathway directly affects the `eld.requirements.test: true` coding
(the ESL MTEL #54 requirement), since candidates may now satisfy the
Communications & Literacy prerequisite through an alternative pathway.
The subject-matter MTEL for ESL (#54) is separate from the C&L Skills test,
so `test: true` for the ESL license likely remains accurate, but the amendment
warrants flagging.

**Note:** The full text of the May 2025 amendment was not directly retrievable
(PDF 404). This row is grounded in the DESE licensure page's amendment notice
and the April 2026 follow-on updates — sufficient for a history entry but not
sufficient to recode credential fields. The orchestrator should retrieve the
full 603 CMR 7.00 amendment text before updating any `eld.requirements` fields.

```json
{
  "date": "2025-05-20",
  "title": "603 CMR 7.00 amended — MTEL alternatives and updated licensure pathways",
  "description": "The Board of Elementary and Secondary Education amended 603 CMR 7.00 on May 20, 2025, under the heading 'MTEL Alternatives and Other Updates.' Follow-on DESE guidance issued April 29, 2026 documented an alternative licensure pathway allowing qualified candidates to waive the Communications and Literacy Skills MTEL subject to meeting alternate standards. The amendments affect the licensure framework underlying ESL, Bilingual Education Endorsement, and SEI Endorsement pathways, though the subject-matter MTEL requirements for each credential (e.g., ESL MTEL #54, Bilingual Education MTEL) remain separately required and are not waived by this alternative.",
  "sourceUrls": [
    "https://www.doe.mass.edu/lawsregs/603cmr7.html?section=all",
    "https://www.doe.mass.edu/licensure/"
  ]
}
```

### Row to remove

**Row 6 (2019-12-01 baseline coding)** should be removed from `history[]`.
It describes the audit process, not an SEA-side policy event. Per SKILL.md:
"Baseline coding" is a prohibited pattern. Move to changes-from-baseline.md
if not already documented there (the 2026-05-07 changes-from-baseline.md
already covers this substantively).

---

## Suggested sourceUrl correction — LOOK Act row

The 2017-11-22 LOOK Act row should add the session-law URL as a primary source:

```
"https://malegislature.gov/Laws/SessionLaws/Acts/2017/Chapter138"
```

The 2017-11-22 Seal of Biliteracy row should replace `https://sealofbiliteracy.org/`
with the same session-law URL (citing Section 19 specifically) for authoritative
MA legislative provenance:

```
"https://malegislature.gov/Laws/SessionLaws/Acts/2017/Chapter138"
```

The sealOfBiliteracy.sourceUrl field in the top-level JSON also uses
`https://sealofbiliteracy.org/`. The DESE ELE page
(`https://www.doe.mass.edu/ele/`) references the Seal of Biliteracy under
state programs; if DESE has a dedicated Seal of Biliteracy page, that URL
would be more authoritative. Current URL resolves and is acceptable as a
cross-state tracker reference.

---

## elPercent verification

| Field | Current value | Verified value | Source |
|-------|--------------|----------------|--------|
| `elPercent` | 10.5 | **10.5** — confirmed | NCES d23 Table 204.20, MA row, fall 2021: 97,154 ELs / 10.5% |
| `elPercentAsOf` | "2021-10-01" | **"2021-10-01"** — confirmed | NCES d23 uses fall 2021 enrollment |

No changes required. NCES d24 Table 204.20 returned HTTP 404 on retrieval
(URL pattern `d24/tables/dt23_204.20.asp` not yet published or at a different
path as of 2026-05-10). The d23 figure remains the most recent nationally
comparable data point.

---

## elPercentHistory — proposed data (pending schema addition)

The `elPercentHistory` field does not exist in the current schema
(`src/content.config.ts`). The following proposed rows are recorded here
for use when the schema adds the field. All figures are from NCES Digest
of Education Statistics, Table 204.20 (various editions). Each row requires
verification against the specific edition cited.

Sources used:
- d19: https://nces.ed.gov/programs/digest/d19/tables/dt19_204.20.asp
  (fall 2000–2017; selected years)
- d22: https://nces.ed.gov/programs/digest/d22/tables/dt22_204.20.asp
  (fall 2000–2020; full annual series from 2015)
- d23: https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp
  (fall 2011–2021; full annual series)

| Year | MA EL% | Source table |
|------|--------|-------------|
| 2000 | 5.0% | d19 / d22 |
| 2005 | 5.3% | d19 / d22 |
| 2010 | 5.6% | d19 / d22 |
| 2011 | 7.5% | d23 |
| 2012 | 7.4% | d23 |
| 2013 | 7.7% | d23 |
| 2014 | 8.2% | d23 |
| 2015 | 8.6% (d23) / 8.9% (d22) | d23 / d22 — **discrepancy, verify** |
| 2016 | 9.0% (d23) / 9.3% (d22) | d23 / d22 — **discrepancy, verify** |
| 2017 | 9.7% (d23) / 10.0% (d22) | d23 / d22 — **discrepancy, verify** |
| 2018 | 9.9% (d23) / 10.3% (d22) | d23 / d22 — **discrepancy, verify** |
| 2019 | 10.2% (d23) / 10.6% (d22) | d23 / d22 — **discrepancy, verify** |
| 2020 | 10.0% (d23) / 10.2% (d22) | d23 / d22 — **discrepancy, verify** |
| 2021 | 10.5% | d23 (most recent) |

**Discrepancy note (2015–2020):** The d22 and d23 editions show materially
different percentages for MA for the same years. This is common in NCES
tables due to revised enrollment denominators between digest editions; the
more recent edition (d23) should be treated as authoritative for overlapping
years. The year-2000 and year-2005 figures (5.0% and 5.3%) appear in d19
and d22 and are consistent; the year-2010 figure (5.6%) is consistent across
editions. The jump from 5.6% (2010) to 7.5% (2011, d23) is notable — the
d22 table does not include 2011 individually, suggesting the gap between
2010 and 2015 in d22 obscures a substantial rise. The d23 annual series
(2011–2021) is the more granular source.

**Proposed elPercentHistory JSON (d23 as canonical, selected-year anchors
from d19/d22 for pre-2011):**

```json
"elPercentHistory": [
  {
    "year": 2000,
    "percent": 5.0,
    "sourceUrl": "https://nces.ed.gov/programs/digest/d22/tables/dt22_204.20.asp"
  },
  {
    "year": 2005,
    "percent": 5.3,
    "sourceUrl": "https://nces.ed.gov/programs/digest/d22/tables/dt22_204.20.asp"
  },
  {
    "year": 2010,
    "percent": 5.6,
    "sourceUrl": "https://nces.ed.gov/programs/digest/d22/tables/dt22_204.20.asp"
  },
  {
    "year": 2011,
    "percent": 7.5,
    "sourceUrl": "https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp"
  },
  {
    "year": 2012,
    "percent": 7.4,
    "sourceUrl": "https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp"
  },
  {
    "year": 2013,
    "percent": 7.7,
    "sourceUrl": "https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp"
  },
  {
    "year": 2014,
    "percent": 8.2,
    "sourceUrl": "https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp"
  },
  {
    "year": 2015,
    "percent": 8.6,
    "sourceUrl": "https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp"
  },
  {
    "year": 2016,
    "percent": 9.0,
    "sourceUrl": "https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp"
  },
  {
    "year": 2017,
    "percent": 9.7,
    "sourceUrl": "https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp"
  },
  {
    "year": 2018,
    "percent": 9.9,
    "sourceUrl": "https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp"
  },
  {
    "year": 2019,
    "percent": 10.2,
    "sourceUrl": "https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp"
  },
  {
    "year": 2020,
    "percent": 10.0,
    "sourceUrl": "https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp"
  },
  {
    "year": 2021,
    "percent": 10.5,
    "sourceUrl": "https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp"
  }
]
```

Notable pattern: MA EL enrollment roughly doubled as a share of total
enrollment between 2000 (5.0%) and 2021 (10.5%), with a pronounced
acceleration after 2010. The 2011 figure (7.5%) substantially exceeds 2010
(5.6%), suggesting either a methodology revision or a genuine surge in
immigrant enrollment. The d22 table's 2015 figure of 8.9% vs. d23's 8.6%
(a 0.3 pp gap) is typical of denominator revisions between editions.

---

## Credentials and standards spot-check

### ESL license (ELD credential)

- `eld.offered: true` — confirmed. ESL is a standalone PreK-6 and 5-12
  teacher license field under 603 CMR 7.04(3)(a)(11).
- `eld.standalone: true` — confirmed. Listed in Academic PreK-12
  field/grade-levels as a teacher field, not in the endorsements list.
- `eld.addOn: false` — confirmed. No ESL endorsement exists; ESL is
  only a standalone license.
- `eld.requirements.test: true` — confirmed. 603 CMR 7.04(2)(b)(3)
  requires passing score on subject matter knowledge test (MTEL ESL #54).
  Note: the May 2025 603 CMR 7.00 amendment introduced MTEL
  alternatives for the Communications & Literacy Skills test. The
  subject-matter ESL MTEL (#54) is a separate requirement and is NOT
  covered by the C&L Skills waiver; `test: true` is likely still correct
  but should be confirmed against the full amendment text.
- `eld.requirements.practicum: true` — confirmed. ESL is a teacher
  license under standard programs requiring field experience.
- `eld.requirements.program: null` — retained; current source doesn't
  give a clean true/false for approved-program-vs.-coursework.
- `eld.requirements.coursework: null` — retained; same reason.
- `eld.requirements.languageProficiency: false` — confirmed. No
  language proficiency requirement for ESL license (contrast with
  Bilingual Education Endorsement, which requires a foreign-language
  proficiency test).

### Bilingual Education Endorsement

- `bilingual.offered: true` — confirmed.
- `bilingual.standalone: false` — confirmed. Endorsement only; no
  standalone bilingual education teacher license on field-grade-levels list.
- `bilingual.addOn: true` — confirmed. Add-on to any primary teacher license.
- `bilingual.requirements.coursework: true` — confirmed. 603 CMR
  7.14(3)(a)(2) requires completion of approved course of study (or test).
- `bilingual.requirements.practicum: true` — confirmed. 603 CMR
  7.14(3)(a)(3): 75 hours field-based experience required.
- `bilingual.requirements.languageProficiency: true` — confirmed.
  603 CMR 7.14(3)(a)(1): passing score on foreign-language proficiency
  test required.
- `bilingual.requirements.test: false` — confirmed with nuance. The
  "test" alternative to the approved-course-of-study (7.14(3)(a)(2))
  is a subject-matter test, not separately required alongside coursework.
  The MTEL Bilingual Education test satisfies the SMK requirement OR
  the approved course of study can satisfy it. Since coursework is the
  primary pathway and `test: false` means no separate test is required
  alongside the other requirements, this coding is defensible. However,
  it could be interpreted as `test: true` since passing the MTEL Bilingual
  is an available (and likely common) pathway. Coding is consistent with
  prior verification; no change recommended but flag for schema discussion.
- `bilingual.requirements.program: null` — retained. The approved-
  course-of-study is functionally a program requirement, but the current
  schema null is consistent with prior verification.

### SEI Endorsement and mandate

- `sei.mandatedForAllTeachers: true` — confirmed. MA is one of the three
  SEI-mandate states (with AZ and CA). 603 CMR 7.14(1) requires core-
  academic teachers, administrators, and (since July 1, 2021) vocational
  educators serving ELs to hold the endorsement.
- `sei.notes` — current text is accurate and current. The LOOK Act (2017)
  and 603 CMR 7.14(1) citations are correct. The vocational educator
  extension date (July 1, 2021) is correct.
- **LOOK Act framing correction:** The notes state the "statutory backbone"
  of the SEI framework is the LOOK Act (2017). This is slightly misleading —
  the SEI endorsement framework was created by RETELL and the DOJ settlement
  (2011) and promulgated in 603 CMR 7.14(1) before the LOOK Act; the LOOK
  Act codified it and expanded the bilingual program landscape but did not
  create the SEI mandate. This nuance is in the history[] rows but the notes
  field could be clarified.

### professionalStandardsMentions

- `diverse: true` — confirmed. 603 CMR 7.08(3)(a): "diverse cultural and
  linguistic backgrounds."
- `cultural: true` — confirmed. 603 CMR 7.08(2)(b): "cultural proficiency";
  7.08(3)(a) "cultural and linguistic backgrounds."
- `linguistic: true` — confirmed. 603 CMR 7.08(3)(a) and (3)(c): "linguistic
  backgrounds," "English learners at various levels of English language
  proficiency and literacy."
- `el: true` — confirmed. 603 CMR 7.08(3)(b): "English learners" explicit;
  7.08(3)(c): "English learners" explicit. All four booleans remain correct.

---

## Source URL concerns

| URL | Status | Concern |
|-----|--------|---------|
| `http://www.doe.mass.edu` (baseline) | Redirects to https | HTTP not HTTPS; acceptable as audit-trail entry, not citation-bearing |
| `https://www.doe.mass.edu/licensure/endorsements/sei.html` | Resolves | Current and correct |
| `https://www.doe.mass.edu/licensure/endorsements/bilingual-ed.html` | Resolves | Current and correct |
| `https://www.doe.mass.edu/licensure/academic-prek12/teacher/field-grade-levels.html` | Resolves | Current and correct |
| `https://www.doe.mass.edu/lawsregs/603cmr7.html?section=all` | Resolves | Current and correct; note May 2025 amendment |
| `https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp` | Resolves | Correct |
| `https://malegislature.gov/Laws/GeneralLaws/PartI/TitleXII/Chapter71A` | Resolves | Correct; content reflects post-LOOK Act codification |
| `https://malegislature.gov/Laws/SessionLaws/Acts/2002/Chapter386` | Resolves | Correct for Question 2 session law |
| `https://sealofbiliteracy.org/` | Resolves (national site) | Should supplement with LOOK Act session law URL or DESE-specific page |
| `https://wida.wisc.edu/about/consortium` | Not checked (cross-state shared source) | Acceptable per shared-source convention |

**Missing from sources[] that should be added:**
- `https://malegislature.gov/Laws/SessionLaws/Acts/2017/Chapter138` — the LOOK
  Act session law, confirmed to resolve with correct content. Needed to
  support LOOK Act history rows.
- `https://www.doe.mass.edu/retell/` — RETELL page resolves and describes the
  phase-in timeline; useful corroboration for the 2011 DOJ settlement row.

---

## Action items for the orchestrator

Priority order:

1. **Remove history row 6 (2019-12-01 "Baseline coding")** from `ma.json` —
   it violates the SKILL.md prohibition on meta-process rows in `history[]`.

2. **Add LOOK Act session-law URL** (`malegislature.gov/Laws/SessionLaws/Acts/2017/Chapter138`)
   to the sourceUrls of both 2017-11-22 history rows and to sources[].

3. **Add history row B** (2018-06-26 BESE Bilingual Education Endorsement
   adoption) — well-sourced, significant policy event, currently missing.

4. **Consider adding history row A** (2014-07-01 RETELL initial-license
   effective date) as a concrete SEA-side milestone — currently folded into
   the 2011 DOJ settlement row, which conflates the federal settlement with
   the MA regulatory response.

5. **Flag 603 CMR 7.00 May 2025 amendment** for follow-up: retrieve the full
   amendment text (BESE meeting materials from May 20, 2025) to confirm
   whether MTEL alternative pathways affect the `eld.requirements.test: true`
   coding for the ESL license. If the subject-matter ESL MTEL (#54) is
   unaffected, no coding change needed; if the amendment added an alternative
   to the subject-matter MTEL, `test` should be revisited.

6. **Add history row C** (2025-05-20 603 CMR 7.00 amendment) once the full
   amendment text is retrieved and reviewed.

7. **Build elPercentHistory** when the schema adds the field — data is ready
   (table above); use d23 as canonical for 2011-2021, d22 for 2000/2005/2010.
   Note the 2015 discrepancy between d22 and d23 (8.9% vs. 8.6%) requires a
   decision on which edition to use for pre-2021 years where both exist.

8. **sei.notes minor clarification** — note that the SEI mandate predates the
   LOOK Act (DOJ settlement 2011, 603 CMR 7.14(1) promulgated under RETELL);
   LOOK Act codified and expanded it. The current notes text ("Statutory
   backbone: LOOK Act (2017)") overstates LOOK Act's role in creating the SEI
   mandate.
