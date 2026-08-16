import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * axe-core a11y suite. Loads one representative page of each type and
 * asserts zero WCAG 2.1 A/AA violations. Expand the `pages` list as new
 * page types are added (mirror the discovery-surface and built-pages
 * checks — every distinct page type deserves a row).
 *
 * The map is the highest-risk surface (hand-written SVG, keyboard/ARIA),
 * so the map page and a state detail page are both exercised here.
 */
const pages: Array<{ name: string; path: string }> = [
  { name: "home", path: "/" },
  { name: "map", path: "/map/" },
  { name: "state detail (CA)", path: "/states/ca/" },
  // The EL-percent history page is the other hand-written SVG on the site
  // (ElPercentChart.astro, with its own focusable data points), and it is
  // a distinct page type, so it gets its own row.
  { name: "state el-percent history (CA)", path: "/states/ca/el-percent-history/" },
  { name: "credentials/bilingual", path: "/credentials/bilingual/" },
  { name: "about", path: "/about/" },
];

for (const { name, path } of pages) {
  test(`${name} has no detectable a11y violations`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
    expect(results.violations).toEqual([]);
  });
}
