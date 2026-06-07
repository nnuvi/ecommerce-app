import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { logger } from "@packages/logger";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_PASSWORD,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
});

// Run ONCE at startup (not per email)
transporter.verify((err) => {
  if (err) {
    logger.error({ err }, "SMTP verification failed");
  } else {
    logger.info({ host: "smtp-relay.brevo.com", port: 587 }, "SMTP verification successful");
  }
});

export async function sendEmail(to: string, subject: string, html: string) {
  try {
    const info = await transporter.sendMail({
      from: process.env.BREVO_SMTP_USER,
      to,
      subject,
      html,
    });

    logger.info(
      {
        messageId: info.messageId,
        to,
        subject,
      },
      "Email sent",
    );

    return info;
  } catch (err) {
    logger.error(
      {
        err,
        to,
        subject,
      },
      "Email send failed",
    );

    throw err;
  }
}