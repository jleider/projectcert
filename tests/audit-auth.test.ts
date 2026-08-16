import { describe, expect, it } from "vitest";
import {
  accessConfigured,
  authenticateAuditRequest,
  NOINDEX_HEADER,
  readAccessToken,
  withGatedHeaders,
  type AuditAuthEnv,
} from "../src/lib/audit-auth";

const req = (headers: Record<string, string> = {}): Request =>
  new Request("https://projectcert.org/audit/", { headers });

const ACCESS: AuditAuthEnv = { ACCESS_TEAM_DOMAIN: "green-base.cloudflareaccess.com", ACCESS_AUD: "aud123" };

describe("accessConfigured", () => {
  it("requires both halves", () => {
    expect(accessConfigured(ACCESS)).toBe(true);
    expect(accessConfigured({ ACCESS_TEAM_DOMAIN: "t.cloudflareaccess.com" })).toBe(false);
    expect(accessConfigured({ ACCESS_AUD: "aud" })).toBe(false);
    expect(accessConfigured({ ACCESS_TEAM_DOMAIN: "", ACCESS_AUD: "aud" })).toBe(false);
    expect(accessConfigured({})).toBe(false);
  });
});

describe("readAccessToken", () => {
  it("prefers the assertion header, falling back to the cookie", () => {
    expect(readAccessToken(req({ "Cf-Access-Jwt-Assertion": "tok" }))).toBe("tok");
    expect(readAccessToken(req({ Cookie: "other=1; CF_Authorization=cookietok" }))).toBe("cookietok");
    expect(readAccessToken(req())).toBeNull();
  });
});

describe("authenticateAuditRequest", () => {
  it("fails closed when Access is not configured", async () => {
    // The invariant that matters most: an unconfigured deployment serves
    // nothing, rather than serving the console to the public.
    await expect(authenticateAuditRequest(req(), {})).resolves.toEqual({ ok: false, reason: "unconfigured" });
  });

  it("never trusts the identity header on its own", async () => {
    // These Functions are reachable on hosts that may sit outside the Access
    // application, where anyone can set this header. Only a verified
    // assertion counts.
    await expect(
      authenticateAuditRequest(req({ "Cf-Access-Authenticated-User-Email": "attacker@example.org" }), ACCESS),
    ).resolves.toEqual({ ok: false, reason: "unauthorized" });
  });

  it("rejects a request with no assertion", async () => {
    await expect(authenticateAuditRequest(req(), ACCESS)).resolves.toEqual({ ok: false, reason: "unauthorized" });
  });

  it("rejects an unverifiable assertion rather than reading its claims", async () => {
    // An unsigned JWT whose payload claims an email. Decoding without
    // verifying would authenticate it; verification against the team JWKS
    // must not.
    const unsigned = [
      btoa(JSON.stringify({ alg: "none", typ: "JWT" })),
      btoa(JSON.stringify({ email: "attacker@example.org", aud: "aud123" })),
      "",
    ].join(".");
    await expect(authenticateAuditRequest(req({ "Cf-Access-Jwt-Assertion": unsigned }), ACCESS)).resolves.toEqual({
      ok: false,
      reason: "unauthorized",
    });
  });

  it("refuses a password even when one is offered", async () => {
    // The shared AUDIT_USER/AUDIT_PASSWORD login was removed: every row the
    // console writes records who made it, and a credential several people
    // hold cannot answer that. No Authorization header should authenticate.
    const basic = `Basic ${btoa("reviewer@example.org:hunter2")}`;
    await expect(authenticateAuditRequest(req({ Authorization: basic }), ACCESS)).resolves.toEqual({
      ok: false,
      reason: "unauthorized",
    });
    await expect(
      authenticateAuditRequest(req({ Authorization: basic }), {
        ...ACCESS,
        AUDIT_USER: "reviewer@example.org",
        AUDIT_PASSWORD: "hunter2",
      } as AuditAuthEnv),
    ).resolves.toEqual({ ok: false, reason: "unauthorized" });
  });

  it("honours the local-dev bypass ahead of everything else", async () => {
    await expect(authenticateAuditRequest(req(), { DEV_REVIEWER_EMAIL: "dev@local" })).resolves.toEqual({
      ok: true,
      email: "dev@local",
    });
  });
});

describe("withGatedHeaders", () => {
  it("marks gated responses non-indexable and uncacheable", () => {
    const res = withGatedHeaders(new Response("<html></html>", { headers: { "Content-Type": "text/html" } }));
    expect(res.headers.get("X-Robots-Tag")).toBe(NOINDEX_HEADER);
    expect(res.headers.get("Cache-Control")).toBe("private, no-store");
    expect(res.headers.get("Content-Type")).toBe("text/html");
  });
});
