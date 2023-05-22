import { createJWT } from "../utils/auth";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import type { Request, Response } from "express";

const prisma = new PrismaClient();

export const handleLogin = async (req: Request, res: Response) => {
  const data = req.body as { email: string; password: string };
  if (!data || !data?.email || !data?.password) {
    res.status(400).json({ error: "Missing email or password" });
  }
  const { email, password } = data;
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    res.status(400).json({ error: "Invalid email or password" });
    return;
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    res.status(400).json({ error: "Invalid email or password" });
    return;
  }
  const token = createJWT(user);
  res.cookie("token", token, {
    httpOnly: true,
  });
  // TODO: send necessary user data to client
  res.json({ message: "Logged in" });
};

export const handleRegister = async (req: Request, res: Response) => {
  const data = req.body as { email: string; password: string };
  if (!data || !data?.email || !data?.password) {
    res.status(400).json({ error: "Missing email or password" });
  }
  const { email, password } = data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });
  const token = createJWT(user);
  res.cookie("token", token, {
    httpOnly: true,
  });
  // TODO: send necessary user data to client
  res.json({ message: "User created" });
};

export const handleLogout = async (_req: Request, res: Response) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
};
