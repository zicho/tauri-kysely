
import { sql } from 'kysely'
import { db } from '../kysely'
import type { Person, NewPerson, PersonUpdate } from '../schema/schema'


export async function findPersonById(id: number) {
  return await db.selectFrom('person')
    .where('id', '=', id)
    .selectAll()
    .executeTakeFirst()
}

export async function findPeople(criteria: Partial<Person>) {
  let query = db.selectFrom('person')

  if (criteria.id) {
    query = query.where('id', '=', criteria.id) // Kysely is immutable, you must re-assign!
  }

  if (criteria.first_name) {
    query = query.where('first_name', '=', criteria.first_name)
  }

  if (criteria.last_name !== undefined) {
    query = query.where(
      'last_name',
      criteria.last_name === null ? 'is' : '=',
      criteria.last_name
    )
  }

  if (criteria.gender) {
    query = query.where('gender', '=', criteria.gender)
  }

  if (criteria.created_at) {
    query = query.where('created_at', '=', criteria.created_at)
  }

  return await query.selectAll().execute()
}

// Define a function to create the table if it doesn't exist
async function ensurePersonTableExists() {
  await db.schema
    .createTable('person')
    .ifNotExists()
    .addColumn('id', 'integer', col => col.primaryKey().autoIncrement())
    .addColumn('first_name', 'text', col => col.notNull())
    .addColumn('last_name', 'text') // Nullable by default
    .addColumn('gender', 'text', col => col.notNull().check(sql`gender IN ('man', 'woman', 'other')`))
    .addColumn('created_at', 'timestamp', col => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
    .addColumn('metadata', 'json') // JSON storage, typically text in SQLite, JSONB in PostgreSQL
    .execute()
}

export async function updatePerson(id: number, updateWith: PersonUpdate) {
  await db.updateTable('person').set(updateWith).where('id', '=', id).execute()
}

export async function createPerson(person: NewPerson) {

  await ensurePersonTableExists()

  return await db.insertInto('person')
    .values(person)
    .returningAll()
    .executeTakeFirstOrThrow()
}

export async function deletePerson(id: number) {
  return await db.deleteFrom('person').where('id', '=', id)
    .returningAll()
    .executeTakeFirst()
}