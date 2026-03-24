import rateLimit from "express-rate-limit";

export const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, 
  message: {
    success: false,
    error: {
      message: "Too many requests originating from this IP. Please try again in 15 minutes.",
    },
  },
  standardHeaders: true, 
  legacyHeaders: false, 
});