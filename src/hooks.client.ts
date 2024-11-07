import { db } from '$lib/db/kysely';
import { CustomMigrationProvider } from '$lib/db/CustomMigrationProvider';
import { Migrator } from 'kysely';

const migrator = new Migrator({
  db,
  provider: new CustomMigrationProvider(),
});

const { error, results } = await migrator.migrateToLatest();

if (error) {
  console.error('Migration failed:', error);
  // Handle the error as needed
} else {
  console.log('Migrations applied successfully:', results);
}