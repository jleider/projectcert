# State Seal of Biliteracy — provenance

Retrieved: 2026-05-07
Primary sources:
- <https://sealofbiliteracy.org/> (homepage / map; static-extract
  was thin via WebFetch)
- <https://en.wikipedia.org/wiki/Seal_of_Biliteracy> (adoption
  table with year-by-state; the cleanest extracted list)

## Coded as `adopted: true` with explicit year (42 jurisdictions)

| Year | States |
|------|--------|
| 2011 | CA |
| 2013 | IL, TX, NY |
| 2014 | NM, WA, LA, MN, DC |
| 2015 | NC, IN, VA, NV, HI, WI, UT |
| 2016 | NJ, OR, MD, FL, GA, KS, AZ, RI |
| 2017 | CO, OH, MO, DE, CT, MA |
| 2018 | AR, IA, MI, TN, SC, ME |
| 2019 | ND, MS |
| 2020 | NE, ID |
| 2022 | PA |
| 2024 | SD |

## Coded as `adopted: null` (9 states)

AL, AK, KY, MT, NH, OK, VT, WV, WY — neither sealofbiliteracy.org
nor the Wikipedia adoption table records a statewide adoption year
for these. Wikipedia's prose claims "all 50 states + DC" by 2026,
but without a row in the table to cite, this dataset records `null`
("unverified") rather than `true` ("adopted").

`null` is **not** equivalent to "not adopted." A future refresh
should hit each SEA's website to settle the nine.

## Field provenance

`sealOfBiliteracy.sourceUrl` points at sealofbiliteracy.org for
adopted rows and the Wikipedia article for unverified rows. The
state-page UI links out via `<ExternalLink>`.
