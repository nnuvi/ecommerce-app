import type { FastifyInstance } from "fastify";
import { shouldBeAdmin, shouldBeUser } from "../middleware/authMiddleware.js";
import { Order } from "../models/order.model.js";

export const orderRoute = async (fastify: FastifyInstance) => {
  fastify.get(
    "/user-order",
    { preHandler: shouldBeUser },
    async (request, reply) => {
      const orders = await Order.findById({ userId: request.userId });
      return reply.code(200).send(orders);
    },
  );

  fastify.get(
    "/orders",
    { preHandler: shouldBeAdmin },
    async (request, reply) => {
      const orders = await Order.find();
      return reply.code(200).send(orders);
    },
  );
};
