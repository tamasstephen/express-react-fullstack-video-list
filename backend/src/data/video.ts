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
