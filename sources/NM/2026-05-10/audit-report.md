# NM Audit Report — 2026-05-10

Auditor: projectcert-2026 (subagent)
State file: `src/content/states/nm.json`
Prior verification: `sources/NM/2026-05-07/changes-from-baseline.md`
Current `verificationStatus`: `verified-2026` (set 2026-05-07)

---

## Summary

The 2026-05-07 verification was thorough and the record is substantively accurate. This audit
identifies three categories of findings:

1. **`history[]` gaps** — the existing four rows leave out several legally significant events:
   the 1912 NM Constitution Article XII §10 language right, the 2000 adoption of the bilingual
   (6.64.10) and TESOL (6.64.11) NMAC endorsement rules, the 2003 BMEP rule amendment, the
   2022 TESOL rule replacement (6.64.11, effective 2022-07-01), and the 2023 BMEP rule amendment
   (6.32.2 NMAC). The Yazzie/Martinez row lacks procedural milestones (the 2021 Equity Order and
   the 2025 Revised Action Plan submission).

2. **`elPercent` / `elPercentAsOf`** — confirmed correct. NCES d23 Table 204.20 reports
   NM fall 2021 = **18.8%**; `elPercentAsOf: "2021-10-01"` is correctly coded. No d24 table
   was available at time of audit (URL 404d); d23 remains the most recent usable source.

3. **`elPercentHistory[]` proposal** — a full table is assembled below from NCES d18, d19,
   d20, d21, d22, and d23. Gaps remain for 2001–2004 and 2006–2009 (not published individually
   in the digest tables sampled). All data points are citable to the specific digest table.

4. **Credentials and standards** — confirmed correct on re-check. One note on the TESOL rule:
   6.64.11 NMAC was fully repealed and replaced effective 2022-07-01, tightening the coursework
   distribution requirements (12 hours must be upper-division or post-baccalaureate). The current
   `credentials.eld.notes` accurately reflects the current rule; a `history[]` row for the 2022
   replacement is warranted.

5. **`professionalStandardsMentions`** — the 2026-05-07 verification correctly re-coded
   `linguistic: false` and `el: false` against 6.69.4 NMAC. Confirmed on re-check: the general
   teacher competencies regulation contains no explicit mention of English Learners, ELL, ESL,
   or "linguistically diverse." The `cultural: true` and `diverse: true` codings are well-grounded.

---

## History Rows Reviewed

| Row | Date | Title | Assessment |
|---|---|---|---|
| 1 | 1973-04-05 | Bilingual Multicultural Education Act enacted | **Confirm** — date and description accurate. NMSA 22-23. Source URL (BMEP FAQs) is indirect; see concern below. |
| 2 | 2014-03-05 | State Seal of Bilingualism-Biliteracy enacted | **Concern** — The NMPED Seal page cites the enabling statute as NMSA 22-1-9.1, not the session-law chapter. The chapter cited in the JSON ("NM Laws 2014, ch. 46") cannot be independently verified from the sources available in this audit; the NMPED page cites the codified statute (22-1-9.1). The description says "NM Laws 2014, ch. 46 (Senate Bill 159)" but the NM Legislature database shows SB 159 (2014) was an education technology infrastructure bill (Ch. 28). This is a discrepancy: either the bill number is wrong, or the chapter number is wrong. The implementing NMAC is also misidentified: the JSON says "6.32.2 NMAC" but the NMPED Seal page says the implementing rule is **6.32.3 NMAC**. |
| 3 | 2018-07-20 | Yazzie/Martinez ruling | **Confirm with caveats** — date and substance are correct. Source URL (BMEP FAQs) is indirect; a direct court document URL would be stronger. The July 20, 2018 date is cited in other credible secondary sources. The description correctly notes the 2014 consolidated filing and February 2026 plaintiff objections to the November 2025 RAP. |
| 4 | 2019-12-01 | Baseline coding | **Confirm** — meta-process entry appropriately documents the seed paper coding event. |

