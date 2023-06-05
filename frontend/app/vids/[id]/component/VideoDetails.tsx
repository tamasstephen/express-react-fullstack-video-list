interface VideoDetailProps {
  title: string;
  description: string;
  likes?: number;
}

export default function VideoDetails({
  title,
  description,
  likes,
}: VideoDetailProps) {
  return (
    <div className="w-full py-4">
      <p className="text-2xl font-bold">{title}</p>
      <p className="text-xl">{description}</p>
    </div>
  );
}
