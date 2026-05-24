import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { logger } from "@packages/logger";

dotenv.config();

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendEmail(to: string, subject: string, html: string) {
  const mailOptions = {
    from: process.env.SMTP_USER,
    to,
    subject,
    html,
  };
  const info = await transporter.sendMail(mailOptions);
  logger.info(
    {
      to,
      subject,
    },
    "Email sent successfully",
  );
  return info;
}
