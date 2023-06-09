import { userUtils } from "@/app/utils/utils";
import UserIcon from "../../navigation/UserIcon";
import UserWidget from "../../navigation/UserWidget";
import VideoTitle from "../VideoTitle";
import Description from "../Description";

const VideoData = ({
  data: { title, description, user, createdAt },
}: {
  data: VideoPayload;
}) => {
  return (
    <div className="mt-4">
      <div className="flex">
        <div className="shrink-0">
          <UserIcon
            initials={userUtils.getNameInitials(user.name)}
            size="small"
          />
        </div>
        <div className="ml-2 grid gap-1">
          <VideoTitle title={title} size="sm" />
          <Description type="sm" description={description} />
        </div>
      </div>
    </div>
  );
};

export default VideoData;
