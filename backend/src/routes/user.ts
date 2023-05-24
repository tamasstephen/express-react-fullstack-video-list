import {
  handleLogin,
  handleLogout,
  handleRegister,
} from "../handlers/userHandler";
import { protectRoute } from "../utils/auth";
import type { Request, Response } from "express";
import { Router } from "express";

export const userRouter = Router();

userRouter.post("/register", (req: Request, res: Response) => {
  handleRegister(req, res);
});

userRouter.post("/login", (req: Request, res: Response) => {
  handleLogin(req, res);
});

userRouter.post("/logout", (req: Request, res: Response) => {
  handleLogout(req, res);
});

userRouter.get("/user", protectRoute, (req, res) => {
  res.json("Hello user route!");
});

userRouter.get("/user/:id", (req, res) => {
  res.json(`Hello user ${req.params.id} route!`);
});

userRouter.post("/user", (req, res) => {
  res.json("Creating user");
});

userRouter.put("/user/:id", (req, res) => {
  res.json(`Updating user ${req.params.id}`);
});
