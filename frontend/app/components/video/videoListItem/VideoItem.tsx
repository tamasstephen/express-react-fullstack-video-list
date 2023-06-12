import { dataHandler } from "@/data/api/dataHandler";
import VideoCover from "./VideoCover";
import VideoData from "./VideoData";
import { useQuery } from "react-query";
import { useState } from "react";
import Link from "next/link";

const VideoItem = ({ video }: { video: VideoPayload }) => {
  const [image, setImage] = useState<{ src: string; img?: Blob }>({
    src: "not_found.jpg",
  });
  const { data, isError, isLoading, error, status } = useQuery({
    queryKey: [`videoThumbnail-${video.id}`, video.thumbnailPath],
    queryFn: dataHandler.getVideoThumbnail,
    onSuccess: (data) => {
      if (data) {
        setImage({ ...image, img: data, src: URL.createObjectURL(data) });
      }
    },
  });
  return (
    <div className="w-full">
      <Link href={`/vids/${video.id}`}>
        <VideoCover data={image} />
        <VideoData data={video} />
      </Link>
    </div>
  );
};

export default VideoItem;