### Concern: Row 2 (Seal of Biliteracy) — bill number / implementing regulation discrepancy

The `history[]` row for the Seal states "NM Laws 2014, ch. 46 (Senate Bill 159)" and "NMPED
rules at 6.32.2 NMAC." Two problems:

- **Senate Bill 159, 2014:** NM Legislature records show SB 159 (2014 regular session) was
  "EDUCATION TECHNOLOGY INFRASTRUCTURE FUNDING," signed as Chapter 28 on March 6, 2014. This
  is not the Seal of Biliteracy bill.
- **Implementing NMAC:** The current NMPED Seal of Bilingualism-Biliteracy page cites
  **6.32.3 NMAC** as the implementing rule (not 6.32.2 NMAC, which governs BMEPs).
- **Chapter 46:** Could not be independently verified in this audit. The chapter number may
  be correct with a different bill number; or the chapter number itself may be wrong.

**Recommendation:** The bill number "(Senate Bill 159)" should be removed from the `history[]`
row until the correct bill can be identified. The implementing NMAC should be corrected from
6.32.2 to **6.32.3**. The orchestrator should verify "NM Laws 2014, ch. 46" against the
NM Session Laws archive before confirming. The codified statute NMSA 22-1-9.1 can be cited
instead of the session-law chapter number.

---

## Suggested History Additions

These events are documented in sources retrieved during this audit and warrant `history[]`
rows. They are sorted chronologically for insertion.

### 1. NM Constitution Article XII §10 — language right for Spanish-speaking children

New Mexico's constitution has contained a language-rights provision since statehood (1912).
Article XII §10 protects the educational rights of Spanish-speaking children and is often
cited as a constitutional predicate for the BMEA. However, the NM Constitution is not freely
accessible in a fetchable codified URL during this audit (law.justia.com returned 403;
nmonesource.com returned 403). Until a citable URL is confirmed, this row should **not** be
added. Do not fabricate a constitutional citation URL.

**Status: Do not add — no confirmed citable URL.**

### 2. BMEP rule first adopted / bilingual and TESOL endorsement rules adopted (2000-09-29)

6.64.10 NMAC (Bilingual Education endorsement) and 6.64.11 NMAC (TESOL endorsement) were
both originally filed on 2000-09-29, establishing the current endorsement framework for the
first time as NMAC rules.

```json
{
  "date": "2000-09-29",
  "title": "Bilingual Education and TESOL endorsement rules adopted (6.64.10 and 6.64.11 NMAC)",
  "description": "NMPED adopted 6.64.10 NMAC (Competencies for Entry-Level Bilingual Education Teachers) and 6.64.11 NMAC (TESOL Competencies) effective September 29, 2000, formalizing the semester-hour, licensure-exam, and language-proficiency requirements for the bilingual education endorsement and the TESOL endorsement under NMAC Title 6. These rules replaced prior State Board of Education policy with enforceable administrative code, establishing the dual-endorsement framework that remains in effect (with the TESOL rule later repealed and replaced in 2022).",
  "sourceUrls": [
    "https://www.srca.nm.gov/parts/title06/06.064.0010.html",
    "https://www.srca.nm.gov/parts/title06/06.064.0011.html"
  ]
}
```

**Assessment: Add.** Both URLs are fetchable SRCA pages with history sections confirming
the September 29, 2000 adoption dates.

### 3. 6.64.10 NMAC amended (2006)

The bilingual education endorsement rule was amended twice in 2006 (May 31 and October 31).
The SRCA history shows these as "A" (amendment) notations. Without a diff of the pre- and
post-amendment text, the substantive change cannot be characterized precisely enough for a
useful `history[]` row.

**Status: Do not add without further source investigation.**

### 4. BMEP program rule repealed and replaced, effective 2018-07-01 (6.32.2 NMAC)

