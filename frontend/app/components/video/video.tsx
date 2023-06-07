export default function Video({ videoId }: { videoId: string }) {
  return (
    <video controls>
      <source
        src={`${process.env.NEXT_PUBLIC_API}/api/video/${videoId}`}
        type="video/mp4"
      ></source>
    </video>
  );
}
