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
  const resolved = items.map((it) => (it.url.startsWith("http") ? it.url : `${SITE_URL}${it.url}`));

  // Auto-numbering keeps positions consistent but says nothing about
  // whether a crumb points at the right page, and the mistake that actually
  // happened was a *category* crumb ("Credentials", "States") aimed at a
  // sibling leaf or at the home page. Both checks below run at build time,
  // so a bad trail fails the build instead of shipping to Google.
  //
  // A breadcrumb is a containment path: each crumb must be an ancestor of
  // the next, which for these URLs means a string prefix of it. That is
  // what catches "Credentials" → /credentials/bilingual/ sitting above
  // /credentials/eld/ — two perfectly distinct URLs that are nonetheless
  // siblings, not parent and child.
  const firstDuplicate = resolved.find((url, i) => resolved.indexOf(url) !== i);
  if (firstDuplicate !== undefined) {
    throw new Error(
      `Breadcrumb trail repeats ${firstDuplicate}. A category crumb needs its own page; ` +
        `if none exists, drop the crumb rather than pointing it at a sibling.`,
    );
  }
  for (let i = 1; i < resolved.length; i++) {
    const parent = resolved[i - 1]!;
    const child = resolved[i]!;
    if (!child.startsWith(parent)) {
      throw new Error(
        `Breadcrumb trail is not a containment path: ${parent} is not an ancestor of ${child}. ` +
          `A crumb must be the page that contains the next one — pointing a category at one of ` +
          `its own children advertises that child as the parent of its siblings.`,
      );
    }
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: resolved[i]!,
    })),
  };
}

/** Convenience: prepend the standard "Home" item. */
export function breadcrumbWithHome(rest: BreadcrumbItem[]): Record<string, unknown> {
  return breadcrumbList([{ name: "Home", url: absoluteRoute(SITE_URL, ROUTES.home) }, ...rest]);
}
