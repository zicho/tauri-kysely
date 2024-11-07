import { defineConfig } from "kysely-ctl";
import { db } from '../src/lib/db/kysely'

export default defineConfig({
  // ...
  kysely: db,
  migrations: {
    migrationFolder: "src/lib/db/migrations"
  }
  // ...
});