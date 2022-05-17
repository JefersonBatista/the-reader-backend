import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { unauthorizedError } from "../utils/errorUtils.js";

export default function validateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization?.startsWith("Bearer ")) {
    throw unauthorizedError("Token de autenticação inválido");
  }

  const token = authorization?.replace("Bearer ", "");

  const jwtSecret = process.env.JWT_SECRET;
  try {
    const { userId } = jwt.verify(token, jwtSecret) as { userId: number };

    res.locals.userId = userId;
  } catch {
    throw unauthorizedError("Token de autenticação inválido");
  }

  next();
}
