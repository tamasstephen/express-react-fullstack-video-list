"use client";

import { usePathname } from "next/navigation";
import Video from "./component/video";

export default function SingleVideoPage() {
  const pathName = usePathname();
  const videoId = pathName.split("/")[2];
  return (
    <div>
      <h1>Single Video Page</h1>
      <p>id: {videoId}</p>
      <Video videoId={videoId} />
    </div>
  );
}
