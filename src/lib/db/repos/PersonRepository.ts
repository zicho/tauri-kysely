import type { NewPerson, Person } from '../schema/schema';
import { BaseRepository } from './BaseRepository';

export class PersonRepository extends BaseRepository<Person, NewPerson> {
  constructor() {
    super('person'); // Pass the "person" table name to the parent constructor
  }
}