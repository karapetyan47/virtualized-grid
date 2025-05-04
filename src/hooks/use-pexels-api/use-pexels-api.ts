import { useState, useCallback } from 'react';

import { useFetch } from '../use-fetch';

import { I_Photo } from '@/core/types/pexels';
import { fetchCuratedPhotos } from '@/api/pexels';

// export const usePexelsAPI = () => {
//   const [photos, setPhotos] = useState<I_Photo[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<Error | null>(null);
//   const [page, setPage] = useState<number>(1);
//   const [hasMore, setHasMore] = useState<boolean>(true);

//   useEffect(() => {
//     const fetchInitialPhotos = async () => {
//       setLoading(true);
//       try {
//         const response = await fetchCuratedPhotos(1);
//         setPhotos(response.photos);
//         setHasMore(response.page < Math.ceil(response.total_results / response.per_page));
//       } catch (err) {
//         setError(err instanceof Error ? err : new Error('An error occurred fetching photos'));
//       } finally {
//         setLoading(false);
//       }
//     };

//     void fetchInitialPhotos();
//   }, []);

//   const loadMore = useCallback(async () => {
//     if (loading || !hasMore) return;

//     setLoading(true);
//     try {
//       const nextPage = page + 1;
//       const response = await fetchCuratedPhotos(nextPage);

//       setPhotos((prevPhotos) => [...prevPhotos, ...response.photos]);
//       setPage(nextPage);
//       setHasMore(response.page < Math.ceil(response.total_results / response.per_page));
//     } catch (err) {
//       setError(err instanceof Error ? err : new Error('Error'));
//     } finally {
//       setLoading(false);
//     }
//   }, [loading, hasMore, page]);

//   return {
//     photos,
//     loading,
//     error,
//     hasMore,
//     loadMore,
//   };
// };

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
