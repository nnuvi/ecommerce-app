import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { uptime } from "process";
import "dotenv/config";
import { clerkMiddleware, getAuth } from "@clerk/hono";
import dotenv from "dotenv";
import { shouldBeUser } from "./middleware/authMiddleware.js";
import Stripe from "stripe";
import { cors } from "hono/cors";
import sessionRoute from "./routes/session.route.js";
import webhookRoute from "./routes/webhooks.route.js";
// import { runKafkaSubscriptions } from "./lib/subscriptions.js";
// import { consumer, producer } from "./lib/kafka.js";
import { logger } from "@packages/logger/server";

dotenv.config();

const app = new Hono();

app.use(
  "*",
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3003",
      "https://ecom-client-xi.vercel.app",
    ],
    allowMethods: ["POST", "GET", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);

app.use(
  "*",
  clerkMiddleware({
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY!,
    secretKey: process.env.CLERK_SECRET_KEY!,
  }),
);

app.get("/", (c) => {
  // return c.text("Hello Hono! from Payment Service.");
  return c.json({
    start: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

app.get("/health", shouldBeUser, (c) => {
  return c.json({
    message: "OK. Payment-service authenticated.",
    userId: c.get("userId"),
  });
});

app.route("/sessions", sessionRoute);
app.route("/webhooks", webhookRoute);

const start = async () => {
  try {
    if (process.env.NODE_ENV === "development") {
      // await Promise.all([producer.connect(), consumer.connect()]);
      // await runKafkaSubscriptions();
      logger.info({ message: "Starting Payment Service in development mode" });
    } else {
      logger.info({
        message: "Starting Payment Service in production mode...",
      });
    }
    serve(
      {
        fetch: app.fetch,
        port: 8080,
      },
      (info) => {
        logger.info(
          {
            port: info.port,
          },
          "Payment service is running",
        );
      },
    );
  } catch (error) {
    logger.error(
      {
        error,
      },
      "Failed to start Payment service",
    );
    process.exit(1);
  }
};

start();
