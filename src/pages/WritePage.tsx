import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { addLocalPost } from "../storage";

interface FormErrors {
  title?: string;
  body?: string;
}

function validate(title: string, body: string): FormErrors {
  const errors: FormErrors = {};
  if (!title.trim()) {
    errors.title = "Tiêu đề không được trống";
  } else if (title.trim().length < 5) {
    errors.title = "Tiêu đề phải có ít nhất 5 ký tự";
  } else if (title.trim().length > 100) {
    errors.title = "Tiêu đề tối đa 100 ký tự";
  }
  if (!body.trim()) {
    errors.body = "Nội dung không được để trống";
  } else if (body.trim().length < 20) {
    errors.body = "Nội dung phải có ít nhất 20 ký tự";
  }
  return errors;
}

export default function WritePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const found = validate(title, body);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    addLocalPost({ title: title.trim(), body: body.trim() }, user ?? "admin");
    navigate("/");
  };

  return (
    <section className="form-page">
      <h1>Viết bài mới</h1>
      <form className="form" onSubmit={handleSubmit} noValidate>
        <label>
          Tiêu đề
          <input
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <span className="field-error">{errors.title}</span>}
        </label>
        <label>
          Nội dung
          <textarea
            className="input"
            rows={8}
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          {errors.body && <span className="field-error">{errors.body}</span>}
        </label>
        <button className="btn" type="submit">
          Đăng bài
        </button>
      </form>
    </section>
  );
}
