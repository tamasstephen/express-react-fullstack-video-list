import { UseInfiniteQueryOptions, UseQueryOptions } from "react-query";

export const dataHandler = {
  getSingleVideoData: async ({ queryKey }: UseQueryOptions) => {
    if (!queryKey || !queryKey[0]) throw new Error("queryKey is required");
    const id = queryKey[0];
    const videoId = (id as string).replace("video-", "");
    if (!videoId) throw new Error("videoId is required");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/api/video/${videoId}/data`
    );
    if (!response.ok || response.status !== 200)
      throw new Error("Network response was not ok");
    const data = await response.json();
    return data;
  },

  getVideoListData: async ({ pageParam = 1 }: UseInfiniteQueryOptions) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/api/video?page=${pageParam}`
    );
    if (!response.ok || response.status !== 200)
      throw new Error("Network response was not ok");
    const data = await response.json();
    return data;
  },

  getVideoThumbnail: async ({ queryKey }: UseQueryOptions) => {
    if (!queryKey || !queryKey[0]) throw new Error("queryKey is required");
    const id = queryKey[0];
    const thumbnailPath = queryKey[1];
    const videoId = (id as string).replace("videoThumbnail-", "");
    if (!thumbnailPath) return;
    if (!videoId) throw new Error("videoId is required");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/api/video/${videoId}/thumbnail`
    );
    if (!response.ok || response.status !== 200)
      throw new Error("Network response was not ok");
    const data = await response.blob();
    return data;
  },
};
