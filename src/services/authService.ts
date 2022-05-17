import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import userRepository from "../repositories/userRepository.js";
import { notFoundError, unauthorizedError } from "../utils/errorUtils.js";

export interface SignInData {
  email: string;
  password: string;
}

async function signIn(data: SignInData) {
  const { email, password } = data;

  const user = await userRepository.findByEmail(email);
  if (!user) {
    throw notFoundError("Não há usuário cadastrado com esse email");
  }

  if (!bcrypt.compareSync(password, user.password)) {
    throw unauthorizedError("Senha incorreta");
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

  return { token, name: user.name };
}

function validateToken(token: string) {
  const jwtSecret = process.env.JWT_SECRET;
  try {
    const { userId } = jwt.verify(token, jwtSecret) as { userId: number };

    return userId;
  } catch {
    throw unauthorizedError("Token de autenticação inválido");
  }
}

export default { signIn, validateToken };
