import { logger } from "@packages/logger";
import { OrderType } from "@packages/types";

export const sendOrderConfirmationEmail = async (order: OrderType) => {
  try {
    logger.info(
      {
        order,
        emailServiceUrl: process.env.EMAIL_SERVICE_URL,
      },
      "Sending order confirmation email",
    );
    const res = await fetch(
      `${process.env.EMAIL_SERVICE_URL}/send-order-confirmation`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      },
    );
    logger.info(
      {
        response: res,
      },
      "Received response from Email Service",
    );
    if (!res.ok) {
      const error = await res.text();
      throw new Error(`Failed to send order confirmation email: ${error}`);
    }
    logger.info(
      {
        order
      },
      "Sending order confirmation email",
    );
    return res.json();
  } catch (error) {
    logger.error(
      {
        error,
        order,
      },
      "Failed to send order confirmation email",
    );
  }
};
