import { Hono } from "hono";
import Stripe from "stripe";
import stripe from "../libs/stripe.js";
import { producer } from "./../libs/kafka.js";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;
const webhookRoute = new Hono();

webhookRoute.get("/", (c) => {
  return c.json({
    status: "ok webhook",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

webhookRoute.post("/stripe", async (c) => {
  console.log("Webhook here");

  const body = await c.req.text();
  const sig = c.req.header("stripe-signature");

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig!, webhookSecret);
  } catch (error) {
    console.log("Webhook verification failed!");
    return c.json({ error: "Webhook verification failed!" }, 400);
  }

  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object as Stripe.PaymentIntent;

      console.log("Payment succeeded:", paymentIntent.id);

      const metadata = paymentIntent.metadata;

      const userId = metadata.userId;
      const cart = JSON.parse(metadata.cart || "[]");

      console.log({
        userId,
        amount: paymentIntent.amount,
        status: paymentIntent.status,
        cart,
      });
      // TODO: CREATE ORDER
      await producer.send("payment.successful", {
        value: {
          userId: paymentIntent.metadata.userId ?? "",
          email: paymentIntent.metadata.email ?? "",
          amount: paymentIntent.amount,
          status: paymentIntent.status === "succeeded" ? "success" : "failed",
          products: JSON.parse(paymentIntent.metadata.cart || "[]"),
        },
      });

      break;

    default:
      break;
  }
  return c.json({ received: true });
});

export default webhookRoute;
