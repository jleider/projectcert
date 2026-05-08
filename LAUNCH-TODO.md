# Launch checklist — projectcert

Things to do once a domain is registered and the site is ready to go
public. Roughly ordered: domain/host first, then SEO/analytics, then
outreach. The outreach section (#1, #2, #8) is the part that actually
makes LLMs and search engines cite the site — everything else is table
stakes.

Items marked **(blocking)** should be done before any public link is
shared. Items marked **(post-launch)** can happen in the first week or
two after going live.

**Data status**: 51/51 jurisdictions now `verified-2026`. The
pre-launch banner auto-hides when verified == total, so it no longer
renders. (See §12 for the wrap-up items that follow from full
verification.)

---

## 1. Domain & hosting (blocking)

- [ ] Register the domain. If `projectcert.org` is taken, pick a
      replacement and **search the codebase for the old hostname**
      before changing — `astro.config.mjs`, `BaseLayout.astro`,
      `index.astro`, `lib/state-summary.ts`, every JSON-LD `@id`,
      `public/robots.txt`, and per-state schema all reference
      `projectcert.org` literally. One find-and-replace will catch
      most of it; grep for `projectcert.org` to confirm.
- [ ] Pick a host. Either is fine for a static Astro site:
      - **Cloudflare Pages** — free, fast CDN, generous bandwidth, native
        Turnstile if you ever want to swap the Google Form for a custom
        contact form
      - **Netlify** — slightly nicer DX, built-in form handling
- [ ] Wire up GitHub → host auto-deploy on push to `main`
- [ ] Set DNS records. Enable DNSSEC if your registrar offers it.
- [ ] Force HTTPS, enable HSTS at the host level
- [ ] Test that all the routes that were in `dist/` after `npm run build`
      actually load on the live domain — especially `/states/<usps>/`
      paths (65 pages total). The build now runs
      `scripts/check-built-pages.ts` after `astro build`, which asserts
      every route in `src/lib/routes.ts` and every state JSON produced
      a `dist/.../index.html`, so this is mostly belt-and-suspenders.
- [x] ~~Configure a real `404.astro` page (Astro doesn't ship one by
      default; the host falls back to its generic page)~~
      Done — `src/pages/404.astro` ships with a Levenshtein-based
      "Did you mean…" suggestion list against the 51 USPS codes
- [ ] Buy a 2-year domain registration up front so you don't lose it
      to a missed renewal email

## 2. Brand assets the site already references but doesn't ship (blocking)

These are referenced from `BaseLayout.astro` and currently 404:

- [ ] `public/og-default.png` — 1200×630 social-share card. Even a plain
      title card with "projectcert: an atlas of EL teacher certification
      across the 51 SEAs" beats a blank thumbnail when the URL is shared
      in Slack/Bluesky/iMessage. Note: `BaseLayout.astro` references
      `/og-default.png` in the OG meta tag, so without this file every
      social-share card 404s.
- [x] ~~`public/favicon.svg` — site icon~~ Done — ships a 4-square
      bin-palette logo with a checkmark glyph

Optional but worth it:

- [ ] `public/apple-touch-icon.png` (180×180)
- [ ] Per-state OG images (deferred from tier 3 of the SEO work — the
      `<meta property="og:image">` tag is already wired to accept a
      per-page override via the `image` prop on `BaseLayout`)

## 3. Google Analytics + Search Console (blocking-ish)

- [ ] Create a GA4 property and copy the measurement ID
- [ ] Add the GA4 snippet to `BaseLayout.astro` head, ideally
      gated behind a `PUBLIC_GA_MEASUREMENT_ID` env var so dev/preview
      deploys don't pollute the data
- [ ] **Required if using GA**: publish a privacy policy at `/privacy/`.
      GA, GDPR, and CalOPPA all require it. If you're targeting an
      academic audience that's largely European, also add a cookie
      consent banner — `klaro` or `cookieconsent` are free and small
- [ ] Consider **Plausible** or **Fathom** instead of GA: lightweight,
      no cookie banner, EU-hosted, ~$9/mo. Cleaner fit for an academic
      open-data site that doesn't need ad-targeting metrics
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
- [ ] Connect Zenodo to the GitHub repo via the GitHub integration
- [ ] Cut a `v1.0.0` GitHub release; Zenodo auto-mints a DOI for it
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

- [ ] Email Carrie Leider, Mary-Wisniewski Colombo, and Erika Nerlino
      (the seed-paper authors). They have the most reason to care and
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
- [ ] Add a `CITATION.cff` file at the repo root for GitHub's "Cite
      this repository" button. Trivially generated from the Zenodo
      metadata
- [ ] Set up a Google News alert for "English Learner certification"
      and "bilingual endorsement" to catch policy churn that should
      trigger a state re-verification

## 11. Legal & policy (blocking before promotion)

- [ ] Publish a `/privacy/` page covering: what GA collects, retention
      policy, contact email, opt-out instructions. Required by GA's
      ToS, GDPR Art. 13–14, CalOPPA
- [ ] Publish a `/terms/` page (light — open data under CC-BY-4.0,
      no warranty, link rot disclaimers)
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
