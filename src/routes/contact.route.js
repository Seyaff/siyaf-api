import { Router } from "express";
import { submitLead } from "../controllers/contact.controller.js";
import { contactLimiter } from "../config/rateLimiter.config.js";

const contactRoutes = Router();


contactRoutes.post("/", contactLimiter, submitLead);

export default contactRoutes;