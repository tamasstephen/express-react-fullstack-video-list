interface LikeViewProps {
  wasLikedByUser: boolean;
}

import Image from "next/image";
import Button from "../../Button";

const LikeView = ({ wasLikedByUser }: LikeViewProps) => {
  const activeStyle = wasLikedByUser ? "text-red-500" : "text-gray-700";
  return (
    /*   <div
      className={`flex rounded-md border-2 border-gray-300 px-2 py-1 ${activeStyle}`}
    > */
    <Button buttonType="secondary">
      <Image alt="like" src="/heart-solid.svg" width={16} height={16} />
      <p className="ml-2 font-medium text-primary-text">Like</p>
    </Button>
    /*     </div>
     */
  );
};

export default LikeView;
