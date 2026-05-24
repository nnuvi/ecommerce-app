import { logger } from "@packages/logger";
import { createConsumer, createKafkaClient } from "@packages/kafka";
import { sendEmail } from "./lib/mailer.js";
import { getUser } from "./services/authClient.js";
import { orderEmailHTML } from "./lib/emailFormater.js";

const kafka = createKafkaClient("email-service");
const consumer = createConsumer(kafka, "email-service");

export async function main() {
  try {
    await consumer.connect();

    await consumer.subscribe([
      {
        topicName: "user.created",
        topicHandler: async (message) => {
          const { username, email, firstName } = message.value;

          if (email) {
            await sendEmail(
              email,
              "Welcome to Our Service",
              `Hi ${firstName || username}, welcome to our service!`,
            );
          }
        },
      },

      {
        topicName: "order.created",
        topicHandler: async (message) => {
          const order = message.value;
          logger.info(
            {
              order,
            },
            "Received order.created message, preparing to send confirmation email",
          );

          // const user = await getUser();
          // const email = user.email;

          const mailContent = orderEmailHTML(order);

          if (order.email) {
            await sendEmail(
              order.email,
              "Order Confirmation from Ecom",
              mailContent
            );

            logger.info(
              {
                to: order.email,
                subject: "Order Confirmation from Ecom",
                message: mailContent,
              },
              "Order confirmation email sent successfully",
            );
          }
        },
      },
    ]);
  } catch (error) {
    logger.error({
      message: "Failed to process email service",
      error,
    });
  }
}

main();
