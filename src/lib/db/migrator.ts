import { Migrator, type Migration } from 'kysely';
import { db } from './kysely';

async function loadMigrations(): Promise<Record<string, Migration>> {
  const modules = import.meta.glob('./migrations/*.ts');
  const migrations: Record<string, Migration> = {};

  // Iterate over each module and dynamically import it
  for (const [path, resolver] of Object.entries(modules)) {
    const module = await resolver();

    // Extract the migration name from the file path
    const migrationName = path.split('/').pop()?.replace('.ts', '') || '';

    // Check if the module has 'up' function
    if (typeof module.up === 'function') {
      migrations[migrationName] = {
        up: module.up,
        down: module.down ?? (async () => {}),
      };
    } else {
      console.warn(`Migration file ${path} does not have an 'up' export.`);
    }
  }

  return migrations;
}

export async function runMigrations() {
  const migrator = new Migrator({
    db,
    provider: {
      getMigrations: loadMigrations, // Use the loadMigrations function
    },
  });

  // Run pending migrations
  const { error } = await migrator.migrateToLatest();
  if (error) {
    console.error('Migration error:', error);
    throw error;
  } else {
    console.log('Migrations ran successfully.');
  }
}
