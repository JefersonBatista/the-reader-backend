import { faker } from "@faker-js/faker";

import { CreateUserData } from "../../src/repositories/userRepository";

export default function userBodyFactory(): CreateUserData {
  return {
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}
