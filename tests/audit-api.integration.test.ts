/**
 * Integration test for the /api/* Pages Functions.
 *
 * Runs the real handler code against a real SQLite database (Node's
 * built-in `node:sqlite`) created from the actual `schema/d1/0001_init.sql`,
 * via a minimal D1-compatible shim. This exercises the handlers, the
 * shared validation helpers, and the SQL itself end-to-end.
 */

import { readFileSync } from "node:fs";
import { DatabaseSync } from "node:sqlite";
import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  onRequestGet as verGet,
  onRequestPost as verPost,
  onRequestDelete as verDel,
} from "../functions/api/verifications";
import {
  onRequestGet as sugGet,
  onRequestPost as sugPost,
  onRequestPatch as sugPatch,
} from "../functions/api/suggestions";
import { onRequestGet as asGet, onRequestPost as asPost } from "../functions/api/added-sources";
import { onRequestGet as ovGet } from "../functions/api/overview";
import { onRequestGet as brkGet } from "../functions/api/broken-links";
import { onRequestGet as lrGet, onRequestPost as lrPost } from "../functions/api/link-reviews";
import {
  onRequestGet as dsGet,
  onRequestPost as dsPost,
  onRequestDelete as dsDel,
} from "../functions/api/datapoint-sources";
import { onRequest as middleware } from "../functions/api/_middleware";
import { onRequest as pageMiddleware } from "../functions/audit/_middleware";

const SCHEMA = readFileSync("schema/d1/0001_init.sql", "utf8");

// Minimal D1Database shim over node:sqlite. node:sqlite binds numbered
// (?1..?N) parameters positionally, matching D1's API.
class Stmt {
  private args: unknown[] = [];
  constructor(
    private db: DatabaseSync,
    private sql: string,
  ) {}
  bind(...args: unknown[]) {
    this.args = args.map((a) => (a === undefined ? null : a));
    return this;
  }
  async all<T>() {
    return { results: this.db.prepare(this.sql).all(...(this.args as never[])) as T[] };
  }
  async run() {
    const r = this.db.prepare(this.sql).run(...(this.args as never[]));
    return { meta: { changes: r.changes, last_row_id: Number(r.lastInsertRowid) } };
  }
}
class D1 {
  constructor(public db: DatabaseSync) {}
  prepare(sql: string) {
    return new Stmt(this.db, sql);
  }
}

let db: DatabaseSync;
let DB: D1;

beforeEach(() => {
  db = new DatabaseSync(":memory:");
  db.exec(SCHEMA);
  DB = new D1(db);
});

interface CtxOpts {
  url?: string;
  method?: string;
  body?: unknown;
  env?: Record<string, unknown>;
  data?: Record<string, unknown>;
  next?: () => Promise<Response>;
  headers?: Record<string, string>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ctx(opts: CtxOpts): any {
  const {
    url = "https://x.org/api",
    method = "GET",
    body,
    env = { DB },
    data = { userEmail: "reviewer@example.org" },
    next,
    headers,
  } = opts;
  const init: RequestInit = { method };
  if (body !== undefined) {
    init.body = JSON.stringify(body);
    init.headers = { "content-type": "application/json", ...headers };
  } else if (headers) {
    init.headers = headers;
  }
  return { request: new Request(url, init), env, data, next, params: {} };
}

// Handlers return generic JSON Responses; tests assert on dynamic
// shapes, so parsed bodies are read as `any`. Routing every `.json()`
// through this one helper keeps that the sole `any` boundary.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function readJson(res: Response): Promise<any> {
  return res.json();
}

