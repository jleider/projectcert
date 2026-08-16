# Deploying projectcert

How the site gets from `main` to `https://projectcert.org`. The gated
review console's Cloudflare-side setup (D1, Access, bindings) lives in
`docs/audit-setup.md`; this document covers the host, the domain, and the
deploy pipeline, and points at that one where they overlap.

## Provisioned state

What exists on the Cloudflare side today. None of these values are
secret; the credentials that *are* secret are called out in Phase 3.

| Thing | Value |
| --- | --- |
| Account | `justin@leiders.org` |
| Account ID | `52a127530f00f6b9b8e68532f811aedc` |
| Zone | `projectcert.org` — **active**, id `c939fa16692f13000305f3891192db20` |
| Nameservers | `louis.ns.cloudflare.com`, `melinda.ns.cloudflare.com` — moved and propagated |
| Pages project | `projectcert`, production branch `main`, direct-upload |
| Preview origin | `https://projectcert.pages.dev` |
| Custom domains | `projectcert.org` and `www.projectcert.org`, both serving |
| D1 database | `projectcert-audit`, region ENAM, id `26b74e93-f12d-4390-a665-908fd8ad61f1` |
| D1 schema | `0001_init.sql` applied; six application tables present |
| D1 binding | `DB`, bound on both production and preview |
| Access application | Team `green-base-15b0.cloudflareaccess.com`, gating `projectcert.org` `/audit` and `/api` |
| Access settings | `ACCESS_TEAM_DOMAIN` + `ACCESS_AUD`, declared in `wrangler.toml` `[vars]` |

**The public site is live.** Verified at the Cloudflare edge with
`curl --resolve` against `172.67.153.93`, confirming `server:
cloudflare` and a `cf-ray` on each response:

| Check | Result |
| --- | --- |
| Apex + `www` DNS | Proxied, resolving to Cloudflare anycast |
| `/`, `/states/ut/`, `/map/` | **200**, correct `<link rel="canonical">` |
| Always Use HTTPS | `http://projectcert.org/` → **301** → `https://` |
| `www` → apex redirect rule | `https://www.projectcert.org/` → **301** → `https://projectcert.org/` |
| HSTS | **Not enabled.** No `Strict-Transport-Security` header on a genuine 200. |
| Web Analytics | **Not injecting.** Zero occurrences of `cloudflareinsights.com` in the served HTML. |
| SSL Full (strict) | Not externally observable — governs the Cloudflare-to-origin leg only |

The last two were previously recorded as "unverifiable"; both became
testable the moment the apex served a real 200, and both turned out not
to be in force despite having been set in the dashboard. Re-check them
there.

### Authentication — Cloudflare Access, per reviewer

The Access application is live and verified at the edge: `/audit/`,
`/audit/<usps>`, `/audit/links`, and `/api/overview` all **302** to
`green-base-15b0.cloudflareaccess.com`, while `/`, `/states/<usps>/`,
`/map/`, `/about/`, `/credentials/…`, `/embed/map/`, `/llms.txt`, and
`/sitemap.xml` all stay **200**. The gate is scoped to exactly the two
path prefixes it should be.

Access replaced a shared username and password for one reason:
`verifications.verified_by` records *who* signed off on *which*
datapoint, and a shared login collapses every reviewer into one name.
Per-reviewer identity is a property of the shared path being absent, not
of Access being available.

Before Access, the console answered **500** — the fail-closed path
working as designed. The cause was not a missing setting but that
**`wrangler.toml` is the source of truth for a Pages Functions project,
so the dashboard-set `AUDIT_USER` / `AUDIT_PASSWORD` never reached the
runtime**. See the footgun below, and `docs/audit-setup.md`, which is
canonical for the console's auth.

Two problems were solved to get here, and both are worth knowing:

1. The zone-creation scan copied GoDaddy's parking `A` records
   (`76.223.105.230` / `13.248.243.5`), which shadowed the Pages custom
   domain and made the apex answer 200 from the parking page.
