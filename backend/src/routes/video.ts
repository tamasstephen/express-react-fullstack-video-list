import { protectRoute } from "../utils/auth";
import { Router } from "express";
import multer from "multer";
import path from "path";

export const videoRouter = Router();
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "./video");
  },
  filename: (_req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

videoRouter.post("/video", protectRoute, upload.single("video"), (req, res) => {
  console.log("The body is: ", req.body);
  console.log("The file is: ", req.file);
  res.json("Hello video route!");
});
