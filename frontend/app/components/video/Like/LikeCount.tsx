const LikeCount = ({ likeCount }: { likeCount: number }) => {
  return (
    <div>
      <p className="text-sm text-gray-500">{likeCount} likes</p>
    </div>
  );
};

export default LikeCount;
