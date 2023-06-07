import { UseQueryOptions } from "react-query";

export const dataHandler = {
  getSingleVideoData: async ({ queryKey }: UseQueryOptions) => {
    if (!queryKey || !queryKey[0]) throw new Error("queryKey is required");
    const id = queryKey[0];
    const videoId = (id as string).replace("video-", "");
    if (!videoId) throw new Error("videoId is required");
    const response = await fetch(
      `http://localhost:3001/api/video/${videoId}/data`
    );
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    return data;
  },
};
