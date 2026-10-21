interface Props {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: Props) {
  return (
    <div className="alert alert-error" role="alert">
      <p>Có lỗi xảy ra: {message}</p>
      {onRetry && (
        <button className="btn btn-small" onClick={onRetry}>
          Thử lại
        </button>
      )}
    </div>
  );
}
