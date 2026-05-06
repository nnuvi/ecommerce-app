// import { Hono } from "hono";
// import stripe from "../utils/stripe.js";
// import { shouldBeUser } from "../middleware/authMiddleware.js";
// import type { CartItemsType } from "../types/cart.js";
// import { getStripeProductPrice } from "../utils/stripeProduct.js";

// const sessionRoute = new Hono();

// sessionRoute.post("/create-checkout-session", shouldBeUser, async (c) => {
//   const { cart }: { cart: CartItemsType } = await c.req.json();
//   const userId = c.get("userId");

//   const lineItems = await Promise.all(
//     cart.map(async (item) => {
//       const unitAmount = await getStripeProductPrice(item.id);
//       return {
//         price_data: {
//           currency: "usd",
//           product_data: {
//             name: item.name,
//           },
//           unit_amount: unitAmount as number,
//         },
//         quantity: item.quantity,
//       };
//     })
//   );

//   try {
//     const session = await stripe.checkout.sessions.create({
//       line_items: lineItems,
//       client_reference_id: userId,
//       mode: "payment",
//       ui_mode: "custom",
//       return_url:
//         "http://localhost:3003/return?session_id={CHECKOUT_SESSION_ID}",
//     });

//     console.log(session);

//     return c.json({ checkoutSessionClientSecret: session.client_secret });
//   } catch (error) {
//     console.log(error);
//     return c.json({ error });
//   }
// });

import { Hono } from "hono";
import stripe from "../utils/stripe.js";
import { shouldBeUser } from "../middleware/authMiddleware.js";
import type { CartItemsType } from "../types/cart.js";
import { getStripeProductPrice } from "../utils/stripeProduct.js";

const sessionRoute = new Hono();

sessionRoute.post("/create-checkout-session", shouldBeUser, async (c) => {
  const { cart }: { cart: CartItemsType } = await c.req.json();
  const userId = c.get("userId");
  console.log('Here, Id: ', userId)

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
      // Best practice for 2026: Let Stripe handle payment method logic
      automatic_payment_methods: {
        enabled: true,
      },
      // Pass metadata so you can identify the order in your webhooks
      metadata: {
        userId: userId,
        // Optional: you can stringify your cart items if they are small
        cart: JSON.stringify(cart.map(i => ({ id: i.id, quantity: i.quantity })))
      },
    });

    console.log('Here, Payment intent secret key: ', paymentIntent.client_secret)

    // 3. Return the client_secret
    // Note: Use 'clientSecret' as the key to match your frontend logic
    return c.json({ 
      clientSecret: paymentIntent.client_secret 
    });

  } catch (error: any) {
    console.error("Stripe PaymentIntent Error:", error);
    return c.json({ 
      error: error.message || "Internal Server Error" 
    }, 500);
  }
});

sessionRoute.get("/:session_id", async (c) => {
  const { session_id } = c.req.param();
  const session = await stripe.checkout.sessions.retrieve(
    session_id as string,
    {
      expand: ["line_items"],
    }
  );

  console.log(session);

  return c.json({
    status: session.status,
    paymentStatus: session.payment_status,
  });
});

export default sessionRoute;