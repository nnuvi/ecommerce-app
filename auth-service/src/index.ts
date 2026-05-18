import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";
import { shouldBeAdmin } from "./middleware/authMiddleware.js";
import userRoute from "./routes/user.route.js";
import { producer } from "./lib/kafka.js";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json());
app.use((req, res, next) => {
  console.log("Incoming:", req.method, req.url);
  console.log("Authorization:", req.headers.authorization);
  next();
});
app.use(clerkMiddleware());

app.get("/health", (req: Request, res: Response) => {
  return res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

app.use("/users", shouldBeAdmin, userRoute);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log("err:", err);
  return res
    .status(err.status || 500)
    .json({ message: err.message || "Inter Server Error!" });
});

const start = async () => {
  try {
    // await producer.connect();
    app.listen(8000, () => {
      console.log("Auth service is running on 8000");
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();