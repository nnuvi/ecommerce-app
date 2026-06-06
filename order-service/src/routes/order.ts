import type { FastifyInstance } from "fastify";
import { shouldBeAdmin, shouldBeUser } from "../middleware/authMiddleware.js";
import { Order } from "../models/order.model.js";
import { startOfMonth, subMonths } from "date-fns";
import { OrderChartType, OrderType } from "@packages/types";
import { logger } from "@packages/logger";
import { createOrder } from "../lib/order.js";

export const orderRoute = async (fastify: FastifyInstance) => {
  fastify.get(
    "/user-orders",
    { preHandler: shouldBeUser },
    async (request, reply) => {
      const orders = await Order.find({ userId: request.userId });
      logger.info(
        {
          count: orders.length,
          orders: orders.map((o) => o.products),
        },
        "Fetched user orders",
      );
      return reply.code(200).send({ orders });
    },
  );

  fastify.get(
    "/orders",
    { preHandler: shouldBeAdmin },
    async (request, reply) => {
      const { limit } = request.query as { limit?: string };
      const orders = await Order.find().limit(limit ? parseInt(limit) : 5);
      logger.info(
        {
          count: orders.length,
        },
        "Fetched all orders",
      );
      return reply.code(200).send({ orders });
    },
  );
  
  fastify.get(
    "/order-chart",
    { preHandler: shouldBeAdmin },
    async (request, reply) => {
      const now = new Date();
      const sixMonthsAgo = subMonths(now, 5);

      const raw = await Order.aggregate([
        {
          $match: {
            createdAt: { $gte: sixMonthsAgo, $lte: now },
          },
        },
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            total: { $sum: 1 },
            successful: {
              $sum: {
                $cond: [{ $eq: ["$status", "success"] }, 1, 0],
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            year: "$_id.year",
            month: "$_id.month",
            total: 1,
            successful: 1,
          },
        },
        {
          $sort: { year: 1, month: 1 },
        },
      ]);

      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      const results: OrderChartType[] = [];

      for (let i = 5; i >= 0; i--) {
        const d = subMonths(now, i);
        const year = d.getFullYear();
        const month = d.getMonth() + 1;

        const match = raw.find(
          (item) => item.year === year && item.month === month,
        );

        results.push({
          month: monthNames[month - 1] as string,
          total: match ? match.total : 0,
          successful: match ? match.successful : 0,
        });
      }

      logger.info(
        {
          count: results.length,
        },
        "Fetched order chart data",
      );
      return reply.send(results);
    },
  );

  fastify.post(
    "/save-orders",
    // { preHandler: shouldBeUser },
    async (request, reply) => {
      const order = request.body as OrderType;
      const apiKey = request.headers["x-internal-api-key"];
      if (apiKey !== process.env.INTERNAL_API_KEY) {
        return reply.code(401).send({ error: "Unauthorized" });
      }
      const createdOrder = await createOrder(order);
      logger.info(
        {
          order: createdOrder,
        },
        "Created new order",
      );
      return reply.code(200).send({ createdOrder });
    },
  );
};

