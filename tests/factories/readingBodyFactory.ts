import { faker } from "@faker-js/faker";

import { CreateReadingData } from "../../src/repositories/readingRepository";

export default function readingBodyFactory(): CreateReadingData {
  return {
    title: faker.lorem.words(3),
    author: faker.name.firstName() + faker.name.lastName(),
    imageUrl: faker.internet.url(),
    numChapters: faker.datatype.number(),
    numPages: faker.datatype.number(),
  };
}
