"use client";

import LikeCountView from "./LikeCountView";
import LikeView from "./LikeView";

const Like = () => {
  // We need to check if the current user liked this video... => useQuery
  return (
    <div className="flex items-center">
      <LikeCountView likeCount={0} />
      <button className="ml-2">
        <LikeView wasLikedByUser={false} />
      </button>
    </div>
  );
};

export default Like;
