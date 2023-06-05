import UserIcon from "@/app/components/navigation/UserIcon";
import Description from "./Description";

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
    <div className="w-full py-8 flex-col">
      <div className="grid gap-4 mr-4 mb-4">
        <p className="text-3xl font-medium text-slate-700">{title}</p>
        <div className="flex items-center">
          <UserIcon initials={user.initials} size="small" />
          <p className="text-lg ml-2">{user.name}</p>
        </div>
      </div>
      <Description description={description} />
    </div>
  );
}
