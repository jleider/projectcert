---
name: state-source-refresh
description: Workflow for re-verifying one state's EL teacher certification data against current SEA sources. Use when the user asks to "refresh", "verify", or "update" a specific state, or when a baseline-2019 record needs to be promoted to verified-2026. This is the Phase 2 workflow that runs incrementally per-state until all 51 are current.
---

# State source refresh — Phase 2 verification workflow

The goal: take one state's `baseline-2019` record (or stale
`verified-2026`) and bring it current against the SEA's *present-day*
public documents, with full provenance.

## When this skill triggers

Phrases like:

- "refresh `<state>`"
- "verify `<state>`"
- "update `<state>` data"
- "check Massachusetts" / "let's do Texas next"
- "promote `<state>` to verified-2026"

Also appropriate when the user references the `/verification` page and
asks to work on the next pending state.

## Procedure

### 1. Read the current record

`src/content/states/<usps>.json` — note `verificationStatus`,
existing `sources[]`, `notes`, and any quirks.

### 2. Pull current SEA sources

For each entry in `sources[]`:

1. WebFetch the URL.
2. If it returns 200 and content matches the original purpose, save a
   snapshot.
3. If it 404s or has clearly moved, search the SEA homepage for the
   current equivalent (e.g., the "teacher licensure" / "educator
   preparation" / "credentialing" section).
4. Save the current PDF or page snapshot to:

   ```text
   sources/<usps>/<YYYY-MM-DD>/<short-slug>.{pdf,html}
   ```

   (Date is the day of retrieval, not publication.)

5. **Read every source you save.** A file in `sources/<usps>/.../`
   and a corresponding entry in `sources[]` is a claim you read it
   and that the schema fields you set are grounded in its content.
   If `WebFetch` returns "binary content / can't extract text",
   fall back to the `Read` tool — it handles PDFs natively. Don't
   skip a source because the first extraction attempt failed; either
   read it some other way, or don't save it and don't cite it.

For documents the paper's Appendix A names but no longer exist, log
the disappearance in
`sources/<usps>/<YYYY-MM-DD>/changes-from-baseline.md`.

### 3. Re-code the credentials

Read each source carefully against the `el-cert-schema`. For each of
`bilingual`, `eld`, `sei`:

- Is it still offered? Did pathways change?
- Did `requirements.*` change (e.g., a state added a practicum
  requirement, dropped the test-only path)?
- Did the SEI mandate change? (NV in particular has been phasing in.)

For `professionalStandardsMentions`: open the current professional
teaching standards document. Search for `diverse, cultural, language,
linguistic, EL, English`. Refresh the four booleans.

For `elPercent`: prefer NCES "English Learners in Public Schools"
table (current year) over an SEA-specific number, for cross-state
comparability. Update `elPercentAsOf`.

### 4. Document changes

In `sources/<usps>/<YYYY-MM-DD>/changes-from-baseline.md`, list every
diff vs. the prior record. Examples:

```text
- bilingual.requirements.languageProficiency: false → true
  (state added a Spanish proficiency exam in 2023, see source 4)
- eld.standalone: false → true
  (state introduced a standalone TESOL certificate)
- professionalStandardsMentions.el: false → true
  (revised standards now reference ELs explicitly in 3 places)
```

If nothing changed: note "No substantive changes from baseline-2019."

### 5. Update the JSON file

- Bump `lastVerified` to today's date.
- Set `verificationStatus: "verified-2026"`.
- **Append** new entries to `sources[]` (don't delete the
  `leider-2021` entries — they remain part of the audit trail).
  Each new entry: `retrievedBy: "projectcert-2026"`,
  `retrievedAt: <today>`.
- Update `notes` if the state has new quirks worth flagging.

### 6. Validate and commit

```bash
npm run validate
```

If green, commit with a message like:

```text
verify: <state> sources refreshed against current SEA documents

- bilingual: added languageProficiency requirement
- standards: ELs now referenced explicitly
- elPercent: updated from 2019 (10.0%) to 2024 NCES (11.4%)
```

The pre-launch banner count updates automatically on next build.

## What to *not* do

- Don't delete the `leider-2021` source entries — they are the
  baseline audit trail. Always *append*.
- Don't refresh a state without saving snapshots. SEA pages change
  silently; future-you will need the bytes you saw today.
- Don't save a snapshot you didn't read. A file under
  `sources/<usps>/.../` and an entry in `sources[]` is a claim you
  read it and grounded the schema fields in its content. If
  `WebFetch` returns an unreadable binary blob, fall back to the
  `Read` tool (it handles PDFs natively) — don't shortcut by saving
  the bytes and coding from a third-party summary instead.
- Don't promote to `verified-2026` if any source returned 404 and you
  couldn't find a current equivalent. Use `in-progress` and leave a
  note in the JSON's `notes` for the next session.
- Don't fabricate `requirements.*` values to "match" the prior record.
  If a current source is ambiguous, set `null` and explain in `notes`.
- Don't change the schema. If a state has a credential that genuinely
  doesn't fit (e.g., a brand new program type), stop and discuss the
  schema change separately rather than smuggling new fields in.

## Resuming a partial refresh

If you find a state at `verificationStatus: "in-progress"`, look for
its most recent snapshot folder under `sources/<usps>/` and the
`changes-from-baseline.md` there. Read it, then continue from where
the prior session left off.

## Batch refresh guidance

It's tempting to do many states at once, but each state takes ~30–60
minutes of careful reading per source. Quality > throughput. Three to
five states per session is realistic; more risks shallow verification.
The user's launch criterion is *all 51 verified*, not *all 51
verified by Friday*.
