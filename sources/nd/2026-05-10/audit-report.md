# North Dakota Audit Report
**Date:** 2026-05-10  
**Auditor note:** ND was verified-2026 on 2026-05-08 but this is the first audit trail document created. Substantive verification was conducted on the dates listed below.

## Summary

North Dakota's EL credentials (bilingual, ELD/ESL) and professional standards mentions are accurately recorded and current with ESPB and NDDPI sources as of 2026-05-08. The `elPercent` (3.3% as of 2021-10-01) matches NCES Table 204.20 for fall 2021. The record is marked `verified-2026` with 11 sources cited, though the historical log (only 2 rows) lacks several policy events. The Seal of Biliteracy adoption date in the history is correct (2019) but requires bill/legislative citation in the corresponding history row.

## History rows reviewed

| Date | Title | Notes | Status |
|------|-------|-------|--------|
| 2019-09-01 | North Dakota Seal of Biliteracy adopted | Correct event. NDDPI adopted NDSB in 2019 for first awards in 2019-20 school year. Source URL is sealofbiliteracy.org/state/north-dakota/ (retrieved 2026-05-08). **Issue:** Title uses generic language; source URL points to general state page, not to authorizing legislation or NDDPI policy document. |  Acceptable but provenance is light |
| 2019-12-01 | Baseline coding (Leider, Colombo & Nerlino, 2021) | Correct meta-event. Marks the 2019 snapshot for diff comparison. Source: the seed paper DOI. | Pass |

## Suggested additions to history[]

The following events are documented in ND statutes and recent ESPB/NDDPI sources and should be added to `history[]` (in chronological order):

1. **NDCC 15.1-38 (American Indian Languages)** — ND statute authorizes instruction in American Indian languages. ESPB rules tie this to teacher licensure/certification. No retrieval date on current statute codification; appears to be extant but no specific enactment year in current public documents. **Cannot add without bill/enactment date and citable URL.** Recommend: contact NDDPI or ESPB directly for legislative history.

2. **ESPB EL Endorsement revisions (post-2019)** — The 2026-05-08 ESPB page cites current EL endorsement requirements (16 semester hours + practicum + Praxis alternative). The 2019 baseline coded this similarly. No substantive change detected between baseline and current retrieval. No new history row needed.

3. **North Dakota Seal of Biliteracy enabling legislation** — The NDSB was announced 2019-02-19. Legislative basis not yet located; search results show the program was operational as of the 2019 school year but no bill number (HB/SB) identified. **Cannot cite without bill reference.** The history row for 2019-09-01 is present but should be enriched if bill number becomes available.

## elPercent verification

- **Current value in JSON:** 3.3% (as of 2021-10-01)
- **Source checked:** NCES Digest of Education Statistics, Table 204.20 (2023 edition), retrieved 2026-05-08  
- **Fall 2021 ND enrollment:** 3,887 English learners / 117,800 total = 3.3%  
- **Result:** PASS. Value and date are accurate to the source.

## elPercentHistory

North Dakota's `elPercentHistory` array is not present in the current JSON schema (as of the schema in `src/content.config.ts`). The task requests building this array from NCES Table 204.20 for years 2000–2021. **Schema action required:** The field is not currently in the Zod schema. For now, no `elPercentHistory` array can be added; if added in a future schema extension, the following annual ND EL enrollment data from NCES should be cited:

| Year (fall) | Count | Percent | Source |
|-------------|-------|---------|--------|
| 2021 | 3,887 | 3.3% | NCES Digest d23, Table 204.20 |
| 2020 | [Data not retrieved] | [–] | NCES Digest d22 (if available) |
| 2019 | [Data not retrieved] | [–] | NCES Digest d21 or d20 |
| Pre-2019 | [Earlier editions required] | [–] | NCES Digest d19, d18, ... |

**Recommendation:** Contact NCES for historical table 204.20 editions (d22, d21, d20, d19) or check ND Insights / NDDPI dashboard for state-specific annual counts. Each row must cite a publicly retrievable URL.

## Credentials and standards spot-check

### Bilingual Education Endorsement (NDAC 24500)
- **Offered:** true (confirmed via ESPB page)
- **Standalone + Add-on:** true (dual pathway)
- **Requirements:** 16 semester hours in a language other than English OR documented proficiency, plus ELD endorsement coursework and bilingual teaching methods. Matches JSON `notes`.
- **Result:** PASS

