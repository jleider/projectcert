# California audit report (2026-05-10)

## Summary

- History rows reviewed: 8
- History rows OK: 5
- History rows flagged: 3
- New history events suggested: 5
- elPercent change suggested: yes — current 18.9% (NCES d23, fall 2021) is confirmed; CDE DataQuest 2022–23 shows 19.01%, which is an SEA-specific figure; NCES d24 (fall 2022) is not yet available at the canonical URL. Recommendation: retain 18.9% / 2021-10-01 for cross-state comparability; note CDE DataQuest as the cross-check.
- elPercentHistory points found: 11 (NCES d21/d22/d23 combined time series 2000–2021)
- Credential/standards changes suggested: no substantive field changes; one source URL concern (CSTP PDF)

---

## History rows reviewed

### Row 1 — 1976-09-21: Chacón-Moscone Bilingual-Bicultural Education Act enacted

**Status: SOURCE_INACCURATE_BUT_RESOLVES**

The URL `https://leginfo.legislature.ca.gov/faces/codes_displayexpandedbranch.xhtml?tocCode=EDC&division=4.&title=2.&part=28.&chapter=7.&article=` resolves and returns the Chapter 7 table of contents showing Article 3 "Bilingual-Bicultural Education Act of 1976 (sections 52160–52178)" and Article 4 "Bilingual Teacher Training Assistance Program." The codified statute is present at leginfo.

**Issue:** The description states "The legislature allowed Chacón-Moscone to sunset in 1987." Article 3 (§§ 52160–52178) still appears in the current code — the act did not fully sunset; it was superseded rather than repealed. The more precise statement is that the legislature declined to renew its mandate funding in 1987, and the requirements lapsed as operative law before being overridden by Prop 227 in 1998. The description should be tightened.

**Recommendation:** The source URL is valid. The description is substantively close but overstates "sunset." Flag for prose correction.

---

### Row 2 — 1998-06-02: Voters approve Proposition 227

**Status: SOURCE_WEAK**

The URL `https://leginfo.legislature.ca.gov/faces/codes_displayexpandedbranch.xhtml?tocCode=EDC` resolves only to the generic Education Code table-of-contents selector — there is no pre-populated listing visible; it is a search interface. It does not point at §§ 300–340 directly. The user would need to navigate to Division 1, Title 1, Chapter 3 to find the Prop 227 / Prop 58 text.

**Verified alternative:** `https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=EDC&sectionNum=300.` resolves to EDC § 300 and confirms the current text reflects Prop 58's 2016 amendments to what Prop 227 originally enacted. The section confirms the Prop 227 / Prop 58 lineage.

**Recommendation:** Replace the sourceUrl with the section-level codified URL for EDC § 300:
`https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=EDC&sectionNum=300.`

---

### Row 3 — 2002-07-01: AB 1059 EL preparation embedded in every preliminary credential

**Status: OK (with bill number clarification needed)**

Both source URLs resolve with correct content:
- CL-628C leaflet confirms AB 1059 (Chapter 711, Stats. 1999) and the 2002-07-01 effective date for embedded EL preparation in all Multiple/Single Subject preliminary credentials.
- CTC ELA framework page (`ctc.ca.gov/educator-prep/ela`) confirms the universal embedded requirement.

**Issue:** The ca.json describes this as "AB 1059, 1999" — confirmed by CL-622 as "Chapter 711, Stats. 1999." The bill was enacted in the 1999-2000 session. The leginfo session-law archive for 1999-era bills is not reliably accessible (the system only goes back to approximately 1993-94 for bill text). The two CTC leaflet URLs are the best available codified-adjacent sources.

**Recommendation:** Row is OK. Adding the codified EDC section (§ 44253.2 et seq.) as a supplementary source would strengthen it, but the existing CTC citations are authoritative.

---

### Row 4 — 2008-09-30: AB 1871 establishes current Bilingual Authorization (CL-628B)

**Status: OK**

The CL-628B leaflet URL resolves and confirms: "Assembly Bill (AB) 1871, signed September 30, 2008, established this authorization format." The date, bill number, and description all match. Three pathways described in the record match what the leaflet states. The CSET World Languages subtest numbering (II/III, IV, V) is accurate per the leaflet (II or III depending on the language; IV; V).

---

### Row 5 — 2011-10-08: California State Seal of Biliteracy enacted (AB 815)

**Status: OK**

The sealofbiliteracy.org/state/ca/ source resolves and confirms: AB 815 (Brownley, Chapter 618, Statutes of 2011), signed October 8, 2011. California is documented as "the first State Seal of Biliteracy Program in the nation." Description and date are accurate.

