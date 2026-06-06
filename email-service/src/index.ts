import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import "dotenv/config";
import { logger } from "@packages/logger";
import { createConsumer, createKafkaClient } from "@packages/kafka";
import { sendEmail } from "./lib/mailer.js";
import { getUser } from "./services/authClient.js";
import { orderEmailHTML } from "./lib/emailFormater.js";
// import { consumer } from "./lib/kafka.js";
// import { kafkaMailer } from "./lib/kafkaMail.js";
import emailRoute from './routes/email.route.js';

// dotenv.config();
// const kafka = createKafkaClient("email-service");
// const consumer = createConsumer(kafka, "email-service");
const app = new Hono();
app.get('/health', (c) => c.text('OK'));



const start = async () => {
  try {
    if (process.env.NODE_ENV === "development") {
      logger.info({message: "Starting Email Service in Kafka mode..."});
      // kafkaMailer();
      // logger.info({ message: "Kafka Mail Sent." });
    } else {
      logger.info({message: "Starting Email Service in API mode..."});
      app.route("/", emailRoute);
    } 
    serve(
      {
        fetch: app.fetch,
        port: 8800,
      },
      (info) => {
        logger.info(
          {
            port: info.port,
          },
          "Email service is running",
        );
      },
    );
  } catch (error) {
    logger.error(
      {
        error,
      },
      "Failed to start Email service",
    );
    process.exit(1);
  }
};

start();

// export async function main() {
//   try {
//     if (process.env.NODE_ENV === "development") {
//       kafkaMailer();
//     } else {
//     }
//   } catch (error) {
//     logger.error({
//       message: "Failed to process email service",
//       error,
//     });
//   }
// }

// main();
