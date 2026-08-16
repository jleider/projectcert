import { describe, expect, it } from "vitest";
import {
  accessConfigured,
  authenticateAuditRequest,
  basicAuthChallenge,
  basicAuthConfigured,
  constantTimeEquals,
  NOINDEX_HEADER,
  parseBasicAuth,
  readAccessToken,
  verifyBasicAuth,
  withGatedHeaders,
  type AuditAuthEnv,
} from "../src/lib/audit-auth";

const basicHeader = (user: string, password: string): string => `Basic ${btoa(`${user}:${password}`)}`;

const req = (headers: Record<string, string> = {}): Request =>
  new Request("https://projectcert.org/audit/", { headers });

const CONFIGURED: AuditAuthEnv = { AUDIT_USER: "reviewer@example.org", AUDIT_PASSWORD: "correct horse" };

describe("parseBasicAuth", () => {
  it("decodes a well-formed header", () => {
    expect(parseBasicAuth(basicHeader("ada", "hunter2"))).toEqual({ user: "ada", password: "hunter2" });
  });

  it("keeps colons that belong to the password", () => {
    expect(parseBasicAuth(basicHeader("ada", "a:b:c"))).toEqual({ user: "ada", password: "a:b:c" });
  });

  it("accepts the scheme case-insensitively", () => {
    expect(parseBasicAuth(`basic ${btoa("ada:x")}`)?.user).toBe("ada");
  });

  it("rejects anything that is not usable Basic credentials", () => {
    expect(parseBasicAuth(null)).toBeNull();
    expect(parseBasicAuth("")).toBeNull();
    expect(parseBasicAuth("Bearer abc.def.ghi")).toBeNull();
    expect(parseBasicAuth("Basic !!!not-base64!!!")).toBeNull();
    expect(parseBasicAuth(`Basic ${btoa("no-separator")}`)).toBeNull();
  });
});

describe("constantTimeEquals", () => {
  it("matches only identical strings", () => {
    expect(constantTimeEquals("abc", "abc")).toBe(true);
    expect(constantTimeEquals("abc", "abd")).toBe(false);
    expect(constantTimeEquals("abc", "abcd")).toBe(false);
    expect(constantTimeEquals("", "")).toBe(true);
    expect(constantTimeEquals("", "a")).toBe(false);
  });
});

describe("verifyBasicAuth", () => {
  it("accepts the configured credentials and returns the identity", () => {
    expect(verifyBasicAuth(basicHeader("reviewer@example.org", "correct horse"), CONFIGURED)).toBe(
      "reviewer@example.org",
    );
  });

  it("rejects a wrong password or a wrong user", () => {
    expect(verifyBasicAuth(basicHeader("reviewer@example.org", "wrong"), CONFIGURED)).toBeNull();
    expect(verifyBasicAuth(basicHeader("someone@else.org", "correct horse"), CONFIGURED)).toBeNull();
  });

  it("never authenticates when no login is configured", () => {
    // The dangerous case: empty configured values must not match an
    // empty-credential request.
    expect(verifyBasicAuth(basicHeader("", ""), {})).toBeNull();
    expect(verifyBasicAuth(basicHeader("", ""), { AUDIT_USER: "", AUDIT_PASSWORD: "" })).toBeNull();
    expect(verifyBasicAuth(basicHeader("u", "p"), { AUDIT_USER: "u" })).toBeNull();
  });
});

describe("configuration predicates", () => {
  it("requires both halves of each credential path", () => {
    expect(basicAuthConfigured(CONFIGURED)).toBe(true);
    expect(basicAuthConfigured({ AUDIT_USER: "u" })).toBe(false);
    expect(basicAuthConfigured({ AUDIT_USER: "", AUDIT_PASSWORD: "p" })).toBe(false);
    expect(accessConfigured({ ACCESS_TEAM_DOMAIN: "t.cloudflareaccess.com", ACCESS_AUD: "aud" })).toBe(true);
    expect(accessConfigured({ ACCESS_TEAM_DOMAIN: "t.cloudflareaccess.com" })).toBe(false);
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
  it("fails closed when nothing is configured", async () => {
    // The invariant that matters most: an unconfigured deployment serves
    // nothing, rather than serving the console to the public.
    await expect(authenticateAuditRequest(req(), {})).resolves.toEqual({ ok: false, reason: "unconfigured" });
    await expect(
      authenticateAuditRequest(req({ Authorization: basicHeader("anyone", "anything") }), {}),
    ).resolves.toEqual({ ok: false, reason: "unconfigured" });
  });

  it("accepts the shared login", async () => {
    await expect(
      authenticateAuditRequest(
        req({ Authorization: basicHeader("reviewer@example.org", "correct horse") }),
        CONFIGURED,
      ),
    ).resolves.toEqual({ ok: true, email: "reviewer@example.org" });
  });

  it("reports wrong credentials as unauthorized, not unconfigured", async () => {
    await expect(
      authenticateAuditRequest(req({ Authorization: basicHeader("reviewer@example.org", "nope") }), CONFIGURED),
    ).resolves.toEqual({ ok: false, reason: "unauthorized" });
  });

  it("refuses an unsigned request when only Access is configured", async () => {
    // A forged identity header must not authenticate — only a verified JWT
    // does, and there is none here.
    const env: AuditAuthEnv = { ACCESS_TEAM_DOMAIN: "team.cloudflareaccess.com", ACCESS_AUD: "aud123" };
    await expect(
      authenticateAuditRequest(req({ "Cf-Access-Authenticated-User-Email": "attacker@example.org" }), env),
    ).resolves.toEqual({ ok: false, reason: "unauthorized" });
  });

  it("honours the local-dev bypass ahead of everything else", async () => {
    await expect(authenticateAuditRequest(req(), { DEV_REVIEWER_EMAIL: "dev@local" })).resolves.toEqual({
      ok: true,
      email: "dev@local",
    });
  });
});

describe("response helpers", () => {
  it("challenges with a Basic realm so the browser prompts", () => {
    const res = basicAuthChallenge();
    expect(res.status).toBe(401);
    expect(res.headers.get("WWW-Authenticate")).toMatch(/^Basic realm="/);
    expect(res.headers.get("X-Robots-Tag")).toBe(NOINDEX_HEADER);
  });

  it("marks gated responses non-indexable and uncacheable", () => {
    const res = withGatedHeaders(new Response("<html></html>", { headers: { "Content-Type": "text/html" } }));
    expect(res.headers.get("X-Robots-Tag")).toBe(NOINDEX_HEADER);
    expect(res.headers.get("Cache-Control")).toBe("private, no-store");
    expect(res.headers.get("Content-Type")).toBe("text/html");
  });
});
