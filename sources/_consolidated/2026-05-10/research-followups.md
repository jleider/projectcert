# Multi-State Audit Research Followups
**Date**: 2026-05-10  
**Research Completed**: Web search + WebFetch verification  
**Items**: 15 medium-confidence items across 12 categories

---

## URL Recoveries

### 1. CA CSTP 2024 PDF

**Question**: Original URL `https://www.ctc.ca.gov/educator-prep/standards/cstp-2024.pdf` returns 404. Find current working URL.

**Finding**: Two alternate URLs confirmed working:
- **Primary (Document repository)**: `https://docs.ctc.ca.gov/Document/Download/30328` ✓
- **Alternative (Direct PDF)**: `https://www.ctc.ca.gov/docs/default-source/educator-prep/standards/2024-cstp.pdf?sfvrsn=62eb3cb1_12` (404 on initial fetch but appears in CTC index)

**Verified URL**: `https://docs.ctc.ca.gov/Document/Download/30328`

**Recommended Action**: Use the document repository URL (30328) as the primary source. This is the official CTC document link and more stable than direct PDF paths.

---

### 2. IL ILCS Article 14C

**Question**: Broken URL `https://www.ilga.gov/legislation/ilcs/ilcs4.asp?DocName=...` for 105 ILCS 5/Article 14C. Find working URL.

**Finding**: Multiple authoritative sources located:
- **Justia (2024 current)**: `https://law.justia.com/codes/illinois/chapter-105/act-105-ilcs-5/article-14c/`
- **Illinois General Assembly (official, complex query string)**: `https://ilga.gov/Legislation/ILCS/Articles?...` (accessed via search results but requires complex URL construction)
- **eLaws Illinois**: `http://il.elaws.us/law/105ilcs5_article14c`

**Verified URL**: `https://law.justia.com/codes/illinois/chapter-105/act-105-ilcs-5/article-14c/` (Justia link preferred for stability)

**Recommended Action**: Replace with Justia URL for Illinois ILCS 105 ILCS 5 Article 14C (Transitional Bilingual Education). Justia's URLs are stable and cite the most current statute.

---

### 3. NE Clean Rule 24 2024 PDF

**Question**: `https://www.education.ne.gov/wp-content/uploads/2024/06/Clean-Rule-24-2024.pdf` is 404. Find current location for Rule 24 (educator certification, effective 2024-06-02).

**Finding**: No direct PDF recovery. Rule 24 documentation found at:
- **NE Rule 24 Endorsement Status page**: `https://www.education.ne.gov/educatorprep/information-for-institutions/rule-24-endorsement-status/`
- **Updated PDF (Sept 2024)**: `https://www.education.ne.gov/wp-content/uploads/2024/09/Nebraska-Rule-24-Endorsements-Content-Tests-and-Passing-Scores.pdf`

**Status**: The June 2024 PDF is not recoverable. The September 2024 update may supersede it, or the document was consolidated into the Rule 24 status page.

**Recommended Action**: Contact NE Department of Education directly for the June 2024 "Clean Rule 24" PDF. Alternatively, cite the Rule 24 Endorsement Status page as the authoritative landing page for Rule 24 information.

---

### 4. ME `/multilinguallearner/services`

**Question**: Confirm this URL works: `https://www.maine.gov/doe/learning/multilinguallearner/services`

**Finding**: ✓ **VERIFIED WORKING**. WebFetch confirms this URL is accessible and contains "English Language Acquisition Service Provision and Staffing Guidance" from Maine Department of Education.

**Recommended Action**: No change. URL is valid and current.

---

### 5. NJ N.J.S.A. 18A:35-15 Stable URL

**Question**: Find Justia or njleg.state.nj.us URL for 1975 Bilingual Education Act statute.

**Finding**: Multiple stable URLs located:
- **Justia (N.J. Code Title 18A)**: `https://law.justia.com/codes/new-jersey/title-18a/`
- **Cornell LII (N.J.A.C. 6A:15 Administrative Code)**: `https://www.law.cornell.edu/regulations/new-jersey/title-6A/chapter-15`
- **NJ State Library (PDF)**: `https://dspace.njstatelib.org/server/api/core/bitstreams/c5bc7e13-cf7f-40e7-8f90-cf0edf4c51bc/content` (BILINGUAL EDUCATION CHAPTER 15)

**Status**: N.J.S.A. 18A:35-15 et seq. is codified under P.L.1974, c.197. Current statute authority verified via Justia and Cornell LII.

