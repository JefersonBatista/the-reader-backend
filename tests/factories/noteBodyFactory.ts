import { faker } from "@faker-js/faker";

import { CreateNoteData } from "../../src/repositories/noteRepository";

export default function noteBodyFactory(): CreateNoteData {
  return {
    chapter: faker.datatype.number(),
    page: faker.datatype.number(),
    placeInText: faker.lorem.words(2),
    content: faker.lorem.words(10),
  };
}
