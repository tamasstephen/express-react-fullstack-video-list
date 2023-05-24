import prisma from "../data/prisma";
import { createJWT } from "../utils/auth";
import bcrypt from "bcrypt";
import type { Request, Response } from "express";

type UserInputType = {
  email: string;
  password: string;
  username: string;
};

export const handleLogin = async (req: Request, res: Response) => {
  const data = req.body as Pick<UserInputType, "email" | "password">;
  const { email, password } = data;
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      name: true,
      password: true,
    },
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
  res.json({
    message: "Logged in",
    user: { name: user.name },
  });
};

const isValidPassword = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const handleRegister = async (req: Request, res: Response) => {
  const data = req.body as UserInputType;
  const { email, username } = data;
  if (await userAlreadyExists(email, username)) {
    res.status(400).json({ error: "User already exists" });
    return;
  }
  const user = await createUser(data);
  const userPayload = {
    name: user.name,
  };
  const token = createJWT(user);
  res.cookie("token", token, {
    httpOnly: true,
  });
  res.json({ user: userPayload, message: "Logged in" });
};

const userAlreadyExists = async (email: string, name: string) => {
  return await prisma.user.findFirst({
    where: { OR: [{ email }, { name }] },
  });
};

const createUser = async ({
  email,
  password,
  username: name,
}: UserInputType) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return prisma.user.create({
    data: { email, name, password: hashedPassword },
    select: {
      id: true,
      name: true,
    },
  });
};

export const handleLogout = async (_req: Request, res: Response) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
};
