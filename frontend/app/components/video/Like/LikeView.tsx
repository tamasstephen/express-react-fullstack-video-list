interface LikeViewProps {
  wasLikedByUser: boolean;
}

import Image from "next/image";

const LikeView = ({ wasLikedByUser }: LikeViewProps) => {
  const activeStyle = wasLikedByUser ? "text-red-500" : "text-gray-700";
  return (
    <div
      className={`flex rounded-md border-2 border-gray-300 px-2 py-1 ${activeStyle}`}
    >
      <Image alt="like" src="/heart-solid.svg" width={16} height={16} />
      <p className="ml-2 font-medium">Like</p>
    </div>
  );
};

export default LikeView;
