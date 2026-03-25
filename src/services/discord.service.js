import axios from "axios";
import { Env } from "../config/app.config.js";

export const sendDiscordAlert = async (name, email, message) => {
  if (!Env.DISCORD_WEBHOOK_URL) {
    console.warn("⚠️ [SYSTEM] Discord Webhook URL not found. Skipping alert.");
    return;
  }

  const discordPayload = {
    content: `🚨 **NEW PORTFOLIO LEAD** 🚨\n\n**Identifier:** ${name}\n**Return Address:** ${email}\n**Parameters:**\n> ${message}`,
  };

  try {
   
    await axios.post(Env.DISCORD_WEBHOOK_URL, discordPayload, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "User-Agent": "Siyaf-Portfolio-Agent/1.0" 
      }
    });
    
  } catch (error) {
    console.error(
      "[ALARM ERROR] Failed to ping Discord:", 
      error.response?.data || error.message
    );
  }
};