import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import {
  checkInternalLinks,
  extractIds,
  extractRefs,
  isInternal,
  resolveTarget,
} from "../scripts/check-internal-links";

describe("extractRefs", () => {
  it("collects href and src in either quote style", () => {
    const html = `<a href="/map/">m</a><img src='/seals/ut.svg'><link href="/_astro/a.css">`;
    expect(extractRefs(html)).toEqual(["/map/", "/seals/ut.svg", "/_astro/a.css"]);
  });

  it("ignores hrefs that appear inside escaped island props", () => {
    const html = `<astro-island props="{&quot;href&quot;:&quot;/nope/&quot;}"></astro-island>`;
    expect(extractRefs(html)).toEqual([]);
  });
});

describe("isInternal", () => {
  it("accepts site-relative forms", () => {
    expect(isInternal("/states/ut/")).toBe(true);
    expect(isInternal("../map/")).toBe(true);
    expect(isInternal("#how-to-cite")).toBe(true);
  });

  it("rejects anything with a scheme or protocol-relative host", () => {
    expect(isInternal("https://projectcert.org/")).toBe(false);
    expect(isInternal("http://example.gov")).toBe(false);
    expect(isInternal("//cdn.example.com/a.js")).toBe(false);
    expect(isInternal("mailto:a@b.gov")).toBe(false);
    expect(isInternal("tel:+15551234")).toBe(false);
    expect(isInternal("data:image/svg+xml,<svg/>")).toBe(false);
    expect(isInternal("")).toBe(false);
  });
});

describe("extractIds", () => {
  it("collects ids and legacy anchor names", () => {
    const ids = extractIds(`<h2 id="how-to-cite">c</h2><a name="old"></a><div id='main'>`);
    expect(ids).toEqual(new Set(["how-to-cite", "old", "main"]));
  });
});

describe("resolveTarget", () => {
  let dist: string;
  let page: string;

  beforeAll(() => {
    dist = mkdtempSync(join(tmpdir(), "pc-resolve-"));
    mkdirSync(join(dist, "states", "ut"), { recursive: true });
    mkdirSync(join(dist, "seals"), { recursive: true });
    writeFileSync(join(dist, "index.html"), "<html></html>");
    writeFileSync(join(dist, "states", "ut", "index.html"), "<html></html>");
    writeFileSync(join(dist, "seals", "ut.svg"), "<svg/>");
    page = join(dist, "index.html");
  });

  afterAll(() => rmSync(dist, { recursive: true, force: true }));

  it("resolves a root-relative directory URL to its index.html", () => {
    // The exact form the lychee 0.24 upgrade began resolving as
    // <dist>/<dist>/states/ut — this is the regression guard.
    expect(resolveTarget("/states/ut/", page, dist).path).toBe(join(dist, "states", "ut", "index.html"));
  });

  it("resolves an extensionless root-relative URL to index.html", () => {
    expect(resolveTarget("/states/ut", page, dist).path).toBe(join(dist, "states", "ut", "index.html"));
  });

  it("resolves a file URL with an extension", () => {
    expect(resolveTarget("/seals/ut.svg", page, dist).path).toBe(join(dist, "seals", "ut.svg"));
  });

  it("resolves a relative URL against the linking page's directory", () => {
    const from = join(dist, "states", "ut", "index.html");
    expect(resolveTarget("../../seals/ut.svg", from, dist).path).toBe(join(dist, "seals", "ut.svg"));
  });

  it("strips the query string and splits the fragment", () => {
    const r = resolveTarget("/states/ut/?layer=eld#history", page, dist);
    expect(r.path).toBe(join(dist, "states", "ut", "index.html"));
    expect(r.fragment).toBe("history");
  });

  it("treats a bare fragment as the current page", () => {
    expect(resolveTarget("#main", page, dist)).toMatchObject({ path: page, fragment: "main" });
  });

  it("reports a missing target", () => {
    expect(resolveTarget("/states/zz/", page, dist).path).toBeNull();
  });

  it("flags a URL that escapes the site root", () => {
    expect(resolveTarget("../../../etc/passwd", page, dist).escapes).toBe(true);
  });
});

describe("checkInternalLinks", () => {
  let dist: string;

  beforeAll(() => {
    dist = mkdtempSync(join(tmpdir(), "pc-links-"));
    mkdirSync(join(dist, "states", "ut"), { recursive: true });
    mkdirSync(join(dist, "about"), { recursive: true });
    writeFileSync(
      join(dist, "index.html"),
      `<a href="/states/ut/">Utah</a>
       <a href="/about/#how-to-cite">cite</a>
       <a href="https://doi.org/10.14507/epaa.29.5279">paper</a>
       <a href="#main">skip</a>
       <main id="main"></main>`,
    );
    writeFileSync(join(dist, "states", "ut", "index.html"), `<a href="/map/">map</a>`);
    writeFileSync(join(dist, "about", "index.html"), `<h2 id="how-to-cite">How to cite</h2>`);
  });

  afterAll(() => rmSync(dist, { recursive: true, force: true }));

  it("reports only the link with no target, ignoring external URLs", () => {
    const { findings, filesScanned } = checkInternalLinks(dist);
    expect(filesScanned).toBe(3);
    expect(findings).toEqual([
      { file: join("states", "ut", "index.html"), url: "/map/", reason: "no such file in the built site" },
    ]);
  });

  it("counts internal links and excludes external ones", () => {
    // 4 on the index page (one of which is external and skipped) + 1 elsewhere.
    expect(checkInternalLinks(dist).linksChecked).toBe(4);
  });

  it("fails a cross-page fragment that no longer has a matching id", () => {
    writeFileSync(join(dist, "about", "index.html"), `<h2 id="citation">How to cite</h2>`);
    const { findings } = checkInternalLinks(dist);
    expect(findings).toContainEqual({
      file: "index.html",
      url: "/about/#how-to-cite",
      reason: `no id="how-to-cite" in ${join("about", "index.html")}`,
    });
  });
});
