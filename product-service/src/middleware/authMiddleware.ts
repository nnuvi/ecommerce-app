import { getAuth } from "@clerk/express";
import { Request, Response, NextFunction } from "express";
import type { CustomJwtSessionClaims } from "../types/auth.js";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const shouldBeUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const auth = getAuth(req);
    const userId = auth.userId;

    if (!userId) {
      return res.status(401).json({ message: "You are not logged in." })!;
    }

    req.userId = auth.userId;
    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const shouldBeAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const auth = getAuth(req);
    if (!auth.userId) {
      return res.status(401).json({ message: "You are not logged in!" });
    }

    const claims = auth.sessionClaims as CustomJwtSessionClaims;

    if (claims.metadata?.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized!" });
    }

    req.userId = auth.userId;
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