2. Attaching a custom domain **through the REST API registers it with
   the project but does not create the DNS record.** Only the dashboard
   flow does both. Verified: after a detach/re-attach cycle the apex had
   no `A`, `AAAA`, or `CNAME` on the authoritative nameservers 60
   seconds later, while both domains sat at `status=pending`,
   `method=http` — waiting for DNS that nothing was going to create.

## Decision record — why Cloudflare Pages

`LAUNCH-TODO.md` originally listed Cloudflare Pages and Netlify as
interchangeable options for a static Astro site. That framing is no
longer accurate: the repo has since taken a hard dependency on
Cloudflare specifically.

- `functions/api/*` — nine Pages Functions relying on **file-based
  routing**, which is a Pages-only feature (Workers static assets
  requires a framework or a manual compile step).
- `schema/d1/` + the `[[d1_databases]]` block in `wrangler.toml` — a D1
  binding.
- `functions/api/_middleware.ts` — verifies Cloudflare Access JWTs
  against `https://<team>.cloudflareaccess.com/cdn-cgi/access/certs`.
- `audit-ledger-sync.yml` and `external-link-check.yml` — both shell out
  to `wrangler d1 execute --remote`.
- `npm run dev:pages` and `tests/e2e/audit-console.e2e.mjs` — both built
  on `wrangler pages dev`.

Netlify or GitHub Pages would mean rewriting the console's runtime,
database, and auth layer. Neither is a live option.

**Pages vs. Workers static assets.** Cloudflare now steers *new* projects
toward Workers with static assets, and Pages is no longer where new
platform features land. Pages remains fully supported, and the migration
guide is framed as a path for existing projects rather than a deprecation.
Migrating this repo would mean giving up file-based routing for
`functions/api/*` and rewriting the local-dev and `e2e:audit` harnesses,
for no benefit the site currently needs. **Ship on Pages.** Revisit only
if Pages enters an announced sunset or the console outgrows what Pages
Functions offer.

## Cost

Hosting is $0/year. Every component sits well inside a free tier:

| Service | Free allowance | Actual usage |
| --- | --- | --- |
| Pages (static) | Unlimited bandwidth; 500 builds/mo; 20-min build timeout; 20,000 files; 25 MiB/file; 100 custom domains | 369 files, 26 MB; builds run in GitHub Actions, so the build quota is not consumed |
| Pages Functions | 100,000 requests/day (Workers quota) | A handful of reviewers on `/audit/*` |
| D1 | 5 GB storage; 5M row reads/day; 100k row writes/day | Checkbox ledger — kilobytes |
| Zero Trust Access | 50 users, indefinitely | Reviewer email allowlist |
| DNS, SSL, HSTS, Web Analytics | Free | — |

The only recurring cost is the domain renewal at the registrar.

## Domain

`projectcert.org` is registered at **GoDaddy** (created 2026-05-08,
expires 2027-05-08). `SITE_URL` in `src/config/site.ts` already matches,
so no hostname find-and-replace is needed.

**Registration stays at GoDaddy. Only the nameservers move to
Cloudflare.** Nameservers must move regardless of registrar: Cloudflare
Access only protects hostnames proxied through Cloudflare, and the
console's auth boundary depends on it.

Two consequences to keep on the radar, neither blocking:

- The 2027-05-08 expiry is a single point of failure. Turn on GoDaddy
  auto-renew and confirm the billing card on file is current.
- Cloudflare Registrar sells `.org` at cost (~$8.50/yr, renewals at the
  same price) versus GoDaddy's retail renewal. Transferring later remains
  possible at any time — the 60-day post-registration ICANN transfer lock
  expired around 2026-07-07, and a transfer would add a mandatory
  one-year extension.

## Deploy pipeline

Production deploys run from **GitHub Actions, gated on the full quality
gate** — not from Cloudflare's Git integration. Cloudflare's Git
integration builds independently of CI and would publish a commit that
failed `check:deadcode` or the e2e-a11y job. Given how much this repo
invests in that gate (see the `quality-gate` skill), production should
only ever receive output that cleared it.

