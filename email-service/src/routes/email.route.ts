import { Hono } from "hono";
import { sendEmail } from "../lib/mailer.js";
import { orderEmailHTML } from "../lib/emailFormater.js";
import { logger } from "@packages/logger";

const emailRouter = new Hono();

emailRouter.post("/send-order-confirmation", async (c) => {
  const order = await c.req.json();

  // Call the services to get the external API data
  logger.info({ order }, "Order Email")

  const mailContent = orderEmailHTML(order);

  if (order.email) {
    await sendEmail(order.email, "Order Confirmation from Ecom", mailContent);

    logger.info(
      {
        to: order.email,
        subject: "Order Confirmation from Ecom",
        message: mailContent,
      },
      "Order confirmation email sent successfully",
    );
  }
  return c.json({ success: true });
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
