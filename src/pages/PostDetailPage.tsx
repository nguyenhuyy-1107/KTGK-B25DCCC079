import { Link, useParams } from "react-router-dom";
import { fetchComments, fetchPost } from "../api";
import { getLocalPosts } from "../storage";
import { useFetch } from "../hooks/useFetch";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import NotFoundPage from "./NotFoundPage";
import type { Post } from "../types";

function LocalPostDetail({ post }: { post: Post }) {
  return (
    <article className="detail">
      <Link className="back-link" to="/">Quay lại danh sách</Link>
      <h1>{post.title}</h1>
      <p className="muted">
        Viết bởi {post.author}
        {post.createdAt && ` · ${new Date(post.createdAt).toLocaleString("vi-VN")}`}
      </p>
      <p className="detail-body">{post.body}</p>
      <p className="empty">Bài viết này chỉ lưu trên trình duyệt nên chưa có bình luận.</p>
    </article>
  );
}

function RemotePostDetail({ id }: { id: string }) {
  const postState = useFetch((signal) => fetchPost(id, signal), [id]);
  const commentsState = useFetch((signal) => fetchComments(id, signal), [id]);

  if (postState.loading) return <Loading text="Đang tải bài viết..." />;
  if (postState.error) {
    return <ErrorMessage message={postState.error} onRetry={postState.reload} />;
  }
  if (!postState.data || !postState.data.id) return <NotFoundPage />;

  const post = postState.data;

  return (
    <article className="detail">
      <Link className="back-link" to="/">Quay lại danh sách</Link>
      <h1>{post.title}</h1>
      <p className="muted">Tác giả #{post.userId}</p>
      <p className="detail-body">{post.body}</p>

      <h2>Bình luận {commentsState.data ? `(${commentsState.data.length})` : ""}</h2>
      {commentsState.loading && <Loading text="Đang tải bình luận..." />}
      {commentsState.error && (
        <ErrorMessage message={commentsState.error} onRetry={commentsState.reload} />
      )}
      {commentsState.data && (
        <ul className="comments">
          {commentsState.data.map((c) => (
            <li key={c.id} className="comment">
              <strong>{c.name}</strong>
              <span className="muted">{c.email}</span>
              <p>{c.body}</p>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

export default function PostDetailPage() {
  const { id = "" } = useParams();

  if (id.startsWith("local-")) {
    const post = getLocalPosts().find((p) => String(p.id) === id);
    return post ? <LocalPostDetail post={post} /> : <NotFoundPage />;
  }

  if (!/^\d+$/.test(id)) return <NotFoundPage />;

  return <RemotePostDetail id={id} />;
}
