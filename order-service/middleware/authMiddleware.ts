import { getAuth } from "@clerk/fastify";
import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

declare module "fastify" {
  interface FastifyRequest {
    userId?: string;
  }
}

export const shouldBeUser = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { userId } = getAuth(request)

    if (!userId) {
      return reply.status(401).send({ message: "You are not logged in." });
    }

    request.userId = userId;

  } catch (error) {
    console.error(error);
    return reply.status(500).send({ message: "Internal Server Error" });
  }
};
