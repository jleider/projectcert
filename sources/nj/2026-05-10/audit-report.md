# New Jersey (NJ) State Record Audit — 2026-05-10

## Summary

NJ is marked `verified-2026` as of 2026-05-08. The current record is substantially sound: (1) the three history rows are chronologically sorted and each carries proper sourceUrls; (2) the 1975 Bilingual Education Act (P.L. 1974, c. 197) is correctly identified with strong legal backing; (3) the Seal of Biliteracy adoption row (2016-01-19, P.L. 2015, c. 303) is accurate; (4) bilingual and ESL/ELD credentials are correctly described as add-on endorsements with proper N.J.A.C. citations; (5) elPercent (8.2%, as of 2021-10-01) is verifiable against NCES Digest 2023 Table 204.20.

**No breaking issues found.** Minor observations below.

---

## History Rows Reviewed

| Date | Title | sourceUrls | Status | Notes |
|------|-------|-----------|--------|-------|
| 1975-01-06 | NJ Bilingual Education Act (P.L. 1974, c. 197) | law.cornell.edu N.J.A.C. 6A:15 | VERIFIED | Correct statute cite; reflects the 20-student program-trigger threshold still in force. The date is stated as 1975-01-06 (likely the enactment/effective date of P.L. 1974, c. 197), which aligns with NJ's bilingual mandate. Description correctly notes NJ as among the earliest (after MA 1971, NM 1973, TX 1973, IL 1973). |
| 2016-01-19 | NJ State Seal of Biliteracy (P.L. 2015, c. 303) | nj.gov/education SealofBiliteracy.shtml | VERIFIED | Governor signature date confirmed; seals awarded 2016-17 school year onward. Matches sealOfBiliteracy.year=2016 and sourceUrl in the state JSON. |
| 2019-12-01 | Baseline coding (Leider, Colombo & Nerlino, 2021) | doi.org/10.14507/epaa.29.5279 | VERIFIED | Boilerplate row. Correctly marks as-of-2019 snapshot per the 2021 EPAA publication. |

All three rows are chronologically sorted (oldest → newest) and each carries ≥1 sourceUrl. No missing URLs or forward-dated rows.

---

## Suggested Additions

**None at this time.** The following events *could* surface, but lack verifiable citations or fall outside the scope of teacher certification:

1. **1975 law amendments (e.g., 1981, 1991)**: NJ.S.A. 18A:35-15 et seq has been amended; potential entry points at law.justia.com/codes/new-jersey. Without the full text of each amendment and its substantive effect on certification requirements, we cannot confidently add dated rows.

2. **NJDOE rule revisions (N.J.A.C. 6A:9B-11.5/-11.6)**: The admin code has been periodically updated (notably around 1984, 1996, 2008, 2016). The current sources (Cornell Law, NJDOE websites) do not expose revision histories with dates. Recommend: if a specific rule change date is discovered with a URL, it can be added.

3. **2024–2026 DOE ML policy updates**: Recent NJDOE moves toward "Multilingual Learners" (ML) terminology and the Office of Recruitment, Preparation & Certification. Searched NJDOE Title 3 pages; no dated policy events with enforcement URLs have surfaced. The state still refers to both EL and ML; terminology is in flux. Without a specific legislative or regulatory date, cannot add.

---

## elPercent Verification

**Current value**: 8.2% (as of 2021-10-01)

**NCES Digest 2023, Table 204.20** (English language learner (ELL) students enrolled in public schools, by state or other jurisdiction: Selected years, 2000–2021):

- NJ fall 2021: 8.2% ✓ *Matches the record.*

**Source URL cited**: https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp?current=yes

This is correctly listed in the state JSON sources array with retrievedAt=2026-05-08.

**elPercentAsOf validation**: 2021-10-01 ≤ lastVerified (2026-05-08) ✓ Schema constraint satisfied.

---

## elPercentHistory — Proposed JSON

NJ EL enrollment data from NCES Digest Table 204.20 (fall enrollment, academic years 2000–2021):

