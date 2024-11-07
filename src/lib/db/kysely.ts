import Database from '@tauri-apps/plugin-sql';
import { Kysely } from 'kysely';
import { TauriSqliteDialect } from 'kysely-dialect-tauri';
import type { Database as DB } from './schema/schema';

export const db = new Kysely<DB>({
  dialect: new TauriSqliteDialect({
    database: async () => {
      const db = await Database.load(`sqlite:local.db`);
      return db;
    },
  }),
});