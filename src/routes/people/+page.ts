import { db } from '$lib/db/kysely';
import type { PageLoad } from './$types';

export const load = (async () => {
  const persons = await db.selectFrom("person").selectAll().execute();

  return {
    persons
  };
}) satisfies PageLoad;