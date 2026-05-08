# Alabama Seal of Biliteracy — Overview and Guidelines for Public Schools

Source URL: `https://www.alabamaachieves.org/wp-content/uploads/2024/03/GR_20240323_Alabama-Seal-of-Biliteracy-Guidelines-for-Alabama-Public-Schools_V1.0.pdf`
Snapshot: `al-seal-of-biliteracy-guidelines.pdf` / `al-seal-of-biliteracy-guidelines.txt`

ALSDE's official guidance document for LEAs implementing the Alabama
Seal of Biliteracy.

## What it tells us — adoption status and year

From the snapshot text (line 41 and line 625):

> "On April 1, 2022, the State of Alabama signed into law Alabama Act
> #2022-200, which [established the Alabama Seal of Biliteracy]."

> "On April 1, 2022, the Alabama legislature signed into law Alabama
> Act 2022-200 establishing an [Alabama Seal of Biliteracy]."

So Alabama formally adopted the Seal of Biliteracy in **2022** via
Act 2022-200, signed 2022-04-01. (Sealofbiliteracy.org records the
adoption date as 2022-04-06, which is the same statute, possibly the
governor's signing-ceremony date vs. the act's effective date — both
are within April 2022, so the schema's `year` field of 2022 is correct
either way.)

## What it tells us — criteria (informational, not in schema)

Awarded by ALSDE to graduating students who:

- demonstrate intermediate-mid (or higher) proficiency in English
  (typically via WIDA ACCESS exit, ACT Reading subscore, or
  equivalent); AND
- demonstrate intermediate-mid (or higher) proficiency in another
  world language (via ACTFL OPI/AAPPL, AP/IB exam thresholds,
  STAMP, NYSED Regents, etc.).

The Seal is awarded by LEAs under ALSDE oversight; participation is
not mandatory for districts.

## Schema mapping (from this source alone)

- `sealOfBiliteracy.adopted`: true (was `null` at baseline-2019,
  because the Seal didn't exist for Alabama until 2022).
- `sealOfBiliteracy.year`: 2022.
- `sealOfBiliteracy.sourceUrl`: the ALSDE Guidelines PDF URL above is
  the most authoritative single source we have. We use that URL on
  the state record.
