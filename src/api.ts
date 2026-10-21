import type { Comment, Post } from "./types";
const BASE_URL = "https://jsonplaceholder.typicode.com";
async function request<T>(path: string, signal?: AbortSignal): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, { signal });
  if (!res.ok) {
    throw new Error(`Lỗi   (mã lỗi ${res.status})`);
  }
  return res.json() as  Promise<T>;
}


export function fetchPosts(signal?: AbortSignal) {
  return request<Post[]>("/ posts",signal);
}

export function fetchPost(id: string,   signal?: AbortSignal) {
  return request<Post>(`/posts/${id}`, signal);
}

export function fetchComments(postId:  string,  signal?: AbortSignal) {
  return request<Comment[]>(`/posts/${postId}/comments`, signal);
}
