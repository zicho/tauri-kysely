import { db } from "$lib/db/kysely";

// Proceed with running the migrations
console.log("starting")
const modules = import.meta.glob('./lib/db/migrations/*.ts', { eager: true });
const entries = Object.entries(modules);

// Sort entries based on the filenames
entries.sort(([pathA], [pathB]) => pathA.localeCompare(pathB));

console.dir(entries)

// Execute the `up` functions in order
for (const [path, module] of entries) {
  if (module.up) {
    await module.up(db);
  }
}

