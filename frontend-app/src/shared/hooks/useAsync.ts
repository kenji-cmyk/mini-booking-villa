import { useCallback, useEffect, useState } from "react";

type AsyncState<T> = {
  data: T | null;
  error: string | null;
  isLoading: boolean;
};

export function useAsync<T>(loader: () => Promise<T>) {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    error: null,
    isLoading: true
  });

  const run = useCallback(async () => {
    setState((current) => ({ ...current, isLoading: true, error: null }));

    try {
      const data = await loader();
      setState({ data, error: null, isLoading: false });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong.";
      setState({ data: null, error: message, isLoading: false });
    }
  }, [loader]);

  useEffect(() => {
    void run();
  }, [run]);

  return { ...state, refetch: run };
}