The BMEP implementation rule (6.32.2 NMAC) was repealed and replaced effective July 1, 2018.
The SRCA history note shows the prior version was filed November 30, 2005, and the replacement
became effective July 1, 2018 — coinciding with (and likely driven by) the July 20, 2018
Yazzie/Martinez ruling.

```json
{
  "date": "2018-07-01",
  "title": "BMEP implementation rule repealed and replaced (6.32.2 NMAC)",
  "description": "New Mexico's Bilingual Multicultural Education Program (BMEP) implementation rule (6.32.2 NMAC) was repealed and replaced effective July 1, 2018. The prior version had been in place since November 2005. The replacement occurred weeks before the July 20, 2018 Yazzie/Martinez ruling, which found the State had inadequately funded BMEPs and failed to provide sufficient education to English learners and Native American students. The 2018 rule was subsequently amended on July 18, 2023.",
  "sourceUrls": [
    "https://www.srca.nm.gov/parts/title06/06.032.0002.html"
  ]
}
```

**Assessment: Add.** SRCA page confirms the 2018-07-01 effective date.

### 5. 6.64.11 NMAC (TESOL) repealed and replaced, effective 2022-07-01

This is the most significant credential-related history event missing from the current record.

```json
{
  "date": "2022-07-01",
  "title": "TESOL endorsement rule repealed and replaced (6.64.11 NMAC)",
  "description": "New Mexico repealed and replaced 6.64.11 NMAC (TESOL Competencies) effective July 1, 2022. The new rule retains the 24-semester-hour requirement for initial candidates and the 12-hour add-on pathway for existing license holders, but introduces new coursework-distribution requirements: a minimum of 6 hours in a non-English language or applied linguistics/second language acquisition/teaching methodology, and a minimum of 12 hours at upper-division or post-baccalaureate level. The rule also codifies a credit-hour waiver for documented language proficiency (bilingual education language proficiency exams, relevant degrees, or Native American language certification). The English language proficiency examination requirement for international reciprocal license holders is unchanged.",
  "sourceUrls": [
    "https://www.srca.nm.gov/parts/title06/06.064.0011.html"
  ]
}
```

**Assessment: Add.** SRCA history note explicitly states: "6.64.11 NMAC, TESOL Competencies,
filed 9/29/2000, was repealed and replaced by 6.64.11 NMAC, TESOL Competencies, effective
7/1/2022."

### 6. 6.32.2 NMAC (BMEP rule) amended, 2023-07-18

The BMEP rule was amended again on July 18, 2023. The SRCA page identifies sections 6.32.2.1,
.3, .4, .6, .7, .10, .11, .12, and .16 as amended on this date. Substantive changes are not
detailed in the amendment notation; without a diff the content cannot be characterized with
precision adequate for a `history[]` description.

**Status: Add as a brief marker if the content of the 2023 amendment can be confirmed;
otherwise hold pending further source investigation.**

Proposed (minimal, if orchestrator chooses to add):

```json
{
  "date": "2023-07-18",
  "title": "BMEP rule amended (6.32.2 NMAC)",
  "description": "New Mexico amended its Bilingual Multicultural Education Program implementation rule (6.32.2 NMAC) effective July 18, 2023. Sections addressing issuing agency, statutory authority, program duration, objectives, definitions, and several implementation provisions were updated. The amendment follows the 2021 Equity Order issued in the consolidated Yazzie/Martinez litigation, which directed the State to strengthen programmatic supports for English learners and Native American students.",
  "sourceUrls": [
    "https://www.srca.nm.gov/parts/title06/06.032.0002.html"
  ]
}
```

**Assessment: Add with caution** — the description's reference to the 2021 Equity Order
is contextually supported but not explicitly stated in the SRCA page. The orchestrator should
confirm the 2023 amendment content before including that causal link.

### 7. Hispanic Education Act enacted (HB 150, NM Laws 2010, ch. 114)

