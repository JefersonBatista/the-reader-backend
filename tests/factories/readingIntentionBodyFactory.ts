import { faker } from "@faker-js/faker";

import { CreateReadingIntentionData } from "../../src/repositories/readingIntentionRepository";

export default function readingIntentionBodyFactory(): CreateReadingIntentionData {
  return {
    title: faker.lorem.words(3),
    author: `${faker.name.firstName()} ${faker.name.lastName()}`,
    imageUrl: faker.internet.url(),
  };
}
