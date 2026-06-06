 import { log } from "node:console";
import { consumer } from "./kafka.js";
import { createOrder } from "./order.js";
import { logger } from "@packages/logger";

export const runKafkaSubscriptions = async () => {
  logger.info({"message": "Starting Kafka consumer subscription topic: payment.successful"});
  consumer.subscribe([
    {
      topicName: "payment.successful",
      topicHandler: async (message) => {
        const order = message.value;
        const createdOrder = await createOrder(order);
        logger.info(
          {
            createdOrder,
          },
          "Order created successfully",
        );
      },
    },
  ]);
};
 