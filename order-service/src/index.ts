import Fastify from "fastify";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { clerkClient, clerkPlugin, getAuth } from "@clerk/fastify";
import { shouldBeUser } from "../src/middleware/authMiddleware.js";
import { orderRoute } from "./routes/order.js";

dotenv.config({ debug: true });
const fastify = Fastify();

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
    await fastify.listen({ port: 8888 });
    console.log(`Order Service running on PORT:8888`);
  } catch (err) {
    console.log(err);
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
