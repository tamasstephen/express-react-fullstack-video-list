import React from "react";
import VideoItem from "./VideoItem";
import Div from "../../Div";

const VideoList = ({ videos }: { videos: Array<VideoPayload> }) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 md:gap-y-12 md:gap-x-4">
      {videos.map((video) => (
        <VideoItem key={video.id} video={video} />
      ))}
    </div>
  );
};

export default VideoList;