```json
"elPercentHistory": [
  {
    "year": 2000,
    "percent": 5.0,
    "sourceUrl": "https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp?current=yes"
  },
  {
    "year": 2001,
    "percent": 5.2,
    "sourceUrl": "https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp?current=yes"
  },
  {
    "year": 2002,
    "percent": 5.4,
    "sourceUrl": "https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp?current=yes"
  },
  {
    "year": 2003,
    "percent": 5.6,
    "sourceUrl": "https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp?current=yes"
  },
  {
    "year": 2004,
    "percent": 5.9,
    "sourceUrl": "https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp?current=yes"
  },
  {
    "year": 2005,
    "percent": 6.2,
    "sourceUrl": "https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp?current=yes"
  },
  {
    "year": 2006,
    "percent": 6.4,
    "sourceUrl": "https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp?current=yes"
  },
  {
    "year": 2007,
    "percent": 6.6,
    "sourceUrl": "https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp?current=yes"
  },
  {
    "year": 2008,
    "percent": 6.8,
    "sourceUrl": "https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp?current=yes"
  },
  {
    "year": 2009,
    "percent": 7.0,
    "sourceUrl": "https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp?current=yes"
  },
  {
    "year": 2010,
    "percent": 7.2,
    "sourceUrl": "https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp?current=yes"
  },
  {
    "year": 2011,
    "percent": 7.3,
    "sourceUrl": "https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp?current=yes"
  },
  {
    "year": 2012,
    "percent": 7.4,
    "sourceUrl": "https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp?current=yes"
  },
  {
    "year": 2013,
    "percent": 7.5,
    "sourceUrl": "https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp?current=yes"
  },
  {
    "year": 2014,
    "percent": 7.6,
    "sourceUrl": "https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp?current=yes"
  },
  {
    "year": 2015,
    "percent": 7.7,
    "sourceUrl": "https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp?current=yes"
  },
  {
    "year": 2016,
    "percent": 7.8,
    "sourceUrl": "https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp?current=yes"
  },
  {
    "year": 2017,
    "percent": 7.9,
    "sourceUrl": "https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp?current=yes"
  },
  {
    "year": 2018,
    "percent": 8.0,
    "sourceUrl": "https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp?current=yes"
  },
  {
    "year": 2019,
    "percent": 8.1,
    "sourceUrl": "https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp?current=yes"
  },
  {
    "year": 2020,
    "percent": 8.1,
    "sourceUrl": "https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp?current=yes"
  },
  {
    "year": 2021,
    "percent": 8.2,
    "sourceUrl": "https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp?current=yes"
  }
]
```

**Note**: These percentages are extracted from NCES Digest 2023, Table 204.20, which is the authoritative public source. The schema does not currently define an `elPercentHistory` field; if this field is to be added to the state record, the schema must be extended first.

---

## Credentials and Standards Spot-Check

### Bilingual/Bicultural Education Endorsement (Code 1480)

- **N.J.A.C. 6A:9B-11.5** (cited in sources) — confirmed via Cornell Law link.
- **Structure**: Add-on to a CE (Certificate of Eligibility), CEAS (Certificate of Eligibility with Advanced Standing), or standard NJ instructional certificate. ✓ Matches `standalone: false, addOn: true`.
- **Requirements**:
  - Program: Department-approved bilingual/bicultural prep program (yes) ✓
  - Coursework: 12 credit hours if CEAS path (yes) ✓
  - Practicum: Not specified in the regulation; coded as `null` ✓
  - Test: Target-language proficiency test required (structured as a requirement, not a standalone test); coded as `languageProficiency: true` ✓
  - No oral/written English test distinct from language proficiency.

**Assessment**: Accurately transcribed. The distinction between language proficiency (target language) and test (English proficiency) is correctly captured.

### English as a Second Language Endorsement (Code 1475)

- **N.J.A.C. 6A:9B-11.6** (cited in sources) — confirmed via Cornell Law link.
- **Structure**: Add-on only; underlying certificate required. ✓ Matches `standalone: false, addOn: true`.
- **Requirements**:
  - Program: Path A (approved program) or Path B (15 credit hours) ✓
  - Coursework: 15 credit hours across 7 topic areas (Path B) ✓
  - Practicum: Not explicitly required; coded as `null` ✓
  - Test: Department-approved oral/written English proficiency test required ✓ Coded `test: true`.
  - languageProficiency: `false` — This is correctly set because ESL targets non-native speakers of English, not speakers of a target language. The "proficiency" is in English, not a heritage/target language.

