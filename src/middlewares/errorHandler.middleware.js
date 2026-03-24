import { Env } from "../config/app.config.js";

export const errorHandler = (err, req, res, next) => {
  if (err.name === "ZodError") {
    statusCode = 400;
    message = err.errors.map((e) => e.message).join(" | ");
    err.stack = null;
  }
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || "Internal Server Error";

  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource not found. Invalid Identifier.";
  }

  if (err.code === 11000) {
    statusCode = 400;
    message = "Duplicate field value entered. This record already exists.";
    err.stack = null;
  }

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
  }

  console.error(`🚨 [ERROR] ${message}`);

  res.status(statusCode).json({
    success: false,
    error: {
      message: message,
      stack: Env.NODE_ENV === "production" ? "🥞" : err.stack,
    },
  });
};

export const notFound = (req, res, next) => {
  const error = new Error(`Route Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};
