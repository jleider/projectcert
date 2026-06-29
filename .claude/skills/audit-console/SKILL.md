---
name: audit-console
description: Architecture and conventions for the gated /audit/* reviewer console — Cloudflare Pages Functions + D1 + Cloudflare Access, the verification-datapoints descriptor, the public-badge ledger sync, and the bot-blocked-link review/whitelist flow. Invoke BEFORE editing anything under functions/, src/lib/verification-datapoints.ts, src/lib/audit-shared.ts, src/lib/link-classify.ts, src/pages/audit/, schema/d1/, the audit Svelte islands (AuditReviewer/AuditOverview/AuditLinkReview), or the sync scripts/workflows (build-verification-ledger, build-link-whitelist, sync-broken-links, sync-link-reviews, audit-ledger-sync.yml). Also covers the TypeScript/test footguns specific to the functions/ layer.
---

# Audit / review console

A gated tool for authorized reviewers to confirm each displayed datapoint
per state, propose corrections, and review bot-blocked source links. It is
the only non-static part of the deployment.

## Routes

- `/audit/` — overview: per-state % reviewed, open suggestions, broken-link
  report. Page `src/pages/audit/index.astro`, island `AuditOverview.svelte`.
- `/audit/<usps>` — per-state checklist. Page `src/pages/audit/[usps].astro`,
  island `AuditReviewer.svelte`.
- `/audit/links` — bot-blocked link review. Page `src/pages/audit/links.astro`,
  island `AuditLinkReview.svelte`.

All use `AuditLayout.astro` (`noindex,nofollow`). Routes live in
`src/lib/routes.ts` (`ROUTES.audit`, `ROUTES.auditLinks`); per-state URL via
`auditStateUrl(usps)` in `src/lib/state-types.ts` (never hand-concatenate).

## Backend (all Cloudflare, free tier)

- **Cloudflare Access** gates `/audit/*` and `/api/*` by email allowlist
  (dashboard config — see `docs/audit-setup.md`).
- **Pages Functions** in top-level `functions/api/*` provide the API:
  `verifications.ts`, `suggestions.ts`, `overview.ts`, `broken-links.ts`,
  `link-reviews.ts`, and `_middleware.ts` (auth).
- **D1** (`schema/d1/0001_init.sql`): tables `verifications`, `suggestions`,
  `broken_links`, `link_reviews`, `datapoint_sources`. Binding `DB`, configured
  in the dashboard (authoritative for Pages) and mirrored in `wrangler.toml`
  for local dev.

`_middleware.ts` does **mandatory** verification of the signed
`Cf-Access-Jwt-Assertion` JWT against the team JWKS + `aud` (the email header
alone is NOT trusted — Functions are also reachable on `*.pages.dev`, outside
Access). A `DEV_REVIEWER_EMAIL` var bypasses this for local dev only.

## Data model: the datapoint descriptor

`src/lib/verification-datapoints.ts` is the single source of truth for what a
reviewer checks: `datapointsFor(state)` returns a **fixed 32-entry skeleton**
(same `DATAPOINT_IDS` for every state, so the denominator is constant). Each
`Datapoint` has a stable `id` (the D1 key, never user-facing), an
academic-register `label`, a `section`, a formatted `displayValue`, and a
`contentHash` for drift detection. `history`/`elPercentHistory`/`sources` are
single `grouped` items.

**Per-datapoint sources.** Each `Datapoint` also carries `sourceUrls` — the
source(s) a reviewer opens to verify it. The schema has no per-field
provenance (only a flat per-state `sources[]`), so `datapointsFor` SEEDS this
heuristically: Seal/ELP use their own `sourceUrl`; grouped items use their
rows' sources; the rest are matched by keyword (`SECTION_SOURCE_KEYWORDS`)
against the cited sources, falling back to the full list. The seed is
approximate. A reviewer confirms the one real source in the console (a
single-select; one source of truth per datapoint), stored in the
`datapoint_sources` D1 table (PK `(usps, datapoint_id)`, via
`functions/api/datapoint-sources.ts`) and rendered as the confirmed source,
overriding the seed. Checking the datapoint's own verification box also flips
its source to confirmed. Do not treat the heuristic as provenance — it is a
starting point for human attribution.

Keep this module **Svelte-safe and Workers-safe**: no `astro:content`, no Node
APIs, a local structural `StateData` type (not an import from the content
collection). It is imported by the islands, the functions, and the scripts.

**Adding a datapoint:** add the id to `DATAPOINT_IDS` and a builder line in
`datapointsFor`; update the snapshot test in
`tests/verification-datapoints.test.ts`. Renaming an id orphans its D1 rows
(the snapshot test fails loud). The denominator grows, so previously
"complete" states correctly drop below 100%.

## Two write-back loops

1. **Public-badge ledger** (nightly `audit-ledger-sync.yml`): exports D1 →
   `src/data/verification-ledger.json` via `build-verification-ledger.ts`, and
   accepted links → `src/data/link-whitelist.json` via `build-link-whitelist.ts`,
   then opens a PR. A checkmark counts toward the public badge only if its
   `content_hash` still matches the current value AND no cited source is broken.
   **Never** writes a state JSON or `verificationStatus` — that stays
   human-curated (the integrity check requires an audit trail for
   `verified-2026`). `VerificationLedgerBadges.astro` renders the badge.
2. **Status-aware link review** (weekly `external-link-check.yml`):
   `check-external-links.ts` classifies via the pure `src/lib/link-classify.ts`
   (`resolveClassification`). Anything un-confirmable — a bot-block
   (401/403/405/429), a connection reset / TLS failure, or a 5xx →
   `needs-review` → `sync-link-reviews.ts` upserts into `link_reviews`; a
   reviewer accepts at `/audit/links`, which snapshots the observed status
   into `accepted_status`. The nightly `build-link-whitelist.ts` exports
   accepted rows to `src/data/link-whitelist.json` as `{url: {status, …}}`.
   The checker treats a whitelisted URL as `accepted` **only while its
   status is unchanged**; a changed response code re-flags it to
   `needs-review` (and `sync-link-reviews` resets the row to `pending`), and
   recovery to 2xx shows `ok`. Only a definitive 4xx-gone (404/410/…) is
   `broken` → `sync-broken-links.ts` into `broken_links`, flagging the
   dependent datapoint "needs re-verification". (5xx/network do NOT feed
   re-verification — they are review, not breakage.)

## Footguns (each cost real time once)

- **`functions/tsconfig.json` sets `"exclude": []`.** Extending the root config
  inherits its `exclude: [...,"functions"]`, which excludes the functions' own
  directory — `tsc` then silently checks nothing and passes vacuously.
  `npm run typecheck` runs the root project *and* `functions/tsconfig.json`.
- **Functions use relative imports** (`../../src/lib/...`), not the `@/` alias.
- **Tests importing `functions/api/*` are excluded from the root tsconfig**
  (`tests/audit-api.integration.test.ts`). Importing Workers-typed modules into
  the root DOM/Node program drags them in past `exclude` and breaks the
  typecheck. They still run under Vitest and are linted.
- **Integration tests use `node:sqlite`** as a D1 shim over the real schema
  (no dependency). It binds `?1..?N` positionally, matching D1.
- **`/audit/*` is excluded from sitemap / llms.txt / llms-full** — the
  exception to the "update all discovery surfaces" rule.

## Local development

```sh
npm run build
npm run d1:migrate:local
npm run dev:pages   # wrangler pages dev; set DEV_REVIEWER_EMAIL to stand in for auth
```

Plain `npm run dev` does not run the Functions, so the islands render
read-only (they degrade gracefully on `/api` fetch failure).

## Tests

`tests/verification-datapoints.test.ts`, `tests/audit-shared.test.ts`,
`tests/link-classify.test.ts` (unit); `tests/audit-api.integration.test.ts`
(handlers vs real SQLite), `tests/audit-sync.integration.test.ts` (scripts as
subprocesses + generated SQL executed against SQLite). All run under
`npm run verify`.

**End-to-end (browser):** `npm run e2e:audit`
(`tests/e2e/audit-console.e2e.mjs`) — a standalone script that resets +
migrates a local D1, builds, boots `wrangler pages dev` with the
`DEV_REVIEWER_EMAIL` bypass, and drives a headless browser against
`/audit/<usps>`. It is the only way to exercise the gated, Functions-backed
UI end-to-end (plain `astro dev` has no Functions; the public-page a11y suite
doesn't cover `/audit/*`). It guards the two Svelte reactivity traps that
have regressed: checking a datapoint must move the progress bar, and picking
an alternative source radio must update the shown "Confirmed source". When
the audit UI changes, run this. It is deliberately NOT in `npm run verify`
(needs wrangler + a chromium browser, `npx playwright install chromium`); the
`.mjs` is excluded from lint/typecheck for the same reason. Use `SKIP_BUILD=1`
to reuse the current `dist/`.
