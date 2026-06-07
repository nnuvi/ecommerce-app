import nodemailer from "nodemailer";
import { Resend } from "resend";
import dotenv from "dotenv";
import { logger } from "@packages/logger";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);
// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendEmail(to: string, subject: string, html: string) {
  // const mailOptions = {
  //   from: process.env.SMTP_USER,
  //   to,
  //   subject,
  //   html,
  // };
  // const info = await transporter.sendMail(mailOptions);
  transporter.verify((err, success) => {
    if (err) {
      logger.error({ error: err }, "SMTP connection failed");
    } else {
      logger.info({ success }, "SMTP connection successful");
    }
  });
  const { data, error } = await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to,
    subject,
    html,
  });

  if (error) {
    logger.error({ error, to, subject }, "Email failed to send");
    return { success: false, error };
  }

  logger.info(
    {
      to,
      subject,
      id: data?.id,
    },
    "Email sent successfully",
  );

  return { success: true, data };
}
