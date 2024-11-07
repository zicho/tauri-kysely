import { Kysely, sql } from 'kysely';

type CustomMigration = {
  name: string;
  up: (db: Kysely<any>) => Promise<void>;
  down: (db: Kysely<any>) => Promise<void>;
}

const migration: CustomMigration = {
  name: "20241107_initial",
  up: async (db) => {
    await db.schema
      .createTable('person')
      .addColumn('id', 'integer', (col) => col.primaryKey().autoIncrement())
      .addColumn('first_name', 'varchar', (col) => col.notNull())
      .addColumn('last_name', 'varchar')
      .addColumn('gender', 'varchar(50)', (col) => col.notNull())
      .addColumn('created_at', 'datetime', (col) =>
        col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
      )
      .execute();

    await db.schema
      .createTable('pet')
      .addColumn('id', 'integer', (col) => col.primaryKey().autoIncrement())
      .addColumn('name', 'varchar', (col) => col.notNull().unique())
      .addColumn('owner_id', 'integer', (col) =>
        col.references('person.id').onDelete('cascade').notNull(),
      )
      .addColumn('species', 'varchar', (col) => col.notNull())
      .execute();

    await db.schema
      .createIndex('pet_owner_id_index')
      .on('pet')
      .column('owner_id')
      .execute();
  },
  down: async (db) => {
    await db.schema.dropTable('pet').execute();
    await db.schema.dropTable('person').execute();
  },
}

export default migration;