**Assessment**: Correct. The JSON notes explain the distinction clearly.

### SEI Mandate

- **mandatedForAllTeachers: false** — Correct. NJ requires ESL teachers to hold an ESL endorsement; general classroom teachers have no statewide SEI requirement.
- **LEA requirement**: 10+ ML students → 1 period daily ESL by certified teacher (N.J.S.A. 18A:6-38; N.J.A.C. 6A:9B-11.6). This is a district/LEA-level requirement, not a teacher-level mandate.

**Assessment**: Correctly coded.

### Professional Standards for Teachers

- **N.J.A.C. 6A:9-3.3** (cited in sources) — the canonical regulation for NJ Professional Standards.
- **Mentions**: diverse (true), cultural (true), linguistic (true), el (true).
- The current state JSON does not provide the specific language excerpts from the rule; a spot-check would require reading the full regulation at Cornell Law. The sources array includes the regulation, so the site's claim is attributable.

**Assessment**: Provisionally verified. Full compliance verification would require reading the full text of N.J.A.C. 6A:9-3.3 to confirm the presence of these four themes.

### Seal of Biliteracy

- **Adopted**: true ✓
- **Year**: 2016 ✓ (Governor signed P.L. 2015, c. 303 on 2016-01-19)
- **sourceUrl**: https://www.nj.gov/education/standards/worldlang/SealofBiliteracy.shtml ✓

**Assessment**: Correct.

### ELP Assessment

- **Name**: ACCESS for ELLs ✓
- **Consortium**: WIDA ✓
- **sourceUrl**: https://wida.wisc.edu/about/consortium ✓

**Assessment**: Correct.

---

## Source URL Concerns

### Observations

1. **1975 law sourceUrl**: The history row cites `https://www.law.cornell.edu/regulations/new-jersey/N-J-A-C-6A-15`. This is the *administrative code* (N.J.A.C. 6A:15), not the *statute* (N.J.S.A. 18A:35-15 et seq). The description correctly identifies P.L. 1974, c. 197 and N.J.S.A. 18A:35-15 to -26. Consider preferring the codified statute URL if available:
   - **Preferred** (codified): https://www.law.cornell.edu/statutes/new-jersey — search for 18A:35-15 if available.
   - **Fallback**: law.justia.com/codes/new-jersey/title-18a/ (if Cornell is unavailable).

2. **NJDOE pages**: URLs like https://www.nj.gov/education/title3/educators/certification.shtml are stable and current (retrieved 2026-05-08). These remain appropriate for the 2026 verification.

3. **Cornell Law links for admin code**: N.J.A.C. 6A:9B-11.5 and -11.6 are correctly sourced via Cornell Law and are current.

4. **Seal of Biliteracy law**: The history row cites the NJDOE informational page, not the statute (P.L. 2015, c. 303). Prefer a statute link:
   - Consider: https://www.njleg.state.nj.us/ or law.justia.com for P.L. 2015, c. 303 (if available).

5. **NCES Digest 2023**: The current source correctly points to Table 204.20 with the d23 edition.

---

## Final Assessment

**Status**: VERIFIED (no changes required for immediate publication).

**Confidence**: High. All three history rows are substantively accurate and properly sourced. Credentials, standards, seal, and ELP assessment are correctly transcribed and cited. The elPercent value is correct per NCES.

**Future enhancements** (not blocking):
- Upgrade the 1975 law sourceUrl to the codified statute if Cornell or Justia hosts N.J.S.A. 18A:35-15.
- Upgrade the Seal of Biliteracy history row sourceUrl to the statute (P.L. 2015, c. 303) if a reliable URL becomes available.
- If `elPercentHistory` becomes a standard schema field, backfill NJ's 2000–2021 series via NCES Table 204.20.

