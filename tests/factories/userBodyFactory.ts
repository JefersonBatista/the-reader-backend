import { faker } from "@faker-js/faker";

export default function userBodyFactory() {
  return {
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}