Two properties follow from direct upload that are worth knowing:

- **The Pages build image is never used.** The artifact is built by the
  existing `build-and-test` job on Node 24 and uploaded as-is. The
  Cloudflare build-image Node version, and the absence of an `engines`
  field or `.nvmrc`, are therefore not on the critical path. Add
  `.nvmrc` anyway for contributor consistency and to keep the Git
  integration a safe fallback.
- **`functions/` is compiled at deploy time from the checkout, not from
  `dist/`.** `wrangler pages deploy` compiles a top-level `functions/`
  directory into the Pages Functions bundle. The deploy job must
  therefore check the repo out *and* download the `dist` artifact.

### The job to add to `.github/workflows/ci.yml`

```yaml
  deploy:
    name: Deploy to Cloudflare Pages
    runs-on: ubuntu-latest
    needs: [build-and-test, e2e]
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    timeout-minutes: 10
    environment:
      name: production
      url: https://projectcert.org
    steps:
      # Checkout supplies functions/ and wrangler.toml — `pages deploy`
      # compiles the top-level functions/ directory from the working
      # tree, not from the uploaded dist/ artifact.
      - uses: actions/checkout@v4

      - uses: actions/download-artifact@v4
        with:
          name: dist
          path: dist

      # No positional directory argument: `pages_build_output_dir` in
      # wrangler.toml is authoritative and takes precedence over it.
      - name: Publish
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          command: pages deploy --project-name=projectcert --branch=main
```

The `CLOUDFLARE_API_TOKEN` secret is shared with the two sync workflows,
so scope it once with both **Account → Cloudflare Pages → Edit** and
**Account → D1 → Edit**.

## Launch ordering

Three workstreams converge on launch. The recommended order is below —
but merging any of them is a human decision, not something the
workstreams settle among themselves. Treat this as a recommendation
pending approval, not a schedule.

1. **Dependency refresh** (branch `worktree-deps-refresh`, unpushed, no
   PR). Astro 6 → 7, `@playwright/test` → 1.62.1, and `npm audit` from
   17 vulnerabilities to 0 — including **three high-severity Astro XSS
   advisories affecting every release ≤ 7.0.9**. Pointing a real domain
   at a build carrying known high-severity XSS is the strongest ordering
   argument available, which is why this is recommended first.
2. **Audit console hardening** (branch `fix/internal-link-check`) — the
   fail-closed `/audit/*` middleware, the robots.txt disallow, and the
   internal-link-check migration. Rebased on top of (1).
3. **Deploy job + Cloudflare provisioning** — this document. The deploy
   job is inert until the Cloudflare account and repo secrets exist, so
   it can be landed early at no risk. Cloudflare provisioning (account,
   zone, D1, Pages project) is independent of all three branches and can
   proceed in parallel; only the first real deploy depends on (1).

**The Astro 7 upgrade is deploy-safe**, verified by diffing a stored
Astro 6 `dist/` against a full Astro 7 build rather than by inference:

- 281 non-`_astro/` files, identical set — every HTML route, both
  sitemaps, every public asset. Nothing added, dropped, or moved.
- `sitemap-0.xml` and `sitemap-index.xml` are byte-identical, 114
  `<loc>` entries. No rename, so the `cp dist/sitemap-index.xml
  dist/sitemap.xml` step in `npm run build` still resolves.
- `format: "directory"` intact; asset prefix still `dist/_astro/`.
- Rendered prose across all 168 pages: 0 text changes and 0 lost
  whitespace versus Astro 6.

The one change is inside `_astro/` — the Svelte runtime chunking went
from 6 chunks to 2, and every content hash changed. See the footgun on
cache rules below.

Note that the `deploy` job above, the Playwright container tag in the
`e2e` job, and the removal of the old lychee `link-check` job are three
separate hunks in `ci.yml` owned by three sessions. They merge cleanly,
but **do not regenerate `ci.yml` from `main`'s copy** — that silently
reverts whichever two hunks you did not author.

