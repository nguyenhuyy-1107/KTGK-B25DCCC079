export default function Loading({ text = "Đang tải..." }: { text?: string }) {
  return (
    <div className="loading">
      <div className="spinner" />
      <p>{text}</p>
    </div>
  );
}
