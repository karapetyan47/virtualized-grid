import { useState, useCallback } from 'react';

import { useFetch } from '../use-fetch';

import { I_Photo } from '@/core/types/pexels';
import { fetchCuratedPhotos } from '@/api/pexels';

export const usePexelsAPI = () => {
  const [photos, setPhotos] = useState<I_Photo[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const {
    isLoading: loading,
    error,
    loadMore: _loadMore,
  } = useFetch({
    fetcher: fetchCuratedPhotos,
    initialArgs: page,
    onSuccess: (data) => {
      setHasMore(data.page < Math.ceil(data.total_results / data.per_page));
      setPhotos((prev) => [...prev, ...data.photos]);
    },
  });

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;
    const nextPage = page + 1;
    setPage(nextPage);
    _loadMore(nextPage);
  }, [loading, hasMore, page, _loadMore]);

  return {
    photos,
    loading,
    error,
    hasMore,
    loadMore,
  };
};
