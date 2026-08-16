# Launch checklist — projectcert

**The site is live at <https://projectcert.org>.** Hosting, DNS, TLS,
analytics, the gated reviewer console, and the privacy policy are all
deployed and verified against the running site. What remains is
discoverability and outreach, not launch mechanics — §1 through §4 are
now largely history, and the live work is in §3 (Search Console), §5
(the DOI), and §7 through §10.

Roughly ordered: domain/host first, then SEO/analytics, then outreach.
The outreach sections (§7, §8) are what actually make search engines and
LLMs cite the site; everything before them is table stakes.

Items marked **(blocking)** were blocking on the first public link being
shared. Items marked **(post-launch)** can happen at any point now.

**Data status.** Two separate signals, and they currently disagree —
which is by design, not an error:

- **Source check**: 51/51 jurisdictions are `verified-2026`, meaning
  each record was re-checked against current agency documents with an
  archived audit trail.
- **Reviewer confirmation**: 1 of 1,632 datapoints (32 per state × 51)
  has been confirmed in the review console.

`/verification/` reports these separately rather than collapsing them.
The gap is the argument for not yet cutting the Zenodo release in §5: a
DOI is permanent, and `v1.0.0` on a catalog with one confirmed datapoint
would claim more than the ledger supports.

---

## 1. Domain & hosting (blocking)

- [x] Register the domain. If `projectcert.org` is taken, pick a
      replacement and **search the codebase for the old hostname**
      before changing — `astro.config.mjs`, `BaseLayout.astro`,
      `index.astro`, `lib/state-summary.ts`, every JSON-LD `@id`,
      `public/robots.txt`, and per-state schema all reference
      `projectcert.org` literally. One find-and-replace will catch
      most of it; grep for `projectcert.org` to confirm.
- [x] ~~Pick a host.~~ **Cloudflare Pages.** Netlify is no longer a real
      option — the `/audit/` console depends on Pages Functions
      (file-based routing), D1, and Cloudflare Access, so moving hosts
      would mean rewriting its runtime, database, and auth layer. Full
      rationale, cost breakdown, and step-by-step runbook:
      **`docs/deployment.md`**.
- [x] ~~Wire up GitHub → host deploy on push to `main`.~~ Done. The
      `deploy` job in `ci.yml` runs `needs: [build-and-test, e2e]` and
      only on a push to `main`, so a pull request never deploys.
      Cloudflare's Git integration was deliberately not used: it builds
      independently of CI and would publish a commit that failed the
      gate. The job deploys with the repo's own wrangler rather than
      `wrangler-action`, and asserts afterwards that `/audit/` is not
      publicly readable.
- [x] ~~Set DNS records.~~ Done. Registration stays at GoDaddy;
      nameservers moved to Cloudflare (`louis`/`melinda.ns.cloudflare.com`),
      which Access requires. Apex and `www` are proxied `CNAME`s to
      `projectcert.pages.dev`. Note the API-attached custom domain does
      *not* create the DNS record — only the dashboard flow does both;
      see the footgun in `docs/deployment.md`.
- [x] ~~Force HTTPS, enable HSTS, set SSL/TLS to Full (strict)~~ Done.
      `http://projectcert.org/` returns 301, and the apex serves
      `Strict-Transport-Security: max-age=15552000; includeSubDomains;
      preload`. The `preload` directive is inert until the domain is
      submitted at hstspreload.org, which requires `max-age` ≥ 31536000
      — leave it that way unless preloading is genuinely wanted, since
      the list takes months to exit.
- [x] ~~Redirect `www` → apex.~~ Done via a Cloudflare Redirect Rule;
      `https://www.projectcert.org/` returns 301 to the apex, which
      `robots.txt`, both sitemaps, and `SITE_URL` all assume is
      canonical.
- [x] ~~Gate `*.projectcert.pages.dev` behind Access~~ Done. A second
      Access application covers the bare host **and** the `*` subdomain
      — both are needed, since one entry does not span them and
      per-deployment URLs are permanent and individually reachable. The
      whole host now redirects to the Access login, so the public reaches
      the site only through `projectcert.org`. A redirect was not
      possible: Bulk Redirects act only on domains in your own account
      and `pages.dev` is Cloudflare's, and Pages `_redirects` documents
      domain-level redirects as unsupported.
- [x] ~~Test that all the routes that were in `dist/` after `npm run build`
      actually load on the live domain~~ Spot-checked live — especially `/states/<usps>/`
      paths (currently ~115 pages: 51 state pages + 51 per-state
      `/el-percent-history/` sub-pages + topical/landing routes).
      The build now runs
      `scripts/check-built-pages.ts` after `astro build`, which asserts
      every route in `src/lib/routes.ts` and every state JSON produced
      a `dist/.../index.html`, so this is mostly belt-and-suspenders.
