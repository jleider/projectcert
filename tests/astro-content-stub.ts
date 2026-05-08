// Test-only stub for `astro:content` so the Zod schema in
// src/content.config.ts can be imported by Vitest without the
// Astro build pipeline.

export { z } from "zod";

export function defineCollection<T>(config: T): T {
  return config;
}
