import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { clerkMiddleware, getAuth } from '@clerk/express'
import { shouldBeUser } from "./middleware/authMiddleware.js";

dotenv.config();

const app = express();

app.use(
    cors({
        origin: ["http://localhost:3000", "http://localhost:3003"],
        credentials: true,
    })
);
app.use(express.json());
app.use(clerkMiddleware());

app.get("/", (req, res) => {
  res.status(200).json({
    start: "ok",
    uptime:process.uptime(),
    timestamp: Date.now()
  });
});

app.get("/health", shouldBeUser, (req, res) => {
  res.json({
    message: "Product Service Authenticated!!!",
    userId: req.userId
  })
});

const PORT = process.env.PORT || 8008;

app.listen(PORT, () => {
  console.log(`Product Service running on port ${PORT}`);
});