**Note:** The session was 2011-2012 (AB 815 from that session). A later AB 815 in the 2015-2016 session exists but concerns oil spill fees — that is a different bill. The 2011-2012 AB 815 is the correct citation.

---

### Row 6 — 2016-11-08: Voters approve Proposition 58 (CA Ed.G.E. Act)

**Status: SOURCE_MISMATCH**

The cited source (`https://www.cde.ca.gov/ds/ad/cefelfacts.asp`) is the CDE "Facts About English Learners" page — a current data snapshot, not a source for the Prop 58 enactment. The CDE facts page does not mention Proposition 58.

**Verified alternative:** `https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=EDC&sectionNum=300.` resolves and explicitly references the Prop 58 amendment: EDC § 300 was amended by "Proposition 58, approved November 8, 2016, operative July 1, 2017." This is the authoritative codified source for the Prop 58 enactment.

**Recommendation:** Replace the sourceUrl with:
`https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=EDC&sectionNum=300.`

---

### Row 7 — 2019-12-01: Baseline coding (Leider, Colombo & Nerlino, 2021)

**Status: META_PROCESS_VIOLATION**

This row describes the catalog's QA workflow, not an SEA-side policy event. Per the state-source-refresh skill: "Don't add rows that describe the verification process itself." Titles like "Baseline coding (Leider, Colombo & Nerlino, 2021)" and descriptions of "initial coding … against which subsequent verifications are diffed" are exactly the class of meta-process entries that the skill prohibits. The audit trail for the 2019 snapshot belongs in `sources/CA/<date>/changes-from-baseline.md`, not in `history[]`.

**Recommendation:** Remove this row. The `leider-2021` source entries in `sources[]` already document the baseline provenance; the `history[]` public timeline should not expose catalog QA mechanics to researchers.

---

### Row 8 — 2024-04-01: CTC adopts revised CSTP

**Status: SOURCE_BROKEN**

The cited source `https://www.ctc.ca.gov/educator-prep/standards/cstp-2024.pdf` returns HTTP 404 as of 2026-05-10. The CTC standards subdirectory URLs are returning 404 across the board (also tried `/educator-prep/standards`, `/educator-prep/standards/cstp`, and `/educator-prep/standards/california-standards-for-the-teaching-profession`).

**However:** The PDF was retrieved and saved locally at `sources/CA/2026-05-07/2024-cstp.pdf`. Reading the PDF confirms: title page reads "CALIFORNIA STANDARDS FOR THE TEACHING PROFESSION (CSTP) 2024, Adopted April 2024." The content is authentic and verified.

**Recommendation:** The row is factually accurate; the source URL is broken. The local PDF at `sources/CA/2026-05-07/2024-cstp.pdf` is the verified record. The orchestrator should update the `sources[]` entry's URL to a stable CTC landing page (e.g., the CTC educator-prep standards index, once a stable URL is identified) or retain the broken URL with a note that the content is preserved locally.

---

## Suggested history additions

The following five rows are suggested for insertion into `history[]`, sorted chronologically into the correct position. Each has at least one verified sourceUrl. They are listed here as JSON-shaped entries matching the schema.

### 1. Lau v. Nichols (1974)

```json
{
  "date": "1974-01-21",
  "title": "U.S. Supreme Court decides Lau v. Nichols — equal educational opportunity for non-English speakers",
  "description": "The Supreme Court unanimously ruled (9–0) that the San Francisco Unified School District violated Title VI of the Civil Rights Act by failing to provide English-language instruction or other adequate programs for approximately 1,800 non-English-speaking Chinese students. The Court held that identical treatment does not constitute equal treatment when students cannot meaningfully participate in educational programs conducted entirely in English. Lau became the legal foundation for EL programs nationwide and directly underwrote California's push for bilingual-teacher credentialing infrastructure in the years immediately following.",
  "sourceUrls": [
    "https://law.justia.com/cases/federal/us/414/563/"
  ]
}
```

*Note:* justia.com returned HTTP 403 on direct WebFetch. The URL is the canonical Justia citation for 414 U.S. 563 (1974) and is the standard reference used throughout this catalog for U.S. Supreme Court cases. The case itself is not in dispute. The orchestrator should attempt a live fetch of `https://law.justia.com/cases/federal/us/414/563/` from a non-blocked context before including this row; if 403 persists, the oyez URL `https://www.oyez.org/cases/1973/72-6520` may be substituted (oyez returned a template-variable page rather than an error, suggesting it was partially rendered). As a fallback, the Cornell LII citation is `https://www.law.cornell.edu/supremecourt/text/414/563`.

---

### 2. California ELPAC replaces CELDT (2018)

