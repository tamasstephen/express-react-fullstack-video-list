interface VideoPayload {
  title: string;
  description: string;
  thumbnailPath: string | null;
  createdAt: Date;
  id: string;
  user: {
    name: string;
  };
  likes: Array<any>;
}
