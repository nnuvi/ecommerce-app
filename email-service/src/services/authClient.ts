import { logger } from "@packages/logger/server";
import dotenv from "dotenv";

dotenv.config();

export const getUser = async () => {
  logger.info({ message: "Fetching user from auth service" });
  const res = await fetch(`${process.env.AUTH_SERVICE_URL}/users/me`);

  if (!res.ok) throw new Error("Failed to fetch user");
  logger.info({
    message: "User fetched successfully from auth service",
    responseBody: res.body,
  });

  return res.json();
};