describe("/api/verifications", () => {
  it("upserts, lists, overwrites (single-check), and deletes", async () => {
    const post = await verPost(
      ctx({ method: "POST", body: { usps: "CA", datapoint_id: "elPercent", content_hash: "h1" } }),
    );
    expect(post.status).toBe(200);

    let list = await readJson(await verGet(ctx({ url: "https://x.org/api?usps=CA" })));
    expect(list.verifications).toHaveLength(1);
    expect(list.verifications[0]).toMatchObject({
      datapoint_id: "elPercent",
      verified_by: "reviewer@example.org",
      content_hash: "h1",
    });

    // Single check suffices: a second reviewer/hash overwrites the one row.
    await verPost(
      ctx({
        method: "POST",
        body: { usps: "CA", datapoint_id: "elPercent", content_hash: "h2" },
        data: { userEmail: "other@example.org" },
      }),
    );
    list = await readJson(await verGet(ctx({ url: "https://x.org/api?usps=CA" })));
    expect(list.verifications).toHaveLength(1);
    expect(list.verifications[0]).toMatchObject({ verified_by: "other@example.org", content_hash: "h2" });

    const del = await verDel(ctx({ method: "DELETE", body: { usps: "CA", datapoint_id: "elPercent" } }));
    expect(del.status).toBe(200);
    list = await readJson(await verGet(ctx({ url: "https://x.org/api?usps=CA" })));
    expect(list.verifications).toHaveLength(0);
  });

  it("rejects an unknown datapoint id and a missing usps", async () => {
    expect(
      (await verPost(ctx({ method: "POST", body: { usps: "CA", datapoint_id: "bogus", content_hash: "h" } }))).status,
    ).toBe(400);
    expect((await verGet(ctx({ url: "https://x.org/api" }))).status).toBe(400);
  });
});

describe("/api/suggestions", () => {
  it("stores a suggestion and lists it by state and site-wide", async () => {
    const post = await sugPost(
      ctx({ method: "POST", body: { usps: "TX", datapoint_id: "sources", body: "Source 2 link is outdated." } }),
    );
    expect(post.status).toBe(200);

    const byState = await readJson(await sugGet(ctx({ url: "https://x.org/api?usps=TX&status=open" })));
    expect(byState.suggestions).toHaveLength(1);
    expect(byState.suggestions[0]).toMatchObject({ usps: "TX", datapoint_id: "sources", status: "open" });

    const siteWide = await readJson(await sugGet(ctx({ url: "https://x.org/api?status=open" })));
    expect(siteWide.suggestions).toHaveLength(1);
  });

  it("rejects an empty body", async () => {
    expect(
      (await sugPost(ctx({ method: "POST", body: { usps: "TX", datapoint_id: "sources", body: "   " } }))).status,
    ).toBe(400);
  });

  it("resolves and reopens a suggestion", async () => {
    const created = await readJson(
      await sugPost(ctx({ method: "POST", body: { usps: "TX", datapoint_id: "sources", body: "fix it" } })),
    );
    const resolve = await sugPatch(ctx({ method: "PATCH", body: { id: created.id, status: "resolved" } }));
    expect(resolve.status).toBe(200);
    expect((await readJson(await sugGet(ctx({ url: "https://x.org/api?status=open" })))).suggestions).toHaveLength(0);
    const resolved = (await readJson(await sugGet(ctx({ url: "https://x.org/api?status=resolved" })))).suggestions;
    expect(resolved).toHaveLength(1);
    expect(resolved[0]).toMatchObject({ status: "resolved", resolved_by: "reviewer@example.org" });
    // reopen
    await sugPatch(ctx({ method: "PATCH", body: { id: created.id, status: "open" } }));
    expect((await readJson(await sugGet(ctx({ url: "https://x.org/api?status=open" })))).suggestions).toHaveLength(1);
  });

  it("orders open suggestions oldest → newest", async () => {
    await sugPost(ctx({ method: "POST", body: { usps: "NV", datapoint_id: "sources", body: "first" } }));
    await sugPost(ctx({ method: "POST", body: { usps: "NV", datapoint_id: "sources", body: "second" } }));
    const list = (await readJson(await sugGet(ctx({ url: "https://x.org/api?usps=NV&status=open" })))).suggestions;
    expect(list.map((s: { body: string }) => s.body)).toEqual(["first", "second"]);
  });

  it("404s an unknown id and 400s a bad status", async () => {
    expect((await sugPatch(ctx({ method: "PATCH", body: { id: 99999, status: "resolved" } }))).status).toBe(404);
    expect((await sugPatch(ctx({ method: "PATCH", body: { id: 1, status: "nope" } }))).status).toBe(400);
  });
});