## Phase 0 — repo prep

Do these before touching the Cloudflare dashboard.

- [x] ~~Add `.nvmrc` containing `24`~~ — done. Matches `ci.yml`'s
      `node-version: 24` and clears Astro 7's Node ≥ 22.12 floor.
- [ ] Ship `public/og-default.png` (1200×630). `BaseLayout.astro`
      already references `/og-default.png`, so every social-share card
      404s until it exists. Launch-blocking.
- [ ] Land the `deploy` job above in `ci.yml`.
- [ ] Confirm the apex-vs-`www` decision is reflected everywhere:
      `robots.txt`, both sitemaps, and `SITE_URL` all assume the apex, so
      the apex is canonical and `www` redirects to it.

## Phase 1 — DNS

- [x] ~~Add `projectcert.org` as a zone in Cloudflare (Free plan).~~
      Done; status `pending` until the nameservers move.
- [ ] At GoDaddy, replace `ns41.domaincontrol.com` /
      `ns42.domaincontrol.com` with **`louis.ns.cloudflare.com`** and
      **`melinda.ns.cloudflare.com`**. GoDaddy → *My Products* →
      `projectcert.org` → *DNS* → *Nameservers* → *Change* → *I'll use
      my own nameservers*. Propagation is typically under an hour;
      Cloudflare flips the zone to `active` on its own once it sees
      them. **This is the visible cutover** — the GoDaddy parking page
      stops resolving at this point, so expect the domain to serve
      nothing until the first deploy.
- [ ] Enable **DNSSEC** in Cloudflare, then add the matching DS record at
      GoDaddy.
- [ ] SSL/TLS mode **Full (strict)**; enable **Always Use HTTPS** and
      **HSTS**.
- [ ] Add a Redirect Rule: `www.projectcert.org/*` → `301` →
      `https://projectcert.org/$1`.

## Phase 2 — static site live

- [x] ~~Create the Pages project named `projectcert`~~ — done, direct
      upload, production branch `main`.
- [ ] Add `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` as repo
      secrets. Token scopes: **Account → Cloudflare Pages → Edit** and
      **Account → D1 → Edit** (one token serves the deploy job and both
      sync workflows).
- [x] ~~Attach `projectcert.org` and `www.projectcert.org` as custom
      domains~~ — registered with the project, `status=pending` until
      the DNS records below exist.
- [ ] Add the two `CNAME` records the API attach does not create
      (*DNS → Records → Add record*), both **Proxied**:
      | Type | Name | Target |
      | --- | --- | --- |
      | `CNAME` | `@` | `projectcert.pages.dev` |
      | `CNAME` | `www` | `projectcert.pages.dev` |
      An apex `CNAME` is legal here because Cloudflare flattens it. The
      proxy (orange cloud) is required — a grey-cloud record bypasses
      Cloudflare and the Pages domain never validates.
- [ ] Push to `main` and confirm the deploy job publishes.
- [ ] **Gate `*.projectcert.pages.dev`.** The preview domain serves the
      whole site, including `/api/*`, outside any Access app scoped to
      `projectcert.org/audit`. Put an Access policy over the preview
      subdomain. Two mitigations already exist and are worth knowing so
      the risk is not overstated: the console's own middleware fails
      closed on every host (see Phase 3), and every public page emits
      `<link rel="canonical">` back to the apex
      (`BaseLayout.astro:94`, built from `SITE_URL`), which consolidates
      the duplicate for search engines. The Access policy closes what
      remains. **Owned by the /audit workstream**, not this runbook.
- [ ] Enable **Cloudflare Web Analytics** for the zone. It is free and
      cookieless, so no consent banner is required — but it still
      processes IP addresses, so the `/privacy/` page in
      `LAUNCH-TODO.md` §11 remains required. It provides pageviews,
      referrers, country, and browser/OS only: no custom events, no UTM
      campaign reporting, no funnels.
