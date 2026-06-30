/**
 * Helpers for JSON-LD fragments emitted by pages. Centralized so the
 * shape is consistent and breadcrumb numbering can't drift.
 */

import { SITE_URL } from "@/config/site";
import { ROUTES, absoluteRoute, type Route, type LinkUrl } from "@/lib/routes";

export interface BreadcrumbItem {
  name: string;
  /**
   * Either a Route literal (e.g. `ROUTES.about`) or a `LinkUrl`
   * produced by `absoluteStateUrl(...)`, `absoluteRoute(...)`, or
   * `withAnchor(...)`. Hand-typed bare strings won't compile — that's
   * the point of this type.
   */
  url: Route | LinkUrl;
}

export function breadcrumbList(items: BreadcrumbItem[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url.startsWith("http") ? it.url : `${SITE_URL}${it.url}`,
    })),
  };
}

/** Convenience: prepend the standard "Home" item. */
export function breadcrumbWithHome(rest: BreadcrumbItem[]): Record<string, unknown> {
  return breadcrumbList([{ name: "Home", url: absoluteRoute(SITE_URL, ROUTES.home) }, ...rest]);
}
