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
 * An empty string disables the beacon, so local and preview builds emit
 * nothing without needing a conditional anywhere else.
 */
/**
 * Address for privacy enquiries and data-subject requests, shown on
 * `/privacy/`. GDPR Articles 13-14 expect a contact route for the
 * controller, so this should not stay empty once the site is promoted.
 *
 * An empty string omits the contact paragraph rather than rendering a
 * dead address, which would be worse than none.
 */
export const PRIVACY_CONTACT_EMAIL: string = "";

// Annotated `string` deliberately. Without it TypeScript infers a literal
// type, and `astro check` — which the build runs at
// `--minimumFailingSeverity hint` — flags the guard in BaseLayout as a
// condition whose result is already known.
export const WEB_ANALYTICS_TOKEN: string = "3d9f1bb2d43748fe9ad4b2b0861c56df";
