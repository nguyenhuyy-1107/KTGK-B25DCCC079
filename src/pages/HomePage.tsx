import { useMemo, useState } from "react";
import { fetchPosts } from "../api";
import { getLocalPosts } from "../storage";
import { useFetch } from "../hooks/useFetch";
import PostCard from "../components/PostCard";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
export default function HomePage() {
  const { data, loading, error, reload } = useFetch((signal) => fetchPosts(signal));
  const [keyword, setKeyword] = useState("");

  const posts = useMemo(() => [...getLocalPosts(), ...(data ?? [])], [data]);

  const filtered = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter((p) => p.title.toLowerCase().includes(q));
  }, [posts, keyword]);

  return (
    <section>
      <h1>Danh sách bài viết</h1>

      <input
        className="input"
        type="search"
        placeholder="Tìm kiếm theo tiêu đề..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      {loading && <Loading text="Đang tải bài viết..." />}
      {error && <ErrorMessage message={error} onRetry={reload} />}

      {!loading && !error && (
        <>
          <p className="muted">Tìm thấy {filtered.length} bài viết</p>
          {filtered.length === 0 ? (
            <p className="empty">Không có bài viết nào phù hợp.</p>
          ) : (
            <div className="list">
              {filtered.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}
