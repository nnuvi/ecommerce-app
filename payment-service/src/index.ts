import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { uptime } from "process";

const app = new Hono();

app.get("/", (c) => {
  // return c.text("Hello Hono! from Payment Service.");
  return c.json({
    start: "ok",
    uptime:process.uptime(),
    timestamp: Date.now()
  })
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