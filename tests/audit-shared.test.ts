import { describe, expect, it } from "vitest";
import {
  jsonResponse,
  normalizeUsps,
  isDatapointId,
  normalizeSourceUrl,
  extractTitle,
  linkStatusLabel,
  parseCheckerReport,
} from "../src/lib/audit-shared";
import { DATAPOINT_IDS } from "../src/lib/verification-datapoints";

describe("normalizeUsps", () => {
  it("uppercases a valid two-letter code", () => {
    expect(normalizeUsps("ca")).toBe("CA");
    expect(normalizeUsps("Tx")).toBe("TX");
  });
  it("rejects malformed input", () => {
    expect(normalizeUsps("california")).toBeNull();
    expect(normalizeUsps("C1")).toBeNull();
    expect(normalizeUsps("")).toBeNull();
    expect(normalizeUsps(null)).toBeNull();
    expect(normalizeUsps(undefined)).toBeNull();
  });
});

describe("isDatapointId", () => {
  it("accepts every id in the skeleton", () => {
    for (const id of DATAPOINT_IDS) expect(isDatapointId(id)).toBe(true);
  });
  it("rejects unknown or non-string ids", () => {
    expect(isDatapointId("credentials.bilingual.nope")).toBe(false);
    expect(isDatapointId("")).toBe(false);
    expect(isDatapointId(42)).toBe(false);
    expect(isDatapointId(null)).toBe(false);
  });
});

describe("normalizeSourceUrl", () => {
  it("keeps full http(s) URLs and adds a trailing slash on bare origins", () => {
    expect(normalizeSourceUrl("https://azed.gov/x")).toBe("https://azed.gov/x");
    expect(normalizeSourceUrl("http://example.org")).toBe("http://example.org/");
  });
  it("prepends https:// for scheme-less dotted domains", () => {
    expect(normalizeSourceUrl("www.example.com")).toBe("https://www.example.com/");
    expect(normalizeSourceUrl("example.gov")).toBe("https://example.gov/");
  });
  it("rejects a bare word that is not a real domain", () => {
    // The reported bug: "dsfsda" → "https://dsfsda" parses but is not a URL.
    expect(normalizeSourceUrl("dsfsda")).toBeNull();
    expect(normalizeSourceUrl("https://dsfsda")).toBeNull(); // single-label host
  });
  it("rejects non-http schemes, malformed input, numeric TLDs, and empties", () => {
    expect(normalizeSourceUrl("ftp://x.com")).toBeNull();
    expect(normalizeSourceUrl("javascript:alert(1)")).toBeNull();
    expect(normalizeSourceUrl("not a url")).toBeNull();
    expect(normalizeSourceUrl("192.168.1.1")).toBeNull(); // numeric TLD
    expect(normalizeSourceUrl("")).toBeNull();
    expect(normalizeSourceUrl(null)).toBeNull();
  });
});

describe("extractTitle", () => {
  it("prefers og:title, falls back to <title>, decodes entities, collapses whitespace", () => {
    expect(extractTitle("<title>ELPAC — CDE</title>")).toBe("ELPAC — CDE");
    expect(extractTitle('<meta property="og:title" content="Bilingual Authorization">\n<title>fallback</title>')).toBe(
      "Bilingual Authorization",
    );
    expect(extractTitle("<title>A &amp; B &#39;C&#39;</title>")).toBe("A & B 'C'");
    expect(extractTitle("<title>\n  Spaced   Out\n</title>")).toBe("Spaced Out");
  });
  it("returns null when there is no title", () => {
    expect(extractTitle("<html><body>no title here</body></html>")).toBeNull();
    expect(extractTitle("<title>   </title>")).toBeNull();
  });
});

describe("jsonResponse", () => {
  it("serializes the body with a JSON content type and status", async () => {
    const res = jsonResponse({ ok: true }, 201);
    expect(res.status).toBe(201);
    expect(res.headers.get("content-type")).toContain("application/json");
    expect(await res.json()).toEqual({ ok: true });
  });
  it("defaults to status 200", () => {
    expect(jsonResponse({}).status).toBe(200);
  });
});

describe("linkStatusLabel", () => {
  it("formats an observed HTTP status", () => {
    expect(linkStatusLabel(403)).toBe("HTTP 403");
    expect(linkStatusLabel(503)).toBe("HTTP 503");
  });

  it("describes a request that never completed", () => {
    // Never leak the raw classification enum ("needs-review") into copy a
    // reviewer reads — that was the bug this helper replaced.
    expect(linkStatusLabel(null)).toBe("No response from host");
    expect(linkStatusLabel(undefined)).toBe("No response from host");
  });
});

describe("parseCheckerReport", () => {
  const report = JSON.stringify({ buckets: { ok: 1 }, results: [{ url: "https://a", classification: "ok" }] });

  it("parses a clean report", () => {
    expect(parseCheckerReport(report).results).toHaveLength(1);
  });

  // The exact bytes `npm run check:links -- --json > links.json` produced.
  // A bare JSON.parse threw on this, and because the weekly sweep's sync
  // step runs under continue-on-error the failure was swallowed: every run
  // reported success while writing nothing to the audit store.
  it("tolerates the npm banner that silently broke the weekly D1 sync", () => {
    const withBanner = `\n> projectcert@0.1.0 check:links\n> tsx scripts/check-external-links.ts --json\n${report}`;
    expect(() => JSON.parse(withBanner)).toThrow();
    expect(parseCheckerReport(withBanner).results).toHaveLength(1);
  });

  it("throws loudly, with the offending prefix, when there is no JSON at all", () => {
    // A real breakage must not be mistaken for link drift and shrugged off.
    expect(() => parseCheckerReport("npm ERR! missing script: check:links")).toThrow(/No JSON object/);
    expect(() => parseCheckerReport("")).toThrow(/No JSON object/);
  });
});
