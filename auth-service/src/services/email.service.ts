import { logger } from "@packages/logger/server";

export const sendWelcomeEmail = async (user: any) => {
  try {
    const res = await fetch(
      `${process.env.EMAIL_SERVICE_URL}/send-welcome-email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      },
    );
    logger.info({ user }, "Sending welcome email...");
  } catch (error) {
    logger.error(
      {
        error,
      },
      "Failed to send welcome email",
    );
  }
};
