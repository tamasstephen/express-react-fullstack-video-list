"use client";

import { usePathname } from "next/navigation";
import { useQuery } from "react-query";
import Video from "./component/video";
import VideoDetails from "./component/VideoDetails";
import Div from "@/app/components/Div";

export default function SingleVideoPage() {
  const pathName = usePathname();
  const videoId = pathName.split("/")[2];
  const { data, status, isLoading, isError, error } = useQuery(
    `video-${videoId}`,
    () =>
      fetch(`http://localhost:3001/api/video/${videoId}/data`).then((res) =>
        res.json()
      )
  );
  return (
    <div className="mt-8">
      <Div width="large">
        <Video videoId={videoId} />
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>Error: {error}</p>
        ) : (
          <VideoDetails title={data.title} description={data.description} />
        )}
      </Div>
    </div>
  );
}
