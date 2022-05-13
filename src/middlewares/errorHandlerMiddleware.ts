import { NextFunction, Request, Response } from "express";

import { AppErrorType, getErrorStatus } from "../utils/errorUtils.js";

interface Error {
  type?: AppErrorType;
  message?: string;
}

export default function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const defaultErrorStatus = 500;
  const defaultErrorMsg = "Houve um erro interno no servidor";

  if ("type" in error) {
    const errorStatus = getErrorStatus(error.type);
    const errorMsg = error.message || defaultErrorMsg;

    res.status(errorStatus).send(errorMsg);
  } else {
    res.status(defaultErrorStatus).send(defaultErrorMsg);
  }
}