describe("/api/added-sources", () => {
  it("fetches the title server-side, stores the source, and selects it", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("<title>AZ Bilingual Endorsement — ADE</title>", { status: 200 })),
    );
    try {
      const post = await asPost(
        ctx({
          method: "POST",
          body: { usps: "AZ", datapoint_id: "credentials.bilingual.standalone", url: "https://www.azed.gov/x" },
        }),
      );
      expect(post.status).toBe(200);
      expect(await post.json()).toMatchObject({
        url: "https://www.azed.gov/x",
        title: "AZ Bilingual Endorsement — ADE",
      });

      const added = (await readJson(await asGet(ctx({ url: "https://x.org/api?usps=AZ" })))).sources;
      expect(added).toEqual([
        expect.objectContaining({
          datapoint_id: "credentials.bilingual.standalone",
          url: "https://www.azed.gov/x",
          title: "AZ Bilingual Endorsement — ADE",
          added_by: "reviewer@example.org",
        }),
      ]);

      // It also becomes the datapoint's selected (unconfirmed) source.
      const sel = (await readJson(await dsGet(ctx({ url: "https://x.org/api?usps=AZ" })))).sources;
      expect(sel[0]).toMatchObject({ datapoint_id: "credentials.bilingual.standalone", url: "https://www.azed.gov/x" });
    } finally {
      vi.unstubAllGlobals();
    }
  });

  it("falls back to the hostname when the page can't be fetched", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("blocked", { status: 403 })),
    );
    try {
      const post = await asPost(
        ctx({ method: "POST", body: { usps: "AZ", datapoint_id: "elPercent", url: "https://blocked.example/p" } }),
      );
      expect((await readJson(post)).title).toBe("blocked.example");
    } finally {
      vi.unstubAllGlobals();
    }
  });

  it("rejects inputs that are not real web addresses", async () => {
    for (const url of ["ftp://x.com", "dsfsda", "https://dsfsda", "not a url", "192.168.1.1", ""]) {
      const res = await asPost(ctx({ method: "POST", body: { usps: "AZ", datapoint_id: "elPercent", url } }));
      expect(res.status, `${JSON.stringify(url)} should be rejected`).toBe(400);
    }
  });

  it("normalizes a scheme-less bare domain server-side", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("<title>ADE</title>", { status: 200 })),
    );
    try {
      const res = await asPost(
        ctx({ method: "POST", body: { usps: "AZ", datapoint_id: "elPercent", url: "www.azed.gov" } }),
      );
      expect(res.status).toBe(200);
      expect((await readJson(res)).url).toBe("https://www.azed.gov/");
    } finally {
      vi.unstubAllGlobals();
    }
  });
});

describe("/api/overview", () => {
  it("aggregates verified and broken counts per state", async () => {
    await verPost(ctx({ method: "POST", body: { usps: "CA", datapoint_id: "elPercent", content_hash: "h" } }));
    await verPost(ctx({ method: "POST", body: { usps: "CA", datapoint_id: "sources", content_hash: "h" } }));
    db.prepare(
      `INSERT INTO broken_links (usps, datapoint_id, url, citation, classification, detected_at) VALUES ('CA','sources','https://x','CA / sources[0]','client-error','2026-06-16')`,
    ).run();

    const ov = await readJson(await ovGet(ctx({})));
    expect(ov.totalDatapoints).toBe(32);
    const ca = ov.perState.find((r: { usps: string }) => r.usps === "CA");
    // elPercent + sources verified, but sources has a broken link, so it
    // is excluded from the count → 1 verified, 1 broken.
    expect(ca).toMatchObject({ verifiedCount: 1, brokenCount: 1 });
  });
});

describe("/api/broken-links", () => {
  it("lists broken links by state and site-wide", async () => {
    db.prepare(
      `INSERT INTO broken_links (usps, datapoint_id, url, citation, status, classification, detected_at) VALUES ('NV','history','https://x','NV / history[0].sourceUrls[0]','404','client-error','2026-06-16')`,
    ).run();
    const byState = await readJson(await brkGet(ctx({ url: "https://x.org/api?usps=NV" })));
    expect(byState.brokenLinks).toHaveLength(1);
    expect(byState.brokenLinks[0]).toMatchObject({ usps: "NV", datapoint_id: "history", status: "404" });

    const all = await readJson(await brkGet(ctx({})));
    expect(all.brokenLinks).toHaveLength(1);
  });
});

