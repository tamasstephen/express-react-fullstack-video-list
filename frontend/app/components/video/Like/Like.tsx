"use client";

import LikeCount from "./LikeCount";
import LikeButton from "./LikeButton";

const Like = () => {
  // We need to check if the current user liked this video... => useQuery
  return (
    <div data-cy="likes" className="grid grid-cols-2 items-center">
      <LikeCount likeCount={0} />
      <LikeButton wasLikedByUser={false} />
    </div>
  );
};

export default Like;