- [x] ~~Configure a real `404.astro` page (Astro doesn't ship one by
      default; the host falls back to its generic page)~~
      Done — `src/pages/404.astro` ships with a Levenshtein-based
      "Did you mean…" suggestion list against the 51 USPS codes
- [ ] Protect the registration against a missed renewal. `projectcert.org`
      is at GoDaddy, created 2026-05-08, **expiring 2027-05-08** — a
      single point of failure for the whole site. Turn on auto-renew and
      confirm the card on file is current. Extending to a multi-year
      registration, or transferring to Cloudflare Registrar (`.org` at
      cost, ~$8.50/yr, renewals at the same price), both remain open
      later; the ICANN transfer lock expired around 2026-07-07.

## 2. Brand assets the site already references but doesn't ship (blocking)

These are referenced from `BaseLayout.astro` and currently 404:

- [x] ~~`public/og-default.png` — 1200×630 social-share card.~~ Done and
      live. Generated by `scripts/generate-og-card.ts`, which reads the
      wordmark and checkmark path data out of `public/logo.svg` so the
      card cannot drift from the site header and depends on no installed
      fonts. Verified by following the declared `og:image` URL rather
      than only checking the file exists, since the original bug was a
      tag pointing at a 404.
- [x] ~~`public/favicon.svg` — site icon~~ Done — ships a 4-square
      bin-palette logo with a checkmark glyph

Optional but worth it:

- [ ] `public/apple-touch-icon.png` (180×180). Genuinely optional:
      nothing references it, so it 404s for nobody.
- [ ] Per-state OG images (deferred from tier 3 of the SEO work — the
      `<meta property="og:image">` tag is already wired to accept a
      per-page override via the `image` prop on `BaseLayout`)

## 3. Analytics + Search Console (blocking-ish)

- [x] ~~Pick an analytics stack.~~ **Cloudflare Web Analytics** — free,
      cookieless, already in the stack, and enabled per-zone in the
      dashboard rather than by adding a snippet to `BaseLayout.astro`.
      GA4, Plausible, and Fathom were the alternatives; GA4 was declined
      because it needs a consent banner for a largely European academic
      audience and an env-gated measurement ID to keep preview deploys
      out of the data, and Plausible/Fathom cost ~$9/mo for reporting
      this site does not need.
- [x] ~~Enable it on the zone~~ Done, but **not** through the
      dashboard's automatic setup, which injects the beacon via the
      zone's HTML rewriter and does not reach responses served by Pages
      — the site emitted no beacon at all that way. The snippet is
      declared in `BaseLayout.astro` with the token in
      `src/config/site.ts`. Because the three layouts are independent,
      it covers public pages only: reviewers are not measured and the
      iframe embed does not report from a third party's page.
- [x] ~~Publish a privacy policy at `/privacy/`.~~ Done and live.
      Cookieless removed the consent banner, not the policy. Every claim
      on the page was checked against the running deployment rather than
      assumed — no `Set-Cookie` on any public page, no browser storage
      anywhere in `src/`, one third-party script — and a note in the page
      frontmatter asks for that re-verification before the copy is
      amended. Contact goes to the issue tracker rather than a published
      address. Linked from the footer of every page. See §11.
- [ ] Accept the reporting ceiling: pageviews, top pages, top referrers,
      country, and browser/OS only. No custom events, no UTM campaign
      reporting, no funnels. If per-state citation tracking or referral
      attribution later matters, revisit — that is the trigger to move,
      not launch-day completeness.
- [ ] Verify ownership in **Google Search Console** (DNS TXT record or
      meta tag method)
- [ ] Verify ownership in **Bing Webmaster Tools** (Bing feeds Copilot;
      worth the 5 minutes)
- [ ] Submit `https://projectcert.org/sitemap-index.xml` in both
- [ ] Set up a quarterly reminder to review Search Console — broken
      links to SEAs are the #1 maintenance issue and Search Console
      surfaces them faster than user reports

## 4. Validate what was built (blocking)

- [ ] **Schema validator** — paste any state page URL into
      <https://validator.schema.org/> and confirm Dataset, BreadcrumbList,
      and Organization all parse cleanly. Fix any warnings before
      publishing
- [ ] **Google Rich Results Test** — <https://search.google.com/test/rich-results>
      on a state page; Google specifically flags `Dataset` issues here
- [ ] **Open Graph debugger** — <https://www.opengraph.xyz/> or
      Facebook's official tool, to confirm OG image renders