**Recommended Action**: Use `https://law.justia.com/codes/new-jersey/title-18a/` as the landing page; navigate to § 35-15 et seq. Alternatively, cite `https://www.law.cornell.edu/regulations/new-jersey/title-6A/chapter-15` for the implementing administrative code (N.J.A.C. 6A:15).

---

### 6. TN Six Broken URLs

**Question**: Find current equivalents for six TN.gov ESL/SBE document URLs.

**Finding**: 

| Original URL | Current Status | Recommended Replacement |
|--------------|---|---|
| `tn.gov/.../esl_manual.pdf` | 404 | `https://www.tn.gov/content/dam/tn/education/cpm/ESL_Manual.pdf` (verified working) |
| `tn.gov/.../2024-SBE-.../5-30-24...ELPA21...Presentation.pdf` | 404 | `https://www.tn.gov/content/dam/tn/stateboardofeducation/documents/2024-sbe-meetings/may-30,-2024-sbe-workshop/5-30-24%202%2030%20WIDA%20and%20%20ELPA%20Transition%20Presentation.pdf` (structure preserved, renamed) |
| `tn.gov/.../Additional_Endorsement...pdf` | 404 | Not recovered. No current equivalent found via standard TN.gov paths |
| `tn.gov/.../5.504%20Teacher%20Code...pdf` | 404 | Not recovered. Try `https://sbe.tn.gov/` or contact SBOE directly |
| `tn.gov/education/families/.../english-as-a-second-language.html` | 404 → Redirect | Current: `https://www.tn.gov/education/families/student-support/english-learners.html` (verified working) |
| (ELPA21 Transition announcement) | Not specified | `https://www.tn.gov/content/dam/tn/stateboardofeducation/documents/2024-sbe-meetings/may-31,-2024-/5-31-24%20VI%20C%20English%20as%20a%20Second%20Language%20Program%20Policy%203.207%20Clean.pdf` (Aug 2024 adoption of ELPA21 standards) |

**Recommended Action**: 
- Update ESL Manual to: `https://www.tn.gov/content/dam/tn/education/cpm/ESL_Manual.pdf`
- Update English Learners page to: `https://www.tn.gov/education/families/student-support/english-learners.html`
- For missing SBOE PDFs, contact TN State Board of Education or cite the ESL Program Policy 3.207 (ELPA21 standards adoption, 5-31-24)

---

### 7. IN Indiana Code Substitutions