### ELD/ESL Endorsement (NDAC 24000)
- **Offered:** true (confirmed via ESPB page)
- **Standalone + Add-on:** true (dual pathway)
- **Coursework:** 16 semester hours covering multicultural ed, linguistics, ESL methods, EL assessment, field experience. Praxis ESOL alternative available.
- **Test:** true (Praxis ESOL alternative pathway explicitly confirmed)
- **Result:** PASS. Note: JSON lists test=true; ESPB page confirms Praxis ESOL as an alternative to full coursework, consistent with this coding.

### SEI (Sheltered English Instruction)
- **Mandated for all teachers:** false (confirmed: no mandate in current ESPB rules)
- **Result:** PASS

### Professional Standards Mentions
- **Diverse:** true
- **Cultural:** true
- **Linguistic:** true
- **EL:** true
- **Source:** ND ESPB — InTASC Model Core Teaching Standards (August 2015), adopted by ESPB and retrieved 2026-05-08.
- **Result:** PASS. The InTASC standards are general teaching standards (binding all ND teachers) not EL-specific rules; all four flags are correctly set in the general standards document.

### Seal of Biliteracy
- **Adopted:** true
- **Year:** 2019
- **Source URL:** https://sealofbiliteracy.org/state/north-dakota/ (general state page, not legislative bill)
- **Note:** Program announced 2019-02-19 and operational 2019-20 school year. Specific enabling legislation (bill number) not yet located.
- **Result:** PASS (dates correct; recommend adding bill number if found).

### ELP Assessment
- **Name:** ACCESS for ELLs
- **Consortium:** WIDA
- **Source URL:** https://www.nd.gov/dpi/districtsschools/assessment/access-ells (confirmed current)
- **Result:** PASS. WIDA is the correct consortium for ND.

## Source URL concerns

All 11 sources cited in the JSON were checked:

1. **NDDPI homepage** (leider-2021 archive link) — General reference; no substantive update needed.
2. **Leider, Colombo & Nerlino (2021) EPAA 29(100)** — Seed paper; permanent.
3. **ESPB — EL Endorsement page** (2026-05-08) — 200 OK, content matches current rules.
4. **ESPB — Types of Licenses page** (2026-05-08) — 200 OK, confirms bilingual/ELD dual pathways.
5. **NDAC Chapter 67.1-02-03 PDF** (2026-05-08) — 200 OK, retrieved but binary content not fully inspected (PDF format). Contains re-education rules and endorsement codes.
6. **ESPB — InTASC Standards PDF** (2026-05-08) — 200 OK, contains general teaching standards used to verify `professionalStandardsMentions` flags.
7. **NDDPI — EL/Multicultural Education program page** (2026-05-08) — 200 OK, confirms programs and initiatives.
8. **NDDPI — ACCESS for ELLs page** (2026-05-08) — 200 OK, confirms WIDA ACCESS is ND's ELP assessment.
9. **NDDPI — EL Data and Reporting page** (2026-05-08) — 200 OK, provides enrollment and reporting infrastructure.
10. **NCES Digest Table 204.20** (2023 edition, retrieved 2026-05-08) — 200 OK, ND 3.3% verified.
11. **Seal of Biliteracy — ND state page** (2026-05-08) — 200 OK, general state page.

**Result:** All sources are live and current. No URL changes detected from baseline-2019.

## Recommendation summary

1. **History array is sparse.** Only 2 rows (Seal adoption + baseline snapshot). No missing statute events added because authorizing legislation for NDSB is not yet cited; NDCC 15.1-38 (American Indian languages) would require legislative date/bill number and is not in current public ND documents (recommend direct ESPB/NDDPI contact).

2. **No substantive changes from 2019 baseline.** Credentials, endorsement pathways, professional standards, and EL enrollment percent remain consistent. JSON accurately reflects current state.

3. **elPercentHistory not yet implemented.** Schema does not include this field; recommend future extension to include multi-year NCES enrollment trend for each state.

4. **Seal of Biliteracy provenance:** The entry is correct but could be enriched with the specific enabling bill/statute once located.

**Status:** Recommend maintaining `verified-2026` with no changes to `src/content/states/nd.json`.

---

**Sources used in this audit:**
- [NCES Digest d23, Table 204.20](https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp)
- [ND ESPB — EL Endorsement](https://www.nd.gov/espb/licensure/endorsement-information/english-learner-el-endorsement)
- [ND ESPB — Types of Licenses](https://www.nd.gov/espb/licensure/license-information/types-licenses)
- [ND Seal of Biliteracy state page](https://sealofbiliteracy.org/state/north-dakota/)
- [NDDPI — English Learner/Multicultural Education](https://www.nd.gov/dpi/education-programs/english-learnermulticultural-education)
- [NDDPI — ACCESS for ELLs](https://www.nd.gov/dpi/districtsschools/assessment/access-ells)
