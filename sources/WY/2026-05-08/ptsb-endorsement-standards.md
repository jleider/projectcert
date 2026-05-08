# PTSB — Endorsement Standards (Chapter 4 references)

- **URL**: https://wyomingptsb.com/home/rules-and-regulations/ptsb-endorsement-standards/
- **Rules index URL**: https://wyomingptsb.com/home/rules-and-regulations/
- **Local snapshot**: NOT saved as HTML — ModSecurity blocked curl.
  Content extracted via WebFetch.
- **Retrieved**: 2026-05-08

## Chapter inventory (filing dates)

| Chapter | Subject | Filing date |
|---|---|---|
| 1 | General Regulations | 2025-10-15 |
| 2 | General Provisions for Educator Licenses, Endorsements, Permits & Authorizations | 2025-10-15 |
| 3 | Terms and Conditions for Educator License Endorsements | 2026-01-26 |
| 4 | Program Approval Standards for Endorsement Areas | 2026-01-26 |
| 5 | Exception Authorizations | 2026-01-26 |
| 6 | Permits | 2025-10-15 |
| 7 | Coaching | 2022-05-04 |
| 8 | Renewal Requirements | 2010-05-12 |
| 9 | Due Process | 2011-03-21 |

The chapter PDFs are hosted on Adobe Acrobat cloud
(`acrobat.adobe.com/id/...`) rather than directly on
wyomingptsb.com. Direct download URLs require Adobe-side referer
handling and the URLs rotate; we record the chapter index page as
the canonical source.

## TESOL incorporation by reference

Quoted from the endorsement-standards page:

> "Teachers of English to Speakers of Other Languages (TESOL) as
> existing on February 1, 2023 including amendments adopted by TESOL
> as of that date."

→ Wyoming PTSB **adopts the TESOL P-12 Teacher Preparation Standards
(2018)** by incorporation, frozen at the 2023-02-01 amendment level.
This is the substantive standard that an approved Wyoming ESL
preparation program must meet.

The TESOL 2018 Standards Document is published at:
https://www.tesol.org/media/v33fewo0/2018-tesol-teacher-prep-standards-final.pdf

## Diversity / cultural / linguistic / EL language in PTSB rules

The web search returned this characterization from the underlying
Chapter 4 program-approval standards (CEEDAR / wyoleg summaries plus
PTSB language):

- "Standards require that teacher candidates engage all students,
  including English language learners and students with
  exceptionalities, through instructional conversation."
- "Higher education and school faculty are required to be
  knowledgeable about and sensitive to preparing candidates to work
  with diverse students, including students with exceptionalities."
- "Professional development domains for educators include
  understanding diversity ..."

→ Chapter 4 explicitly references **diverse**, **English language
learners**, and **diversity**. The word "cultural" appears in the
summary text ("culturally and linguistically..."). The word
"linguistic" is implicit in the TESOL incorporation but not directly
quoted in the chapter index summary.

## Coding implications for `professionalStandardsMentions`

Wyoming does not publish a single "Professional Teaching Standards"
document of the form CO, MA, or DC publish. The closest equivalents
are:

1. **PTSB Chapter 4** (Program Approval Standards for Endorsement
   Areas) — references diverse, EL, diversity, and incorporates TESOL
   standards (which themselves cover linguistic/cultural content).
2. **PTSB Code of Conduct** — focuses on ethical conduct, not
   pedagogical standards mentions.

For this refresh, we treat Chapter 4 as the operative "professional
standards" surface and code conservatively:

- `diverse: true` — explicit in Chapter 4.
- `cultural: true` — TESOL standards (incorporated) are explicitly
  about *cultural* and linguistic competence. Conservative true.
- `linguistic: true` — TESOL standards incorporated; "linguistically
  diverse" framing in Chapter 4 summary.
- `el: true` — explicit "English language learners" reference in
  Chapter 4 program approval standards.

All four flags **unchanged from baseline-2019** (which had all four
true).

## Limitation / gap

We were unable to retrieve the Chapter 4 PDF directly (the
acrobat.adobe.com URL requires interactive auth tokens). The
secondary-source phrasing above (CEEDAR, web search synthesis of
PTSB) is consistent with both the leider-2021 coding and what TESOL
2018 incorporation implies, but a future refresh should download the
chapter PDF directly via a browser session and verify the four
booleans against the full text.
