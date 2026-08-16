# Review console (`/audit/`) — setup

The gated review console lets authorized reviewers confirm each
displayed datapoint per state, propose corrections, and track progress.
The static site is unchanged; the tool is backed by Cloudflare Pages
Functions and a D1 database, behind Cloudflare Access. This document covers
the one-time infrastructure setup — the parts that live in the Cloudflare
dashboard rather than the repo.

## Architecture

```
                     ┌─ functions/audit/_middleware.ts  ── gates ──▶  /audit/*  (console pages)
authentication ──────┤     Cloudflare Access JWT (only path)
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

## 2. Bindings: `wrangler.toml` is authoritative, not the dashboard

**This is the reverse of what this document said until 2026-08-16, and the
error cost a debugging session — read it before setting anything in the
dashboard.**

Cloudflare's Pages Functions documentation states: *"When used in your
Pages Functions projects, your Wrangler file is the source of truth. You
will be able to see, but not edit, the same fields when you log into the
Cloudflare dashboard."* Because this repo has a `wrangler.toml` declaring
`[[d1_databases]]`, the deployment receives what that file declares — and
**anything configured only in the dashboard is displayed but not applied
at runtime.**

The failure mode is deliberately confusing: the API and dashboard keep
reporting a dashboard-set variable, both on the project and on the
individual deployment record, while the Function never receives it. The
first production deploy demonstrated it cleanly — `DB`, declared in
`wrangler.toml`, worked; `AUDIT_USER` / `AUDIT_PASSWORD`, set only in the
dashboard, did not exist at runtime, and `/audit/` answered its
fail-closed 500 on every hostname. Three rounds of checking the dashboard
config confirmed the values were "set" the entire time.

So: **declare bindings in `wrangler.toml`.** The `DB` binding is already
there. Verifying a value in the dashboard proves nothing about what the
Function can see; the only proof is the Function's own behaviour.

Do **not** set `DEV_REVIEWER_EMAIL` in production — it bypasses
authentication entirely and is for local development only.

## 3. Authentication

Authentication is resolved by `src/lib/audit-auth.ts` and enforced by two
middlewares — `functions/audit/_middleware.ts` over the pages and
`functions/api/_middleware.ts` over the API.

**Both fail closed.** With Access unconfigured, `/audit/*` and `/api/*` both
return 500; the console is never served to the public. This is
a property of the deployment, not of the dashboard: before this middleware
existed the console's HTML was a plain static asset, and any Access
misconfiguration would have published it.

**Cloudflare Access is the only credential path.** There was a shared
`AUDIT_USER` / `AUDIT_PASSWORD` login; it was removed on 2026-08-16 and
should not be reintroduced.

The reason is the ledger. Every checkmark, suggestion and link decision
records **who** made it (`verified_by`, `submitted_by`, `reviewed_by` in
D1), and the catalog's claim is attributable human verification against
current sources. One credential held by several people cannot answer "who
confirmed this" — the trail would show that a review happened while being
unable to say who performed it, which is unrecoverable after the fact. A
shared password also cannot be revoked for one person, and cannot be
configured safely here in any case: it must not be committed, and a
dashboard-only secret does not reach a Pages Function while `wrangler.toml`
is the source of truth (step 2).

Access solves all of it. Each reviewer signs in as themselves, the verified
assertion carries their own address, and that address is what lands in the
ledger. Its two settings are non-secret identifiers, so they live in
`[vars]` in `wrangler.toml`, the file the runtime actually reads.

### Configuring Access

**Zero Trust → Access → Applications → Add → Self-hosted.**

- Application paths: cover both `projectcert.org/audit` and
  `projectcert.org/api`.
- Policy: **Allow**, include rule **Emails** (the reviewer allowlist),
  or **Emails ending in** a domain.
- Identity provider: Google / One-time PIN.
- After creating it, copy the **Application Audience (AUD) tag** and the
  **team domain** into `wrangler.toml`:

```toml
[vars]
ACCESS_TEAM_DOMAIN = "yourteam.cloudflareaccess.com"
ACCESS_AUD = "<the AUD tag>"
```

Both are non-secret identifiers — the AUD tag names the application and is
useless without a signed assertion from that team's identity provider — so
committing them is fine, and `wrangler.toml` is the only place that
reliably reaches the runtime (step 2). Setting them in the dashboard
instead reproduces the same silent failure as the shared password.

The functions verify the signed `Cf-Access-Jwt-Assertion` JWT against
`https://<ACCESS_TEAM_DOMAIN>/cdn-cgi/access/certs` with that AUD. This
is the real auth boundary — the email header alone is not trusted.

### Protect preview deployments

Pages Functions are also served on `*.pages.dev`, which is not automatically
behind the Access app on `projectcert.org`. The middlewares already reject
un-gated requests there — the JWT is verified rather than the identity header
trusted, so a request arriving off-app is refused outright. As defense in
depth, put Access over `*.projectcert.pages.dev` as well.

Note what that does to the deploy gate in `ci.yml`: with Access in front of
the deployment, an unauthenticated probe is answered by Access before our
middleware runs, so the gate reports which layer refused rather than
implying the middleware was exercised. The middleware itself is covered by
`tests/audit-api.integration.test.ts` and `npm run e2e:audit`, and its
presence in a deployment by the Functions-bundle assertion in the Publish
step.

## 4. GitHub Actions secrets

For the nightly ledger sync and the weekly broken-link sync, add repo
secrets:

- `CLOUDFLARE_API_TOKEN` — token with D1 read/write for this account.
- `CLOUDFLARE_ACCOUNT_ID`.

Both sync workflows skip gracefully when the secrets are absent.

To have the weekly sweep email its cited-source report, also add:

- `LINK_REPORT_RECIPIENTS` — comma-separated addresses.
- `SMTP_SERVER`, `SMTP_PORT`, `SMTP_USERNAME`, `SMTP_PASSWORD`.
- `SMTP_FROM` — optional; only needed when the username is not itself a
  sender address (see below).

The send step stays inert until the recipients and `SMTP_SERVER` are both
set; the report uploads as a run artifact either way.

### Sending through a Google account

One report a week to a handful of reviewers sits far inside Gmail's
free sending limits, so a personal or Workspace account is sufficient —
no transactional provider required:

- `SMTP_SERVER` — `smtp.gmail.com`
- `SMTP_PORT` — `587`
- `SMTP_USERNAME` — the full Google address
- `SMTP_PASSWORD` — a **16-character App Password**, not the account
  password

App Passwords live under Google Account → Security → 2-Step Verification
→ App passwords, and the entry only appears once 2-Step Verification is
on. Google removed "less secure app access", so an App Password is the
supported path rather than a workaround, and it can be revoked on its own
without touching the account password.

Leave `SMTP_FROM` unset for Gmail: the username *is* the sender address,
and Google rewrites `From` to the authenticated account anyway. Set it
only for relay providers (Brevo, Mailjet, Resend, SMTP2GO), where the
username is an API key or account id and using it as a sender produces an
invalid `From`. Those providers also want the sending domain verified by
DNS, which is straightforward here because `projectcert.org` is already
on Cloudflare — that route is worth taking if the report should come from
the project rather than from a person.

**The recipient list is a secret, not a variable, and must stay one.**
This repository is public, so its Actions logs are world-readable, and a
step's `with:` block prints the values it receives — a variable would put
every reviewer's address in a public log on a weekly schedule. Secret
values are masked as `***` and cannot be read back out of the settings UI.
The same reasoning applies to any future recipient list: personal data
belongs in secrets even when it is not a credential.

A step-level `if` cannot read the `secrets` context, so both guarded
secrets are mapped into the job's `env` block and the guards test `env.*`.
That indirection is why the mapping exists; do not "simplify" it back to
`secrets.*` in the `if`, which silently evaluates to empty and disables
the step.

**The nightly sync also needs Actions permitted to open pull requests.**
`peter-evans/create-pull-request` fails with "GitHub Actions is not
permitted to create or approve pull requests" unless **Settings → Actions →
General → Allow GitHub Actions to create and approve pull requests** is on.
This was off and has been enabled (2026-08-16); confirm with:

```sh
gh api repos/jleider/projectcert/actions/permissions/workflow
# → {"default_workflow_permissions":"read","can_approve_pull_request_reviews":true}
```

`default_workflow_permissions` stays `read` deliberately — the sync
workflow requests `contents: write` and `pull-requests: write` in its own
`permissions:` block, so it is unaffected, while every other workflow keeps
a read-only token by default.

Note that the same switch also lets Actions *approve* pull requests, which
is why it is off by default. The mitigation is branch protection requiring
a human review, not leaving the switch off — with it off the sync fails
silently in the future rather than now: while the D1 tables are empty the
export rewrites `{}` over `{}`, produces no diff, and opens nothing, so the
failure would first appear the day a reviewer confirms a datapoint.

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
