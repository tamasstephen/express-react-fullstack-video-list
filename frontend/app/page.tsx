"use client";

import { dataHandler } from "@/data/api/dataHandler";
import { useQuery } from "react-query";
import dynamic from "next/dynamic";
import Heading from "./components/Heading";
import Div from "./components/Div";

interface VideoPayloadError extends Error {
  message: string;
}

const VideoList = dynamic(
  () => import("./components/video/videoListItem/VideoList"),
  { ssr: false }
);

export default function Home() {
  const { data, isError, isLoading, error, status } = useQuery<
    { videos: Array<VideoPayload> },
    VideoPayloadError
  >({
    queryKey: ["posts", 1],
    queryFn: dataHandler.getVideoListData,
  });
  if (isLoading) {
    return <div className="flex justify-center pt-16">Loading...</div>;
  }
  if (isError) {
    return (
      <div className="flex justify-center pt-16">
        {error?.message || "Error"}
      </div>
    );
  }
  if (status === "success") {
    return (
      <div className=" pt-12 py-24">
        <Div width="xtra">
          <Heading align="text-left">Our Videos</Heading>
          <div className="flex justify-center">
            <VideoList videos={data?.videos} />
          </div>
        </Div>
      </div>
    );
  }
}
