import { faker } from "@faker-js/faker";

export default function signInBodyFactory() {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}
