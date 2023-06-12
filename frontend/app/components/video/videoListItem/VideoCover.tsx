const VideoCover = ({ data }: { data: { src: string } }) => {
  return (
    <div>
      <img
        className="aspect-video object-cover object-center"
        src={data.src}
        alt="thumbnail"
      />
    </div>
  );
};

export default VideoCover;
