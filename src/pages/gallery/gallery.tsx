import { useCallback, useEffect, useRef } from 'react';

import { VirtualizedGrid } from '@/components/templates/virtualized-grid';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { usePexelsAPI } from '@/hooks/use-pexels-api';
import { LoadMoreTrigger } from '@/components/atoms/load-more-trigger';
import { Show } from '@/components/atoms/show';
import { ErrorElement } from '@/components/molecules/error-element';
import { SearchBar } from '@/components/molecules/search-bar';
import { LoadingContainer } from '@/components/atoms/loading-container';
import { useSearch } from '@/hooks/use-search';
import { LoadingSpinner } from '@/components/molecules/loading-spinner';
import { EmptyView } from '@/components/molecules/empty-view';

export const Gallery = () => {
  const [query, handleSearch] = useSearch({});
  const { photos, loadMore, hasMore, loading, error, search } = usePexelsAPI(query);
  const containerRef = useRef<HTMLDivElement>(null);

  const { targetRef, isIntersecting } = useIntersectionObserver({
    root: containerRef.current,
    enabled: !!photos.length,
  });

  useEffect(() => {
    if (isIntersecting && photos?.length && hasMore && !loading) {
      console.log('Load more');
      void loadMore();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isIntersecting]);

  const onSearch = useCallback(
    (query: string) => handleSearch(query, search),
    [handleSearch, search]
  );

  return (
    <div>
      <SearchBar onSearch={onSearch} initialValue={query} />
      <div>
        <Show
          visible={!error}
          fallback={<ErrorElement message={(error as { message: string })?.message || undefined} />}
        >
          <LoadingContainer loading={loading && !photos.length} loader={<LoadingSpinner />}>
            <Show visible={!!photos.length} fallback={<EmptyView />}>
              <VirtualizedGrid
                containerRef={containerRef}
                photos={photos}
                loadMoreTrigger={<LoadMoreTrigger ref={targetRef} />}
              />
            </Show>
          </LoadingContainer>
        </Show>
      </div>
    </div>
  );
};
