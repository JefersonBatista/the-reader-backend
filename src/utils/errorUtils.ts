export type AppErrorType = "conflict" | "not_found" | "unauthorized";

interface AppError {
  type: AppErrorType;
  message: string;
}

export function conflictError(message: string): AppError {
  return {
    type: "conflict",
    message,
  };
}

export function notFoundError(message: string): AppError {
  return {
    type: "not_found",
    message,
  };
}

export function unauthorizedError(message: string): AppError {
  return {
    type: "unauthorized",
    message,
  };
}

export function getErrorHttpStatus(type: AppErrorType) {
  switch (type) {
    case "unauthorized":
      return 401;
    case "not_found":
      return 404;
    case "conflict":
      return 409;
    default:
      return 500;
  }
}
