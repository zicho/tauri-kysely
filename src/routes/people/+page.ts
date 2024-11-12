import { PersonRepository } from '$lib/db/repos/PersonRepository';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { ListPeopleViewModelMapper, TableRowModelMapper } from '$lib/viewmodels/ListPeopleViewModel';

export const load = (async () => {

  const getPersons = await new PersonRepository().getAll();

  if (!getPersons.success) {
    error(500);
  }

  return {
    persons: TableRowModelMapper.map(getPersons.result!)
  }
}) satisfies PageLoad;