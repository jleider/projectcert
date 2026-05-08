# NYSESLAT — New York State English as a Second Language Achievement Test

**URL:** https://www.nysed.gov/state-assessment/new-york-state-english-second-language-achievement-test-nyseslat
**Snapshot:** `nysed-nyseslat.html` (retrieved 2026-05-08)

## Key facts

- **Annual ELP assessment** for all ELLs enrolled in Grades K–12 in NYS public schools.
- **State-developed and state-administered.** NYSED's own assessment (the page lives under `/state-assessment/`); the WIDA Consortium appears only as a sidebar related-resource link, not as the test administrator.
- The vendor for delivery is Questar Assessment (referenced in NYSED CSP host allowlist `*.ny-practice.nextera.questarai.com`); historic vendor was Pearson. Computer-based transition projected for 2026.
- Components: Listening, Reading, Speaking, Writing.
- Five proficiency levels: Entering, Emerging, Transitioning, Expanding, Commanding.
- Used as the state's compliance instrument under federal annual ELP assessment mandates.

## Implication for schema

- `elpAssessment.name` = "NYSESLAT" (NY-specific term).
- `elpAssessment.consortium` = `null` (state-developed; not WIDA, not ELPA21).
- This **corrects** a baseline error: prior record listed `name: "ACCESS for ELLs"`, `consortium: "WIDA"`. NY has used NYSESLAT continuously since 2003; it has never been a WIDA/ACCESS state. Companion test for newly arrived students is the NYSITELL (also NYSED-developed).
