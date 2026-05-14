import { consumer } from "./kafka.js";
import { createOrder } from "./order.js";

export const runKafkaSubscriptions = async () => {
  console.log("Starting Kafka consumer subscription topic: payment.successful...");
  consumer.subscribe([
    {
      topicName: "payment.successful",
      topicHandler: async (message) => {
        const order = message.value;
        console.log(
          `Kafka Subscription: Received payment successful message:`,
          order,
        );
        await createOrder({
          userId: order.userId,
          amount: order.amount,
          status: order.status,
          products: order.products ?? [],
        });
      },
    },
  ]);
};
