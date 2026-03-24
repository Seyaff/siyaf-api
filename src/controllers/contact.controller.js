
import { HTTPSTATUS } from "../config/http.onfig.js";
import { asyncHandler } from "../middlewares/asyncHandler.middleware.js";
import LeadModel from "../models/lead.model.js";
import { sendDiscordAlert } from "../services/discord.service.js";
import { contactSchema } from "../validators/contact.validator.js";

export const submitLead = asyncHandler(async (req, res) => {
  // 1. Validate Payload (Fails fast and throws to the global error handler if invalid)
  const { name, email, message } = contactSchema.parse(req.body);

  // 2. Write to the Vault (Using .create is slightly cleaner than new Model + .save)
  const newLead = await LeadModel.create({ name, email, message });
  
  // Log the exact identifier to the server console
  console.log(`[SYSTEM] New Lead Secured: ${newLead.name} (${newLead.email})`);

  // 3. Trigger the Discord Alarm (Fire & Forget, no await needed)
  sendDiscordAlert(name, email, message);

  // 4. Send a Professional Agency Response
  return res.status(HTTPSTATUS.OK).json({
    success: true,
    message: "Transmission secured. Our team has been notified.",
    data: {
      leadId: newLead._id,
      receivedAt: newLead.receivedAt
    }
  });
});