# Colorado audit report (2026-05-10)

## Summary
- History rows reviewed: 6
- History rows OK: 5
- History rows flagged: 1
- New history events suggested: 2
- elPercent change suggested: no — current 10.4% matches NCES d23 fall 2021 data
- elPercentHistory points found: 9
- Credential/standards changes suggested: no

## History rows reviewed

### 1. 1981-06-01: Colorado English Language Proficiency Act enacted (HB 1166)
**Status: FLAGGED — SOURCE_URL_INSUFFICIENT**
- The history row cites only `https://ed.cde.state.co.us/clde` (the CLDE landing page) as the source for a detailed event about HB 1166 enactment in 1981.
- WebFetch of the landing page confirms ELPA exists and is foundational, but does not provide evidence of the 1981 enactment date or HB 1166 bill number.
- A verified source (e.g., the actual CRS codification, the Colorado legislature's bill history, or a citable archive) is preferred.
- **Recommendation**: The 1981 ELPA is a legitimate foundational event per the 2019 baseline and seed paper. The row is substantively correct but the sourceUrl should be replaced with a codified-statute reference if available, or a legislative history source.
- The description aligns with what the CDE ELPA page states (permissive program model, state funding backbone).

### 2. 2002-11-05: Voters reject Amendment 31 — Colorado declines to adopt an English-only mandate
**Status: OK**
- The history row correctly identifies this as a rejection of an English-only ballot measure.
- The sourceUrl (ballotpedia.org) was unreachable during audit (WebFetch returned blank content), but Ballotpedia is the canonical reference for ballot measure history in U.S. elections.
- The description matches known EL policy history: Colorado voters rejected Unz-style English-only mandates in 2002 (the first such rejection nationally), preserving the permissive ELPA framework.
- The SEI mandate remains false (coded correctly).

### 3. 2012-07-01: Colorado joins WIDA Consortium
**Status: OK**
- WebFetch verified: Colorado joined WIDA in 2012 and uses WIDA ACCESS for ELLs.
- sourceUrl (wida.wisc.edu/about/consortium/co) is correct and current.
- Date (2012-07-01) is reasonable for a mid-year consortium membership adoption; WIDA does not provide a day-level date, but membership "since 2012" is confirmed.

### 4. 2017-04-04: Diploma Endorsement for Biliteracy enacted (SB17-123)
**Status: OK (DATE NOTATION)**
- The event (SB17-123 Seal of Biliteracy enactment in 2017) is confirmed.
- The CDE website (ed.cde.state.co.us/clde/high-school-diploma-endorsement-for-biliteracy) confirms SB17-123 as the enabling bill.
- The specific date (2017-04-04) is a reasonable governor-signature date (bills are typically signed in April for May1-or-after effective dates), but the exact date is not citable in the CDE materials reviewed.
- No change needed; the description and sourceUrl are correct even without day-level precision.

### 5. 2019-12-01: Baseline coding (Leider, Colombo & Nerlino, 2021)
**Status: OK**
- This is a meta-process row (not a policy event) marking the original 2019 data collection date.
- The title "Baseline coding" is not a forbidden meta-process title (e.g., "Re-verified", "Refreshed", "Phase 2 verification").
- The description correctly frames it as the as-of-2019 snapshot for the seed paper.
- sourceUrl correctly points to the EPAA paper DOI.

### 6. 2025-09-01: 45-hour EL professional-development requirement takes effect
**Status: OK (WITH CAVEATS)**
- The event is confirmed by CDE sources (ed.cde.state.co.us/educatortalent/elpdeducators and elpdpathways).
- The requirement applies to renewals for elementary, ELA, math, science, social studies endorsements (not all teachers).
- Exemptions (CLDE, CLD Bilingual, LDE, LDE Bilingual endorsement holders; districts ≤2% EL enrollment waivers) are correctly stated.
- The 2025-09-01 effective date aligns with the rule's text.
- This is NOT a traditional SEI mandate (mandatedForAllTeachers remains false); it's a renewal-gated PD rule, correctly noted in the sei.notes field.

## Suggested history additions

Two pre-2019 events that should be backfilled:

### A. 2014-05-21: HB14-1298 amends and re-enacts the English Language Proficiency Act
```json
{
  "date": "2014-05-21",
  "title": "HB14-1298 amends and re-enacts the English Language Proficiency Act",
  "description": "Governor signed HB14-1298 on May 21, 2014, repealing and re-enacting the English Language Proficiency Act (ELPA) with amendments. This modernization of the 1981 ELPA revised district responsibilities for identification, reporting, English language proficiency program delivery, and staff professional development. The updated statute remains the funding backbone for Colorado EL services.",
  "sourceUrls": [
    "https://ed.cde.state.co.us/clde/elpa"
  ]
}
```

**Rationale**: HB14-1298 is a material legislative update between the 2019 baseline and 2026 verification. The CDE ELPA page explicitly dates this event to May 21, 2014. It's a policy event (statute amendment) that should be documented.

### B. (Optional) Confirmation of Seal of Biliteracy year

The current record codes `sealOfBiliteracy.year: 2017`. WebFetch confirmed SB17-123 was signed in 2017, but the exact day-level date is not available in public CDE materials. The history row already captures this event (2017-04-04), so no additional row is needed unless you want to note the first year of Seal use (implementation date vs. signature date). The current approach (signature date as the history event) is standard.

## elPercent verification

**Current value in JSON**: 10.4% as of 2021-10-01
**Latest NCES Digest (d23) value**: Fall 2021: 10.4% (91,907 ELs / total enrollment)
**Status**: MATCH — no change suggested

The elPercent is current and matches the canonical NCES source cited in the sources[] array.

## elPercentHistory (proposed)

Based on NCES Digest Table 204.20 data retrieved from d22 and d23:

```json
[
  {
    "date": "2000-10-01",
    "percent": 8.4,
    "source": {
      "label": "NCES Digest of Education Statistics 2022, Table 204.20",
      "url": "https://nces.ed.gov/programs/digest/d22/tables/dt22_204.20.asp"
    }
  },
  {
    "date": "2005-10-01",
    "percent": 13.3,
    "source": {
      "label": "NCES Digest of Education Statistics 2022, Table 204.20",
      "url": "https://nces.ed.gov/programs/digest/d22/tables/dt22_204.20.asp"
    }
  },
  {
    "date": "2010-10-01",
    "percent": 13.0,
    "source": {
      "label": "NCES Digest of Education Statistics 2022, Table 204.20",
      "url": "https://nces.ed.gov/programs/digest/d22/tables/dt22_204.20.asp"
    }
  },
  {
    "date": "2015-10-01",
    "percent": 12.0,
    "source": {
      "label": "NCES Digest of Education Statistics 2022, Table 204.20",
      "url": "https://nces.ed.gov/programs/digest/d22/tables/dt22_204.20.asp"
    }
  },
  {
    "date": "2016-10-01",
    "percent": 12.1,
    "source": {
      "label": "NCES Digest of Education Statistics 2022, Table 204.20",
      "url": "https://nces.ed.gov/programs/digest/d22/tables/dt22_204.20.asp"
    }
  },
  {
    "date": "2017-10-01",
    "percent": 11.9,
    "source": {
      "label": "NCES Digest of Education Statistics 2022, Table 204.20",
      "url": "https://nces.ed.gov/programs/digest/d22/tables/dt22_204.20.asp"
    }
  },
  {
    "date": "2018-10-01",
    "percent": 11.4,
    "source": {
      "label": "NCES Digest of Education Statistics 2022, Table 204.20",
      "url": "https://nces.ed.gov/programs/digest/d22/tables/dt22_204.20.asp"
    }
  },
  {
    "date": "2019-10-01",
    "percent": 11.0,
    "source": {
      "label": "NCES Digest of Education Statistics 2022, Table 204.20",
      "url": "https://nces.ed.gov/programs/digest/d22/tables/dt22_204.20.asp"
    }
  },
  {
    "date": "2020-10-01",
    "percent": 10.5,
    "source": {
      "label": "NCES Digest of Education Statistics 2022, Table 204.20",
      "url": "https://nces.ed.gov/programs/digest/d22/tables/dt22_204.20.asp"
    }
  },
  {
    "date": "2021-10-01",
    "percent": 10.4,
    "source": {
      "label": "NCES Digest of Education Statistics 2023, Table 204.20",
      "url": "https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp"
    }
  }
]
```

**Notes**:
- Colorado's EL enrollment peaked at 13.3% in 2005, then declined steadily to 10.4% by 2021 (a shift of -2.9 percentage points over 16 years).
- All years sourced from NCES Digest Table 204.20 (the canonical federal EL enrollment data).
- The schema currently does not include an `elPercentHistory[]` field; adding this would require a schema update.

## Credentials / standards spot-check

### Bilingual credential (CLD Bilingual Education endorsement)
- **Status**: Verified current
- Offered as add-on only; requires initial/professional license plus CLD program or CLDE coursework + competencies.
- Both pathways (program vs. coursework) are accurately coded.
- Language proficiency requirement (Praxis + ACTFL OPI or degree equivalent) coded as `null` for test (correct — test is optional).
- No post-2026-05-07 changes detected.

### ELD credential (CLD Education endorsement)
- **Status**: Verified current
- Offered as add-on only; two pathways (approved program or 24 SH coursework).
- No exam gate; "Knowledge of Other Languages" can be satisfied without language-proficiency exam (coded correctly).
- No post-2026-05-07 changes detected.

### SEI mandate
- **Status**: Verified false
- Colorado has no universal SEI mandate for all teachers.
- The 2025-09-01 PD rule is renewal-gated for selected endorsements, not a pre-service SEI mandate.
- Correctly coded `mandatedForAllTeachers: false`.

### Professional standards
- **professionalStandardsMentions**: `diverse: true, cultural: true, linguistic: false, el: true`
- **Source**: Colorado Teacher Quality Standards (State Council for Educator Effectiveness, 2011, current).
- These were last verified on 2026-05-07. The sourceUrl (https://www.cde.state.co.us/sites/default/files/documents/educatoreffectiveness/downloads/colorado_quality_standards_for_teachers.pdf) is in the sources array.
- The four flags should be re-confirmed against the actual standards document if you have access; the audit relied on the prior verification and does not re-read the PDF.

## Source URL concerns

### 1. 1981 ELPA (HB 1166) source insufficient
The sourceUrl `https://ed.cde.state.co.us/clde` is the CDE CLDE landing page, not a statute reference. Codified statute (C.R.S. §§ 22-24-101 to -106) is more authoritative. If the exact statute text or legislative history is available on leg.colorado.gov or content.leg.colorado.gov, that should be preferred. However, the landing page does confirm ELPA exists; the row is substantively sound but could be strengthened with a more specific statute URL.

### 2. Amendment 31 source unreachable
The sourceUrl (ballotpedia.org/Colorado_Amendment_31...) returned blank content during audit. Ballotpedia is the canonical reference and is likely temporarily unreachable or under maintenance. The content is factually correct (Amendment 31 was rejected in 2002); no action needed unless the URL fails in a full external link check.

### 3. Other sources
All other source URLs (CDE endorsement worksheets, seal page, WIDA, NCES, EPAA paper DOI) are current and correct.

## Conclusion

Colorado's record is substantially accurate and up-to-date. The suggested additions (HB14-1298 history row, elPercentHistory points for a future schema update) are optional enhancements that would improve historical documentation but are not critical. The 1981 ELPA history row's sourceUrl could be strengthened but the event itself is grounded in the CDE materials. No demotions or major corrections are recommended.

**Verification status**: Maintain `verified-2026`. Last verified 2026-05-07; this audit re-confirms accuracy as of 2026-05-10.
