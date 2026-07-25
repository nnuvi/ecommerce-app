import { Router, Request, Response } from "express";
import { getClerkClient } from "../lib/clerk.js";
// import { producer } from "../lib/kafka.js";
import { clerkClient } from "@clerk/express";
import { getAuth } from "@clerk/express";
import { logger } from "@packages/logger/server";
import { shouldBeAdmin } from "../middleware/authMiddleware.js";

const router: Router = Router();
const clerk = getClerkClient();

router.get("/me", async (req: Request, res: Response) => {
  const { userId } = getAuth(req);
  logger.info({ message: "Fetching current user", userId });
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const user = await clerk.users.getUser(userId);
  logger.info({
    message: "Current user fetched successfully",
    username: user.username,
  });
  res.status(200).json(user);
});

router.get("/", shouldBeAdmin, async (req: Request, res: Response) => {
  const users = await clerk.users.getUserList();
  res.status(200).json(users);
});

router.get(
  "/:id",
  shouldBeAdmin,
  async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const user = await clerk.users.getUser(id);
    res.status(200).json(user);
  },
);

router.post("/", shouldBeAdmin, async (req: Request, res: Response) => {
  type CreateParams = Parameters<typeof clerk.users.createUser>[0];
  const newUser: CreateParams = req.body;
  const user = await clerk.users.createUser(newUser);

  if (process.env.NODE_ENV === "development") {
    logger.debug({
      message: "User created in development mode, skipping Kafka event",
      username: user.username,
    });
    // producer.send("user.created", {
    //   value: {
    //     username: user.username,
    //     email: user.emailAddresses[0]?.emailAddress,
    //     firstName: user.firstName,
    //   },
    // });
  } else {
    sendUserCreatedEmail({
      username: user.username,
      email: user.emailAddresses[0]?.emailAddress,
      firstName: user.firstName,
    });
  }

  logger.info({
    message: "User created and event sent to Kafka",
    username: user.username,
  });
  res.status(200).json(user);
});

router.delete(
  "/:id",
  shouldBeAdmin,
  async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const user = await clerk.users.deleteUser(id);
    res.status(200).json(user);
  },
);

export default router;
function sendUserCreatedEmail(arg0: {
  username: string | null;
  email: string;
  firstName: string | null;
}) {
  throw new Error("Function not implemented.");
}
