# PTSB — Add Endorsements

- **URL**: https://wyomingptsb.com/licensure/add-endorsements/
- **Local snapshot**: NOT saved as HTML — Wyoming PTSB site is fronted
  by ModSecurity which returned "406 Not Acceptable" to non-browser
  requests. Content extracted via WebFetch (which renders the page);
  the markdown summary below preserves the substantive text.
- **Retrieved**: 2026-05-08
- **Authority**: Wyoming Professional Teaching Standards Board (PTSB)

## Two pathways for adding an endorsement

### A. Institutional Recommendation (IR)

Complete an approved educator preparation program in the desired
teaching field at a regionally accredited institution. The program
must include student teaching/practicum at the relevant grade levels.
"An IR is recognized in every state."

The page gives an explicit ESL example: "an individual currently
endorsed in biology 6-12 and is completing a program to add ESL K-12"
must complete "student teaching or a practicum at the elementary K-6
or K-12 grade level(s)."

→ Practicum is *required* for the IR pathway to ESL K-12.

### B. Demonstration of Competency (DoC)

Listed restrictions: Elementary Education, School Administrator,
Related Services, and Categorical Special Education fields **cannot**
be added via DoC. **ESL is not on the restriction list**, so DoC is a
valid pathway for ESL.

Per-content-area requirements for DoC:

- 15 semester hours of coursework in the specific content area
  (third-party sources — e.g., eslteacheredu.org, citing earlier PTSB
  rules — list 27 hours specific to ESL with 9 in the last 5 years; the
  current PTSB page text shows 15/5 as the generic floor. The 27/9
  figure is therefore noted but not coded as authoritative absent the
  current Chapter 3 text.)
- 5 hours within the past 5 years
- Maximum 3 semester hours in pedagogy
- "C" or better in all coursework
- "Receive a passing score on a PTSB-approved Praxis II exam (or OPI
  exam for foreign language applicants)"

→ DoC pathway: coursework + test required; practicum NOT required.

## Coding implications for `credentials.eld.requirements`

Two pathways coexist; we code the conservative union:

- `program: null` — IR pathway requires an approved program;
  DoC pathway does not. The two pathways genuinely diverge, so we
  follow the schema convention (mirroring CO, MA, etc.) of coding the
  flag for the *primary* pathway PTSB documents — IR is the path the
  example walks through and the path that yields multistate
  recognition. But because both exist and applicants can elect DoC,
  we keep `program = null` with a note rather than `true`.
- `coursework: true` — required under DoC (15 SH); the IR pathway is
  defined by an approved program which by definition includes
  coursework.
- `practicum: null` — required under IR, NOT required under DoC.
  Genuinely path-dependent; null with notes.
- `test: true` — required under DoC explicitly; "may be required"
  under IR. Because DoC always requires a Praxis II passing score and
  is a published pathway, `true` is honest. (Baseline-2019 also coded
  `true`.)
- `languageProficiency: false` — neither pathway requires a target-
  language proficiency exam (this is ESL, not a world-language
  endorsement; OPI is named only for foreign-language applicants).
  Unchanged from baseline.
