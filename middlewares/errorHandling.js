import {
  AppError,
  BadRequestError,
  NotFoundError,
  AuthError,
  DbError,
  InternalServerError,
  UnacceptableError,
} from "./appError.js";

const handleErrors = (err, req, res, next) => {
  if (err instanceof AppError) {
    const errorResponse = {
      status: err.status,
      message: err.message,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    };

    return res.status(err.statusCode).json({
      code: err.statusCode,
      status: errorResponse.status,
      error: errorResponse,
      data: [],
    });
  }

  // Handle unknown errors that aren't instances of AppError
  console.error("Unhandled Error:", err);
  return res.status(500).json({
    code: 500,
    status: "error",
    error: {
      message: "Internal Server Error",
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    },
    data: [],
  });
};

export default handleErrors;
