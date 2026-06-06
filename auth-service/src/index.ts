import { clerkMiddleware } from "@clerk/express";
import { logger } from "@packages/logger";
import cors from "cors";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
// import { producer } from "./lib/kafka.js";
import userRoute from "./routes/user.route.js";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json());
app.use(clerkMiddleware());

app.get("/health", (req: Request, res: Response) => {
  return res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

app.use("/users", userRoute);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error({ message: "Internal Server Error", error: err });
  return res
    .status(err.status || 500)
    .json({ message: err.message || "Inter Server Error!" });
});

const start = async () => {
  try {
    if (process.env.NODE_ENV === "development") {
      logger.debug({ message: "Starting Auth Service in development mode..." });
      // await producer.connect();
    } else {
      logger.info({ message: "Starting Auth Service in production mode..." });
    }
    app.listen(8000, () => {
      logger.info({ message: "Auth Service is running on port 8000" });
    });
  } catch (error) {
    logger.error({ message: "Failed to start Auth Service", error });
    process.exit(1);
  }
};

start();