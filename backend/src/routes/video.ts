import { saveVideo } from "../handlers/videoHandler";
import { videoUpload } from "../middlewares/video.middleware";
import type { VideoRequest } from "../types";
import { protectRoute } from "../utils/auth";
import { Router } from "express";

export const videoRouter = Router();

videoRouter.post(
  "/video",
  protectRoute,
  videoUpload.single("video"),
  (req: VideoRequest, res) => {
    console.log("The body in the video route is: ", req.body);
    if (req.body?.error) {
      return res.status(500).json(req.body.error);
    }
    saveVideo(req, res);
    res.json("Hello video route!");
  }
);

videoRouter.get("/video", (_req, res) => {
  res.json("Hello video route!");
});

videoRouter.get("/video/:id", (_req, res) => {
  res.json("Hello video route!");
});
