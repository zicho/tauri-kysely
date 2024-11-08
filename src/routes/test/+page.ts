import { db } from '$lib/db/kysely';
import { PersonRepository } from '$lib/db/repos/personRepository';
import { PetRepository } from '$lib/db/repos/petRepository';
import type { PageLoad } from './$types';

export const load = (async () => {

  const persons = await new PersonRepository().findRecords({ first_name: 'Martin' });
  const pets = await new PetRepository().findRecords({ name: 'Martin' });

  const person = db.selectFrom("person").where("first_name", "=", "Robert");

  return {
    persons,
    pets
  };
}) satisfies PageLoad;