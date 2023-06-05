import UserIcon from "@/app/components/navigation/UserIcon";

interface VideoDetailProps {
  title: string;
  description: string;
  user: string;
  likes?: number;
}

export default function VideoDetails({
  title,
  description,
  user,
  likes,
}: VideoDetailProps) {
  const userInitials = user
    .split(" ")
    .map((name) => name.charAt(0))
    .join("");

  return (
    <div className="w-full py-8 flex-col">
      <div className="grid gap-4 mr-4 mb-4">
        <p className="text-3xl font-medium text-slate-700">{title}</p>
        <div className="flex items-center">
          <UserIcon initials={userInitials} size="small" />
          <p className="text-lg ml-2">{user}</p>
        </div>
      </div>
      <div className="w-full bg-slate-100 p-4 rounded-md">
        <p className="text-sm text-slate-500 capitalize font-medium mb-2">
          Description
        </p>
        <p className="">{description}</p>
      </div>
    </div>
  );
}
