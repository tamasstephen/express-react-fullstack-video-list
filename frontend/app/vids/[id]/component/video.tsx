export default function Video({ videoId }: { videoId: string }) {
  return (
    <video controls>
      <source
        src={`http://localhost:3001/api/video/${videoId}`}
        type="video/mp4"
      ></source>
    </video>
  );
}
