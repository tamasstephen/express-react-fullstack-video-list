import { createUser, getUserByEmail, userAlreadyExists } from "../data/user";
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
    res.cookie("token", token);
    res.json({
      message: "Logged in",
      user: { name: user.name },
    });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const handleRegister = async (req: Request, res: Response) => {
  try {
    const data = req.body as UserInputType;
    const { email, username, password } = data;
    if (await userAlreadyExists(email, username)) {
      res.status(400);
      res.json({ error: "User already exists" });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser({
      email,
      username,
      password: hashedPassword,
    });
    const userPayload = {
      name: user.name,
    };
    res.json({ user: userPayload, message: "Logged in" });
  } catch (err) {
    res.status(500);
    res.json({ error: "Internal server error" });
  }
};

export const handleLogout = async (_req: Request, res: Response) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
};
