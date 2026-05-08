/**
 * Helpers for JSON-LD fragments emitted by pages. Centralized so the
 * shape is consistent and breadcrumb numbering can't drift.
 */

import { SITE_URL } from "@/config/site";

export interface BreadcrumbItem {
  name: string;
  /** Absolute or root-relative URL — relative URLs are resolved against SITE_URL. */
  url: string;
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
  return breadcrumbList([{ name: "Home", url: SITE_URL }, ...rest]);
}
