# Kentucky Seal of Biliteracy

- Retrieved: 2026-05-08 via WebFetch
- Primary URL: https://sealofbiliteracy.org/state/ky/
  (HTTPS curl returned 403 to this client; WebFetch read the page
  successfully — no static HTML snapshot saved.)
- Corroborating URL (KDE):
  https://education.ky.gov/curriculum/hsgradreq/Pages/Seal-of-Biliteracy.aspx
  (Live; KDE serves a 403 to direct curl from this network so no
  static HTML was saved. Content read via WebFetch.)

## Finding

Kentucky **adopted the State Seal of Biliteracy on April 1, 2021**
per sealofbiliteracy.org. KDE publishes guidelines on its
"Seal-of-Biliteracy" page (page metadata: published 8/26/2025) and
treats the program as voluntary at the district level. The program
covers English plus one or more additional languages, including
American Sign Language, Classical Languages (Latin, Classical Greek),
and Native American Languages.

## Coding decision

Baseline coded `adopted: null, year: null` with a generic Wikipedia
link. Updated to:

- adopted: **true** (was null)
- year: **2021** (was null)
- sourceUrl: **https://sealofbiliteracy.org/state/ky/** (was Wikipedia)

This is a substantive correction: KY *has* adopted the Seal; the
baseline `null` reflected uncertainty in 2019.
