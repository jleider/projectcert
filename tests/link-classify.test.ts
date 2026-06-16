import { describe, expect, it } from "vitest";
import { classify, applyWhitelist } from "../src/lib/link-classify";

describe("classify", () => {
  it("maps status ranges to classifications", () => {
    expect(classify(200)).toBe("ok");
    expect(classify(204)).toBe("ok");
    expect(classify(301)).toBe("redirect");
    expect(classify(403)).toBe("soft-ok"); // bot block
    expect(classify(401)).toBe("soft-ok");
    expect(classify(429)).toBe("soft-ok");
    expect(classify(404)).toBe("client-error");
    expect(classify(500)).toBe("server-error");
    expect(classify(503)).toBe("server-error");
    expect(classify(null)).toBe("network-error");
  });
});

describe("applyWhitelist", () => {
  const wl = new Set(["https://azed.gov"]);

  it("turns a non-whitelisted bot block into needs-review", () => {
    expect(applyWhitelist("https://other.gov", "soft-ok", wl)).toBe("needs-review");
  });

  it("accepts a whitelisted bot block", () => {
    expect(applyWhitelist("https://azed.gov", "soft-ok", wl)).toBe("accepted");
  });

  it("accepts a whitelisted URL even on a hard error (human trusted it live)", () => {
    expect(applyWhitelist("https://azed.gov", "client-error", wl)).toBe("accepted");
    expect(applyWhitelist("https://azed.gov", "network-error", wl)).toBe("accepted");
  });

  it("passes a whitelisted URL through as ok when it actually returns 2xx", () => {
    expect(applyWhitelist("https://azed.gov", "ok", wl)).toBe("ok");
    expect(applyWhitelist("https://azed.gov", "redirect", wl)).toBe("redirect");
  });

  it("leaves non-whitelisted hard errors as broken (not masked)", () => {
    expect(applyWhitelist("https://other.gov", "client-error", wl)).toBe("client-error");
    expect(applyWhitelist("https://other.gov", "server-error", wl)).toBe("server-error");
    expect(applyWhitelist("https://other.gov", "network-error", wl)).toBe("network-error");
    expect(applyWhitelist("https://other.gov", "ok", wl)).toBe("ok");
  });
});