House Bill 150 (2010), titled "HISPANIC EDUCATION ACT," was signed by the governor on
March 10, 2010, as Chapter 114. The full text is not machine-readable (PDF is binary-encoded
in the NM Legislature archive), so the substantive provisions cannot be confirmed from this
audit. The bill likely relates to Hispanic student academic achievement policy, but without
readable bill text its relationship to EL credentialing cannot be established.

**Status: Do not add** — bill text not readable; specific connection to EL teacher
credentialing not confirmed.

### 8. Native American Language and Culture certificate rule adopted (6.63.14 NMAC, 2003-09-30)

```json
{
  "date": "2003-09-30",
  "title": "Native American Language and Culture certificate rule adopted (6.63.14 NMAC)",
  "description": "NMPED adopted 6.63.14 NMAC (Certification in Native American Language and Culture, Pre K-12) effective September 30, 2003, establishing the 520 NALC certificate as an alternative pathway for teachers of Native American languages. The certificate requires tribal verification of language and cultural competence in lieu of the standard licensure examination, and is limited to first-hour language arts instruction. It is not a full teaching license. The rule was subsequently amended June 30, 2006.",
  "sourceUrls": [
    "https://www.srca.nm.gov/parts/title06/06.063.0014.html"
  ]
}
```

**Assessment: Add.** SRCA history note confirms September 30, 2003 adoption date.

---

## `elPercent` Verification

| Field | Current value | Audit finding |
|---|---|---|
| `elPercent` | 18.8 | **Confirmed correct.** NCES d23 Table 204.20 reports NM fall 2021 = 18.8% (59,564 ELs of approximately 316,300 total enrollment). |
| `elPercentAsOf` | "2021-10-01" | **Confirmed correct.** Fall 2021 enrollment period. |

No d24 table was available at time of audit (NCES d24 Table 204.20 URL returned 404). The
d23 figure (18.8%, fall 2021) remains the most recent publishable NCES data point.

**Note on pandemic-year caveat:** NCES d23 Table 204.20 carries a footnote: "Caution should
be used when comparing 2020 and 2021 estimates to those of other years due to the impact that
the coronavirus pandemic had on reporting Title III data." The 2021 figure (18.8%) represents
a notable jump from the 2020 figure (15.6%) — partially attributable to COVID-era reporting
irregularities rather than a genuine enrollment spike. The `notes` field or a `history[]`
context note may be warranted if this data appears in user-facing copy.

---

## `elPercentHistory[]` Proposal

Assembled from NCES Digest tables d18 (2000–2016), d19 (2000–2017), d20 (2000–2018),
d21 (2000–2019), d22 (2010–2020), d23 (2011–2021). Years 2001–2004 and 2006–2009 are
**not individually published** in the digest tables sampled; those years show only
interpolated endpoints (e.g., 2000 and 2005 are anchor years).

Cross-table reconciliation notes:
- 2013: d18 reports 15.1%, d23 reports 16.9%. Discrepancy likely reflects revised enrollment
  denominators between digest editions. d23 (most recent) should be preferred for 2011-forward
  values; d18/d19 for 2000 and 2005 anchor values.
- 2014: d18 reports 14.4%, d19/d23 report 14.6–14.7%. Use d23 value for post-2010 years.
- 2015: d18 reports 15.7%, d19 reports 16.1%, d22/d23 report 15.6%. Discrepancy; prefer d23.
- 2016: d18 reports 13.4%, d19/d22 report 13.7%. Prefer d23 for post-2011 years.

**Proposed `elPercentHistory[]`** (schema field not yet in the NM JSON — this is a proposal
for the orchestrator to consider adding if the schema supports it):

