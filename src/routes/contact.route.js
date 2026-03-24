import { Router } from "express";
import mongoSanitize from "express-mongo-sanitize"
import { submitLead } from "../controllers/contact.controller.js";
import { contactLimiter } from "../config/rateLimiter.config.js";

const contactRoutes = Router();


contactRoutes.post("/", mongoSanitize(), contactLimiter, submitLead);

export default contactRoutes;