"use client";

import { dataHandler } from "@/data/api/dataHandler";
import { useInfiniteQuery, useQuery } from "react-query";
import dynamic from "next/dynamic";
import Heading from "./components/Heading";
import Div from "./components/Div";
import Button from "./components/Button";
import { useState } from "react";

interface VideoPayloadError extends Error {
  message: string;
}

const VideoList = dynamic(
  () => import("./components/video/videoListItem/VideoList"),
  { ssr: false }
);

function mergeVideos(videoWrapper: { videos: Array<VideoPayload> }[]) {
  const videos: Array<VideoPayload> = [];
  videoWrapper.forEach((videoWrapper) => {
    videos.push(...videoWrapper.videos);
  });
  return videos;
}

function getLastPageParam(videoWrapper: { hasNextPage: number | undefined }[]) {
  return videoWrapper.at(-1)?.hasNextPage;
}

export default function Home() {
  const {
    data,
    error,
    status,
    isError,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["videos"],
    queryFn: dataHandler.getVideoListData,
    getNextPageParam: (lastPage, pages) => getLastPageParam(pages),
    keepPreviousData: true,
  });
  if (isLoading) {
    return <div className="flex justify-center pt-16">Loading...</div>;
  }
  if (isError) {
    return <div className="flex justify-center pt-16">{"Loading Error"}</div>;
  }
  if (status === "success") {
    return (
      <div className=" pt-12 py-24">
        <Div width="xtra">
          <Heading align="text-left">Our Videos</Heading>
          <div className="flex justify-center">
            <VideoList videos={mergeVideos(data.pages)} />
          </div>
          {hasNextPage && (
            <div className="flex justify-center mt-8">
              <Button cb={() => fetchNextPage()} buttonType="primary">
                Load More
              </Button>
            </div>
          )}
        </Div>
      </div>
    );
  }
}
