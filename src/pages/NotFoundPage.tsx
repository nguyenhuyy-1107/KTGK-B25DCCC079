import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="not-found">
      <h1>404</h1>
      <p>Trang bạn tìm không tồn tại.</p>
      <Link className="btn" to="/">
        Về trang chủ
      </Link>
    </section>
  );
}
