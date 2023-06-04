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
  try {
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
  } catch (err) {
    console.log(err);
    return null;
  }
};
