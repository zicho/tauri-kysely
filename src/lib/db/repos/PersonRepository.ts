
import type { UpdateResult } from 'kysely';
import { db } from '../kysely'
import type { NewPerson, Person, PersonUpdate } from '../schema/schema'
import { failedOperation, successfulOperation, type TDbOperation } from '../TDbOperation';
import { findRecords } from './baseRepositoryUtils';

export class PersonRepository {
  static async findRecords(criteria: Partial<Person>): Promise<TDbOperation<Person[]>> {
    try {
      const results = await findRecords<"person">(criteria, "person")
      return successfulOperation({ data: results })
    } catch {
      return failedOperation();
    }
  }

  static async getById({ id }: { id: number }): Promise<TDbOperation<Person>> {
    try {
      var person = await db.selectFrom('person')
        .where('id', '=', id)
        .selectAll()
        .executeTakeFirst();

      if (person)
        return successfulOperation<Person>({ data: person })
      else return failedOperation({ message: `Could not find person with id ${id}` })
    } catch (err) {
      return failedOperation()
    }
  }

  static async getAll(): Promise<TDbOperation<Person[]>> {
    try {
      var persons = await db.selectFrom('person')
        .selectAll()
        .execute();

      return successfulOperation({ data: persons })
    } catch (err) {
      return failedOperation()
    }
  }

  static async create({ person }: { person: NewPerson }): Promise<TDbOperation<Person>> {
    try {
      const result = await db.insertInto('person')
        .values(person)
        .returningAll()
        .executeTakeFirstOrThrow()

      return successfulOperation({ data: result })
    } catch (err) {
      return failedOperation()
    }
  }

  static async update({ id, data }: { id: number, data: PersonUpdate }): Promise<TDbOperation<UpdateResult[]>> {
    try {
      var result = await db.updateTable('person').set(data).where('id', '=', id).execute()
      return successfulOperation({ data: result });
    } catch (error) {
      return failedOperation();
    }
  }

  static async delete({ id }: { id: number }): Promise<TDbOperation<Person>> {
    try {
      var result = await db.deleteFrom('person').where('id', '=', id)
        .returningAll()
        .executeTakeFirst()

      if (result) {
        return successfulOperation({ data: result })
      } else {
        return failedOperation({ message: `Could not delete user with id ${id}` })
      }
    } catch {
      return failedOperation();
    }

  }
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
    query = query.where('gender', '==', criteria.gender)
  }

  if (criteria.created_at) {
    query = query.where('created_at', '=', criteria.created_at)
  }

  return await query.selectAll().execute()
}

export async function getAll() {
  const persons = await db.selectFrom("person").selectAll().execute();

  return persons;
}

export async function updatePerson(id: number, updateWith: PersonUpdate) {
  await db.updateTable('person').set(updateWith).where('id', '=', id).execute()
}

export async function createPerson(person: NewPerson) {
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