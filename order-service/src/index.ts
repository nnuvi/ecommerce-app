import Fastify from "fastify";
import dotenv from "dotenv";
import { clerkClient, clerkPlugin, getAuth } from "@clerk/fastify";
import { shouldBeUser } from "../middleware/authMiddleware.js";

dotenv.config({ debug: true });
const fastify = Fastify();

console.log("publishable:");

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

fastify.get("/health", {preHandler:shouldBeUser}, async function (request, reply) {
  return reply.code(200).send({ 
    message: "Order-Service Here!!!",
    userId: request.userId
  });
});

const start = async () => {
  try {
    await fastify.listen({ port: 8888 });
    console.log(`Order Service running on PORT:8888`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