- [ ] **Lighthouse** — `npx lighthouse https://projectcert.org` on the
      home page. Aim ≥ 90 on all four categories. The choropleth's
      `client:only` hydration is the likely LCP offender; if score
      drops below 80, swap to `client:visible` or render an SSR
      fallback
- [ ] **WAVE / axe** accessibility audit on the home, a state page,
      and the compare page
- [ ] **Mobile** — open the live site on an actual phone. The map's
      tooltips and the state-page tables are the most likely offenders

## 5. Citation infrastructure — DOI via Zenodo (the #8 item)

This is the single highest-impact pre-launch step for academic
discoverability. Until projectcert has a DOI, it can't be cited in
papers in the format reviewers expect, and Google Scholar won't index
it.

- [ ] Create a **Zenodo** account at <https://zenodo.org/> (free, CERN-
      operated, the academic standard)
- [ ] Create an **ORCID** if you don't have one — Zenodo wants it for
      authorship attribution. Free at <https://orcid.org/>
- [x] ~~Connect Zenodo to the GitHub repo via the GitHub integration~~ Done
- [ ] Cut a `v1.0.0` GitHub release; Zenodo auto-mints a DOI for it.
      **Deliberately deferred** until reviewer confirmation covers more
      than 1 of 1,632 datapoints — a DOI is permanent, and the version
      number would claim more than the ledger supports. The wiring is
      already merged and inert: setting `ZENODO_DOI` in
      `src/config/site.ts` lights up the citation blocks, the Scholar
      `citation_doi` tag, and the site JSON-LD identifier at once. Use
      the **concept** DOI, not a version DOI, so the citation survives
      later releases.
- [ ] Add the resulting DOI to:
      - The `<meta name="citation_doi">` tag in `BaseLayout.astro`
      - The site-level `WebSite` JSON-LD as `identifier`
      - The footer alongside the existing Leider DOI
      - The "How to cite" section (see next item)
- [ ] Re-release as v1.1.0, v1.2.0, etc. as more states get verified
      against current SEA sources — each release gets its own DOI plus
      a "concept DOI" that always points at the latest

## 6. "How to cite this page" section

Make it trivial for both humans and AI systems to lift a citation:

- [x] ~~Add a "Cite this page" block to every state page and the home
      page. Show three formats side-by-side: APA, BibTeX, plain text.~~
      Done — see `src/components/CitationBlock.astro`. The block also
      surfaces the Leider et al. (2021) seed-paper citation alongside
      the projectcert citation in each format. **Still TODO**: once the
      Zenodo DOI is minted, pass it as the `doi` prop on the citation-
      block call sites in `src/pages/states/[usps].astro` and
      `src/pages/index.astro`
- [x] ~~Add `<meta name="citation_*">` tags for Google Scholar~~
      Done — `BaseLayout.astro` accepts a `citation` prop
      (`{ title, authors?, publicationDate, publicUrl?, doi? }`) and
      emits `citation_title`, `citation_author` (one tag per author;
      defaults to `["projectcert"]`), `citation_publication_date`,
      `citation_public_url`, and `citation_doi` (when present). Wired
      on the home page and all 51 state pages; deliberately omitted on
      non-citable pages (404, embed, methodology, glossary). Scholar
      indexing usually shows up 4–8 weeks after Search Console crawls.
      Once the Zenodo DOI is minted, pass it as `citation.doi` at the
      two call sites in `[usps].astro` and `index.astro`.

## 7. Wikipedia (#2) — slow, durable, the highest LLM-citation lever

LLMs are trained on Wikipedia at extraordinary weight. A site cited
*from* Wikipedia gets cited *by* LLMs in proportion. The work is
manual but each citation persists for years.

- [ ] Read **WP:RS** and **WP:V** before editing. Disclosed
      conflict-of-interest editing is allowed but must be on Talk
      pages, not direct
- [ ] Identify candidate articles where projectcert facts are
      relevant and currently uncited or weakly cited:
      - *English-language learner*
      - *Bilingual education in the United States*
      - *Sheltered English Immersion*
      - *Teacher certification in the United States*
      - *Seal of Biliteracy*
      - Per-state education articles (*Education in Arizona*,
        *Education in California*, etc. — Prop 203, Yazzie/Martinez,
        and similar policy moments are well-trafficked anchors)
- [ ] On each candidate, propose the citation on the article's Talk
      page first if you have a COI; otherwise add it inline with a
      `{{cite web}}` template pointing at the specific state page +
      `lastVerified` date
- [ ] Avoid edit warring. If a citation is reverted, ask why on Talk
      rather than re-adding