describe("/api/link-reviews", () => {
  beforeEach(() => {
    db.prepare(
      `INSERT INTO link_reviews (url, status, classification, citations, first_seen, last_seen) VALUES ('https://azed.gov','403','needs-review','["AZ / sources[0]"]','2026-06-16','2026-06-16')`,
    ).run();
  });

  it("lists rows with parsed citations", async () => {
    const list = await readJson(await lrGet(ctx({})));
    expect(list.reviews).toHaveLength(1);
    expect(list.reviews[0].citations).toEqual(["AZ / sources[0]"]);
    expect(list.reviews[0].decision).toBe("pending");
  });

  it("accepts and reverts a URL", async () => {
    const accept = await lrPost(
      ctx({ method: "POST", body: { url: "https://azed.gov", decision: "accepted", note: "live in browser" } }),
    );
    expect(accept.status).toBe(200);
    let row = db
      .prepare(`SELECT decision, reviewed_by, note, accepted_status FROM link_reviews WHERE url = 'https://azed.gov'`)
      .get() as Record<string, unknown>;
    // accepted_status snapshots the observed status ('403') so a later
    // sweep can re-flag if the response code changes.
    expect(row).toMatchObject({
      decision: "accepted",
      reviewed_by: "reviewer@example.org",
      note: "live in browser",
      accepted_status: "403",
    });

    const revert = await lrPost(ctx({ method: "POST", body: { url: "https://azed.gov", decision: "pending" } }));
    expect(revert.status).toBe(200);
    row = db
      .prepare(`SELECT decision, reviewed_by, accepted_status FROM link_reviews WHERE url = 'https://azed.gov'`)
      .get() as Record<string, unknown>;
    expect(row).toMatchObject({ decision: "pending", reviewed_by: null, accepted_status: null });
  });

  it("404s for an unknown URL and 400s for a bad decision", async () => {
    expect((await lrPost(ctx({ method: "POST", body: { url: "https://nope", decision: "accepted" } }))).status).toBe(
      404,
    );
    expect((await lrPost(ctx({ method: "POST", body: { url: "https://azed.gov", decision: "maybe" } }))).status).toBe(
      400,
    );
  });
});

describe("/api/datapoint-sources", () => {
  it("sets, replaces (single source of truth), lists, and clears a datapoint's source", async () => {
    const dp = "credentials.bilingual.standalone";
    expect(
      (await dsPost(ctx({ method: "POST", body: { usps: "CA", datapoint_id: dp, url: "https://x/bil-1" } }))).status,
    ).toBe(200);

    let list = await readJson(await dsGet(ctx({ url: "https://x.org/api?usps=CA" })));
    expect(list.sources).toHaveLength(1);
    expect(list.sources[0]).toMatchObject({ datapoint_id: dp, url: "https://x/bil-1", set_by: "reviewer@example.org" });

    // Selecting a different source replaces the first — exactly one row remains.
    await dsPost(ctx({ method: "POST", body: { usps: "CA", datapoint_id: dp, url: "https://x/bil-2" } }));
    list = await readJson(await dsGet(ctx({ url: "https://x.org/api?usps=CA" })));
    expect(list.sources).toHaveLength(1);
    expect(list.sources[0].url).toBe("https://x/bil-2");

    // Clear by datapoint (no url needed).
    expect((await dsDel(ctx({ method: "DELETE", body: { usps: "CA", datapoint_id: dp } }))).status).toBe(200);
    list = await readJson(await dsGet(ctx({ url: "https://x.org/api?usps=CA" })));
    expect(list.sources).toHaveLength(0);
  });

  it("rejects an unknown datapoint id and a missing usps", async () => {
    expect(
      (await dsPost(ctx({ method: "POST", body: { usps: "CA", datapoint_id: "nope", url: "https://x" } }))).status,
    ).toBe(400);
    expect((await dsGet(ctx({ url: "https://x.org/api" }))).status).toBe(400);
  });
});

