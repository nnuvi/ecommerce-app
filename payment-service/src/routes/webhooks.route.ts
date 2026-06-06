import { Hono } from "hono";
import Stripe from "stripe";
import stripe from "../lib/stripe.js";
import { producer } from "../lib/kafka.js";
import { shouldBeUser } from "../middleware/authMiddleware.js";
import { logger } from "@packages/logger";
import { email } from "zod";
import { createOrderInOrderService } from "../services/order.service.js";
// import { getUser } from "../../../email-service/src/services/authClient.js";

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
  logger.info({ message: "Webhook received" });

  const body = await c.req.text();
  const sig = c.req.header("stripe-signature");

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig!, webhookSecret);
    logger.info(
      {
        eventType: event.type,
      },
      "Received Stripe webhook event",
    );
  } catch (error) {
    logger.error(
      {
        error,
      },
      "Webhook verification failed!",
    );
    return c.json({ error: "Webhook verification failed!" }, 400);
  }

  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object as Stripe.PaymentIntent;

      const metadata = paymentIntent.metadata;
      const cart = JSON.parse(metadata.cart || "[]");

      logger.info(
        {
          paymentObject: paymentIntent.object,
          paymentEmail: paymentIntent.receipt_email,
          paymentAmount: paymentIntent.amount,
          metadata,
          cart,
        },
        "Extracted metadata from payment intent",
      );
      if (process.env.NODE_ENV === "development") {
        const prod = await producer.send("payment.successful", {
          value: {
            userId: paymentIntent.metadata.userId ?? "",
            email: paymentIntent.receipt_email ?? "",
            amount: paymentIntent.amount,
            status: paymentIntent.status === "succeeded" ? "success" : "failed",
            products: JSON.parse(paymentIntent.metadata.cart || "[]"),
          },
        });
        logger.info(
          {
            producerResult: prod,
          },
          "Payment successful message sent to Kafka",
        );
      } else {
        await createOrderInOrderService({
          userId: paymentIntent.metadata.userId ?? "",
          email: paymentIntent.receipt_email ?? "",
          amount: paymentIntent.amount,
          status: paymentIntent.status === "succeeded" ? "success" : "failed",
          products: JSON.parse(paymentIntent.metadata.cart || "[]"),
        });
      }
      break;

    default:
      logger.warn(
        {
          eventType: event.type,
        },
        "Unhandled webhook event",
      );
      break;
  }
  return c.json({ received: true });
});

export default webhookRoute;
