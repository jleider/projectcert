/**
 * Minimal robots.txt parsing, enough to assert the gated console is
 * disallowed everywhere it needs to be.
 *
 * The rule that makes this worth testing: a crawler obeys the **single**
 * group whose `User-agent` matches it most specifically, and ignores the
 * others — including `User-agent: *`. So `Disallow: /audit/` under the
 * wildcard alone leaves every named crawler in the file free to fetch the
 * console. Each group carries its own copy or the directive does not bind.
 */

export interface RobotsGroup {
  /** User-agent tokens sharing one set of rules (consecutive lines). */
  agents: string[];
  /** `Disallow:` values in this group. */
  disallow: string[];
  /** `Allow:` values in this group. */
  allow: string[];
}

/**
 * Split robots.txt into its User-agent groups. Consecutive `User-agent`
 * lines share the rules that follow them, per the original convention.
 */
export function parseRobotsGroups(text: string): RobotsGroup[] {
  const groups: RobotsGroup[] = [];
  let current: RobotsGroup | null = null;
  // Consecutive User-agent lines accumulate onto the same group; the first
  // rule line after them closes the agent list.
  let acceptingAgents = false;

  for (const raw of text.split(/\r?\n/)) {
    const line = raw.replace(/#.*$/, "").trim();
    if (line === "") continue;

    const sep = line.indexOf(":");
    if (sep === -1) continue;
    const field = line.slice(0, sep).trim().toLowerCase();
    const value = line.slice(sep + 1).trim();

    if (field === "user-agent") {
      if (!current || !acceptingAgents) {
        current = { agents: [], disallow: [], allow: [] };
        groups.push(current);
        acceptingAgents = true;
      }
      current.agents.push(value);
      continue;
    }

    if (field === "disallow" || field === "allow") {
      if (!current) continue; // A rule before any User-agent binds to nothing.
      acceptingAgents = false;
      if (field === "disallow") current.disallow.push(value);
      else current.allow.push(value);
    }
  }

  return groups;
}

/**
 * User-agent tokens whose group does not disallow `path`. Empty means every
 * group in the file blocks it.
 */
export function agentsAllowedToCrawl(text: string, path: string): string[] {
  return parseRobotsGroups(text)
    .filter((g) => !g.disallow.some((d) => d !== "" && path.startsWith(d)))
    .flatMap((g) => g.agents);
}
