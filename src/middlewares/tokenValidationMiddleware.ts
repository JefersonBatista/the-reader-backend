import { NextFunction, Request, Response } from "express";

import authService from "../services/authService.js";
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
  const userId = authService.validateToken(token);
  res.locals.userId = userId;

  next();
}
