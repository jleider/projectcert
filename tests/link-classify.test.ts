import { describe, expect, it } from "vitest";
import { classify, resolveClassification } from "../src/lib/link-classify";

describe("classify", () => {
  it("maps status ranges to base classifications", () => {
    expect(classify(200)).toBe("ok");
    expect(classify(204)).toBe("ok");
    expect(classify(301)).toBe("redirect");
    expect(classify(403)).toBe("soft-ok"); // bot block
    expect(classify(401)).toBe("soft-ok");
    expect(classify(429)).toBe("soft-ok");
    expect(classify(404)).toBe("client-error");
    expect(classify(410)).toBe("client-error");
    expect(classify(500)).toBe("server-error");
    expect(classify(503)).toBe("server-error");
    expect(classify(null)).toBe("network-error");
  });
});

describe("resolveClassification — not whitelisted", () => {
  const none = new Map<string, number | null>();

  it("routes every un-confirmable response to needs-review", () => {
    expect(resolveClassification("https://x", 403, none)).toBe("needs-review"); // bot block
    expect(resolveClassification("https://x", 401, none)).toBe("needs-review");
    expect(resolveClassification("https://x", 429, none)).toBe("needs-review");
    expect(resolveClassification("https://x", 500, none)).toBe("needs-review"); // 5xx
    expect(resolveClassification("https://x", null, none)).toBe("needs-review"); // reset/TLS
  });

  it("keeps definitive 4xx-gone as broken (client-error)", () => {
    expect(resolveClassification("https://x", 404, none)).toBe("client-error");
    expect(resolveClassification("https://x", 410, none)).toBe("client-error");
  });

  it("passes 2xx/3xx through", () => {
    expect(resolveClassification("https://x", 200, none)).toBe("ok");
    expect(resolveClassification("https://x", 301, none)).toBe("redirect");
  });
});

describe("resolveClassification — whitelisted (status-aware)", () => {
  it("suppresses to accepted only while the status is unchanged", () => {
    const wl = new Map<string, number | null>([["https://azed.gov", 403]]);
    expect(resolveClassification("https://azed.gov", 403, wl)).toBe("accepted");
  });

  it("re-flags as needs-review when the response code changes", () => {
    const wl = new Map<string, number | null>([["https://azed.gov", 403]]);
    expect(resolveClassification("https://azed.gov", 404, wl)).toBe(
      "needs-review",
    );
    expect(resolveClassification("https://azed.gov", 500, wl)).toBe(
      "needs-review",
    );
  });

  it("shows ok when an accepted URL recovers to 2xx", () => {
    const wl = new Map<string, number | null>([["https://azed.gov", 403]]);
    expect(resolveClassification("https://azed.gov", 200, wl)).toBe("ok");
  });

  it("handles a network-error acceptance (null status)", () => {
    const wl = new Map<string, number | null>([["https://reset.gov", null]]);
    expect(resolveClassification("https://reset.gov", null, wl)).toBe(
      "accepted",
    ); // still resetting
    expect(resolveClassification("https://reset.gov", 403, wl)).toBe(
      "needs-review",
    ); // now responds → changed
  });

  it("re-flags a 5xx acceptance when the exact code changes", () => {
    const wl = new Map<string, number | null>([["https://ptsb.com", 500]]);
    expect(resolveClassification("https://ptsb.com", 500, wl)).toBe("accepted");
    expect(resolveClassification("https://ptsb.com", 503, wl)).toBe(
      "needs-review",
    );
  });
});