```json
[
  {
    "year": 2000,
    "percent": 21.4,
    "source": "https://nces.ed.gov/programs/digest/d18/tables/dt18_204.20.asp"
  },
  {
    "year": 2005,
    "percent": 19.6,
    "source": "https://nces.ed.gov/programs/digest/d18/tables/dt18_204.20.asp"
  },
  {
    "year": 2010,
    "percent": 16.1,
    "source": "https://nces.ed.gov/programs/digest/d22/tables/dt22_204.20.asp"
  },
  {
    "year": 2011,
    "percent": 17.6,
    "source": "https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp"
  },
  {
    "year": 2012,
    "percent": 17.5,
    "source": "https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp"
  },
  {
    "year": 2013,
    "percent": 16.9,
    "source": "https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp"
  },
  {
    "year": 2014,
    "percent": 14.6,
    "source": "https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp"
  },
  {
    "year": 2015,
    "percent": 15.6,
    "source": "https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp"
  },
  {
    "year": 2016,
    "percent": 14.7,
    "source": "https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp"
  },
  {
    "year": 2017,
    "percent": 15.7,
    "source": "https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp"
  },
  {
    "year": 2018,
    "percent": 15.3,
    "source": "https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp"
  },
  {
    "year": 2019,
    "percent": 16.0,
    "source": "https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp"
  },
  {
    "year": 2020,
    "percent": 15.6,
    "source": "https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp"
  },
  {
    "year": 2021,
    "percent": 18.8,
    "source": "https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp"
  }
]
```

**Note:** 2000 and 2005 are anchor-year values from d18; 2006–2009 and 2001–2004 are not
individually available in the digest tables audited and should be omitted rather than
interpolated. The jump from 14.7% (2016) to 15.7% (2017) is real per d23; the 2014 dip
(14.6%) is the lowest point in the 2011–2021 series.

NM has had the highest or near-highest EL percentage among all states across this entire
time series (21.4% in 2000 was the national maximum at that time).

---

## Credentials and Standards Spot-Check

### Bilingual Education endorsement (6.64.10 NMAC)

**Confirmed.** Current rule (effective 2000-09-29, amended 2006) matches the coded values:

- `offered: true` ✓
- `standalone: true` — initial Level 1 bilingual education licensure (24–36 semester hours
  + exam) functions as a standalone credential; add-on pathway (12 hours + exam) also
  exists. ✓
- `addOn: true` ✓
- `requirements.coursework: true` ✓ (24–36 hrs initial; 12 hrs existing; 6 hrs for TESOL holders)
- `requirements.test: true` ✓ (bilingual education licensure exam, 6.60.5 NMAC; "Prueba" for
  Spanish route per NMPED webpage)
- `requirements.languageProficiency: true` ✓ (8th-grade level oral/written in target language,
  6.64.10.9 NMAC)
- `requirements.practicum: false` ✓ (not mentioned in rule)
- `requirements.program: null` ✓ (ambiguous; both IHE-program and coursework-only paths exist)