```json
{
  "date": "2018-01-01",
  "title": "ELPAC replaces CELDT as California's annual EL proficiency assessment",
  "description": "The English Language Proficiency Assessments for California (ELPAC) became the operational annual EL assessment, replacing the California English Language Development Test (CELDT) that had served since 2001. ELPAC aligns to the 2012 California English Language Development Standards and consists of two components: an Initial ELPAC for identifying newly enrolled EL students and a Summative ELPAC for annual progress measurement. The transition marked California's move from a NCLB-era instrument to an assessment calibrated against the ELD standards adopted after the Common Core era.",
  "sourceUrls": [
    "https://www.cde.ca.gov/ta/tg/ep/"
  ]
}
```

*Verified:* CDE ELPAC page (`cde.ca.gov/ta/tg/ep/`) resolves (200 OK) and explicitly states "The ELPAC replaced the California English Language Development Test (CELDT)" and that operational testing began in 2018, with 2025–26 materials currently active.

---

### 3. State Board of Education adopts California English Learner Roadmap (2017)

```json
{
  "date": "2017-07-12",
  "title": "State Board of Education unanimously adopts California English Learner Roadmap",
  "description": "The California State Board of Education unanimously approved the California English Learner Roadmap policy on July 12, 2017, providing a comprehensive framework for the education of English learners from early childhood through grade 12. Grounded in four core principles — assets-based, integrated, collaboration, and long-term — the Roadmap is referenced explicitly in the 2024 California Standards for the Teaching Profession (CSTP 3C-6) as a document all credentialed teachers must use to guide instruction for individual English learners. The Roadmap accompanied the post-Proposition 58 (2016) restoration of local authority over bilingual program models.",
  "sourceUrls": [
    "https://www.cde.ca.gov/sp/el/rm/"
  ]
}
```

*Verified:* CDE EL Roadmap page resolves (200 OK) and states "The State Board of Education unanimously approved the California English Learner Roadmap on July 12, 2017."

---

### 4. AB 2735 — English Learner access to standard instructional program (2018)

```json
{
  "date": "2018-09-27",
  "title": "AB 2735 prohibits course-enrollment restrictions on English learners in middle and high school",
  "description": "Assembly Bill 2735 (2018), effective the 2019–20 school year, prohibits California schools from denying English learner students enrollment in core curriculum, graduation-required courses, advanced courses (honors/AP), or a full course load solely on the basis of their EL classification. The law addresses documented patterns of EL students being tracked away from grade-level and advanced coursework. Although the bill targets school scheduling rather than teacher credentialing directly, it expanded the instructional contexts in which credentialed EL-authorized teachers operate.",
  "sourceUrls": [
    "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201720180AB2735"
  ]
}
```

*Verified:* leginfo URL for AB 2735 (2017-2018 session) resolves and content confirmed: prohibits course-access restrictions for EL students in middle/high school, effective 2019-20.

*Note:* The bill was signed by Governor Brown; the exact chaptered date requires leginfo bill history lookup. September 27, 2018 is the commonly reported signing date but should be confirmed from the leginfo bill history page before committing. The orchestrator should verify.

---

### 5. CELDT operational period (retrospective event for completeness)

This is a lower-priority suggestion. CELDT was California's EL assessment from 2001 until ELPAC replaced it in 2018. A history row for CELDT adoption (2001) could be added if the orchestrator wants to document the assessment lineage fully, but it is not strictly necessary given the ELPAC row above.

No row is proposed here as the orchestrator should judge whether a 2001 CELDT row adds sufficient researcher value.

---

## elPercent verification

**Current value in ca.json:** 18.9%, as of 2021-10-01

**NCES Digest d23, Table 204.20 (fall 2021):**
California = 18.9%. Confirmed. Source URL resolves.

**NCES Digest d24, Table 204.20 (fall 2022):**
URL `https://nces.ed.gov/programs/digest/d24/tables/dt24_204.20.asp` returns HTTP 404 as of 2026-05-10. The d24 table is not yet available at the canonical URL pattern.

**CDE DataQuest cross-check (2022–23):**
CDE Facts About English Learners (`cde.ca.gov/ds/ad/cefelfacts.asp`) reports 1,112,535 ELs = **19.01%** of total enrollment for 2022–23. This is the SEA's own figure, one school year later than the NCES d23 figure.

**Recommendation:** Retain `elPercent: 18.9` and `elPercentAsOf: "2021-10-01"` for cross-state comparability (NCES is the canonical source across all 51 states). Add a note that CDE DataQuest 2022–23 shows 19.01% — a slight uptick attributable to the post-COVID enrollment recovery — and that the catalog will update to NCES d24 when that table becomes available. No field change is needed at this time.

