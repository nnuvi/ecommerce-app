import { createKafkaClient, createProducer } from "@packages/kafka";

const kafka = createKafkaClient("email-service");
export const producer = createProducer(kafka);