import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import PostDetailPage from "./pages/PostDetailPage";
import LoginPage from "./pages/LoginPage";
import WritePage from "./pages/WritePage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <>
      <Header />
      <main className="container main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts/:id" element={<PostDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/write"
            element={
              <ProtectedRoute>
                <WritePage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
}
