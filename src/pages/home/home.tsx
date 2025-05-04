import { useEffect, useRef } from 'react';

import { VirtualizedGrid } from '@/components/organisms/virtualized-grid';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { usePexelsAPI } from '@/hooks/use-pexels-api';
import { LoadMoreTrigger } from '@/components/atoms/load-more-trigger';

export const Home = () => {
  const { photos, loadMore, hasMore, loading } = usePexelsAPI();
  const containerRef = useRef<HTMLDivElement>(null);

  const { targetRef, isIntersecting } = useIntersectionObserver({ root: containerRef.current });

  useEffect(() => {
    if (isIntersecting && photos?.length && hasMore && !loading) {
      void loadMore();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isIntersecting]);

  return (
    <div>
      <VirtualizedGrid
        containerRef={containerRef}
        photos={photos}
        loadMoreTrigger={<LoadMoreTrigger ref={targetRef} />}
      />
    </div>
  );
};