- [ ] Spot-check the routes. `scripts/check-built-pages.ts` and
      `scripts/check-internal-links.ts` already assert route and link
      presence at build time, so this is belt-and-suspenders — load the
      home page, one state page, one `/el-percent-history/` sub-page, and
      `/embed/map/`.

## Phase 3 — audit console

`docs/audit-setup.md` steps 1–2 are done — the database exists, the
schema is applied, and the `DB` binding is set on both production and
preview. What remains:

- [x] ~~Replace `database_id` in `wrangler.toml`~~ — now
      `26b74e93-f12d-4390-a665-908fd8ad61f1`.
- [ ] **Create the Cloudflare Access application** (Zero Trust → Access
      → Applications → Add → Self-hosted), covering `projectcert.org`
      paths `/audit` and `/api`, with an **Allow** policy listing each
      reviewer's email individually. Per-reviewer identity is the point:
      `verifications.verified_by` records who signed off on which
      datapoint, so a shared login would collapse the audit trail to a
      single name. The free Zero Trust tier covers 50 users.
- [ ] **Declare its two settings in `wrangler.toml` under `[vars]`**,
      not in the dashboard — they are non-secret identifiers, and the
      file is what actually reaches the runtime:
      ```toml
      [vars]
      ACCESS_TEAM_DOMAIN = "<team>.cloudflareaccess.com"
      ACCESS_AUD = "<application audience tag>"
      ```
      Set **both** in one commit. The middleware treats Access as
      configured only when both are non-empty, so a half-filled block
      silently falls back to the shared-login path.
- [ ] **Do not use the dashboard `AUDIT_USER` / `AUDIT_PASSWORD`
      path.** It cannot work while `wrangler.toml` is the source of
      truth, and a shared password is exactly what per-reviewer
      attribution rules out. Delete any such Pages secrets once Access
      is live so nobody mistakes them for a working configuration.
      `docs/audit-setup.md` is canonical on the auth options and their
      trade-offs.
- [ ] Confirm `DEV_REVIEWER_EMAIL` is **not** set on the production
      environment. It bypasses the Access JWT check entirely.

Then, specific to GitHub:

- [ ] Enable **Allow GitHub Actions to create and approve pull
      requests** in repo settings. `audit-ledger-sync.yml` opens a PR as
      its final step; without this the nightly job runs green through
      every export and fails only at the end.

## Phase 4 — verify

- [ ] `curl -sI https://projectcert.org` returns 200 with HSTS.
- [ ] `curl -sI https://www.projectcert.org` returns 301 to the apex.
- [ ] `/audit/` returns **401** with a `WWW-Authenticate: Basic` header
      from a logged-out browser — before the credentials are set *and*
      after, from a browser with no session.
- [ ] `https://projectcert.org/api/overview` returns 401/403 rather than
      data when unauthenticated.
- [ ] Repeat both checks against `*.projectcert.pages.dev`. The
      middleware is host-agnostic, so a 200 there is a real finding.
- [ ] **Confirm a valid reviewer can actually get in.** A 401 proves
      the middleware is present; it does not prove the configured
      identity provider is one the middleware accepts. If those got out
      of step, the console would be uniformly locked and would look,
      from outside, exactly like a working gate. Sign in as a real
      allowlisted reviewer and confirm the console renders.
- [ ] **Confirm attribution is per-person.** After one reviewer checks
      one datapoint, read the row back and confirm `verified_by` is that
      reviewer's own email — not a shared name, and not a `shared:`
      prefixed identity:
      ```sh
      npx wrangler d1 execute projectcert-audit --remote \
        --command "SELECT usps, datapoint_id, verified_by, verified_at FROM verifications LIMIT 5"
      ```

**Read the console's status codes precisely — they distinguish two
different failures:**

