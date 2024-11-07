import { type Migration } from "kysely";
import initial from "./migrations/20241107_initial";
// Import more migrations as needed

export const migrations: Record<string, Migration> = {
  [initial.name]: {
    up: initial.up,
    down: initial.down,
  },
  // Add more migrations using the same pattern
};
