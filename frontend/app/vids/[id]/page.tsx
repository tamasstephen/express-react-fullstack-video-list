"use client";

import { usePathname } from "next/navigation";
import { useQuery } from "react-query";
import Video from "./component/video";
import VideoDetails from "./component/VideoDetails";
import Div from "@/app/components/Div";

function getUserInitials(name: string) {
  return name
    .split(" ")
    .map((name) => name.charAt(0))
    .join("");
}

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
    <div className="mt-8 mb-24">
      <Div width="large">
        <Video videoId={videoId} />
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>Error: {error}</p>
        ) : (
          <VideoDetails
            title={data.title}
            description={data.description}
            user={{
              initials: getUserInitials(data.user.name),
              name: data.user.name,
            }}
          />
        )}
      </Div>
    </div>
  );
}
