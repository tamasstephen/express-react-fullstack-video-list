import type { User } from "@prisma/client";
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

type Token = Pick<User, "name" | "id">;

export const createJWT = ({ id, name }: Token) => {
  const payload = {
    id,
    name,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET as string);
  return token;
};

export const protectRoute = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authToken = getBearerToken(req);
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

export const decodeJWT = (token: string) => {
  try {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as Token;
    return decodedToken;
  } catch (error) {
    return null;
  }
};

export const getBearerToken = (req: Request) => {
  const rawBearerToken = req?.headers?.authorization;
  const authToken = rawBearerToken?.split(" ")[1];
  return authToken;
};
