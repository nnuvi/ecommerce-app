import "dotenv/config";
import { createClerkClient } from "@clerk/express";

export const getClerkClient = () => {
  const key = process.env.CLERK_SECRET_KEY;

  if (!key) {
    throw new Error("CLERK_SECRET_KEY missing");
  }

  return createClerkClient({
    secretKey: key,
  });
};