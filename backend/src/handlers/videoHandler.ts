import { createVideo } from "../data/video";
import type { VideoRequest } from "../types";
import { decodeJWT, getBearerToken } from "../utils/auth";
import type { Response } from "express";

export const saveVideo = async (req: VideoRequest, res: Response) => {
  const { title, description, path, fileName, originalFileName } = req.body;
  if (!title || !description || !path || !fileName || !originalFileName) {
    return res.status(400).json("Please provide all the required fields");
  }
  const rawToken = getBearerToken(req);
  const token = decodeJWT(rawToken as string);
  if (!token || !token["id"]) {
    return res.status(401).json("Not authorized");
  }
  const video = await createVideo({
    title,
    description,
    path,
    fileName,
    originalFileName,
    userId: token["id"],
  });
  if (video) {
    return video;
  }
  return null;
};
