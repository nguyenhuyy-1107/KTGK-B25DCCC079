import { useCallback, useEffect, useState } from "react";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  reload: () => void;
}

export function useFetch<T>(
  fetcher: (signal: AbortSignal) => Promise<T>,
  deps: unknown[] = []
): FetchState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetcher(controller.signal)
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Đã xảy ra lỗi không xác định");
        setLoading(false);
      });

    return () => controller.abort();
  }, [...deps, tick]);

  const reload = useCallback(() => setTick((t) => t + 1), []);

  return { data, loading, error, reload };
}