describe("/api/_middleware auth", () => {
  it("bypasses with DEV_REVIEWER_EMAIL and sets the user email", async () => {
    let nextCalled = false;
    const data: Record<string, unknown> = {};
    const res = await middleware(
      ctx({
        env: { DB, DEV_REVIEWER_EMAIL: "dev@example.org" },
        data,
        next: async () => {
          nextCalled = true;
          return new Response("ok");
        },
      }),
    );
    expect(nextCalled).toBe(true);
    expect(data.userEmail).toBe("dev@example.org");
    expect(await res.text()).toBe("ok");
  });

  it("returns 500 when auth is unconfigured", async () => {
    const res = await middleware(ctx({ env: { DB }, next: async () => new Response("ok") }));
    expect(res.status).toBe(500);
  });

  it("returns 401 when configured but no token is present", async () => {
    const res = await middleware(
      ctx({
        env: { DB, ACCESS_TEAM_DOMAIN: "team.cloudflareaccess.com", ACCESS_AUD: "aud123" },
        next: async () => new Response("ok"),
      }),
    );
    expect(res.status).toBe(401);
  });
});

describe("/audit/* page middleware", () => {
  const ACCESS = { ACCESS_TEAM_DOMAIN: "green-base.cloudflareaccess.com", ACCESS_AUD: "aud123" };
  const page = () => new Response("<html>console</html>", { headers: { "Content-Type": "text/html" } });

  it("refuses to render the console when Access is not configured", async () => {
    // Fail closed. Before this middleware existed the console HTML was a
    // plain static asset and this request returned the page to anyone.
    let nextCalled = false;
    const res = await pageMiddleware(
      ctx({
        url: "https://x.org/audit/ak",
        env: { DB },
        next: async () => {
          nextCalled = true;
          return page();
        },
      }),
    );
    expect(res.status).toBe(500);
    expect(nextCalled).toBe(false);
  });

  it("refuses an unauthenticated request when Access is configured", async () => {
    let nextCalled = false;
    const res = await pageMiddleware(
      ctx({
        url: "https://x.org/audit/ak",
        env: { DB, ...ACCESS },
        next: async () => {
          nextCalled = true;
          return page();
        },
      }),
    );
    expect(res.status).toBe(401);
    expect(nextCalled).toBe(false);
  });

  it("refuses a password, since the shared login was removed", async () => {
    // Every row the console writes records who made it. A credential
    // several people hold cannot answer that, so no Authorization header
    // authenticates any more.
    const res = await pageMiddleware(
      ctx({
        url: "https://x.org/audit/ak",
        env: { DB, ...ACCESS },
        headers: { Authorization: `Basic ${btoa("reviewer@example.org:s3cret")}` },
        next: async () => page(),
      }),
    );
    expect(res.status).toBe(401);
  });

  it("serves the console to an authenticated reviewer, marked non-indexable", async () => {
    // DEV_REVIEWER_EMAIL stands in for a verified Access assertion, which
    // cannot be minted in a unit test without the team's signing key.
    const data: Record<string, unknown> = {};
    const res = await pageMiddleware(
      ctx({
        url: "https://x.org/audit/ak",
        env: { DB, DEV_REVIEWER_EMAIL: "reviewer@example.org" },
        data,
        next: async () => page(),
      }),
    );
    expect(res.status).toBe(200);
    expect(await res.text()).toContain("console");
    expect(res.headers.get("X-Robots-Tag")).toBe("noindex, nofollow, noarchive");
    expect(res.headers.get("Cache-Control")).toBe("private, no-store");
    expect(data.userEmail).toBe("reviewer@example.org");
  });
});

describe("/api/* rejects a password", () => {
  it("does not authenticate an API call with Basic credentials", async () => {
    let nextCalled = false;
    const res = await middleware(
      ctx({
        env: { DB, ACCESS_TEAM_DOMAIN: "green-base.cloudflareaccess.com", ACCESS_AUD: "aud123" },
        headers: { Authorization: `Basic ${btoa("reviewer@example.org:s3cret")}` },
        next: async () => {
          nextCalled = true;
          return new Response("ok");
        },
      }),
    );
    expect(res.status).toBe(401);
    expect(nextCalled).toBe(false);
  });
});
