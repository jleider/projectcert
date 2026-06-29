# Review console (`/audit/`) — setup

The gated review console lets authorized reviewers confirm each
displayed datapoint per state, propose corrections, and track progress.
The static site is unchanged; the tool is backed by Cloudflare Pages
Functions (`functions/api/`) and a D1 database, gated by Cloudflare
Access. This document covers the one-time infrastructure setup — the
parts that live in the Cloudflare dashboard rather than the repo.

## Architecture

```
Cloudflare Access (email allowlist)  ── gates ──▶  /audit/*  and  /api/*
                                                        │
Static Astro site (dist/)                               ▼
Pages Functions (functions/api/*)  ── read/write ──▶  D1 (projectcert-audit)
                                                        │
GitHub Actions (nightly + weekly)  ── wrangler ────────┘
   • audit-ledger-sync.yml      exports checkmarks      → src/data/verification-ledger.json
                                exports accepted links  → src/data/link-whitelist.json
   • external-link-check.yml    broken cited URLs       → broken_links table
                                bot-blocked URLs        → link_reviews table
```

## Link review (`/audit/links`)

The weekly link sweep classifies cited URLs that reject bots (HTTP
401/403/405/429) as `needs-review` rather than broken, and upserts them
into the `link_reviews` table. A reviewer opens **`/audit/links`**,
confirms each URL is live, and accepts it. The nightly sync exports
accepted rows into `src/data/link-whitelist.json`; the checker reads that
file and reclassifies those URLs as `accepted`, so they stop being
flagged. Genuine breakage (404/5xx/network) stays in the broken-link
flow and feeds datapoint re-verification instead.

The checkbox ledger is a **separate signal** from the curated
`verificationStatus` enum. Nothing here ever promotes a state to
`verified-2026`; that remains a human, audit-trailed decision.

## 1. Create the D1 database

```sh
npx wrangler d1 create projectcert-audit
```

Copy the returned `database_id` into `wrangler.toml` (the
`[[d1_databases]]` block). Then apply the schema:

```sh
npx wrangler d1 migrations apply projectcert-audit --remote
```

## 2. Bind D1 to the Pages project (dashboard — authoritative)

In the Cloudflare dashboard: **Workers & Pages → projectcert →
Settings → Functions → D1 database bindings**, add binding
`DB` → `projectcert-audit`. The dashboard binding is authoritative for
Pages (it wins over `wrangler.toml`, whose binding is for local dev).

Set the same vars for production functions (**Settings → Environment
variables**):

- `ACCESS_TEAM_DOMAIN` — e.g. `yourteam.cloudflareaccess.com`
- `ACCESS_AUD` — the Access application AUD tag (step 3)

Do **not** set `DEV_REVIEWER_EMAIL` in production — it bypasses auth and
is for local development only.

## 3. Configure Cloudflare Access

**Zero Trust → Access → Applications → Add → Self-hosted.**

- Application paths: cover both `projectcert.org/audit` and
  `projectcert.org/api`.
- Policy: **Allow**, include rule **Emails** (the reviewer allowlist),
  or **Emails ending in** a domain.
- Identity provider: Google / One-time PIN.
- After creating it, copy the **Application Audience (AUD) tag** into
  the `ACCESS_AUD` env var, and the **team domain** into
  `ACCESS_TEAM_DOMAIN`.

The functions verify the signed `Cf-Access-Jwt-Assertion` JWT against
`https://<ACCESS_TEAM_DOMAIN>/cdn-cgi/access/certs` with that AUD. This
is the real auth boundary — the email header alone is not trusted.

### Protect preview deployments

Pages Functions are also served on `*.pages.dev`, which is not behind
the Access app on `projectcert.org`. JWT verification already rejects
un-gated requests, but as defense in depth also either enable Access on
preview URLs or restrict/disable the `*.pages.dev` route.

## 4. GitHub Actions secrets

For the nightly ledger sync and the weekly broken-link sync, add repo
secrets:

- `CLOUDFLARE_API_TOKEN` — token with D1 read/write for this account.
- `CLOUDFLARE_ACCOUNT_ID`.

Both sync workflows skip gracefully when the secrets are absent.

## Local development

`npm run dev` (plain Astro) does **not** run the Functions, so the
`/api/*` calls fail and the console renders read-only. To exercise the
full tool locally:

```sh
npm run build              # produces dist/ (Pages Functions live in functions/)
npm run d1:migrate:local   # applies schema/d1/ to a local SQLite under .wrangler/state
npm run dev:pages          # wrangler pages dev dist --binding DEV_REVIEWER_EMAIL=dev@local
# → open http://localhost:8788/audit/
```

The D1 binding (`DB`) and `compatibility_date` come from `wrangler.toml`,
so they don't need command-line flags. `DEV_REVIEWER_EMAIL` (passed via
`--binding`, *not* `--var`, which `wrangler pages dev` does not accept)
bypasses the Access JWT check and stands in for the authenticated
reviewer; it must never be set in production. The local D1 lives under
`.wrangler/state` and is independent of the remote database — local
checkmarks/suggestions stay local.

**Schema changes.** While the audit feature is pre-release the schema
lives in a single migration (`schema/d1/0001_init.sql`); editing it does
not re-run against an already-migrated local DB, so after a schema change
reset local state: `rm -rf .wrangler && npm run d1:migrate:local`. Once
the D1 database is live in production, further schema changes must be
**new** migration files (`0002_*.sql`, …), never edits to `0001`.

To populate the `/audit/links` queue locally, run a sweep into the local
D1:

```sh
npm run check:links -- --json > /tmp/links.json
npx tsx scripts/sync-link-reviews.ts --input /tmp/links.json --out /tmp/lr.sql
npx wrangler d1 execute projectcert-audit --local --file /tmp/lr.sql
```
