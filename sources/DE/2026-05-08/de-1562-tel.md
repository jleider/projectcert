# DE 14 DE Admin Code 1562 — Teacher of English Learners (TEL)

Retrieved 2026-05-08 from Cornell LII mirror of the Delaware
administrative regulation:
<https://www.law.cornell.edu/regulations/delaware/14-Del-Admin-Code-SS-1562-4.0>
(canonical reg index also at
<https://regulations.delaware.gov/AdminCode/title14/1500/1562.shtml>;
the canonical SHTML page renders only its header on WebFetch but the
Cornell mirror carries the full text and the regulation history at
25 DE Reg 96 (07-01-21) confirms the substantive content).

The TEL is a **standalone Standard Certificate** authorizing the holder
to teach English Learners in grades K-12.

## 4.0 Prescribed Education, Knowledge, and Skill Requirements

### 4.1.1 — Education / Content (one of five pathways)

1. National Board for Professional Teaching Standards "English as a
   New Language" certificate.
2. Bachelor's, master's, or doctoral degree with **at least 30 semester
   hours** of coursework in Teaching English Learners from a
   CAEP/NCATE-approved or state-recognized educator preparation program
   at a regionally accredited institution.
3. Completion of an alternative-routes program under
   14 Del. C. §§ 1260-1266 for teaching English Learners.
4. Completion of a **Department-approved educator preparation program**
   in teaching English Learners.
5. Bachelor's degree in any field plus **15 college credits** (5 × 3)
   covering:
   - Methods of Teaching English as a Second Language
   - Second Language Acquisition
   - Teaching Literacy for English Learners
   - Second Language Testing
   - Structure of the English Language

### 4.1.2 — English Proficiency

Bachelor's or higher from a U.S. regionally accredited institution
where the majority of coursework was taught in English, **OR**
ACTFL Oral Proficiency Interview (OPI) and Writing Proficiency Test
(WPT) in English at minimum **"Advanced Mid"**.

### 4.1.3 — Assessment

Passing score of **149** on the **Praxis Subject Assessment — English
to Speakers of Other Languages, ETS Test Code #5362**.

## Schema mapping (eld credential)

- offered: TRUE
- standalone: TRUE (the TEL Standard Certificate is itself the license)
- addOn: TRUE — pathway 5 (the 15-credit "secondary credential" route)
  is functionally an add-on for already-licensed teachers; widely
  advertised as the "ESL endorsement" route by Delaware EPPs (DESU,
  UDel ACE Initiative, Wilmington U).
- requirements:
  - program: TRUE — pathways 2 and 4 require an approved educator
    preparation program; pathway 1 (NBPTS) and pathway 5 (15 credits)
    do not, but at least one approved-program path exists.
  - coursework: TRUE — every pathway requires structured coursework.
  - practicum: NULL — the regulation as quoted does not separately
    require a practicum at the certificate level (CAEP-approved
    programs in pathway 2 include clinical experience by accreditation,
    but pathways 1 and 5 do not require it on their face). Code as
    null + note rather than fabricate either direction.
  - test: TRUE — Praxis 5362 is required at certificate issuance
    regardless of pathway.
  - languageProficiency: TRUE — English proficiency is required (4.1.2);
    matches baseline coding. (For TEL the required proficiency is in
    English itself, which differs from the bilingual case where the
    proficiency target is the partner language; both are recorded
    under the same boolean by schema convention.)

## Comparison to baseline-2019

Baseline coded:
- requirements.program: null  → now TRUE (multiple approved-program
  pathways exist explicitly in the current reg)
- requirements.coursework: true → unchanged
- requirements.practicum: null → unchanged (still genuinely ambiguous)
- requirements.test: true → unchanged (Praxis 5362)
- requirements.languageProficiency: false → **TRUE**. Baseline coded
  this false, but 4.1.2 explicitly imposes English proficiency at
  Advanced Mid via ACTFL when the degree-coursework substitute does not
  apply. Updating to true. (Baseline note "English proficiency
  requirement explicit." matches this; the boolean appears to have been
  miscoded in 2019.)
