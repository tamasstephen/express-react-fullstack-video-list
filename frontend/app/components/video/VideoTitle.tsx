import React from "react";

const sizeMap = {
  normal: "text-2xl",
  sm: "",
};

const VideoTitle = ({
  title,
  size,
}: {
  title: string;
  size: "normal" | "sm";
}) => {
  return (
    <h2 className={`font-bold text-zinc-700 ${sizeMap[size]}`}>{title}</h2>
  );
};

export default VideoTitle;
