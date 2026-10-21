import { Link } from "react-router-dom";
import type { Post } from "../types";

export default function PostCard({ post }: { post: Post }) {
  return (
    <article className="card">
      <h2 className="card-title">
        <Link to={`/posts/${post.id}`}>{post.title}</Link>
      </h2>
      <p className="card-body">{post.body}</p>
      <div className="card-meta">
        {post.isLocal ? (
          <span className="badge">Bài mới của bạn</span>
        ) : (
          <span>Tác giả #{post.userId}</span>
        )}
        <Link to={`/posts/${post.id}`}>Đọc tiếp</Link>
      </div>
    </article>
  );
}