**One nuance to note:** The NMPED bilingual endorsement webpage describes "Prueba de Español"
as the exam requirement — this is the Spanish language proficiency exam, not the bilingual
education licensure exam per se. The NMAC (6.64.10) requires the bilingual education
licensure exam (6.60.5 NMAC). The `notes` field correctly captures this distinction ("Prueba
(the Praxis Spanish proficiency exam)"). The existing `notes` text is accurate.

### TESOL endorsement (6.64.11 NMAC, effective 2022-07-01)

**Confirmed.** Current rule (repealed and replaced effective 2022-07-01) matches coded values:

- `offered: true` ✓
- `standalone: true` ✓ (24 hours for initial Level 1)
- `addOn: true` ✓ (12-hour or 24-hour pathway for existing license holders)
- `requirements.coursework: true` ✓
- `requirements.test: true` ✓ (PRAXIS 5362: English to Speakers of Other Languages)
- `requirements.languageProficiency: false` ✓ (only required for international reciprocal
  holders; domestic candidates have no language-proficiency gate)
- `requirements.practicum: null` ✓ (not mentioned in rule)
- `requirements.program: null` ✓

**Coding note:** The 2022 rule introduces a **non-English language coursework requirement**
(6 hours in a non-English language or applied linguistics) for initial candidates and existing-
license Option 1 candidates. This is a coursework requirement, not a proficiency test. The
existing `requirements.languageProficiency: false` coding is still correct (the rule requires
language *coursework*, not a demonstrated proficiency gate), but the `notes` field should
mention this element. The existing notes do not flag it. A minor notes update is warranted.

### SEI (`credentials.sei`)

**Confirmed.** `mandatedForAllTeachers: false` is correct. As of 2026-05-10, no universal
SEI mandate exists in NM. The Yazzie/Martinez remediation context described in `sei.notes`
is accurate and current (November 2025 RAP; February 2026 plaintiff objections).

### `professionalStandardsMentions`

**Confirmed** (2026-05-07 re-coding upheld):

- `diverse: true` ✓ (6.69.4.12.A.2.c and 6.69.4.11.D.2.a)
- `cultural: true` ✓ (6.69.4.12.A.3.a)
- `linguistic: false` ✓ (word "linguistic" absent; "language" in cultural-responsiveness
  context only)
- `el: false` ✓ (no explicit EL/ELL/ESL/English Learner mentions in general competencies)

### Seal of Biliteracy (`sealOfBiliteracy`)

**Partially confirmed with discrepancy.** The NMPED Seal page confirms:
- `adopted: true` ✓
- `year: 2014` ✓
- Enabling statute: **NMSA 22-1-9.1** (not the session-law chapter)
- Implementing rule: **6.32.3 NMAC** (not 6.32.2 NMAC as stated in the `history[]` row)

The `sealOfBiliteracy.sourceUrl` is correct.

### ELP Assessment

**Confirmed.** NM remains a WIDA Consortium member; ACCESS for ELLs is the annual ELP
assessment. WIDA source URL confirmed active.

---

## Source URL Concerns

| URL | Status | Action |
|---|---|---|
| `https://webnew.ped.state.nm.us` | Does not resolve (2023–2024 domain migration to `web.ped.nm.gov`) | Preserved as leider-2021 baseline citation; no action needed |
| `https://web.ped.nm.gov/bureaus/languageandculture/bilingual-multicultural-education-programs-bmeps/bilingual-multicultural-education-programs-bmeps-frequently-asked-questions-faqs/` | Fetched successfully | Active; no Yazzie/Martinez content found on this page despite being the source cited for both the 1973 BMEA row and the 2018 ruling row |
| `https://www.srca.nm.gov/parts/title06/06.064.0011.html` | Fetched successfully; confirms 2022-07-01 replacement | History row for the TESOL rule replacement should be added |
| `https://www.srca.nm.gov/parts/title06/06.032.0002.html` | Fetched successfully; confirms 2018-07-01 effective date | BMEP rule replacement history row recommended |
| `https://www.srca.nm.gov/parts/title06/06.063.0014.html` | Fetched successfully; confirms 2003-09-30 adoption | NALC certificate rule history row recommended |
| `https://nces.ed.gov/programs/digest/d24/tables/dt24_204.20.asp` | 404 Not Found | d24 table not yet published; d23 remains current |

### Critical citation concern: `history[]` rows 1 and 3

Both the 1973 BMEA row and the 2018 Yazzie/Martinez ruling row cite the BMEP FAQs page as
their `sourceUrls`. That page contains neither the original 1973 statute text nor any
Yazzie/Martinez litigation detail. It is a program-operations FAQ. These rows need stronger
direct citations:

- **Row 1 (BMEA, 1973):** Preferred citation would be NMSA 1978 §§ 22-23-1 et seq. on
  nmonesource.com, but that domain returns 403. The NMPED Language and Culture Division
  homepage (`web.ped.nm.gov/bureaus/languageandculture/`) references the BMEA as the governing
  statute; that is a viable secondary citation. A stronger citation would be the current NMAC
  6.32.2 NMAC statutory authority section, which cites NMSA 22-23 as authorizing legislation.
  **Recommended sourceUrl addition:** `https://www.srca.nm.gov/parts/title06/06.032.0002.html`
  (the BMEP rule cites the 1973 Act in its statutory authority section).

- **Row 3 (Yazzie/Martinez, 2018):** No direct court document URL was obtainable in this
  audit. The NMPED Martinez/Yazzie bureau page (`web.ped.nm.gov/bureaus/martinez-yazzie/`)
  confirms the ruling existence and current remediation status but does not link to the
  original ruling PDF. Justia.com returned 403 for the NM court search. **Recommended
  additional sourceUrl:** `https://web.ped.nm.gov/bureaus/martinez-yazzie/` — this NMPED
  page explicitly references "a landmark court ruling" and the remediation timeline, making
  it an authoritative secondary citation even if not the court document itself.

---

## Recommended Changes to `src/content/states/nm.json`

The following changes are recommended but **not implemented in this audit** (per task
instructions — this agent does not modify the state JSON). All are for the orchestrator
to apply:

### A. `history[]` — rows to add (chronological insertion order)

1. Insert before 1973-04-05 row:
   - **No NM Constitution Article XII §10 row** — citable URL not obtainable.

2. After 1973-04-05 row, insert:
   - `2000-09-29` — Bilingual Education and TESOL endorsement rules adopted (see proposed
     JSON above)
   - `2003-09-30` — NALC certificate rule adopted (see proposed JSON above)

3. After 2014-03-05 Seal row:
   - `2018-07-01` — BMEP rule repealed and replaced (see proposed JSON above)

4. After 2018-07-20 Yazzie/Martinez row:
   - `2022-07-01` — TESOL rule repealed and replaced (see proposed JSON above)
   - `2023-07-18` — BMEP rule amended (conditional; see caveats above)

### B. `history[]` row 2 — Seal of Biliteracy corrections

- Remove "(Senate Bill 159)" from the description — the bill number could not be verified
  and the NM Legislature record shows SB 159 (2014) was an unrelated education technology
  bill.
- Change "6.32.2 NMAC" in the description to **"6.32.3 NMAC"** (the NMPED Seal page
  confirms this is the implementing rule).
- Add `https://www.srca.nm.gov/parts/title06/06.032.0003.html` to `sourceUrls` if that
  URL resolves (not verified in this audit).

### C. `history[]` row 1 — BMEA source strengthening

- Add `https://www.srca.nm.gov/parts/title06/06.032.0002.html` to `sourceUrls` (the BMEP
  rule cites NMSA 22-23 as its statutory authority).
- Add `https://web.ped.nm.gov/bureaus/languageandculture/` as a secondary source.

### D. `history[]` row 3 — Yazzie/Martinez source strengthening

- Add `https://web.ped.nm.gov/bureaus/martinez-yazzie/` to `sourceUrls`.

### E. `credentials.eld.notes` — minor addition

Add a sentence noting that the 2022 rule replacement introduced a non-English language
coursework distribution requirement (6 hours in non-English language or applied linguistics)
for initial candidates, and that this is a coursework distribution requirement, not a
proficiency gate (hence `languageProficiency: false` remains correct).

---

## Cross-Table EL Percentage Reconciliation Note

The NCES digest tables show some year-to-year discrepancies across editions. The recommended
canonical values for `elPercentHistory[]` use the most recent digest that covers each year:
d23 for 2011–2021; d18 for 2000 and 2005. For the gap years (2001–2004, 2006–2009), no
individual-year data was published in the digest tables audited; interpolation should be
avoided and those years omitted.

The 2016 figure shows notable variation: d18 = 13.4%, d19/d22 = 13.7%. The d23 table
reports 14.7% for fall 2016 — this is a substantial difference from d18's 13.4% and may
reflect a retroactive enrollment denominator revision. The d23 value (14.7%) should be
preferred as the most recently revised figure.

---

*Audit conducted 2026-05-10. Sources fetched from NCES, SRCA, NMPED, and NM Legislature
websites. No modifications made to `src/content/states/nm.json` per task scope.*
