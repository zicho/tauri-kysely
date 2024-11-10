import type { Insertable, Selectable, UpdateResult } from 'kysely';
import { db } from '../kysely';
import type { Database } from '../schema/schema';
import { failedOperation, successfulOperation, type TDbOperation } from '../TDbOperation';

export abstract class BaseRepository<TEntity, TNewEntity> {
    table: keyof Database;

    constructor(tableName: keyof Database) {
        this.table = tableName;
    }

    async findRecords(criteria: Partial<TEntity>): Promise<TDbOperation<TEntity[]>> {
        try {
            let query = db.selectFrom(this.table);
            // Loop over each key in the criteria object
            for (const [column, value] of Object.entries(criteria)) {
                if (value === null) {
                    query = query.where(column as any, 'is', null);
                } else if (value !== undefined) {
                    query = query.where(column as any, '=', value);
                }
            }
            // Cast the result to unknown first, then to the expected type
            const data = await query.selectAll().execute() as Selectable<Database[keyof Database]>[];

            return successfulOperation({ data: data as TEntity[] });
        } catch {
            return failedOperation();
        }
    }

    async getById({ id }: { id: number }): Promise<TDbOperation<TEntity>> {
        try {
            var data = await db.selectFrom(this.table)
                .where('id', '=', id)
                .selectAll()
                .executeTakeFirst();

            if (data)
                return successfulOperation<TEntity>({ data: data as TEntity });
            else return failedOperation({ message: `Could not find record with id '${id}' in table '${this.table}'` });
        } catch (err) {
            return failedOperation();
        }
    }

    async getAll(): Promise<TDbOperation<TEntity[]>> {
        try {
            var data = await db.selectFrom(this.table)
                .selectAll()
                .execute();

            return successfulOperation({ data: data as TEntity[] });
        } catch (err) {
            return failedOperation();
        }
    }

    async create({ data }: { data: TNewEntity }): Promise<TDbOperation<TEntity>> {
        try {
            const result = await db.insertInto(this.table)
                .values(data as Insertable<TNewEntity>)
                .returningAll()
                .executeTakeFirstOrThrow();

            return successfulOperation({ data: result as TEntity });
        } catch (err) {
            return failedOperation();
        }
    }

    async update({ id, data }: { id: number, data: Partial<TEntity> }): Promise<TDbOperation<UpdateResult[]>> {
        try {
            var result = await db.updateTable(this.table).set(data).where('id', '=', id).execute();
            return successfulOperation({ data: result });
        } catch (error) {
            return failedOperation();
        }
    }

    async delete({ id }: { id: number }): Promise<TDbOperation<TEntity>> {
        try {
            var result = await db.deleteFrom(this.table).where('id', '=', id)
                .returningAll()
                .executeTakeFirst();

            if (result) {
                return successfulOperation({ data: result as TEntity });
            } else {
                return failedOperation({ message: `Could not delete record with id '${id}' from table '${this.table}'` });
            }
        } catch {
            return failedOperation();
        }
    }
}
