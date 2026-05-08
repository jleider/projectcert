# California — Changes from baseline-2019

Refresh date: 2026-05-08
Retrieved by: projectcert-2026
SEAs: California Department of Education (CDE) for student data &
ELPAC; California Commission on Teacher Credentialing (CTC) for
educator licensure.

## Sources verified live (200 OK via WebFetch)

1. https://www.ctc.ca.gov/credentials/leaflets/bilingual-authorizations-(cl-628b)
2. https://www.ctc.ca.gov/credentials/leaflets/english-learner-auth-clad-certificate-(cl-628c)
3. https://www.ctc.ca.gov/credentials/leaflets/serving-english-learners-(cl-622)
4. https://www.ctc.ca.gov/employers/manuals/english-learner-and-bilingual-authorizations/
5. https://www.ctc.ca.gov/educator-prep/ela
6. https://www.cde.ca.gov/ds/ad/cefelfacts.asp
7. https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp
8. https://www.cde.ca.gov/ta/tg/ep/
9. https://sealofbiliteracy.org/state/ca/
10. CTC California Standards for the Teaching Profession (CSTP), April
    2024 (PDF saved at sources/CA/2026-05-07/2024-cstp.pdf and re-read
    for this refresh — see cstp-2024.md).

The CTC website is fronted by Cloudflare and rejects unauthenticated
curl with a 1020 challenge; HTML snapshots for CTC URLs (1–5) were not
saved as bytes. Content was retrieved via WebFetch and grounded in the
markdown summaries in this directory. Per the skill rule "If WebFetch
returns ... fall back to the Read tool," WebFetch's textual extraction
is the primary record for these five sources. Curl-saved HTML snapshots
are present for sources 6, 7, 8, 9.

## Field diffs vs. baseline-2019

- **elPercent: 19.2 → 18.9**
  (NCES 2023 Digest Table 204.20, Fall 2021 — most recent
  state-level NCES figure for cross-state comparability. CDE
  DataQuest 2022–23 reports 19.01% as the SEA-specific cross-check.)
- **elPercentAsOf: 2019-10-01 → 2021-10-01**
- **credentials.bilingual.requirements.program: null → true**
  (CTC CL-628B Pathway 1: completion of coursework in a
  Commission-approved bilingual program with program-sponsor
  recommendation.)
- **credentials.bilingual.requirements.coursework: null → true**
  (Same source; explicit program coursework in pathways 1 and 3.)
- **credentials.bilingual.requirements.test: null → true**
  (CTC CL-628B Pathway 2: passing scores on CSET World Languages
  Tests II/III, IV, V is a full standalone pathway.)
- **credentials.bilingual.requirements.languageProficiency: null → true**
  (CSET World Languages by design assesses language proficiency in the
  target language; pathway 2 makes proficiency a sufficient pathway.)
- **credentials.bilingual.requirements.practicum: null (unchanged)**
  (CL-628B does not enumerate practicum as a separate requirement
  outside the approved-program pathway. Coding null per "ambiguous →
  null" rule.)
- **credentials.eld.requirements.program: null → true**
  (CL-628C Pathway 2: approved CTEL program; plus AB 1059 embedded EL
  preparation is built into every Multiple/Single Subject preliminary
  credential issued since 7/1/2002, per CL-622.)
- **credentials.eld.requirements.coursework: null → true**
  (Approved CTEL program coursework, plus SDAIE coursework in the
  legacy/CCSD pathways.)
- **credentials.eld.requirements.test: true (unchanged)**
  (CTEL Examination remains an explicit pathway.)
- **credentials.eld.requirements.languageProficiency: false (unchanged)**
  (Second-language requirement is waived for any candidate holding a
  bachelor's degree from a regionally-accredited institution, which is
  itself a prerequisite for the underlying teaching credential.)
- **credentials.eld.requirements.practicum: null (unchanged)**
- **credentials.sei: unchanged**
  (sei.mandatedForAllTeachers=true retained. CA's mandate is the AB
  1059 embedded EL authorization in every Multiple/Single Subject
  preliminary credential since 7/1/2002 — functionally a one-course-
  plus requirement of every newly-credentialed classroom teacher. The
  notes string already captures this.)
- **professionalStandardsMentions: all four unchanged (true)**
  (2024 CSTP — adopted April 2024 — preserves and in places
  strengthens references. CSTP 3C-5 cites the "California
  Practitioners' Guide for Educating English Learners with
  Disabilities"; 3C-6 cites the "English Learner Roadmap." "Diverse,"
  "cultural," "linguistic" appear pervasively across CSTPs 1–6.)
- **sealOfBiliteracy.adopted: true (unchanged)**
- **sealOfBiliteracy.year: 2011 (unchanged)**
- **sealOfBiliteracy.sourceUrl:**
  https://sealofbiliteracy.org/ → https://sealofbiliteracy.org/state/ca/
  (state-specific URL preferred — same fact)
- **elpAssessment: unchanged**
  (ELPAC, state-specific, no consortium. Source URL kept at
  https://www.cde.ca.gov/ta/tg/ep/.)
- **lastVerified: 2019-11-15 → 2026-05-08**
- **verificationStatus: baseline-2019 → verified-2026**

## Sources appended

The two leider-2021 source entries are retained. Ten new
projectcert-2026 entries appended (one per primary source above).

## Gaps / unresolved

- Practicum requirements for both bilingual and ELD are coded null
  rather than true/false. CTC leaflets enumerate exam, coursework, and
  approved-program pathways but do not separately call out fieldwork /
  practicum hours; embedded preparation in initial credentials clearly
  involves clinical practice but the leaflets are silent on the
  add-on-specific practicum requirement. Honest coding is null.
- BCLAD lineage: the new-issue pathway since AB 1871 (2008) is the
  add-on Bilingual Authorization; the standalone Bilingual Crosscultural
  Specialist Credential is referenced in CL-622 as a recognized
  authorization but is not a primary new-issue pathway. Coding
  standalone=true per project convention (BCLAD = standalone bilingual)
  and addOn=true to reflect the current new-issue pathway.
- CTC URL byte snapshots could not be saved due to a Cloudflare 1020
  block on direct curl. WebFetch retrieval is the primary record;
  markdown summaries with direct quotes from each leaflet are the
  audit trail.
