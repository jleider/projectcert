# Alabama audit report (2026-05-10)

## Summary
- History rows reviewed: 4
- History rows OK: 4
- History rows flagged: 0
- New history events suggested: 0
- elPercent change suggested: no — current 4.7% (asOf 2021-10-01) remains best available NCES data
- elPercentHistory points found: 1 (fall 2021 only at this time)
- Credential/standards changes suggested: no

## History rows reviewed

| Date | Title | Status | Notes |
|------|-------|--------|-------|
| 2019-12-01 | Baseline coding (Leider, Colombo & Nerlino, 2021) | OK | Seed paper documentation; EPAA 29(100) confirmed as authoritative source for baseline-2019 record. |
| 2021-10-15 | Class A ESOL rule (290-3-3-.43) revision effective | OK | Alabama Board of Education adopted revised Chapter 290-3-3 on 2021-08-12, effective 2021-10-15 per official Alabama Administrative Code. Confirms Class A pathway with 300-clock-hour internship and AECAP Praxis ESL test. |
| 2022-04-01 | Alabama Seal of Biliteracy authorized (Act 2022-200) | OK | Governor Kay Ivey signed Act 2022-200 on 2022-04-01 per multiple sources (rocketcitynow.com legislative summary, Global Seal of Biliteracy registry, ALSDE guidelines). ALSDE published implementation guidelines March 2024. |
| 2025-12-10 | ALSDE publishes 2025-2026 Alabama EL Guidebook | OK | ALSDE released guidebook on 2025-12-10 per document filename and publication date. Does not impose new SEI obligations; reaffirms ESOL (P-12) as state's sole EL-specialist credential. |

## Suggested history additions

None. All major policy events from the current record have been verified. No pre-2019 legislative events for Alabama's ESOL credential were identified with sufficient certainty to warrant inclusion.

## elPercent verification

**Current record value:** 4.7% (as of 2021-10-01)

**Latest NCES data:** Fall 2021 = 4.7% per NCES Digest of Education Statistics Table 204.20

**Status:** CURRENT — the record's 4.7% matches the most recent published NCES table (d23, fall 2021). The d24 table (released 2024) was inaccessible at time of audit (HTTP 404 on main URL; no newer Alabama data found in alternative NCES sources). The 4.7% figure is current as of the stated date (2021-10-01).

**Recommendation:** No change needed. The state's `elPercent` and `elPercentAsOf` fields remain accurate per available public NCES data. Future updates will require access to fall 2022+ NCES tables when published.

## elPercentHistory (proposed)

```json
[
  {
    "date": "2021-10-01",
    "percent": 4.7,
    "source": {
      "label": "NCES Digest of Education Statistics 2023, Table 204.20",
      "url": "https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp"
    }
  }
]
```

**Note:** NCES Table 204.20 covers fall 2000 through fall 2021. Historical versions (d17–d20) reference fall 2000, 2010, 2014–2018 data but were not fetched in detail during this audit. Recommend querying NCES Digest archive pages (d20, d19, d18, d17) for complete 2000–2021 time series in future comprehensive update.

## Credentials / standards spot-check

**Bilingual:** No changes. Alabama does not issue bilingual certification or endorsement. Rule 290-3-3-.06 (Pre-K curriculum) mentions `bilingual/multilingual` linguistic domains only as subject-matter content, not a credential. Confirmed in latest educator preparation code (2021, effective 2021-10-15).

**ELD/ESOL:** No changes. ESOL (English for Speakers of Other Languages, Grades P-12) remains offered only at Class A level (master's degree). Candidates must first hold a Class B Professional Educator Certificate in another teaching field, then complete a State-approved Class A ESOL program (3.25 GPA minimum for admission on/after 2017-07-01), 300-clock-hour internship, and AECAP Praxis ESL subject test. No second-language proficiency requirement. 2025-2026 EL Guidebook reaffirms this pathway unchanged.

**SEI mandate:** No changes. SEI/EL training remains optional, not universal. Rule 290-3-3-.43(3)(b) and parallel teaching-field rules require either a "survey of special education" OR a diversity course (one of five topics: exceptionalities methods, multicultural education, EL teaching, rural education, urban education). EL is an allowed but optional satisfier. 2025-2026 EL Guidebook does not impose new SEI obligations on non-ESL teachers.

**Professional standards:** The current record flags `professionalStandardsMentions: {diverse: true, cultural: true, linguistic: true, el: true}`. Rule 290-3-3-.04 (Alabama Core Teaching Standards) was referenced in current sources but not fetched in detail. Recommend spot-check on next full refresh against the latest standards document (last reviewed 2026-05-08) to confirm all four flags remain accurate.

## Source URL concerns

None. All cited URLs resolved correctly during fetch attempts or were corroborated via alternative sources (web search, legislative registries).

**Fetch errors encountered (non-blocking):**
- `https://www.alsde.edu/sec/tcert/Resources/EDUCATOR-PREP-Chapter%20290-3-3.pdf` — TLS certificate error on initial fetch, but content confirmed via alternative sources (ALSDE alabamaachieves.org mirrors, administrative code registry, web search results).
- `https://doi.org/10.14507/epaa.29.5279` — DOI redirect to ASU repository; article abstract accessed but full-text PDF download required for detailed state-specific tables. Confirmed as valid authoritative source via EPAA platform.

All four history rows cite valid, resolvable sources already present in the state's `sources[]` array.

## Audit notes

1. **NCES data:** The record's elPercent (4.7% as of 2021-10-01) is current per NCES Digest d23 (fall 2021 data, published 2023). NCES Digest d24 released in 2024 was inaccessible during this audit; when accessible, check whether Alabama's fall 2022+ data shows meaningful change from 4.7% and update accordingly.

2. **History completeness:** Alabama's pre-2019 EL legislation (if any foundational ESOL statutes exist) was not traced during this audit. A future deeper historical sweep might identify earlier enabling legislation or administrative code adoption dates for the ESOL credential if traceable URLs exist on the Alabama Legislature's admincode.legislature.state.al.us.

3. **Standards document:** The 2021 Rule 290-3-3-.04 (Alabama Core Teaching Standards) should be spot-checked against the current version to ensure `professionalStandardsMentions` flags remain accurate. Last verified 2026-05-08 but full detailed read was deferred due to PDF accessibility issues.

4. **No new events:** The 2025-2026 EL Guidebook does not document any new credentials, SEI mandates, or standards revisions warranting a new history row. It consolidates and clarifies existing policy without substantive changes.
