import { Router } from "express";
import { getClerkClient } from "../lib/clerk.js";
import { producer } from "../lib/kafka.js";
import { clerkClient } from "@clerk/express";

const router: Router = Router();
const clerk = getClerkClient();

router.get("/", async (req, res) => {
  const users = await clerk.users.getUserList();
  res.status(200).json(users);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await clerk.users.getUser(id);
  res.status(200).json(user);
});

router.post("/", async (req, res) => {
  type CreateParams = Parameters<typeof clerk.users.createUser>[0];
  const newUser: CreateParams = req.body;
  console.log("Creating user with data:", newUser);
  const user = await clerk.users.createUser(newUser);
  producer.send("user.created", {
    value: {
      username: user.username,
      email: user.emailAddresses[0]?.emailAddress,
    },
  });
  console.log("User created:", user); 
  res.status(200).json(user);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await clerk.users.deleteUser(id);
  res.status(200).json(user);
});

export default router;