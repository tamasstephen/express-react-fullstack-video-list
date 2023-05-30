import type { User } from "@prisma/client";
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface IJwtRequest extends Request {
  cookies: { token?: string };
}

export const createJWT = ({ id, name }: Pick<User, "name" | "id">) => {
  const payload = {
    id,
    name,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET as string);
  return token;
};

export const protectRoute = (
  req: IJwtRequest,
  res: Response,
  next: NextFunction
) => {
  const authToken = req.cookies?.token;
  if (authToken) {
    try {
      const token = jwt.verify(authToken, process.env.JWT_SECRET as string);
      if (token) return next();
    } catch (error) {
      res.status(401).json({ error: "Not a valid token" });
      return;
    }
  }
  res.status(401).json({ error: "Not authorized" });
  return;
};
