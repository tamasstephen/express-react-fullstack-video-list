import type { VideoParam } from "../types";
import prisma from "./prisma";

export const createVideo = async ({
  title,
  description,
  path,
  fileName,
  originalFileName,
  userId,
}: VideoParam) => {
  const video = await prisma.video.create({
    data: {
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
    },
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
