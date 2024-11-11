import { PersonRepository } from "./repos/PersonRepository";
import type { PersonTable } from "./schema/schema";

export async function createRandomPeople(count: number) {
  const firstNames = [
    'Zorath', 'Krexis', 'Xylox', 'Jalax', 'Qylar', 'Varnok', 'Draxon', 'Virex', 'Katal', 'Shyra',
    'Zentha', 'Trivok', 'Fyren', 'Glathar', 'Zorak', 'Vrynn', 'Quonix', 'Shivra', 'Zhalor', 'Kroth',
    'Raekor', 'Exor', 'Qyren', 'Talonar', 'Nirak', 'Kantor'
  ];
  
  const lastNames = [
    'Kruun', 'Zhorath', 'Velk', 'Trixis', 'Valdar', 'Zyrex', 'Kronis', 'Jevath', 'Threx', 'Draxar',
    'Vylix', 'Zarron', 'Yllar', 'Quarnak', 'Rithar', 'Vezar', 'Xoloth', 'Tralan', 'Kynor', 'Quirak',
    'Garnok', 'Xenthos', 'Brithar', 'Zalnor', 'Krothos', 'Dravak'
  ];
  

  const genders = ['man', 'woman', 'other'];

  function getRandomElement(arr: string[]): string {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  }

  for (let i = 0; i < count; i++) {
    const firstName = getRandomElement(firstNames);
    const lastName = getRandomElement(lastNames);
    const gender = getRandomElement(genders);

    await new PersonRepository().create({
      data: {
        first_name: firstName,
        last_name: lastName,
        gender: gender as PersonTable["gender"]
      }
    });
  }
}
