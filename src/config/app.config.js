import { getEnv } from "../utils/getEnv.js";

const appConfig = () => ({
  NODE_ENV: getEnv("NODE_ENV", "development"),
  PORT: getEnv("PORT", "5000"),
  BASE_PATH: getEnv("BASE_PATH", "/api/v1"),
  MONGO_URI: getEnv("MONGO_URI", ""),

  DISCORD_WEBHOOK_URL : getEnv("DISCORD_WEBHOOK_URL"),

  FRONTEND: {
    ORIGIN: getEnv("FRONTEND_ORIGIN", "https://siyaf-engineering.vercel.app"),
  },
});

export const Env = appConfig();
