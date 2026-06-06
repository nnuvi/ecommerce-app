import { logger } from "@packages/logger";
import { consumer } from "./kafka.js";
import { sendEmail } from "./mailer.js";
import { orderEmailHTML } from "./emailFormater.js";

export const kafkaMailer = async () => {
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
            mailContent,
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
};
