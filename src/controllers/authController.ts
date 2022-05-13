import { Request, Response } from "express";

import authService, { SignInData } from "../services/authService.js";

async function signIn(req: Request, res: Response) {
  const credentials = req.body as SignInData;

  const auth = await authService.signIn(credentials);

  res.status(200).send(auth);
}

export default { signIn };
