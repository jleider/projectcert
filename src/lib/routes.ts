/**
 * Catalog of every internal route on projectcert. The TypeScript compiler
 * is the only thing standing between us and silent broken links when a
 * page is renamed; touch this file when you add or rename a page, and
 * every hardcoded href elsewhere either compiles or fails loud.
 *
 * Patterns:
 *   <a href={ROUTES.about}>About</a>
 *   <a href={withAnchor(ROUTES.about, ANCHORS.howToCite)}>Cite</a>
 *   url: absoluteRoute(SITE_URL, ROUTES.methodology)  // for JSON-LD
 *
 * Per-state URLs go through `stateUrl(usps)` / `absoluteStateUrl(...)` in
 * `@/lib/state-types`, which is typed by USPS code. Don't add state pages
 * here.
 */

export const ROUTES = {
  home: "/",
  map: "/map/",
  compare: "/compare/",
  about: "/about/",
  methodology: "/methodology/",
  glossary: "/glossary/",
  verification: "/verification/",
  embed: "/embed/",
  embedMap: "/embed/map/",
  credentials: {
    bilingual: "/credentials/bilingual/",
    eld: "/credentials/eld/",
    sei: "/credentials/sei/",
  },
} as const;

/** Stable in-page anchor IDs. Adding one here is the contract that the
 *  matching `id="<value>"` exists somewhere in the rendered page. */
export const ANCHORS = {
  howToCite: "how-to-cite",
  citeThisPage: "cite-this-page",
  main: "main",
} as const;

type LeafValues<T> = T extends string
  ? T
  : T extends Record<string, unknown>
    ? LeafValues<T[keyof T]>
    : never;

/** String-literal union of every route declared in ROUTES. */
export type Route = LeafValues<typeof ROUTES>;
export type Anchor = (typeof ANCHORS)[keyof typeof ANCHORS];

declare const __linkUrlBrand: unique symbol;
/**
 * A nominal type for "URL produced by a helper, not a hand-written
 * string." Returned by `absoluteRoute`, `absoluteStateUrl`,
 * `withAnchor`, etc. Consumers that need to reject bare path strings
 * (the JSON-LD breadcrumb items, for example) declare their input as
 * `Route | LinkUrl`.
 */
export type LinkUrl = string & { readonly [__linkUrlBrand]: true };

/** All routes as a flat list — used by build-time presence checks. */
export const ALL_ROUTES: readonly Route[] = (function flatten(o: unknown): Route[] {
  if (typeof o === "string") return [o as Route];
  if (o && typeof o === "object") return Object.values(o).flatMap(flatten);
  return [];
})(ROUTES);

export function withAnchor(route: Route, anchor: Anchor): LinkUrl {
  return `${route}#${anchor}` as LinkUrl;
}

/** Same-page anchor href, e.g. `<a href={sameAnchor(ANCHORS.main)}>`. */
export function sameAnchor(anchor: Anchor): LinkUrl {
  return `#${anchor}` as LinkUrl;
}

/** Build an absolute URL from a Route, e.g. for JSON-LD `url` fields. */
export function absoluteRoute(siteUrl: string, route: Route): LinkUrl {
  return `${siteUrl.replace(/\/$/, "")}${route}` as LinkUrl;
}
