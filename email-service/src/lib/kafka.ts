import { createKafkaClient, createConsumer} from "@packages/kafka";

const kafkaClient = createKafkaClient("email-service");

export const consumer = createConsumer(kafkaClient, "email-service");