import { describe, expect, it } from "vitest";
import { stateUrl, absoluteStateUrl } from "../src/lib/state-types";
import { breadcrumbList, breadcrumbWithHome } from "../src/lib/jsonld";

describe("stateUrl", () => {
  it("returns root-relative path with lowercased usps", () => {
    expect(stateUrl("MA")).toBe("/states/ma/");
    expect(stateUrl("dc")).toBe("/states/dc/");
  });
});

describe("absoluteStateUrl", () => {
  it("prepends the site origin", () => {
    expect(absoluteStateUrl("https://projectcert.org", "TX")).toBe(
      "https://projectcert.org/states/tx/",
    );
  });
});

describe("breadcrumbList", () => {
  it("auto-numbers positions starting at 1", () => {
    const b = breadcrumbList([
      { name: "A", url: "https://projectcert.org/" },
      { name: "B", url: "/b/" },
    ]) as { itemListElement: Array<{ position: number; item: string; name: string }> };
    expect(b.itemListElement).toHaveLength(2);
    expect(b.itemListElement[0]!.position).toBe(1);
    expect(b.itemListElement[1]!.position).toBe(2);
  });

  it("resolves root-relative URLs against SITE_URL", () => {
    const b = breadcrumbList([{ name: "X", url: "/x/" }]) as {
      itemListElement: Array<{ item: string }>;
    };
    expect(b.itemListElement[0]!.item).toMatch(/^https:\/\//);
    expect(b.itemListElement[0]!.item).toMatch(/\/x\/$/);
  });

  it("preserves absolute URLs as-is", () => {
    const b = breadcrumbList([
      { name: "Ext", url: "https://example.com/path/" },
    ]) as { itemListElement: Array<{ item: string }> };
    expect(b.itemListElement[0]!.item).toBe("https://example.com/path/");
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
