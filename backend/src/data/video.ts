import type { VideoParam } from "../types";
import prisma from "./prisma";

type VideoQueryPayLoad = Omit<VideoParam, "userId"> & {
  user: { connect: { id: string } };
};

export const createVideo = async ({
  title,
  description,
  path,
  fileName,
  originalFileName,
  userId,
  thumbnailPath,
}: VideoParam) => {
  const dataPayload: VideoQueryPayLoad = {
    title,
    description,
    path,
    fileName,
    originalFileName,
    user: {
      connect: {
        id: userId,
      },
    },
  };
  if (thumbnailPath) {
    dataPayload.thumbnailPath = thumbnailPath;
  }
  const video = await prisma.video.create({
    data: dataPayload,
  });
  return video;
};

export const getVideoById = async (id: string) => {
  const video = await prisma.video.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
      likes: true,
    },
  });
  return video;
};
