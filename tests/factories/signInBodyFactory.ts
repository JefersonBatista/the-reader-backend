import { faker } from "@faker-js/faker";

import { SignInData } from "../../src/services/authService";

export default function signInBodyFactory(): SignInData {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}
