import { Kysely } from 'kysely'
import Database from '@tauri-apps/plugin-sql'
import { TauriSqliteDialect } from 'kysely-dialect-tauri'
import type { Database as DB } from './schema/schema'

export const db = new Kysely<DB>({
  dialect: new TauriSqliteDialect({
    database: Database.load(`sqlite:test.db`)
  }),
})