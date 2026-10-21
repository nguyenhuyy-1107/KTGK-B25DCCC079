export interface Post {
  id: number | string;
  userId: number;
  title: string;
  body: string;
  isLocal?: boolean;
  author?: string;
  createdAt?: string;
}

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export interface NewPostInput {
  title: string;
  body: string;
}
