"use client";

import { usePathname } from "next/navigation";

export default function SingleVideoPage() {
  const pathName = usePathname();
  const videoId = pathName.split("/")[2];
  return (
    <div>
      <h1>Single Video Page</h1>
      <p>id: {videoId}</p>
      <video controls>
        <source
          src={`http://localhost:3001/api/video/${videoId}`}
          type="video/mp4"
        ></source>
      </video>
    </div>
  );
}
