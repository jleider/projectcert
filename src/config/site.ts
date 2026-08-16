/**
 * Canonical origin for projectcert. Imported anywhere a fully-qualified
 * URL is needed (canonical tags, JSON-LD, embed iframe back-links,
 * llms-full.txt generation, etc.). All internal navigation links should
 * stay root-relative; only external/embed contexts need this value.
 */
export const SITE_URL = "https://projectcert.org";
export const SITE_NAME = "projectcert";

/**
 * Cloudflare Web Analytics site token.
 *
 * Not a secret: it identifies which dashboard property a pageview belongs
 * to, and ships in the page source of every site using Web Analytics.
 *
 * The snippet is declared here rather than left to the dashboard's
 * "automatic setup", which injects the beacon through the zone's HTML
 * rewriter — that does not reach responses served by Pages, so the
 * automatic route produced no beacon at all on this site.
 *
 * Annotated `string` deliberately. Without it TypeScript infers a literal
 * type, and `astro check` — which the build runs at
 * `--minimumFailingSeverity hint` — flags the guard in BaseLayout as a
 * condition whose result is already known. An empty string disables the
 * beacon, so local and preview builds emit nothing.
 */
export const WEB_ANALYTICS_TOKEN: string = "3d9f1bb2d43748fe9ad4b2b0861c56df";

/**
 * Concept DOI minted by Zenodo for the catalog itself, distinct from the
 * seed paper's DOI (10.14507/epaa.29.5279), which is cited separately.
 *
 * Use the *concept* DOI, not a version DOI: it always resolves to the
 * latest release, so a citation printed today stays correct after the next
 * re-verification pass. Zenodo shows both on the release record.
 *
 * Empty omits every DOI-bearing surface — the citation blocks, the Scholar
 * `citation_doi` tag, and the site JSON-LD identifier — rather than
 * printing a half-formed reference.
 */
export const ZENODO_DOI: string = "";

/** Public repository. Linked wherever the site refers to its own source. */
export const REPO_URL = "https://github.com/jleider/projectcert";

/**
 * Where privacy enquiries go, linked from `/privacy/`.
 *
 * The issue tracker rather than an address: no mailbox is published on a
 * page crawlers are invited to read, and it needs no separate form to
 * maintain. An empty string omits the contact section rather than
 * rendering a dead link.
 */
export const PRIVACY_CONTACT_URL: string = `${REPO_URL}/issues`;
