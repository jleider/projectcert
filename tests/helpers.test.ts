import { describe, expect, it } from "vitest";
import { stateUrl, absoluteStateUrl } from "../src/lib/state-types";
import { breadcrumbList, breadcrumbWithHome } from "../src/lib/jsonld";
import type { LinkUrl } from "../src/lib/routes";

// Test-only helper: bypass the compile-time LinkUrl brand. Production
// code must go through absoluteRoute/absoluteStateUrl/withAnchor.
const u = (s: string) => s as LinkUrl;

describe("stateUrl", () => {
  it("returns root-relative path with lowercased usps", () => {
    expect(stateUrl("MA")).toBe("/states/ma/");
    expect(stateUrl("dc")).toBe("/states/dc/");
  });
});

describe("absoluteStateUrl", () => {
  it("prepends the site origin", () => {
    expect(absoluteStateUrl("https://projectcert.org", "TX")).toBe("https://projectcert.org/states/tx/");
  });
});

describe("breadcrumbList", () => {
  it("auto-numbers positions starting at 1", () => {
    const b = breadcrumbList([
      { name: "A", url: u("https://projectcert.org/") },
      { name: "B", url: u("/b/") },
    ]) as {
      itemListElement: Array<{ position: number; item: string; name: string }>;
    };
    expect(b.itemListElement).toHaveLength(2);
    expect(b.itemListElement[0]!.position).toBe(1);
    expect(b.itemListElement[1]!.position).toBe(2);
  });

  it("resolves root-relative URLs against SITE_URL", () => {
    const b = breadcrumbList([{ name: "X", url: u("/x/") }]) as {
      itemListElement: Array<{ item: string }>;
    };
    expect(b.itemListElement[0]!.item).toMatch(/^https:\/\//);
    expect(b.itemListElement[0]!.item).toMatch(/\/x\/$/);
  });

  it("preserves absolute URLs as-is", () => {
    const b = breadcrumbList([{ name: "Ext", url: u("https://example.com/path/") }]) as {
      itemListElement: Array<{ item: string }>;
    };
    expect(b.itemListElement[0]!.item).toBe("https://example.com/path/");
  });

  it("refuses a trail that repeats a URL", () => {
    // The real bug: a category crumb pointed at a sibling leaf, so the
    // credential pages advertised Home > Credentials(→bilingual) > ELD and
    // the bilingual page's positions 2 and 3 were the same page. Numbering
    // stayed correct throughout, which is why it survived for months.
    expect(() =>
      breadcrumbList([
        { name: "Credentials", url: u("https://projectcert.org/credentials/bilingual/") },
        { name: "Bilingual", url: u("https://projectcert.org/credentials/bilingual/") },
      ]),
    ).toThrow(/repeats/);
  });

  it("refuses a root-relative crumb that resolves onto an absolute one", () => {
    // "States" → "/" resolves to the same URL breadcrumbWithHome already
    // emitted for Home; the duplicate is only visible after resolution.
    expect(() => breadcrumbWithHome([{ name: "States", url: "/" }])).toThrow(/repeats/);
  });

  it("refuses a category crumb pointing at a sibling of the page below it", () => {
    // The larger half of the original bug, and the half a duplicate check
    // cannot see: /credentials/bilingual/ and /credentials/eld/ are distinct
    // URLs, so the trail looked well-formed while advertising one credential
    // report as the parent of another.
    expect(() =>
      breadcrumbWithHome([
        { name: "Credentials", url: "/credentials/bilingual/" },
        { name: "ELD", url: "/credentials/eld/" },
      ]),
    ).toThrow(/not a containment path/);
  });

  it("accepts a genuine parent → child trail", () => {
    const b = breadcrumbWithHome([
      { name: "California", url: u("https://projectcert.org/states/ca/") },
      { name: "Classified-EL share over time", url: u("https://projectcert.org/states/ca/el-percent-history/") },
    ]) as { itemListElement: Array<{ position: number }> };
    expect(b.itemListElement).toHaveLength(3);
  });
});

describe("breadcrumbWithHome", () => {
  it("prepends a Home item at position 1", () => {
    const b = breadcrumbWithHome([{ name: "Glossary", url: "/glossary/" }]) as {
      itemListElement: Array<{ position: number; name: string }>;
    };
    expect(b.itemListElement).toHaveLength(2);
    expect(b.itemListElement[0]!.name).toBe("Home");
    expect(b.itemListElement[0]!.position).toBe(1);
    expect(b.itemListElement[1]!.name).toBe("Glossary");
    expect(b.itemListElement[1]!.position).toBe(2);
  });
});
