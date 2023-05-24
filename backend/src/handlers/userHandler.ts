import { createJWT } from "../utils/auth";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import type { Request, Response } from "express";

type UserInputType = {
  email: string;
  password: string;
  name?: string;
};

const prisma = new PrismaClient();

export const handleLogin = async (req: Request, res: Response) => {
  const data = req.body as { email: string; password: string };
  const { email, password } = data;
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    res.status(400).json({ error: "Invalid email or password" });
    return;
  }
  if (!(await isValidPassword(password, user.password))) {
    res.status(400).json({ error: "Invalid email or password" });
    return;
  }
  const token = createJWT(user);
  res.cookie("token", token, {
    httpOnly: true,
  });
  res.json({ message: "Logged in", user: { email: user.email } });
};

const isValidPassword = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const handleRegister = async (req: Request, res: Response) => {
  const data = req.body as UserInputType;
  const { email, password, name } = data;
  if (await userAlreadyExists(email)) {
    res.status(400).json({ error: "User already exists" });
    return;
  }
  const user = await createUser(email, password, name);
  const userPayload = {
    email: user.email,
  };
  const token = createJWT(user);
  res.cookie("token", token, {
    httpOnly: true,
  });
  res.json({ user: userPayload, message: "Logged in" });
};

const userAlreadyExists = (email: string) => {
  return prisma.user.findUnique({ where: { email } });
};

const createUser = async (email: string, password: string, name?: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const userData: UserInputType = { email, password: hashedPassword };
  if (name) {
    userData["name"] = name;
  }
  return prisma.user.create({
    data: userData,
  });
};

export const handleLogout = async (_req: Request, res: Response) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
};
