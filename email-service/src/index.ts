import { serve } from "@hono/node-server";
import { logger } from "@packages/logger/server";
import "dotenv/config";
import { Hono } from "hono";
// import { createConsumer, createKafkaClient } from "@packages/kafka";
// import { consumer } from "./lib/kafka.js";
// import { kafkaMailer } from "./lib/kafkaMail.js";
import dns from "dns";
import emailRoute from "./routes/email.route.js";

// dotenv.config();
// const kafka = createKafkaClient("email-service");
// const consumer = createConsumer(kafka, "email-service");
const app = new Hono();
app.get("/health", (c) => c.text("OK"));

dns.setDefaultResultOrder("ipv4first");
dns.lookup("smtp-relay.brevo.com", (err, address) => {
  console.log("DNS RESULT:", err || address);
  logger.info({ address, err }, "DNS lookup result for smtp-relay.brevo.com");
});

const start = async () => {
  try {
    if (process.env.NODE_ENV === "development") {
      logger.info({ message: "Starting Email Service in Kafka mode..." });
      // kafkaMailer();
      // logger.info({ message: "Kafka Mail Sent." });
    } else {
      logger.info({ message: "Starting Email Service in API mode..." });
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
