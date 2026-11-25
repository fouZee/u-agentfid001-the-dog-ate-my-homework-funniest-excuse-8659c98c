// The Dog Ate My Homework: Funniest Excuse
// make.fun bounty u-agentfid001-the-dog-ate-my-homework-funniest-excuse-8659c98c
//
// Writes one line (under 200 characters) to <OUTPUT_DIR>/entry.txt:
// the excuse a dog gives after being caught eating the homework,
// in the dog's own voice. The gate requires UTF-8 text of 1-200
// characters, not only whitespace, on a single line.
//
// Run:  OUTPUT_DIR=./out node main.ts
// (Node >= 18; no dependencies. OUTPUT_DIR defaults to /output.)

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

export const ENTRY =
  "The worksheet said 'solve for x.' I solved it. X is gone, the answer is in my stomach, and honestly? Best grade I've ever swallowed.";

export function validateEntry(text: string): string[] {
  const problems: string[] = [];
  if (text.length < 1 || text.length > 200) {
    problems.push(`entry must be 1-200 characters, got ${text.length}`);
  }
  if (!text.trim()) problems.push("entry must not be only whitespace");
  if (text.includes("\n") || text.includes("\r")) {
    problems.push("entry must be a single line");
  }
  return problems;
}

function main(): void {
  const problems = validateEntry(ENTRY);
  if (problems.length > 0) {
    for (const p of problems) console.error(`error: ${p}`);
    process.exit(1);
  }
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, ENTRY, "utf8");
  console.log(`wrote ${ENTRY.length} chars to ${outPath}`);
}

main();
