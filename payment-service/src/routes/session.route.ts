import { Hono } from "hono";
import stripe from "../lib/stripe.js";
import { shouldBeUser } from "../middleware/authMiddleware.js";
import type { CartItemsType } from "@packages/types";

import { getStripeProductPrice } from "../lib/stripeProduct.js";
import { meta } from "zod/v4/core";
import { logger } from "@packages/logger/server";

const sessionRoute = new Hono();

sessionRoute.post("/create-checkout-session", shouldBeUser, async (c) => {
  const { cart }: { cart: CartItemsType } = await c.req.json();
  const userId = c.get("userId");
  try {
    // 1. Calculate the total order amount in cents
    // Stripe requires an integer (e.g., $10.50 must be 1050)
    let totalAmount = 0;

    for (const item of cart) {
      totalAmount += item.price * item.quantity; // use own data
    }

    if (totalAmount <= 0) {
      return c.json({ error: "Invalid cart amount" }, 400);
    }

    const amountInCents = Math.round(totalAmount * 100);

    // 2. Create a PaymentIntent instead of a Checkout Session
    // This provides the secret required by <Elements> and <PaymentElement>
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
      // Pass metadata so you can identify the order in your webhooks
      metadata: {
        userId: userId,
        cart: JSON.stringify(
          cart.map((i) => ({ id: i.id, quantity: i.quantity })),
        ),
      },
    });
    const parsedCart = JSON.parse(paymentIntent.metadata.cart || "[]");
    logger.info(
      {
        paymentObject: paymentIntent.object,
        paymentIntentId: paymentIntent.id,
        paymentIntentAmount: paymentIntent.amount,
        paymentIntentQuantity: parsedCart.length,
        metadata: parsedCart.metadata,
      },
      "Created Stripe PaymentIntent",
    );

    // 3. Return the client_secret
    return c.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error: any) {
    logger.error(
      {
        error,
      },
      "Stripe PaymentIntent Error",
    );
    return c.json(
      {
        error: error.message || "Internal Server Error",
      },
      500,
    );
  }
});

// sessionRoute.get("/:session_id", async (c) => {
//   const { session_id } = c.req.param();
//   const session = await stripe.checkout.sessions.retrieve(
//     session_id as string,
//     {
//       expand: ["line_items"],
//     },
//   );

//   logger.info(
//     {
//       session,
//     },
//     "Retrieved Stripe Checkout Session",
//   );

//   return c.json({
//     status: session.status,
//     paymentStatus: session.payment_status,
//   });
// });

export default sessionRoute;
