import "dotenv/config.js";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import dns from "dns"

import { Env } from "./config/app.config.js";
import { connectDatabase } from "./config/database.config.js";
import { notFound, errorHandler } from "./middlewares/errorHandler.middleware.js";
import contactRoutes from "./routes/contact.route.js";

dns.setServers(["1.1.1.1", "8.8.8.8"])

const app = express();
const BASE_PATH = `${Env.BASE_PATH}`;

if (Env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(helmet());

app.use(
  cors({
    origin: [Env.FRONTEND.ORIGIN, "https://siyaf-engineering.vercel.app"],
    credentials: true,
  })
);


app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));


app.use(`${BASE_PATH}/contact`, contactRoutes);


app.use(notFound);
app.use(errorHandler);

app.listen(Env.PORT, async () => {
  console.log(`🚀 Server locked and running on port ${Env.PORT}`);
  await connectDatabase();
});