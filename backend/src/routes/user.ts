import { Router } from "express";

export const userRouter = Router();

userRouter.get("/user", (req, res) => {
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
