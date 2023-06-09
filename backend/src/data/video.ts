import type { VideoParam } from "../types";
import prisma from "./prisma";

type VideoQueryPayLoad = Omit<VideoParam, "userId"> & {
  user: { connect: { id: string } };
};

const videoPayload = {
  select: {
    title: true,
    description: true,
    thumbnailPath: true,
    createdAt: true,
    originalFileName: true,
    path: true,
    id: true,
    user: {
      select: {
        name: true,
      },
    },
    likes: true,
  },
} as const;

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
    ...videoPayload,
  });
  return video;
};

export const getVideos = async (page: number) => {
  const videos = await prisma.video.findMany({
    skip: (page - 1) * 10,
    take: 10,
    ...videoPayload,
  });
  return videos;
};
