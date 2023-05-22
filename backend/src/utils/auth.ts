import type { User } from "@prisma/client";
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface IJwtRequest extends Request {
  cookies: { token?: string };
}

export const createJWT = ({ id, email }: User) => {
  const payload = {
    id,
    email,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET as string);
  return token;
};

export const addJWTCookie =
  (token: string) => (_req: Request, res: Response, next: NextFunction) => {
    res.cookie("token", token, {
      httpOnly: true,
    });
    next();
  };

export const protectRoute = (
  req: IJwtRequest,
  res: Response,
  next: NextFunction
) => {
  const authToken = req.cookies?.token;
  if (authToken) {
    const token = jwt.verify(authToken, process.env.JWT_SECRET as string);
    if (token) return next();
  }
  res.status(401).json({ error: "Not authorized" });
};