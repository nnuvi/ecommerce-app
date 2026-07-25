import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { logger } from "@packages/logger/server";
import net from "net";

dotenv.config();

function testPort(port: number) {
  return new Promise((resolve) => {
    const socket = net.createConnection(port, "smtp-relay.brevo.com");

    socket.setTimeout(5000);

    socket.on("connect", () => {
      console.log("CONNECTED ON PORT", port);
      socket.destroy();
      resolve(true);
    });

    socket.on("error", (err) => {
      console.log("FAILED PORT", port, err.message);
      resolve(false);
    });

    socket.on("timeout", () => {
      console.log("TIMEOUT PORT", port);
      socket.destroy();
      resolve(false);
    });
  });
}

await testPort(587);
await testPort(465);

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 465,
  secure: true,
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
    logger.info(
      { host: "smtp-relay.brevo.com", port: 587 },
      "SMTP verification successful",
    );
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
