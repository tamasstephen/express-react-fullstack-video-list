import { protectRoute } from "../utils/auth";
import { Router } from "express";
import multer from "multer";

export const videoRouter = Router();

videoRouter.post("/video", protectRoute, (req, res) => {
  console.log(req.file);
  res.json("Hello video route!");
});
