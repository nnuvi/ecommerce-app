import { consumer } from "./kafka.js";
import { createOrder } from "./order.js";

export const runKafkaSubscriptions = async () => {
  consumer.subscribe([
    {
      topicName: "payment.successful",
      topicHandler: async (message) => {
        const order = message.value;
        console.log(`Kafka Subscription: Received payment successful message:`, order);
        await createOrder(order);
      },
    },
  ]);
};
