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

export type TableRowModel<T> = T & { selected: boolean };

export class TableRowModelMapper {
  static map<T>(data: T[]): TableRowModel<T>[] {
    return data.map(item => ({
      ...item,
      selected: false
    }));
  }
}
