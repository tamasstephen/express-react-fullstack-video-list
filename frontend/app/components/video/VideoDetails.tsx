import UserIcon from "@/app/components/navigation/UserIcon";
import Description from "./Description";
import Like from "./Like/Like";

interface VideoDetailProps {
  title: string;
  description: string;
  user: { name: string; initials: string };
  likes?: number;
}

export default function VideoDetails({
  title,
  description,
  user,
  likes,
}: VideoDetailProps) {
  return (
    <div className="w-full pt-4 pb-8 flex-col">
      <div className="grid gap-4 mb-4">
        <p className="text-2xl font-bold text-zinc-700">{title}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <UserIcon initials={user.initials} size="small" />
            <p className="text-lg ml-2">{user.name}</p>
          </div>
          <Like />
        </div>
      </div>
      <Description description={description} />
    </div>
  );
}
