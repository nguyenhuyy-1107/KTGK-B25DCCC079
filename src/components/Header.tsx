import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../hooks/useTheme";

export default function Header() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="logo">
          MiniBlog
        </Link>
        <nav className="nav">
          <NavLink to="/" end>
            Trang chủ
          </NavLink>
          {user && <NavLink to="/write">Viết bài</NavLink>}
          {user ? (
            <>
              <span className="nav-user">Xin chào, {user}</span>
              <button className="btn btn-small" onClick={handleLogout}>
                Đăng xuất
              </button>
            </>
          ) : (
            <NavLink to="/login">Đăng nhập</NavLink>
          )}
          <button
            className="btn btn-small btn-theme"
            onClick={toggleTheme}
            aria-label="Đổi chế độ sáng/tối"
          >
            {theme === "light" ? "Chế độ tối" : "Chế độ sáng"}
          </button>
        </nav>
      </div>
    </header>
  );
}
