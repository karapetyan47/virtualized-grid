import { useState, useCallback } from 'react';

import { useFetch } from '../use-fetch';

import { I_Photo } from '@/core/types/pexels';
import { fetchCuratedPhotos, searchPhotos } from '@/api/pexels';

export const usePexelsAPI = (initialQuery = '') => {
  const [photos, setPhotos] = useState<I_Photo[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [query, setQuery] = useState<string>(initialQuery);

  const fetcher = useCallback(
    (args: number | { query: string; page: number; perPage?: number }) => {
      if (typeof args === 'number') {
        return fetchCuratedPhotos(args);
      } else {
        return searchPhotos(args);
      }
    },
    []
  );

  const resetSearch = useCallback(() => {
    setPhotos([]);
    setPage(1);
    setHasMore(false);
  }, []);

  const {
    isLoading: loading,
    error,
    loadMore: _loadMore,
    refetch,
  } = useFetch({
    fetcher,
    initialArgs: query ? { query, page } : page,
    onSuccess: (data) => {
      setHasMore(data.page < Math.ceil(data.total_results / data.per_page));
      setPhotos((prev) => [...prev, ...data.photos]);
    },
  });

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;
    const nextPage = page + 1;
    setPage(nextPage);
    _loadMore(query ? { query, page: nextPage } : nextPage);
  }, [loading, hasMore, page, _loadMore, query]);

  const search = useCallback(
    (newQuery: string) => {
      if (newQuery === query) return refetch();

      resetSearch();
      setQuery(newQuery);
      _loadMore(newQuery ? { query: newQuery, page: 1 } : 1);
    },
    [query, refetch, resetSearch, _loadMore]
  );

  return {
    photos,
    loading,
    error,
    hasMore,
    loadMore,
    search,
    query,
  };
};
