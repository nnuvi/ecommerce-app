import Fastify from "fastify";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { clerkClient, clerkPlugin, getAuth } from "@clerk/fastify";
import { shouldBeUser } from "./middleware/authMiddleware.js";
import { orderRoute } from "./routes/order.js";
// import { runKafkaSubscriptions } from "./lib/subscriptions.js";
// import { consumer, producer } from "./lib/kafka.js";
import { logger } from "@packages/logger";

dotenv.config({ debug: true });
const fastify = Fastify({
  logger: false,
});

fastify.register(clerkPlugin, {
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY!,
  secretKey: process.env.CLERK_SECRET_KEY!,
});

// Declare a route
fastify.get("/", function (request, reply) {
  reply.status(200).send({
    start: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

fastify.get(
  "/health",
  { preHandler: shouldBeUser },
  async function (request, reply) {
    return reply.code(200).send({
      message: "Order-Service Here!!!",
      userId: request.userId,
    });
  },
);

fastify.register(orderRoute);

const start = async () => {
  try {
    await connectDB();
    if (process.env.NODE_ENV === "development") {
      // await Promise.all([producer.connect(), consumer.connect()]);
      // await runKafkaSubscriptions();
      logger.info({ message: "Starting order service in development mode" });
    }
    await fastify.listen({
      port: 8888,
      host: "0.0.0.0",
    });
    logger.info({ port: 8888 }, "Order service is running");
  } catch (err) {
    logger.error({ error: err }, "Error starting order service:");
    process.exit(1);
  }
};
start();
