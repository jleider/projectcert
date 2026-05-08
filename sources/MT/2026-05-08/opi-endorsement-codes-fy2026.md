# OPI Endorsement Codes (FY2026)

- URL: https://opi.mt.gov/Portals/182/Page%20Files/School%20Accreditation/FY2026%20Endorsement%20Codes.pdf
- Retrieved: 2026-05-08
- Revision date on document: 08/18/25

## Why this is cited

This is the operative OPI list of endorsement areas tied to ARM
10.57.412 (Class 1 & 2). It is the canonical answer to "does Montana
offer an EL/ESL/bilingual endorsement?"

## What it says (verbatim relevant rows)

Class 1 & 2 Endorsements — ARM 10.57.412:

```
06A ESL  English as a Second Language  K-12
```

World Languages section (separately):

```
06A ARA  Arabic                K-12
06A ASL  American Sign Language K-12
06A CHI  Mandarin Chinese      K-12
06A FRE  French                K-12
06A GER  German                K-12
06A IRI  Irish                 K-12
06A ITA  Italian               K-12
06A LAT  Latin                 K-12
06A RUS  Russian               K-12
06A SPA  Spanish               K-12
06Z ASB  Assiniboine           K-12
06Z BLA  Blackfeet             K-12
06Z CHE  Cheyenne              K-12
06Z CHI  Chippewa              K-12
06Z CRE  Cree                  K-12
06Z CRO  Crow                  K-12
06Z DAK  Dakota                K-12
06Z GV   Gros Ventre           K-12
06Z KOO  Kootenai              K-12
06Z SAL  Salish                K-12
```

There is also a Class 7 American Indian Language and Culture
Specialist license (separate from the World Languages endorsements
listed above), administered under tribal authority per ARM 10.57.434
(noted in OPI license-options page; not in this PDF).

## Schema implications

- `eld.offered = true`, code `06A ESL` (K-12 endorsement).
- `bilingual.offered = false`. The World Languages and tribal
  language endorsements are language-content endorsements, not
  bilingual-education credentials. There is no separate "Bilingual
  Education" endorsement code.
- `eld.standalone = false`. The ESL endorsement attaches to a Class 1
  or 2 license; it is not a freestanding credential.
- `eld.addOn = true`.
