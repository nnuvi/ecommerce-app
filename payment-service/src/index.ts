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

// app.get("/pay", shouldBeUser, async (c) => {
//   const { products } = await c.req.json();

//   const totalPrice = await Promise.all(
//     products.map(async (product: any) => {
//       const productInDB: any = await fetch(
//         `localhost:8080/product${product.id}`,
//       );
//       return productInDB.price * product.quantity;
//     }),
//   );

//   return c.json({
//     message: "Payment service is Authenticated!",
//     userId: c.get("userId"),
//   });
// });

// app.post("/create-stripe-product", async (c) => {
//   const res = await stripe.products.create({
//     id: "123",
//     name: "Test Product",
//     default_price_data: {
//       currency: "usd",
//       unit_amount: 10 * 100,
//     },
//   });

//   return c.json(res);
// });

// app.get("/stripe-product-price", async (c) => {
//   const res = await stripe.prices.list({
//     product: "123",
//   });

//   return c.json(res);
// });

app.route("/sessions", sessionRoute);
app.route("/webhooks", webhookRoute);

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
