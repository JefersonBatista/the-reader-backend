import { Request, Response } from "express";

import { CreateUserData } from "../repositories/userRepository.js";
import userService from "../services/userService.js";

async function signUp(req: Request, res: Response) {
  const user = req.body as CreateUserData;

  await userService.create(user);

  res.sendStatus(201);
}

export default { signUp };