| Code | Meaning |
| --- | --- |
| **401** | Credentials absent or wrong. The gate is working. |
| **500** | *No credential path is configured at all* — neither `AUDIT_USER`/`AUDIT_PASSWORD` nor the Access vars reached the Functions. This is a deployment mistake, not an auth failure. |
| **200** on a fresh browser | The gate is not in force. **CI fails the deploy that produced it** — investigate `functions/`. |

A first deploy that returns 500 rather than a password prompt means the
Pages environment variables did not land; the deploy still succeeds, with
a `::warning::`.

**A green first deploy is not proof the gate was exercised.** The
verification step treats any non-2xx as a pass, and until the apex has a
working origin it sees the 522 described above — which passes without
asserting anything. The first meaningful assertion happens on the first
deploy *after* the domain actually serves. Do not read run #1 as
evidence the console is protected; check `/audit/` by hand once the
apex answers.

A 200 can no longer reach a human: the `deploy` job's final step,
**"Verify the review console is not publicly readable,"** curls
`/audit/` after publishing and fails on any 2xx. The usual cause is
`functions/` not shipping, so check that the job ran `actions/checkout`
before `wrangler pages deploy`. That step retries only transient edge
failures (000/502/503/504) and deliberately does not retry a 500, which
is stable rather than transient.
- [ ] `/sitemap.xml` and `/sitemap-index.xml` both resolve and contain no
      `/audit/` entry (`check-discovery-surfaces.ts` asserts this at
      build time, but confirm it survived the deploy).
- [ ] `/llms.txt` and `/llms-full.txt` resolve.
- [ ] A state page renders its seal, the choropleth hydrates, and the
      dark-mode palette flips with the OS setting.

`LAUNCH-TODO.md` §3–§10 covers what follows: Search Console, the Zenodo
DOI, Wayback snapshots, and outreach.

## Footguns

- **`wrangler pages deploy` reads `functions/` from the working tree.**
  A deploy job that downloads only the `dist` artifact without checking
  the repo out will publish the static site with no Functions attached,
  and `/audit/*` will render read-only with every `/api/*` call 404ing.
- **`wrangler.toml` beats the dashboard for Pages — the reverse of what
  this document used to claim.** Cloudflare: *"When used in your Pages
  Functions projects, your Wrangler file is the source of truth. You
  will be able to see, but not edit, the same fields when you log into
  the Cloudflare dashboard."* Because this repo ships a `wrangler.toml`
  declaring bindings, **anything set only in the dashboard does not
  reach the runtime**, and the API will still cheerfully report it as
  set — on the project *and* on the individual deployment record. That
  combination is what makes this expensive to diagnose: every
  configuration check passes while the running code sees nothing.
  Observed here as `DB` (declared in the file) working while
  `AUDIT_USER` / `AUDIT_PASSWORD` (dashboard only) did not exist at
  runtime across two separate deployments. Declare bindings and
  non-secret vars in `wrangler.toml`; a genuine secret needs a Secrets
  Store binding declared there, or an auth method whose settings are not
  secret. `docs/audit-setup.md` is canonical for the console's auth.
- **`ACCESS_TEAM_DOMAIN` and `ACCESS_AUD` must be set together.** The
  middleware treats Access as configured only when **both** are
  non-empty, so a half-filled `[vars]` block silently leaves the console
  on the shared-login path instead of failing loudly. Set both in one
  commit.
- **D1 migrations are append-only once production exists.** While the
  console was pre-release, `schema/d1/0001_init.sql` could be edited and
  the local DB reset. After the first `--remote` apply, every schema
  change is a new numbered migration.
- **Both sync workflows skip silently without credentials.** They are
  gated per-step on `CLOUDFLARE_API_TOKEN`, so a missing secret produces
  a green run that did nothing. Check for the `::notice::` line.
- **Never point the domain at a build predating the Astro 7 upgrade.**
  Releases ≤ 7.0.9 carry three high-severity XSS advisories. The
  ordering in "Launch ordering" above exists for this reason.
