# PTSB — Endorsement Areas

- **URL**: https://wyomingptsb.com/licensure/endorsement-areas/
- **Local snapshot**: NOT saved as HTML — ModSecurity blocked the
  curl request (406). Content extracted via WebFetch.
- **Retrieved**: 2026-05-08
- **Authority**: Wyoming Professional Teaching Standards Board (PTSB)

## EL-related endorsements listed

- **English as a Second Language (ESL)** — K-6, 5-8, 6-12, K-12
- **Dual Language Immersion** — K-12
- **World Languages** (incl. ASL as a Foreign Language) — multiple
  grade bands

## Not present

- No "Bilingual Education" endorsement.
- No "TESOL" endorsement (though the underlying TESOL standards are
  incorporated by reference in PTSB Chapter 4 — see
  `ptsb-endorsement-standards.md`).

## Coding implications

- "Dual Language Immersion (K-12)" is a relatively recent addition
  that did not appear in the leider-2021 baseline coding. It sits
  between ESL and bilingual: it is structured around teaching content
  in a partner language, but PTSB does not classify it as a
  "bilingual" endorsement. Because Dual Language Immersion is a
  specialty of language *immersion* rather than a credential to
  educate classified ELs in their home language, we keep
  `credentials.bilingual.offered = false` and add a note flagging the
  DLI endorsement for future cycles. The schema does not have a
  separate "immersion" bucket (per CLAUDE.md, we don't expand the
  schema mid-refresh).
