import { Env } from "../config/app.config.js";

export const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || "Internal Server Error";

  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource not found. Invalid Identifier.";
  }

  if (err.code === 11000) {
    statusCode = 400;
    message = "Transmission rejected. This record already exists in the vault.";
  }

  // Zod is our real armor against NoSQL injection
  if (err.name === "ZodError") {
    statusCode = 400;
    message = err.errors.map((e) => e.message).join(" | ");
  }

  console.error(`🚨 [SYSTEM ERROR] ${message}`);

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