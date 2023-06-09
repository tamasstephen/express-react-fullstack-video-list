import {
  handleLogin,
  handleLogout,
  handleRegister,
} from "../handlers/userHandler";
import { protectRoute } from "../utils/auth";
import type { NextFunction, Request, Response } from "express";
import { Router } from "express";
import { body, validationResult } from "express-validator";

export const userRouter = Router();

const checkUserDataChain = () => {
  return [
    body("email").notEmpty().isEmail().normalizeEmail(),
    body("password").notEmpty().trim().escape(),
  ];
};

userRouter.post(
  "/register",
  checkUserDataChain(),
  body("username").notEmpty().trim().escape(),
  (req: Request, res: Response) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      handleRegister(req, res);
    } else {
      res
        .status(400)
        .json({ error: "Missing email or password", errors: result.array() });
    }
  }
);

userRouter.post(
  "/login",
  checkUserDataChain(),
  (req: Request, res: Response) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      handleLogin(req, res);
    } else {
      res
        .status(400)
        .json({ error: "Missing email or password", errors: result.array() });
    }
  }
);

userRouter.post("/logout", (req: Request, res: Response) => {
  handleLogout(req, res);
});

userRouter.get("/user/:id", protectRoute, (req, res) => {
  res.json(`Hello user ${req.params.id} route!`);
});

userRouter.put("/user/:id", protectRoute, (req, res) => {
  res.json(`Updating user ${req.params.id}`);
});
