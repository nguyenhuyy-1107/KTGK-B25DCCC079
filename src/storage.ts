import type { NewPostInput, Post } from "./types";

const POSTS_KEY = "miniblog_posts";
const USER_KEY = "miniblog_user";

export function getLocalPosts(): Post[] {
  try {
    const raw = localStorage.getItem(POSTS_KEY);
    return raw ? (JSON.parse(raw) as Post[]) : [];
  } catch {
    return [];
  }
}

export function addLocalPost(input: NewPostInput, author: string): Post {
  const post: Post = {
    id: `local-${Date.now()}`,
    userId: 0,
    title: input.title,
    body: input.body,
    isLocal: true,
    author,
    createdAt: new Date().toISOString(),
  };
  localStorage.setItem(POSTS_KEY, JSON.stringify([post, ...getLocalPosts()]));
  return post;
}

export function getStoredUser(): string | null {
  return localStorage.getItem(USER_KEY);
}

export function setStoredUser(username: string) {
  localStorage.setItem(USER_KEY, username);
}

export function clearStoredUser() {
  localStorage.removeItem(USER_KEY);
}
