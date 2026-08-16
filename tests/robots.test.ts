import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { agentsAllowedToCrawl, parseRobotsGroups } from "../src/lib/robots";

const ROBOTS = readFileSync(resolve(__dirname, "../public/robots.txt"), "utf8");

describe("parseRobotsGroups", () => {
  it("groups consecutive User-agent lines with the rules that follow", () => {
    const groups = parseRobotsGroups(
      ["User-agent: A", "User-agent: B", "Disallow: /x/", "", "User-agent: C", "Allow: /"].join("\n"),
    );
    expect(groups).toEqual([
      { agents: ["A", "B"], disallow: ["/x/"], allow: [] },
      { agents: ["C"], disallow: [], allow: ["/"] },
    ]);
  });

  it("ignores comments and blank lines", () => {
    const groups = parseRobotsGroups("# lead comment\nUser-agent: A  # trailing\n\nDisallow: /x/\n");
    expect(groups).toEqual([{ agents: ["A"], disallow: ["/x/"], allow: [] }]);
  });
});

describe("agentsAllowedToCrawl", () => {
  it("names the groups that fail to disallow a path", () => {
    const text = "User-agent: *\nDisallow: /audit/\n\nUser-agent: GPTBot\nAllow: /\n";
    // The exact footgun this guards: a named group ignores `User-agent: *`
    // entirely, so the wildcard disallow does not bind GPTBot.
    expect(agentsAllowedToCrawl(text, "/audit/")).toEqual(["GPTBot"]);
  });

  it("treats an empty Disallow value as allowing everything", () => {
    expect(agentsAllowedToCrawl("User-agent: *\nDisallow:\n", "/audit/")).toEqual(["*"]);
  });
});

describe("public/robots.txt", () => {
  it("disallows the gated console in every group", () => {
    expect(agentsAllowedToCrawl(ROBOTS, "/audit/")).toEqual([]);
  });

  it("still allows the public site", () => {
    expect(agentsAllowedToCrawl(ROBOTS, "/states/ut/").length).toBeGreaterThan(0);
  });
});
