import { getVideoData, saveVideo, streamVideo } from "../handlers/videoHandler";
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
    if (req.body?.error) {
      return res.status(500).json(req.body.error);
    }
    saveVideo(req, res);
  }
);

videoRouter.get("/video", (_req, res) => {
  res.json("Hello video route!");
});

videoRouter.get("/video/:id", (req, res) => {
  const id = req.params.id;
  streamVideo(id, req, res);
});

videoRouter.get("/video/:id/data", (req, res) => {
  const id = req.params.id;
  getVideoData(id, req, res);
});
