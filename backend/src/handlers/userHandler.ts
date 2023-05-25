import prisma from "../data/prisma";
import { createUser, getUserByEmail } from "../data/user";
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
  try {
    const user = await getUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
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
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const isValidPassword = async (
  password: string,
  hashedPassword: string
) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const handleRegister = async (req: Request, res: Response) => {
  const data = req.body as UserInputType;
  const { email, username } = data;
  if (await userAlreadyExists(email, username)) {
    res.status(400).json({ error: "User already exists" });
    return;
  }
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user = await createUser({ ...data, password: hashedPassword });
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

export const handleLogout = async (_req: Request, res: Response) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
};
