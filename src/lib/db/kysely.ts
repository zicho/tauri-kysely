import { Kysely } from 'kysely'
import Database from '@tauri-apps/plugin-sql'
import { TauriSqliteDialect } from 'kysely-dialect-tauri'
import type { Database as DB } from './schema/schema'

export const db = new Kysely<DB>({
  dialect: new TauriSqliteDialect({
    database: Database.load(`sqlite:test.db`)
  }),
})

// not used: better-sqlite3 adapter

// import { Kysely, SqliteDialect } from 'kysely'
// import DatabaseSqlite from 'better-sqlite3'
// import type { Database as DB } from './schema/schema'

// // Use better-sqlite3 with SqliteDialect for Kysely
// export const db = new Kysely<DB>({
//   dialect: new SqliteDialect({
//     database: new DatabaseSqlite('test.db'), // specify your SQLite database file path
//   }),
// })
