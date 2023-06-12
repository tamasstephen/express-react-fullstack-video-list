import React from "react";
import VideoItem from "./VideoItem";
import Button from "../../Button";

const VideoList = ({ videos }: { videos: Array<VideoPayload> }) => {
  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2 md:gap-y-12 md:gap-x-4">
        {videos.map((video, idx) => {
          return <VideoItem key={video.id} video={video} />;
        })}
      </div>
    </div>
  );
};

export default VideoList;
