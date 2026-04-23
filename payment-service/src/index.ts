import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { uptime } from "process";
import { clerkMiddleware, getAuth } from '@hono/clerk-auth'
import dotenv from "dotenv";
import { shouldBeUser } from "./middleware/authMiddleware.js";

dotenv.config();

const app = new Hono();

app.use(
  "*",
  clerkMiddleware({
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY!,
    secretKey: process.env.CLERK_SECRET_KEY!,
  })
);

app.get("/", (c) => {
  // return c.text("Hello Hono! from Payment Service.");
  return c.json({
    start: "ok",
    uptime:process.uptime(),
    timestamp: Date.now()
  })
});

app.get("/health", shouldBeUser, (c) => {
  return c.json({
    message: "OK. Payment-service authenticated.",
    userId: c.get("userId"),
  });
});

const start = async () => {
  try {
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