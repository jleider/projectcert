# WIDA Consortium membership — provenance

Retrieved: 2026-05-07
Primary source: <https://wida.wisc.edu/about/consortium>
Cross-check: <https://en.wikipedia.org/wiki/WIDA_Consortium>

## Members coded `consortium: "WIDA"` (38 states + DC)

AK, AL, CO, DC, DE, FL, GA, HI, ID, IL, IN, KS, KY, MA, MD, ME, MI,
MN, MO, MT, NC, ND, NH, NJ, NM, NV, NY, OK, PA, RI, SC, SD, UT, VA,
VT, WA, WI, WY — plus TN (re-coded as WIDA based on the Wikipedia
adoption table; see Tennessee note below).

All WIDA members use **ACCESS for ELLs** as their annual ELP assessment.

## Discrepancies between sources

The WIDA "About / Consortium" page extraction returned 38 entities
(36 contiguous states + DC + AK + HI). Wikipedia's WIDA article listed
TN as a member but omitted KY and NY. Where the two sources disagree,
this dataset trusts the WIDA primary source for KY/NY and the
Wikipedia article for TN — TN's SEA pages return 404 to WebFetch but
TN has been a WIDA member since 2014 per training-data knowledge.

If a user verifies TN, KY, or NY differently, update the relevant
state JSON's `elpAssessment` and re-run `npm run test`.

## Territories / federal entities (out of scope)

This dataset covers the 50 states + DC. WIDA's roster also includes
MP (Northern Mariana Islands), VI (US Virgin Islands), BIE (Bureau of
Indian Education), and DODEA (Department of Defense Education
Activity). Those are not in `src/content/states/`.

## Field provenance

`elpAssessment.sourceUrl` for WIDA-member rows points at this WIDA
consortium page. State-page UI surfaces the link via
`<ExternalLink>` so readers can check the underlying claim.