## 8. Outreach (#1) — inbound links from authoritative sites

The actual #1 SEO/GEO lever. One `.edu` link is worth a hundred
SEO tweaks. Plan for the first 4–6 weeks post-launch.

**Direct outreach:**

- [ ] Email the seed-paper authors. **Check their names first**: this
      file previously gave them as "Carrie Leider, Mary-Wisniewski
      Colombo, Erika Nerlino", which does not reconcile with the
      "Leider, C. M., Colombo, M. W., & Nerlino, E." used in every
      citation on the site and in `CITATION.cff`. One of the two is
      wrong; the paper itself is the arbiter. They have the most reason to care and
      potentially link from their faculty pages
- [ ] Email contacts at **NCELA** (National Clearinghouse for English
      Language Acquisition), **Migration Policy Institute**, and
      **Education Commission of the States** — they actively publish
      cross-state EL/ELL policy compendiums and link to primary sources
- [ ] Pitch a guest post or data-story to **EdWeek**, **Chalkbeat**,
      **The 74**, **Education Next**. EdWeek in particular has a
      strong "data dive" tradition
- [ ] Reach out to faculty in TESOL, bilingual education, and ESL
      teacher prep programs — they assign teacher-prep readings and
      will link to the site from syllabi if it's useful
- [ ] Notify the **AERA Bilingual Education Research SIG** and
      **NABE** (National Association for Bilingual Education) listservs

**Conferences & events:**

- [ ] Submit a poster or roundtable to **AERA** annual meeting
- [ ] **NABE** annual conference
- [ ] **TESOL International**
- [ ] State-level affiliate conferences (CABE, NYSABE, MABE, etc.)

**Direct social:**

- [ ] Launch thread on Bluesky tagging #EdResearch, #EdPolicy,
      #BilingualEducation, #TESOL, plus accounts of well-known EL
      researchers (Diane August, Patricia Gándara, Ofelia García,
      Kathryn Lindholm-Leary)
- [ ] LinkedIn post in EdLeadership groups
- [ ] r/Teachers and r/edtech on Reddit (be honest that it's your
      project; mods are friendly to research tools)

**Aggregators that LLMs scrape:**

- [ ] Submit the dataset to **Google Dataset Search** — the existing
      `Dataset` JSON-LD is enough; just make sure Search Console has
      crawled the state pages
- [ ] Mirror the dataset on **Hugging Face Datasets** as a clean
      JSON/Parquet dump (separate from the Astro site). Pulls in
      ML/data audiences and feeds RAG systems
- [ ] Add to **data.gov** if applicable (probably yes given subject
      matter), **Harvard Dataverse**, and **Open Education Data
      Initiative**

## 9. AI-bot signals

- [x] ~~Add an explicit allowlist for AI crawlers in `public/robots.txt`.~~
      Done — `GPTBot`, `ClaudeBot`, `Claude-Web`, `PerplexityBot`,
      `Google-Extended`, `Bytespider`, `CCBot` are all now explicitly
      `Allow: /`-listed
- [x] ~~Add `/llms.txt` and `/llms-full.txt` — emerging
      convention.~~ Done. `public/llms.txt` is hand-curated;
      `public/llms-full.txt` is regenerated from per-state JSON on
      every `npm run build` via `scripts/generate-llms-full.ts`
- [ ] Publish a canonical machine-readable JSON dump at
      `/data/states.json` with `Access-Control-Allow-Origin: *`. RAG
      systems prefer one clean JSON over scraping 51 HTML pages

## 10. Operational follow-ups (post-launch)

- [ ] Wire up the actual Google Form for "Report a data issue" — the
      `ReportIssue` component is built but disabled until
      `FEEDBACK_FORM.baseUrl` is filled in. See the setup notes in
      `src/config/feedback.ts`
- [ ] Set up an uptime monitor — UptimeRobot (free) is fine
- [ ] Trigger an initial Wayback Machine snapshot of the home page,
      every state page, and the methodology page. Use
      <https://web.archive.org/save/> manually or the
      `wayback-machine-saver` CLI. This protects the audit trail if
      the site ever goes down
- [x] ~~Add a `CITATION.cff` file at the repo root for GitHub's "Cite
      this repository" button.~~ Done. Zenodo also reads it at release
      time (precedence: `.zenodo.json` → `CITATION.cff` → `LICENSE` →
      GitHub defaults), so without it the DOI record's authors would be
      derived from contributor statistics rather than matching the
      citation the site tells people to copy. Add the DOI under
      `identifiers` once minted.
- [ ] Set up a Google News alert for "English Learner certification"
      and "bilingual endorsement" to catch policy churn that should
      trigger a state re-verification

