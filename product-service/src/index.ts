import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { clerkMiddleware, getAuth } from '@clerk/express'
import { shouldBeUser } from "./middleware/authMiddleware.js";
import productRouter from "./routes/product.route.js"
import categoryRouter from "./routes/category.route.js"

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

app.use("/products", productRouter);
app.use("/categories", categoryRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  return res
  .status (err.status|| 500)
  .json({ message: err.message || "Internal Server Error!"});
});

const PORT = process.env.PORT || 8008;

app.listen(PORT, () => {
  console.log(`Product Service running on port ${PORT}`);
});