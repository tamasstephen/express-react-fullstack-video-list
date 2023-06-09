import React from "react";
import VideoItem from "./VideoItem";
import Div from "../../Div";
import Link from "next/link";

const VideoList = ({ videos }: { videos: Array<VideoPayload> }) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 md:gap-y-12 md:gap-x-4">
      {videos.map((video) => (
        <Link href={`/vids/${video.id}`}>
          <VideoItem key={video.id} video={video} />
        </Link>
      ))}
    </div>
  );
};

export default VideoList;
