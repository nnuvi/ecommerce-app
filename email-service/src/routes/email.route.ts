import { Hono } from "hono";
import { sendEmail } from "../lib/mailer.js";
import { orderEmailHTML } from "../lib/emailFormater.js";
import { logger } from "@packages/logger/server";

const emailRouter = new Hono();

emailRouter.post("/send-order-confirmation", async (c) => {
  const order = await c.req.json();

  logger.info({ order }, "Order Email");

  const mailContent = orderEmailHTML(order);

  if (!order.email) {
    return c.json({ success: false, error: "Missing email" }, 400);
  }

  try {
    await sendEmail(order.email, "Order Confirmation from Ecom", mailContent);

    logger.info(
      {
        to: order.email,
        subject: "Order Confirmation from Ecom",
      },
      "Order confirmation email sent successfully",
    );

    return c.json({ success: true });
  } catch (err) {
    logger.error({ err }, "Failed to send email");

    return c.json({ success: false }, 500);
  }
});

emailRouter.post("/send-user-welcome-email", async (c) => {
  const user = await c.req.json();
  const { username, email, firstName } = user;

  if (email) {
    await sendEmail(
      email,
      "Welcome to Ecom",
      `Hi ${firstName || username}, welcome to our service!`,
    );
  }
  return c.json({ success: true });
});

export default emailRouter;
