import { BaseRepository } from "./baseRepository";

export class PetRepository extends BaseRepository<'pet'> {
  constructor() {
    super('pet')
  }
}