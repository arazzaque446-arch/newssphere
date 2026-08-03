const fs = require("fs");
const path = require("path");

const IGNORE = new Set([
  "node_modules",
  ".next",
  ".git",
  ".vercel",
]);

function walk(dir, level = "") {
  const items = fs.readdirSync(dir, { withFileTypes: true });

  items
    .filter(item => !IGNORE.has(item.name))
    .sort((a, b) => a.name.localeCompare(b.name));

  for (const item of items) {
    if (IGNORE.has(item.name)) continue;

    console.log(level + item.name);

    if (item.isDirectory()) {
      walk(path.join(dir, item.name), level + "  ");
    }
  }
}

console.log("========== NEWSSPHERE PROJECT ==========\n");

walk(process.cwd());

console.log("\n========== END ==========");