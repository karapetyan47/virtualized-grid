import { useEffect, useRef, useState } from 'react';

type FetchStatus = 'idle' | 'loading' | 'success' | 'error';

interface I_Props<TData, TArgs> {
  fetcher: (args: TArgs) => Promise<TData>;
  initialArgs: TArgs;
  enabled?: boolean;
  mergeData?: (oldData: TData, newData: TData) => TData;
  onSuccess?: (data: TData) => void;
  initialData?: TData | null;
  onError?: (error: unknown) => void;
}

export const useFetch = <TData, TArgs>({
  fetcher,
  initialArgs,
  enabled = true,
  mergeData,
  onSuccess,
  onError,
  initialData = null,
}: I_Props<TData, TArgs>) => {
  const [data, setData] = useState<TData | null>(initialData);
  const [error, setError] = useState<unknown>(null);
  const [status, setStatus] = useState<FetchStatus>('idle');
  const [args, setArgs] = useState(initialArgs);

  const abortRef = useRef<AbortController | null>(null);

  const fetchData = async (argsToUse: TArgs, append = false) => {
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    setStatus('loading');
    setError(null);

    try {
      const result = await fetcher(argsToUse);
      const finalData = append && mergeData && data ? mergeData(data, result) : result;

      setData(finalData);
      setStatus('success');
      onSuccess?.(finalData);
    } catch (err: unknown) {
      if ((err as { name: string }).name === 'AbortError') return;
      setError(err);
      setStatus('error');
      onError?.(err);
    }
  };

  const refetch = () => fetchData(args);
  const loadMore = (nextArgs: TArgs) => {
    setArgs(nextArgs);
    void fetchData(nextArgs, true);
  };

  useEffect(() => {
    if (enabled) {
      void fetchData(args);
    }

    return () => {
      abortRef.current?.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  return {
    data,
    error,
    status,
    isLoading: status === 'loading',
    refetch,
    loadMore,
  };
};
