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

  // 🚀 BULLETPROOF ZOD HANDLER: Added optional chaining (?.) and an Array check
  if (err.name === "ZodError" && Array.isArray(err.errors)) {
    statusCode = 400;
    message = err.errors.map((e) => e.message).join(" | ");
  }

  // Catch Cloudflare/Discord Axios errors gracefully
  if (err.response && err.response.status === 403) {
    statusCode = 502;
    message = "External transmission blocked by security firewall (Cloudflare).";
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