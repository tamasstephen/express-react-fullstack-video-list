import { UseQueryOptions } from "react-query";

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
  getVideoListData: async ({ queryKey }: UseQueryOptions) => {
    if (!queryKey || !queryKey[1]) throw new Error("queryKey is required");
    const page = queryKey[1];
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/api/video?page=${page}`
    );
    if (!response.ok || response.status !== 200)
      throw new Error("Network response was not ok");
    const data = await response.json();
    return data;
  },

  getVideoThumbnail: async ({ queryKey }: UseQueryOptions) => {
    if (!queryKey || !queryKey[0]) throw new Error("queryKey is required");
    const id = queryKey[0];
    const videoId = (id as string).replace("videoThumbnail-", "");
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
