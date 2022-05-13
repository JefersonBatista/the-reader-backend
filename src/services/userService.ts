import bcrypt from "bcrypt";

import userRepository, {
  CreateUserData,
} from "../repositories/userRepository.js";
import { conflictError } from "../utils/errorUtils.js";

async function create(data: CreateUserData) {
  const { email, password } = data;

  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) {
    throw conflictError("Já há um usuário cadastrado com esse email");
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  data.password = hashedPassword;

  await userRepository.insert(data);
}

export default { create };
