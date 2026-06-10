import { useCallback, useEffect, useState } from "react";

import { getErrorMessage } from "@/lib/format";

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
    setState((current) => ({ ...current, error: null, isLoading: true }));

    try {
      const data = await loader();
      setState({ data, error: null, isLoading: false });
    } catch (error) {
      setState({ data: null, error: getErrorMessage(error), isLoading: false });
    }
  }, [loader]);

  useEffect(() => {
    void run();
  }, [run]);

  return { ...state, refetch: run };
}