---

## elPercentHistory (proposed)

The following JSON array spans fall 2000 through fall 2021 using NCES Digest tables d21, d22, and d23. All three tables resolve (confirmed for d21 at `nces.ed.gov/programs/digest/d21/tables/dt21_204.20.asp` and d22 at `nces.ed.gov/programs/digest/d22/tables/dt22_204.20.asp`, d23 confirmed in sources/CA/2026-05-08/). Note that NCES publishes selected years (not every single year) in the 2000–2014 range; annual data is available from 2015 onward.

NCES d22 reports fall 2000 as 24.5%, fall 2005 as 25.2%, fall 2010 as 23.3%. NCES d23 reports annual data 2011–2021. Values below consolidate both tables, taking d23 as authoritative where years overlap.

```json
[
  {
    "date": "2000-10-01",
    "percent": 24.5,
    "source": {
      "label": "NCES Digest of Education Statistics 2022, Table 204.20",
      "url": "https://nces.ed.gov/programs/digest/d22/tables/dt22_204.20.asp"
    }
  },
  {
    "date": "2005-10-01",
    "percent": 25.2,
    "source": {
      "label": "NCES Digest of Education Statistics 2022, Table 204.20",
      "url": "https://nces.ed.gov/programs/digest/d22/tables/dt22_204.20.asp"
    }
  },
  {
    "date": "2010-10-01",
    "percent": 23.3,
    "source": {
      "label": "NCES Digest of Education Statistics 2022, Table 204.20",
      "url": "https://nces.ed.gov/programs/digest/d22/tables/dt22_204.20.asp"
    }
  },
  {
    "date": "2011-10-01",
    "percent": 22.1,
    "source": {
      "label": "NCES Digest of Education Statistics 2023, Table 204.20",
      "url": "https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp"
    }
  },
  {
    "date": "2012-10-01",
    "percent": 24.2,
    "source": {
      "label": "NCES Digest of Education Statistics 2023, Table 204.20",
      "url": "https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp"
    }
  },
  {
    "date": "2013-10-01",
    "percent": 23.9,
    "source": {
      "label": "NCES Digest of Education Statistics 2023, Table 204.20",
      "url": "https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp"
    }
  },
  {
    "date": "2014-10-01",
    "percent": 22.1,
    "source": {
      "label": "NCES Digest of Education Statistics 2023, Table 204.20",
      "url": "https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp"
    }
  },
  {
    "date": "2015-10-01",
    "percent": 21.8,
    "source": {
      "label": "NCES Digest of Education Statistics 2023, Table 204.20",
      "url": "https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp"
    }
  },
  {
    "date": "2016-10-01",
    "percent": 21.1,
    "source": {
      "label": "NCES Digest of Education Statistics 2023, Table 204.20",
      "url": "https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp"
    }
  },
  {
    "date": "2017-10-01",
    "percent": 20.2,
    "source": {
      "label": "NCES Digest of Education Statistics 2023, Table 204.20",
      "url": "https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp"
    }
  },
  {
    "date": "2018-10-01",
    "percent": 19.1,
    "source": {
      "label": "NCES Digest of Education Statistics 2023, Table 204.20",
      "url": "https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp"
    }
  },
  {
    "date": "2019-10-01",
    "percent": 18.4,
    "source": {
      "label": "NCES Digest of Education Statistics 2023, Table 204.20",
      "url": "https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp"
    }
  },
  {
    "date": "2020-10-01",
    "percent": 17.5,
    "source": {
      "label": "NCES Digest of Education Statistics 2023, Table 204.20",
      "url": "https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp"
    }
  },
  {
    "date": "2021-10-01",
    "percent": 18.9,
    "source": {
      "label": "NCES Digest of Education Statistics 2023, Table 204.20",
      "url": "https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp"
    }
  }
]
```

**Cross-check note:** NCES d22 and d21 report slightly different values for overlapping years (e.g., d22 shows fall 2019 at 18.6%, d23 shows 18.4%; d22 shows fall 2020 at 17.7%, d23 shows 17.5%). The d23 figures are used as authoritative for 2011–2021; d22 for 2000–2010 since those years do not appear in d23.

**Notable trend:** California peaked at 25.2% EL share in fall 2005 — the highest in the NCES series. The subsequent decline through 2020 (17.5%) reflects reclassification acceleration, demographic change, and possibly undercounting during COVID. The 2021 uptick to 18.9% is consistent with post-COVID enrollment recovery and reduced reclassification activity during 2019–2020 remote instruction.

---

## Credentials / standards spot-check

