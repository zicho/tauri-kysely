import type { Selectable } from 'kysely'
import { db } from '../kysely'
import type { Database } from '../schema/schema'

export abstract class BaseRepository<Table extends keyof Database> {
  protected tableName: Table

  constructor(tableName: Table) {
    this.tableName = tableName
  }

  async findRecords(criteria: Partial<Selectable<Database[Table]>>): Promise<Selectable<Database[Table]>[]> {
    let query = db.selectFrom(this.tableName)

    // Loop over each key in the criteria object
    for (const [column, value] of Object.entries(criteria)) {
      if (value === null) {
        query = query.where(column as any, 'is', null)
      } else if (value !== undefined) {
        query = query.where(column as any, '=', value)
      }
    }

    // Cast the result to unknown first, then to the expected type
    return await query.selectAll().execute() as unknown as Selectable<Database[Table]>[]
  }
}
