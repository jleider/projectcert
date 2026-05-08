# Go Teach KY — Endorsements page

- Retrieved: 2026-05-08
- URL: https://goteachky.com/resources/certification/endorsements/
- File: goteachky-endorsements.html

## Findings

Go Teach KY (the EPSB-affiliated educator licensure portal that
replaced www.epsb.ky.gov) lists endorsements available in Kentucky.

**English as a Second Language (Primary - Grade 12)** is listed:
- Add-on endorsement to a base professional or restricted certificate.
- Requires completion of an approved educator preparation program.

Global endorsement application requirements (apply to ESL):
- Completion of an approved educator preparation program.
- Official transcripts documenting coursework.
- Passage of appropriate assessments for each endorsement.
- Character and Fitness review.

Most endorsement programs typically require 12-15 graduate credit hours.

**Bilingual education** is **not** listed as an available endorsement.

## Coding decisions

- credentials.bilingual.offered: **false** (unchanged)
- credentials.bilingual.standalone: **false**
- credentials.bilingual.addOn: **false**
- credentials.eld.offered: **true** (unchanged; ESL P-12 add-on)
- credentials.eld.standalone: **false** (must underlie a base cert)
- credentials.eld.addOn: **true**
- Program/coursework/test all true; practicum null; languageProficiency false.

See 16kar2-200-esl-endorsement.md for the regulatory citation that
grounds the program/test/coursework requirements.