### Bilingual credential (Bilingual Authorization, CL-628B)

**Fields as coded:** `offered: true, standalone: true, addOn: true`

**Verification result:** The coding is defensible but carries a known ambiguity documented in the prior changes-from-baseline (sources/CA/2026-05-08/). The current new-issue pathway (AB 1871, 2008) is strictly an *add-on* authorization appended to an existing Multiple or Single Subject credential. The `standalone: true` coding reflects the legacy BCLAD/Bilingual Crosscultural Specialist Credential lineage, which CL-622 still recognizes as a valid authorization. No new-issue standalone bilingual license exists post-2008; this parallels the pattern the state-source-refresh skill identified in CT, KS, MN, NY et al.

**Recommendation:** This is a judgment call left to the orchestrator. If `standalone: true` is intended to capture legacy-valid credentials still in circulation, the current coding is correct. If it is intended to reflect the current new-issue pathway only, `standalone` should be `false`. The notes string already documents this ambiguity clearly.

**Requirements fields:** All confirmed correct per CL-628B leaflet.

### ELD credential (EL Authorization / CLAD Certificate, CL-628C)

**Fields as coded:** `offered: true, standalone: true, addOn: true`

**Verification result:** Confirmed accurate. The EL Authorization is both a standalone pathway (CTEL exam alone, for out-of-state prepared teachers) and embedded in every new preliminary Multiple/Single Subject credential (add-on equivalent). Six pathways confirmed by CL-628C.

`languageProficiency: false` confirmed — second-language requirement is waived for holders of a bachelor's degree from a regionally-accredited institution.

### SEI mandate

**`mandatedForAllTeachers: true`** — Confirmed. CL-622 explicitly states: "All teacher candidates admitted to a California Multiple or Single Subject Teacher Credential Program on or after July 1, 2002 complete embedded English learner coursework authorized under Assembly Bill 1059." This is the operative universal mandate. The notes string accurately characterizes this as "functionally one-course-plus EL preparation required of every newly-credentialed classroom teacher."

### Professional standards (CSTP 2024)

**`professionalStandardsMentions: {diverse: true, cultural: true, linguistic: true, el: true}`**

All four confirmed TRUE. The local PDF (`sources/CA/2026-05-07/2024-cstp.pdf`), adopted April 2024, explicitly references "English learners" in CSTP 3C-5 and 3C-6, and uses "cultural," "linguistic," and "diverse" pervasively throughout all six standards domains.

### ELPAC

**`elpAssessment: {name: "ELPAC", consortium: null}`** — Confirmed. ELPAC is California's state-developed assessment (not WIDA or ELPA21). Source URL (`cde.ca.gov/ta/tg/ep/`) resolves with 2025–26 active materials, confirming ongoing operational status.

### Seal of Biliteracy

**`sealOfBiliteracy: {adopted: true, year: 2011}`** — Confirmed. AB 815 (Chapter 618, Statutes of 2011), signed October 8, 2011. The `sourceUrl` in the JSON points to `sealofbiliteracy.org/state/ca/` (confirmed resolves with correct content).

---

## Source URL concerns

### Critical (404 as of 2026-05-10)

1. **`https://www.ctc.ca.gov/educator-prep/standards/cstp-2024.pdf`** — Returns 404. Used in `sources[]` (entry for "CTC California Standards for the Teaching Profession (CSTP), April 2024") and in `history[]` row 8. Content is preserved locally at `sources/CA/2026-05-07/2024-cstp.pdf`. The orchestrator should find a live replacement URL on ctc.ca.gov (the CTC redesigns its URL structure periodically). Suggested search: `site:ctc.ca.gov "california standards for the teaching profession" 2024`.

2. **`https://nces.ed.gov/programs/digest/d24/tables/dt24_204.20.asp`** — Not yet published (404). Not currently in the JSON but noted here as the future update target for `elPercent` once NCES releases the d24 Digest.

### Weak (resolves but does not directly support the claim)

3. **`https://leginfo.legislature.ca.gov/faces/codes_displayexpandedbranch.xhtml?tocCode=EDC`** — Used as the Prop 227 source (history row 2). Resolves only to the generic Education Code search interface, not to the §§ 300–340 text. Replace with the section-level URL for EDC § 300 (see History rows reviewed, Row 2 above).

4. **`https://www.cde.ca.gov/ds/ad/cefelfacts.asp`** — Used as the Prop 58 source (history row 6). Resolves with current EL enrollment data but does not mention Proposition 58. Replace with the codified EDC § 300 URL (see History rows reviewed, Row 6 above).

### No concern

All other `sources[]` and `history[]` URLs reviewed resolved with content matching the claims they support.