- **Attaching a Pages custom domain via the REST API does not create
  the DNS record.** The `POST .../pages/projects/<p>/domains` call
  registers the hostname with the project and moves it to
  `status=pending`, `method=http` — then waits for DNS that it will
  never create. Only the dashboard's *Set up a custom domain* flow does
  both. Symptom: the domain sits at `pending` indefinitely while the
  authoritative nameservers return nothing for the hostname. Either use
  the dashboard flow, or add the `CNAME` yourself after the API call.
- **`dig` and `curl` can disagree on the same machine, and both be
  right.** `dig` queries a resolver directly; `curl` goes through the
  system resolver, which may still hold a stale address. During this
  cutover `dig` correctly reported Cloudflare while `curl` was still
  connecting to GoDaddy's cached IP — which read, convincingly, as "DNS
  was never cut over" for a site that was in fact live. Never diagnose
  DNS from `curl` alone: `curl -w '%{remote_ip}'` prints the address it
  actually connected to, and `curl --resolve host:443:<ip>` pins it.
- **`main` cannot run any `--remote` D1 command while `wrangler.toml`
  holds a placeholder id.** Wrangler resolves `database_id` from the
  config file even when the database *name* is given on the command
  line, so `wrangler d1 execute projectcert-audit --remote` fails with
  `Invalid property: databaseId` — an error that precedes
  authentication, and therefore proves nothing about the API token.
  This is the same class of hazard as deploying against a placeholder,
  and it bit the nightly ledger sync once.
- **Re-run the ledger sync after any change to the D1 config**
  (`gh workflow run audit-ledger-sync.yml --ref main`). It is read-only,
  opens no PR while the ledger files are empty, and is the cheapest way
  to prove the API token's D1 scopes before a production deploy depends
  on them.
- **A 200 on the apex is not evidence the site is live.** Cloudflare's
  zone-creation scan copies whatever the previous DNS host was serving,
  so a freshly moved domain can answer 200 from the *old* registrar's
  parking page while the Pages project has never been deployed. Check
  for a `cf-ray` response header: no `cf-ray` means the request never
  reached Cloudflare, whatever the status code says. The fix is to
  delete the imported apex `A`/`AAAA` records and the `www` record, at
  which point the Pages custom domain provisions on its own. Delete
  only those — keep `MX`, `TXT` (SPF/DKIM/verification), and anything
  else the domain genuinely uses, or mail breaks silently.
- **`wrangler pages secret put` targets production only.** As of
  wrangler 4.105.0 the command takes no `--environment` / `--env` flag —
  it prints `(production)` and writes there. Preview-environment
  variables have to be set in the dashboard or via the REST API. This
  is not a security gap, because the console fails closed: a preview
  deployment without credentials returns 500, never a readable page.
  Treat it as the desired default rather than something to fix — see
  Phase 3. `docs/audit-setup.md` is the canonical statement of that
  policy; keep the two documents in agreement.
- **Never name an individual `_astro/` chunk in a cache rule, CSP,
  preload hint, or a `public/_headers` entry.** Those filenames are
  content-hashed and the chunk *set* is not stable across toolchain
  upgrades — the Astro 7 bump collapsed six Svelte runtime chunks into
  two and rotated every hash. Match on the `/_astro/*` prefix instead,
  which is also exactly where long-lived immutable cache headers are
  correct, since the hash is the cache key. Expect a full asset-cache
  turnover on the first deploy after any such upgrade; that is normal.
- **Astro 7's long-running CLI server commands auto-daemonize under an
  AI agent.** Astro calls `am-i-vibing`; when it detects an agent
  driving the terminal, **both `astro dev` and `astro preview`** fork
  and return immediately (`Dev server running at … (pid NNNNN) / Stop:
  astro dev stop`) rather than holding the foreground. Any instruction
  that says "run the server and watch it" is wrong under an
  agent-driven terminal. Use `astro dev status` / `astro dev stop` to
  manage the daemon, or `ASTRO_PREVIEW_BACKGROUND=1` to force preview
  into the foreground. Phase 4's checks all `curl` the live domain
  instead, so this only bites locally.