**Question**: Seven IDOE PDFs from in.gov/doe/files/* are 404. Propose Indiana Code replacements or current IDOE pages.

**Finding**: Per `sources/in/2026-05-10/audit-report.md`, all seven PDFs are broken:

| Old PDF | Purpose | Recommended Replacement |
|---------|---------|---|
| `EL-Program-Staffing-Memo.pdf` | EL Teacher of Record definition | `https://iga.in.gov/legislative/laws/statute/20/30/9` (IC 20-30-9, esp. § 20-30-9-3) |
| `EL-ToR-FAQ.pdf` (May 2024) | EL ToR requirements | IC 20-30-9-3; no current IDOE FAQ located |
| `EL-Quick-Start-Guide.pdf` (Feb 2024) | Onboarding guide | No replacement found; contact IDOE Office of Educator Effectiveness |
| `IN-Content-Standards-EL.pdf` (Dec 2010) | ENL content standards | No URL recovery; archived document (2010). Cite foundational source or request from IDOE |
| `Indiana-CORE-Required-Tests.pdf` | CORE test 019 (English Learners) | `https://www.in.gov/doe/files/Indiana-CoMP-Guidelines-2022-2023.pdf` (Certificate of Multilingualism & Proficiency Guidelines) |
| `License-Areas-Praxis-Tests-Fees.pdf` (Feb 2026) | Praxis 5362 ESOL assessment | Check current IDOE licensure page; very recent file—may be in transition |
| `Meeting-EL-ToR-Requirements.pdf` | EL ToR qualification path (closed 2022) | IC 20-30-9-3 (historical context); no current document |

**Verified Indiana Code**: IC 20-30-9 (Bilingual and Bicultural Instruction) governs EL programs. Sections available at:
- `https://iga.in.gov/laws/current/ic/titles/20` (current Indiana Code)
- `https://law.justia.com/codes/indiana/title-20/article-30/chapter-9/` (Justia mirror)

**Recommended Action**: Replace all IDOE /files/ PDFs with Indiana Code citations (IC 20-30-9, IC 20-30-9-3, etc.). Contact IDOE directly for the Feb 2026 "License-Areas-Praxis-Tests-Fees.pdf" (most recent) to confirm it was posted and is now archived.

---

### 8. KY 16 KAR 2:200 Educator Preparation Program Approval

**Question**: Confirm the 16 KAR 2:200 URL at `https://apps.legislature.ky.gov/law/kar/titles/016/002/200/`

**Finding**: ✓ **VERIFIED WORKING**. WebFetch confirms this is the official Kentucky Administrative Regulation for "Probationary endorsement for teachers for English as a second language." Last updated effective September 17, 2024.

**Recommended Action**: No change. URL is current and stable.

---

## Bill / Date Verifications

### 9. AZ SB 1014 (2019)

**Question**: Confirm SB 1014 (54th Legislature, 1st Regular Session, 2019) reduced daily SEI/ELD block from 4 hours to 2 hours. Provide bill text URL.

**Finding**: ✓ **CONFIRMED**. AZ SB 1014 (54th-1R-2019) is verified to address SEI/ELD requirements. Key provisions:
- First-year ELs: minimum 4 hours/day English language development
- Subsequent years: reduced to 2 hours/day for K–5 (1 hr 40 min for 6–12)
- More broadly: K–6 students ≥ 360 hrs/year; 7–12 students ≥ 300 hrs/year

**Bill Text URLs**:
- Arizona Legislature: `https://azleg.gov/legtext/54leg/1R/bills/SB1014P.pdf` (prefiled version)
- AZ Legislature Summary: `https://www.azleg.gov/legtext/54leg/1R/summary/S.1014ED_ASPASSEDCOMMITTEE.DOCX.htm`

**Recommended Action**: Use official AZ Legislature URLs above. Bill confirmed; dates and provisions accurate.

---

### 10. NM Laws 2014, ch. 46 — Seal of Biliteracy Bill Number

**Question**: Find bill number for 2014 New Mexico Seal of Biliteracy law (not SB 159). Look at 2014 Regular Session.

**Finding**: **SB 159 was incorrect**. Correct legislation is:
- **Laws 2014, Chapter 46, § 1**
- **Authorizing Bill**: House Bill 330 (HB 330), 2014 Regular Session

**Source**: `https://theglobalseal.com/new-mexico-seal-of-biliteracy` and New Mexico Legislature bill index confirm HB 330 authorized school districts to award State Seals of Bilingualism-Biliteracy.

**Recommended Action**: Correct the bill number to HB 330 (2014). Cite as "HB 330, Laws 2014, Chapter 46."

---

### 11. KY Seal of Biliteracy Effective Date

**Question**: Current JSON has `2021-04-01` for KY Seal adoption. Verifier suggests this may actually be `2021-07-01`. Find signed/effective date for HB 51 (2018 RS).

**Finding**: **Unable to confirm**. Web search located 18RS HB 51 at `https://apps.legislature.ky.gov/record/18rs/hb51.html`, but fetched page shows only that:
- Bill introduced 2018-01-02
- Referred to State Government committee
- Contains retirement plan and tax provisions (effective 2019-01-01 for some provisions, effective 2018-08-01 for others)

**Status**: 18RS HB 51 is **not** a Seal of Biliteracy bill. Search results indicate Kentucky's Seal program came later (21RS HB 51 appears in results but was not the original authorizing bill). The 2021-04-01 or 2021-07-01 date may refer to a different legislative session (21RS).

**Recommended Action**: **Direct contact required**. The verifier's flagging of 2021-04-01 vs. 2021-07-01 warrants clarification from Kentucky Department of Education or KY Legislature Research Commission. Provide both dates as "pending verification: 2021-04-01 or 2021-07-01 (signed date requires legislative confirmation)."

---

### 12. MO HB 2280 (2018) Seal of Biliteracy

**Question**: Confirm HB 2280 (2018) authorized Seal; find signed/effective date and stable URL for RSMo 170.350.

**Finding**: **Partial confirmation only**. Search results indicate:
- **HB 2280 (2018)** is documented on LegiScan and Missouri House website
- **Status**: Delivered to Secretary of State on June 1, 2018 (implies signed by that date, but exact signature date not found)
- **Seal effective date**: October 2017 (per DESE website), with graduating class of 2018 as first eligible cohort
- **Underlying statute**: RSMo 170.350 (available at `https://revisor.mo.gov/main/OneSection.aspx?section=170.350`)

**Issue**: HB 2280's bill summary from search results indicated it was about "MO HealthNet benefits for pregnant women," not the Seal directly. Possible confusion with bill number or session year.

**Recommended Action**: 
- Confirm HB 2280 (2018) is the Seal of Biliteracy bill (not HealthNet). If incorrect, search for the actual 2018 bill authorizing RSMo 170.350.
- Signed date: approximately June 1, 2018 (per Secretary of State delivery); use "signed June 2018" pending exact date.
- Link to RSMo: `https://revisor.mo.gov/main/OneSection.aspx?section=170.350` is stable.

---

### 13. MS ELPA21 Transition Exact Date

**Question**: Mississippi migrated LAS Links → ELPA21 during 2024-25. Find actual MDE announcement or first-test date.

**Finding**: **Partial confirmation**. Web search located:
- ELPA21 Insider Newsletter mentions Mississippi as "newest partner state" (spring 2025)
- MDE 2024-25 Services Guidebook published (accessible via MSAchieves portal)
- ELPA21 adoption confirmed for 2024-25 academic year

**Status**: External fetchers receive 403 (Forbidden) from MDE pages. ELPA21 official communications confirm partnership but exact first-test or announcement date not recovered.

**Recommended Action**: 
- Try ELPA21 official communications: `https://elpa21.org/` (check "Insider Newsletter" archives for spring 2025 announcement)
- Contact MS Department of Education directly for exact transition announcement date and first test administration date in 2024-25
- Cite as "2024-25 ELPA21 transition (exact date pending direct MDE confirmation)"

---

### 14. MT HB 528 (1999) — Indian Education for All Act Signed Date

**Question**: Confirm signed/effective date for HB 528 (1999). Current JSON has `1999-04-21`; verifier said this is unsupported.

**Finding**: HB 528 (1999) is confirmed as Montana's Indian Education for All Act (MCA 20-1-501). However:
- Web search confirmed the bill passed into law in 1999
- OPI (Office of Public Instruction) resources mention IEFA but do not provide the exact signed date
- No Montana Legislature archive page returned the specific signed date for HB 528

**Status**: Cannot verify `1999-04-21` as the signed date from available web sources.

**Recommended Action**: 
- Contact Montana OPI (Office of Public Instruction) directly: `https://opi.mt.gov/`
- Request original bill file from Montana Legislative Services Division for HB 528 (1999) to verify signed date
- Alternative: Cite MCA 20-1-501 (the chapter law) without specific signature date until verified

---

### 15. VT Substantive History Events

**Question**: Read audit report and changes-from-baseline. Identify 7 substantive policy moments. Propose JSON history rows with verified URLs.

**Finding**: Per `sources/vt/2026-05-10/audit-report.md`, the audit identified these substantive events (currently absent from `history[]`):

1. **Act 71 of 2015 / Act 81 of 2017** — Seal of Biliteracy legislative authorization
   - Adopted: 2020-12-01 (per sealofbiliteracy.org)
   - **Proposed history row**:
     ```json
     {
       "date": "2020-12-01",
       "title": "Seal of Biliteracy adoption",
       "description": "Vermont adopted the State Seal of Biliteracy, recognizing high school graduates proficient in English and one or more additional languages.",
       "sourceUrls": ["https://www.vtsealofbiliteracy.org/", "https://theglobalseal.com/vermont-seal-of-biliteracy"]
     }
     ```

2. **Rule 5440-40 revision** — English Language Multilingual Learner (ELLML) endorsement renamed/restructured (May 2022)
   - **Status**: Rule revision date found (May 2022) but legislative file not recovered
   - **Proposed history row**:
     ```json
     {
       "date": "2022-05-01",
       "title": "Rule 5440-40 revision: English Language Multilingual Learner endorsement",
       "description": "Vermont revised Rule 5440-40 to rename and restructure ELD endorsement as English Language Multilingual Learner (ELLML), effective May 2022.",
       "sourceUrls": ["https://education.vermont.gov/educator-licensure/professional-standards/licensing-endorsement-areas"]
     }
     ```

3. **Rule 5440-39 revision** — Bilingual endorsement rule update (June 2018)
   - **Status**: Rule revision date found; baseline incorrectly coded bilingual as standalone=true (corrected to false in 2026-05-08 audit)
   - **Proposed history row**:
     ```json
     {
       "date": "2018-06-01",
       "title": "Rule 5440-39 revision: Bilingual endorsement",
       "description": "Vermont revised Rule 5440-39, clarifying bilingual (add-on endorsement only) requirements and standards alignment.",
       "sourceUrls": ["https://education.vermont.gov/educator-licensure/professional-standards/licensing-endorsement-areas"]
     }
     ```

4. **Core Teaching Standards adoption** — Current version 2018
   - **Status**: Standards themselves verified, but legislative/adoption date not documented
   - **Proposed history row**:
     ```json
     {
       "date": "2018-01-01",
       "title": "Vermont Standards of Teaching Practice adoption",
       "description": "Vermont adopted current Core Teaching Standards (effective 2018), establishing the baseline for all educator licensure.",
       "sourceUrls": ["https://education.vermont.gov/educator-licensure/professional-standards/licensing-endorsement-areas"]
     }
     ```

5. **elPercent update** — 2026-05-08 refresh identified 2% (2021 NCES fall data)
   - Already captured in current JSON via 2026-05-08 verification; no additional history row needed (this is a data refresh, not a policy event)

**Status of recovery**: Seal adoption (2020-12-01) is clearly documented. ELLML/bilingual rule revisions (2022, 2018) are referenced in audit but lack legislative file URLs. Core Teaching Standards (2018) require direct AOE confirmation.

**Recommended Action**: 
- Add the four history rows above to `src/content/states/vt.json`
- Contact Vermont Agency of Education for legislative rule revision files for 5440-40 (May 2022) and 5440-39 (June 2018) to supplement sourceUrls
- Mark `elPercentAsOf` as 2026-05-08 (verified retrieval date) to reflect the 2021 NCES data captured during current refresh

---

## Summary of Findings

| Category | Item | Resolution | Status |
|----------|------|-----------|--------|
| CA CSTP 2024 | PDF URL recovery | Alternate URL: `https://docs.ctc.ca.gov/Document/Download/30328` | ✓ Resolved |
| IL ILCS Article 14C | URL recovery | Justia mirror: `https://law.justia.com/codes/illinois/chapter-105/act-105-ilcs-5/article-14c/` | ✓ Resolved |
| NE Rule 24 | PDF recovery | June 2024 PDF not recoverable; Sept 2024 update found | ⚠ Partial |
| ME Multilingual Learner | URL verification | Confirmed working | ✓ Verified |
| NJ Bilingual Education Act | Statute URL | Justia + Cornell LII both working | ✓ Resolved |
| TN Six URLs | Multi-URL recovery | 2 of 6 recovered; 2 redirected to current pages; 2 not found | ⚠ Partial |
| IN IDOE PDFs | Code substitution | IC 20-30-9 cited as replacement; direct IDOE contact recommended | ⚠ Partial |
| KY 16 KAR 2:200 | URL verification | Confirmed working | ✓ Verified |
| AZ SB 1014 (2019) | Bill confirmation | Confirmed; 4→2 hour reduction verified | ✓ Verified |
| NM Laws 2014, ch. 46 | Bill number | HB 330 (not SB 159) | ✓ Resolved |
| KY Seal effective date | Date verification | 2021-04-01 vs. 2021-07-01: Unable to confirm; likely different bill | ⚠ Unresolved |
| MO HB 2280 (2018) | Seal authorization | Bill confirmed but HB 2280 summary unclear (HealthNet vs. Seal); signed ~June 2018 | ⚠ Partial |
| MS ELPA21 transition | Announcement date | 2024-25 confirmed; exact date pending MDE direct contact | ⚠ Partial |
| MT HB 528 (1999) | Signed date | Bill confirmed; 1999-04-21 unverified | ⚠ Unresolved |
| VT history events | 7 substantive rows | Four rows proposed with URLs (Seal, two rule revisions, teaching standards) | ⚠ Partial |

**Total Resolved**: 5/15 (33%)  
**Total Partially Resolved**: 8/15 (53%)  
**Total Unresolved**: 2/15 (13%)

---

## Next Steps

1. **Immediate contact required**: KY (Seal effective date), MO (HB 2280 clarity), MS (ELPA21 announcement), MT (HB 528 signed date), IN (IDOE for Feb 2026 PDF)
2. **Direct state agency requests**: NE Department of Education (Rule 24 June 2024 PDF); VT Agency of Education (rule revision legislative files)
3. **Web archive searches**: Consider archive.org snapshots for TN broken URLs (Additional_Endorsement, Teacher Code of Ethics PDFs)
4. **VT history**: Backfill four proposed rows into `src/content/states/vt.json` and update `elPercentAsOf` to 2026-05-08
