import type { Person } from "$lib/db/schema/schema";

type ListPeopleViewModel = Person & { selected: boolean };

export class ListPeopleViewModelMapper {
  static map(data: Person[]): ListPeopleViewModel[] {
    return data.map(person => ({
      ...person,
      selected: false
    }));
  }
}
