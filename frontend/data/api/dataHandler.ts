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
    console.log(response);
    if (!response.ok || response.status !== 200)
      throw new Error("Network response was not ok");
    const data = await response.json();
    console.log(data);
    return data;
  },
};
