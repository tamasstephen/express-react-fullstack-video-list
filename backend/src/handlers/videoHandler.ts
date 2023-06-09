import { createVideo, getVideoById, getVideos } from "../data/video";
import type { VideoParam, VideoRequest } from "../types";
import { decodeJWT, getBearerToken } from "../utils/auth";
import type { Request, Response } from "express";
import fs from "fs";
import path from "path";

export const saveVideo = async (req: VideoRequest, res: Response) => {
  try {
    const { title, description, path, fileName, originalFileName } = req.body;
    if (!title || !description || !path || !fileName || !originalFileName) {
      return res
        .status(400)
        .json({ error: "Please provide all the required fields" });
    }
    const rawToken = getBearerToken(req);
    const token = decodeJWT(rawToken as string);
    if (!token || !token["id"]) {
      return res.status(401).json({ error: "Not authorized" });
    }
    const payload: VideoParam & { userId: string } = {
      title,
      description,
      path,
      fileName,
      originalFileName,
      userId: token["id"],
    };
    if (req?.body?.thumbnailPath) {
      payload.thumbnailPath = req.body.thumbnailPath;
    }
    const video = await createVideo(payload);
    if (video) {
      res.json({
        message: "Video saved successfully",
        video: { id: video.id },
      });
      return video;
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err });
  }
};

export const streamVideo = async (id: string, req: Request, res: Response) => {
  const video = await getVideoById(id);
  if (video) {
    const path = video.path;
    const fileSize = fs.statSync(path).size;
    const videoRange = req.headers.range;
    if (videoRange) {
      const parts = videoRange.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunkSize = end - start + 1;
      const file = fs.createReadStream(path, { start, end });
      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunkSize,
        "Content-Type": "video/mp4",
      };
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      res.writeHead(200, {
        "Content-Length": fileSize,
        "Content-Type": "video/mp4",
      });
      fs.createReadStream(path).pipe(res);
    }
  } else {
    res.sendStatus(404);
  }
};

export const getVideoData = async (id: string, req: Request, res: Response) => {
  try {
    const video = await getVideoById(id);
    if (video) {
      res.json({
        id: video.id,
        title: video.title,
        description: video.description,
        originalFileName: video.originalFileName,
        createdAt: video.createdAt,
        user: {
          name: video.user.name,
        },
        likes: video.likes.length,
      });
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    return res.sendStatus(500);
  }
};

export const getVideoThumbnail = async (
  id: string,
  req: Request,
  res: Response
) => {
  const video = await getVideoById(id);
  if (video) {
    const path = video.thumbnailPath;
    if (path) {
      const fileSize = fs.statSync(path).size;
      const extension = path.split(".").pop();
      fs.readFile(path, (err, data) => {
        if (err || !extension) {
          res.sendStatus(404);
        } else {
          res.writeHead(200, {
            "Content-Length": fileSize,
            "Content-Type": `image/${extension}`,
          });
          res.end(data, "utf-8");
        }
      });
    } else {
      res.sendStatus(404);
    }
  } else {
    res.sendStatus(404);
  }
};

export const getVideoListData = async (
  page: number,
  req: Request,
  res: Response
) => {
  const videos = await getVideos(page);
  if (videos) {
    res.json({ ...videos });
  } else {
    res.sendStatus(404);
  }
};
