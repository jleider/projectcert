# North Carolina — changes from baseline-2019

Verified against current NCDPI sources retrieved 2026-05-08.

## Summary

NC's EL credential structure is unchanged from baseline-2019. ESL
remains both a K-12 standalone (Special Subjects) license and a K-6
add-on to Elementary licensure. Bilingual education is not issued as a
distinct credential; the closest analog ("Elementary (K-6) Second
Language" add-on, plus K-12 "Other Second Languages" world-language
licenses) remains the same. SEI is not mandated for all teachers. The
2007/2008 NC Professional Teaching Standards remain the operative
standards document and are unchanged. NC remains a WIDA Consortium
member (ACCESS for ELLs).

## Field-level diffs

- elPercent: 6.9 -> 8.0
  (NCES table 204.20, Fall 2021 most-recent figure: 121,496 ELs in NC =
  8.0% of total enrollment, up from 7.0% in 2011 and from the
  baseline 2019 paper figure of 6.9%.)
- elPercentAsOf: 2019-10-01 -> 2021-10-01
  (Fall 2021 is the most recent year reported in NCES Digest table
  204.20 / "English Learners in Public Schools" indicator.)
- credentials.bilingual: no substantive change.
  Standalone + add-on remain. NC has no separate "bilingual education"
  license; the K-6 Second Language add-on (footnote: "May be added
  only to an Elementary (K-6) license and is valid for full-time
  assignments in grades 6 and below") and K-12 world-language licenses
  remain the structural fit. Notes preserved/clarified.
  Requirements remain null (sources do not specify program/coursework/
  practicum/test/languageProficiency requirements for the K-6 Second
  Language add-on; ambiguous -> null per refresh skill).
- credentials.eld: no substantive change.
  ESL is offered both as a K-12 Special Subjects standalone license
  and as a K-6 add-on to Elementary licensure (confirmed on the NCDPI
  Areas of Licensure page).
  - requirements.program: null -> true (Areas of Licensure page states
    completion of an approved educator preparation program is the
    route to licensure for all licensure areas, including ESL.)
  - requirements.coursework: true (unchanged; coursework is part of
    the approved EPP route).
  - requirements.practicum: null (unchanged; not explicitly required
    for ESL specifically beyond standard EPP student teaching;
    ambiguous -> null).
  - requirements.test: true (unchanged; Praxis II ESL has been the
    state-required licensure exam for the ESL area since at least
    2003 per the NC SBE testing requirements form; current Praxis is
    administered via Pearson/ETS Praxis per the Educator's Licensure
    page citing SBE policy LICN-003).
  - requirements.languageProficiency: false (unchanged; no candidate
    English-proficiency requirement for ESL endorsement).
- credentials.sei.mandatedForAllTeachers: false (unchanged). NC does
  not impose an SEI training requirement on all teachers; ML/Title III
  professional learning is targeted at teachers and administrators
  through the NCDPI ML/Title III team rather than mandated for every
  licensee.
- professionalStandardsMentions: unchanged.
  - diverse: true (Standard II header explicitly:
    "Teachers establish a respectful environment for a diverse
    population of students").
  - cultural: true ("diverse cultures", "cultural diversity",
    "cultural and economic obstacles").
  - linguistic: true (Standard IV: "Teachers understand the influences
    that affect individual student learning (development, culture,
    language proficiency, etc.)" — language theme is present though
    the word "linguistic" is not used verbatim).
  - el: false (no explicit reference to English learners, ELs, MLs,
    ESL, or multilingual learners in the 2007/2008 standards
    document).
- verificationStatus: baseline-2019 -> verified-2026.
- lastVerified: 2019-11-15 -> 2026-05-08.

## Source disposition

The 2019 baseline cited only "North Carolina Public Schools"
(<http://www.ncpublicschools.org>) as the SEA URL. That domain now
redirects to <https://www.dpi.nc.gov> (NCDPI). Both legacy entries are
preserved per the refresh skill ("don't delete the leider-2021 source
entries"). New 2026 entries appended for: NCDPI Areas of Licensure,
NCDPI Educator's Licensure, NCDPI ML/Title III, NCDPI ML Program
Compliance, NCDPI Legislation & Policy, NCDPI English Language
Development standards page, NCDPI Dual Language/Immersion, NCDPI
Diploma Endorsements (Seal of Biliteracy), NC Professional Teaching
Standards (2007/2008, current), NC SBE Praxis Testing Requirements
form, 16 NCAC 6C licensure rules, ETS Praxis (NC test prep entry),
WIDA Consortium membership page, NCES table 204.20, and NCES "English
Learners in Public Schools" Condition of Education indicator.

## Notes/quirks worth flagging

- ESL is BOTH a standalone K-12 Special Subjects license AND a K-6
  add-on to Elementary licensure. Schema captures via standalone=true,
  addOn=true.
- NC has 300+ Dual Language/Immersion programs across 8 languages but
  no separate "bilingual education" teaching credential — DL/I
  teachers hold their content area license plus appropriate language
  qualifications. The K-6 "Second Language" add-on is the closest
  analog and is grade-restricted to grades 6 and below.
- NC offers the Global Languages Endorsement (Seal of Biliteracy) on
  the high school diploma; this is a student-side credential, not a
  teacher credential, and is recorded only as context.
- WIDA Consortium membership confirmed (NC listed alongside the other
  41 member states/territories on the WIDA Consortium page). ACCESS
  for ELLs is the annual ELP assessment.
