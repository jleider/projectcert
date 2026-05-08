# State ELP assessments — provenance

Retrieved: 2026-05-07
Primary sources:
- <https://wida.wisc.edu/about/consortium> (WIDA member roster)
- <https://en.wikipedia.org/wiki/WIDA_Consortium> (cross-check)
- per-state SEA pages where reachable via WebFetch

## Coded `consortium: "WIDA"` (39 states + DC)

All use **ACCESS for ELLs**. `sourceUrl` →
<https://wida.wisc.edu/about/consortium>.

States: AK, AL, CO, DC, DE, FL, GA, HI, ID, IL, IN, KS, KY, MA, MD,
ME, MI, MN, MO, MT, NC, ND, NH, NJ, NM, NV, NY, OK, PA, RI, SC, SD,
TN, UT, VA, VT, WA, WI, WY.

## Coded `consortium: "ELPA21"` (6 states)

| USPS | Assessment | Notes |
|------|-----------|-------|
| AR | ELPA21 | Founding ELPA21 member. |
| IA | ELPA21 | |
| NE | ELPA21 | |
| OH | OELPA | Ohio-administered, ELPA21-aligned. |
| OR | ELPA21 | Founding ELPA21 member. |
| WV | ELPA21 | |

`sourceUrl` for OH points at the Ohio DOE page; the rest fall back to
the Wikipedia ELPA21 article since the consortium homepage's HTTPS
cert was unreachable to WebFetch on retrieval day.

## Coded `consortium: null` — state-specific (6 states)

| USPS | Assessment | sourceUrl |
|------|-----------|-----------|
| AZ | AZELLA | azed.gov/oelas/azella |
| CA | ELPAC | cde.ca.gov/ta/tg/ep/ |
| CT | LAS Links Online | portal.ct.gov/sde/student-assessment/lasla-las-links-online |
| LA | ELPT | doe.louisiana.gov/resources/library/k-12-english-learners |
| MS | LAS Links | mdek12.org/OAE/OEAS/EnglishLearners |
| TX | TELPAS | tea.texas.gov/student-assessment/testing/telpas |

## Confidence notes

- **CA (ELPAC)** — confirmed via WebFetch of cde.ca.gov.
- **AZ, TX, OH, CT, LA, MS** — sourceUrl points at the canonical SEA
  page; the page itself returned 404 / 403 / TLS error on retrieval
  day. Names are coded from training-data knowledge; the URL gives a
  reader a stable place to verify.
- **TN** — re-coded as WIDA member in this refresh after the prior
  commit had it as non-member. WIDA's primary roster did not include
  TN in extraction but the Wikipedia adoption table does, and TN's
  SEA pages are unreachable to WebFetch. If a user can confirm TN
  uses a different assessment, update `tn.json` accordingly.

## Field provenance

`elpAssessment.sourceUrl` is rendered as a clickable link on each
state page so readers can audit the claim.
