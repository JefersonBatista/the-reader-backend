import { NextFunction, Request, Response } from "express";

import { AppErrorType, getErrorHttpStatus } from "../utils/errorUtils.js";

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
    const errorStatus = getErrorHttpStatus(error.type);
    const errorMsg = error.message || defaultErrorMsg;

    res.status(errorStatus).send(errorMsg);
  } else {
    console.log(error);
    res.status(defaultErrorStatus).send(defaultErrorMsg);
  }
}
