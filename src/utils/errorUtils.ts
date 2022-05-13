export type AppErrorType = "conflict";

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

export function getErrorStatus(type: AppErrorType) {
  switch (type) {
    case "conflict":
      return 409;
    default:
      return 500;
  }
}
