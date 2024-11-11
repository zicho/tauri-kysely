import { db } from '$lib/db/kysely';
import { CustomMigrationProvider } from '$lib/db/CustomMigrationProvider';
import { Migrator } from 'kysely';
import { PersonRepository } from '$lib/db/repos/PersonRepository';
import { createRandomPeople } from '$lib/db/utils';

const migrator = new Migrator({
  db,
  provider: new CustomMigrationProvider(),
});

const { error, results } = await migrator.migrateToLatest();

const peeps = await new PersonRepository().getAll();

if (peeps.result?.length === 0) { await createRandomPeople(25); }

if (error) {
  console.error('Migration failed:', error);
  // Handle the error as needed
} else {
  console.log('Migrations applied successfully:', results);
}