## 11. Legal & policy (blocking before promotion)

- [x] ~~Adopt an explicit license.~~ Done — `LICENSE` at the repo
      root: MIT for the site code, CC BY 4.0 for the catalog data
      under `src/content/states/` and `sources/`. README has a
      "License" section that mirrors the same split.
- [x] ~~Publish a `/privacy/` page.~~ Done — see §3. Covers what
      Cloudflare Web Analytics collects, the reviewer console (where
      personal data genuinely persists, since a reviewer's address is
      recorded against each datapoint they confirm), retention, and
      contact. No cookie consent banner is needed, because nothing is
      stored on the visitor's device
- [ ] Publish a `/terms/` page that links to the `LICENSE` file
      (MIT for code, CC BY 4.0 for data — already documented there)
      and adds a short "no warranty / link-rot disclaimer" note
- [ ] Confirm fair-use posture for the SEA snapshots stored in
      `sources/`. They're regulatory text and government publications,
      so almost certainly fine in the US under §105/§107, but a one-
      paragraph "About these snapshots" note on the methodology page
      removes any ambiguity
- [ ] Trademark check on the name "projectcert" via USPTO TESS before
      promoting it widely. Cheap insurance

## 12. Pre-launch content polish

- [x] ~~Verify all 51 states~~ Done — 51/51 are `verified-2026` as of
      2026-05-08
- [x] ~~Once at 51/51, remove or rewrite `<PreLaunchBanner>`~~ The
      banner already auto-hides via `verified === total`, so it no
      longer renders; the component itself can stay in the layout
      pending the next pre-launch event (e.g., a 2027 re-verification
      sweep)
- [ ] Re-verify the AZ Seal of Biliteracy entry around July 2026 —
      the program is statutorily set to sunset 2026-07-01 unless
      reauthorized. Flagged in `sources/AZ/2026-05-07/changes-from-baseline.md`
- [ ] Decide whether to set up a recurring (annual or semi-annual)
      re-verification cadence now that all 51 are at `verified-2026`.
      The skill at `.claude/skills/state-source-refresh/` runs
      per-state; the natural rhythm is one state per week or a batch
      sweep timed against NCES Digest releases (typically mid-year)
- [ ] Pick the next NCES update window for `elPercent`. Current
      figures are NCES Fall 2021 for 50/51 (TN uses TDOE 2024). When
      Digest 2024 publishes Fall 2022 state-level EL counts, batch-
      update all 51 in one pass and bump `elPercentAsOf`.

## 13. Built-in safeguards (reference)

A summary of the typecheck / lint / build-time guards already wired
in, useful when onboarding a contributor or debugging a CI failure:

- **Schema (Zod 4)** at `src/content.config.ts`:
  - `sources.min(1)` and `history[i].sourceUrls.min(1)` enforce
    provenance on both fact-bearing fields and timeline events.
  - `elPercentAsOf <= lastVerified` rejects retro-dated freshness.
  - `history[]` must be sorted oldest → newest; the Zod refinement
    rejects out-of-order rows, so a new pre-2019 event has to be
    placed in chronological position, not appended.
  - `history[i].date` capped at +10 years to catch 9999-style typos
    while still allowing known phase-ins.
- **Type-safe routes** at `src/lib/routes.ts`: every internal href
  goes through `ROUTES.x` / `withAnchor(...)` / `sameAnchor(...)`;
  per-state URLs come from `stateUrl(usps)`. `BreadcrumbItem.url`
  accepts only `Route | LinkUrl` (a branded type), so hand-typed
  path strings fail the typecheck. Anchor IDs (`<main id={...}>`,
  `<h2 id={...}>`) reference `ANCHORS.x`, so renaming an anchor in
  `routes.ts` updates both the link and the target in one place.
- **ESLint rule** in `eslint.config.js`: `no-restricted-syntax`
  flags any `<a href="/...">` or `<a href="#...">` literal as an
  error, pointing the developer at the `routes.ts` helpers.
- **`scripts/check-built-pages.ts`** runs after `astro build` and
  asserts each route in `ALL_ROUTES` and each state JSON produced
  a `dist/.../index.html`. Catches `getStaticPaths` mistakes that
  silently drop pages.
- **`scripts/check-state-integrity.ts`** asserts exactly 51 state
  files, USPS uniqueness, and that every `verified-2026` state has
  at least one `sources/<USPS>/<YYYY-MM-DD>/changes-from-baseline.md`.
- **CI lychee link check** crawls `dist/**/*.html` for broken
  internal links on every push/PR. External SEA links live on a
  separate weekly non-blocking workflow.
