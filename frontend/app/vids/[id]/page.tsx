"use client";

import { usePathname } from "next/navigation";
import { useQuery } from "react-query";
import Video from "@/app/components/video/video";
import VideoDetails from "@/app/components/video/VideoDetails";
import Div from "@/app/components/Div";
import { dataHandler } from "@/data/api/dataHandler";

function getUserInitials(name: string) {
  return name
    ?.split(" ")
    ?.map((name) => name.charAt(0))
    ?.join("");
}

export default function SingleVideoPage() {
  const pathName = usePathname();
  const videoId = pathName.split("/")[2];
  const { data, status, isLoading, isError, error } = useQuery({
    queryKey: `video-${videoId}`,
    queryFn: dataHandler.getSingleVideoData,
  });
  return (
    <div className="mt-8 mb-24">
      <Div width="large">
        <Video videoId={videoId} />
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p data-cy="video-error">Unable to load data</p>
        ) : (
          <VideoDetails
            title={data.title}
            description={data.description}
            user={{
              initials: getUserInitials(data?.user?.name),
              name: data?.user?.name,
            }}
          />
        )}
      </Div>
    </div>
  );
}
