import { useEffect, useRef } from 'react';

import { VirtualizedGrid } from '@/components/templates/virtualized-grid';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { usePexelsAPI } from '@/hooks/use-pexels-api';
import { LoadMoreTrigger } from '@/components/atoms/load-more-trigger';
import { Show } from '@/components/atoms/show';
import { ErrorElement } from '@/components/molecules/error-element';

export const Gallery = () => {
  const { photos, loadMore, hasMore, loading, error } = usePexelsAPI();
  const containerRef = useRef<HTMLDivElement>(null);

  const { targetRef, isIntersecting } = useIntersectionObserver({
    root: containerRef.current,
    enabled: !!photos.length,
  });

  useEffect(() => {
    if (isIntersecting && photos?.length && hasMore && !loading) {
      void loadMore();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isIntersecting]);

  return (
    <Show
      visible={!error}
      fallback={<ErrorElement message={(error as { message: string })?.message || undefined} />}
    >
      <div>
        <VirtualizedGrid
          containerRef={containerRef}
          photos={photos}
          loadMoreTrigger={<LoadMoreTrigger ref={targetRef} />}
        />
      </div>
    </Show>
  );
};
