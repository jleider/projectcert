# Review console (`/audit/`) — setup

The gated review console lets authorized reviewers confirm each
displayed datapoint per state, propose corrections, and track progress.
The static site is unchanged; the tool is backed by Cloudflare Pages
Functions and a D1 database, behind either a shared username/password or
Cloudflare Access. This document covers the one-time infrastructure setup —
the parts that live in the Cloudflare dashboard rather than the repo.

## Architecture

```
                     ┌─ functions/audit/_middleware.ts  ── gates ──▶  /audit/*  (console pages)
authentication ──────┤     shared login OR Access JWT
(fails closed)       └─ functions/api/_middleware.ts    ── gates ──▶  /api/*    (read/write)
                                                        │
Static Astro site (dist/)                               ▼
Pages Functions (functions/api/*)  ── read/write ──▶  D1 (projectcert-audit)
                                                        │
GitHub Actions (nightly + weekly)  ── wrangler ────────┘
   • audit-ledger-sync.yml      exports checkmarks      → src/data/verification-ledger.json
                                exports accepted links  → src/data/link-whitelist.json
   • external-link-check.yml    broken cited URLs       → broken_links table
                                unconfirmable URLs      → link_reviews table
```

Both middlewares share one gate (`src/lib/audit-auth.ts`), so the pages and
the API cannot drift apart on who is allowed in.

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

The credential vars for production functions are set in the same place
(**Settings → Environment variables**) — which ones depends on the
authentication path chosen in step 3.

Do **not** set `DEV_REVIEWER_EMAIL` in production — it bypasses
authentication entirely and is for local development only.

## 3. Choose an authentication path

The console accepts either credential path, resolved by
`src/lib/audit-auth.ts` and enforced by two middlewares —
`functions/audit/_middleware.ts` over the pages and
`functions/api/_middleware.ts` over the API.

**Both fail closed.** With neither path configured, `/audit/*` returns 500
and `/api/*` returns 500; the console is never served to the public. This is
a property of the deployment, not of the dashboard: before this middleware
existed the console's HTML was a plain static asset, and any Access
misconfiguration would have published it.

### Option A — shared username and password (simplest)

Set two Pages environment variables (**Settings → Environment variables**):

- `AUDIT_USER` — use a reviewer's email address, since it is recorded as the
  attribution on every checkmark and suggestion.
- `AUDIT_PASSWORD`.

**These are per-environment, and `wrangler` only writes production.**
`wrangler pages secret put` has no `--environment` flag (verified on
wrangler 4.105.0), so a value set that way exists on production alone.
Preview deployments therefore have no credentials and their console
answers **500** — the fail-closed path, so a preview URL is safe to hand
around, but console review on a preview branch does not work.

Leaving preview unset is the recommended default: it keeps the shared
password off every preview deployment of every branch. Set the two values
under **Settings → Environment variables → Preview** in the dashboard only
when a console change genuinely needs preview review, and treat that as
widening the credential's exposure.

The browser prompts for them on first request to `/audit/` and replays them
on the same-origin `/api/*` calls the islands make. This is a single shared
login: every reviewer signs in as the same identity, so per-person
attribution is lost. Prefer Access when more than one person reviews.

### Option B — Cloudflare Access (per-reviewer identity)

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
the Access app on `projectcert.org`. Both middlewares already reject
un-gated requests there — the JWT is verified rather than the identity
header trusted, and with only Access configured a request arriving off-app
is refused outright. As defense in depth, also either enable Access on
preview URLs or restrict/disable the `*.pages.dev` route.

## 4. GitHub Actions secrets

For the nightly ledger sync and the weekly broken-link sync, add repo
secrets:

- `CLOUDFLARE_API_TOKEN` — token with D1 read/write for this account.
- `CLOUDFLARE_ACCOUNT_ID`.

Both sync workflows skip gracefully when the secrets are absent.

## Keeping the console out of search results

Four independent layers, none of which is sufficient alone:

1. **Authentication** (above) — the only real access control. A crawler
   receives 401, not the page.
2. **`X-Robots-Tag: noindex, nofollow, noarchive`** on every gated
   response, including the 401 itself.
3. **`<meta name="robots" content="noindex, nofollow">`** via
   `src/layouts/AuditLayout.astro`, which all three console pages use.
   `BaseLayout.astro` hardcodes `index, follow`, which is why the console
   has its own layout — do not migrate it back.
4. **`public/robots.txt`** disallows `/audit/`. Note the footgun the
   build check guards: a crawler matching a named `User-agent` group obeys
   that group alone and ignores `User-agent: *`, so the disallow is
   repeated in every group. `scripts/check-discovery-surfaces.ts` fails the
   build if any group omits it, and `/audit` is excluded from the sitemap
   and `llms-full.txt`.

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

**Schema changes — `0001_init.sql` is frozen.** The remote
`projectcert-audit` database has been created and migrated, so migrations
are now append-only: every further change is a **new** file
(`0002_*.sql`, …), never an edit to `0001`. Editing `0001` would diverge
the local and remote schemas silently, since an applied migration does not
re-run.

Locally, an edited migration also does not re-run against an
already-migrated database, so reset local state after any schema change:
`rm -rf .wrangler && npm run d1:migrate:local`. Apply to the remote with
`npm run d1:migrate:remote`.

To populate the `/audit/links` queue locally, run a sweep into the local
D1:

```sh
npm run check:links -- --json > /tmp/links.json
npx tsx scripts/sync-link-reviews.ts --input /tmp/links.json --out /tmp/lr.sql
npx wrangler d1 execute projectcert-audit --local --file /tmp/lr.sql
```
