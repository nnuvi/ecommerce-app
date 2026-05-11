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
import { runKafkaSubscriptions } from "./libs/subscriptions.js";
import { consumer, producer } from "./libs/kafka.js";

dotenv.config();

const app = new Hono();

app.use(
  "*",
  cors({
    origin: ["http://localhost:3000", "http://localhost:3003"],
    allowMethods: ['POST', 'GET', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
    exposeHeaders: ['Content-Length'],
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
    Promise.all([await producer.connect(), await consumer.connect()]);
    await runKafkaSubscriptions();
    serve(
      {
        fetch: app.fetch,
        port: 8080,
      },
      (info) => {
        console.log(
          `Payment Service is running on http://localhost:${info.port}`,
        );
      },
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
