import { useState, useCallback, DOMAttributes, useEffect, ReactNode, RefObject } from 'react';

import { T_Dimension } from '@/core/types/virtualization';
import { useVirtualization } from '@/hooks/use-virtualization';
import { useBreakpointColumns } from '@/hooks/use-breackpoint-columns';
import { GridContainer } from '@/components/atoms/grid-container';
import { I_Photo } from '@/core/types/pexels';
import { getOptimalImageSize } from '@/utils/get-optimal-image-size';
import { GridItem } from '@/components/organisms/grid-item';
import { Show } from '@/components/atoms/show';

interface I_Props {
  photos: I_Photo[];
  loadMoreTrigger?: ReactNode;
  containerRef: RefObject<HTMLDivElement | null>;
  onNavigate: (id: number) => () => void;
}

export const VirtualizedGrid = ({ photos, loadMoreTrigger, containerRef, onNavigate }: I_Props) => {
  const [scrollTop, setScrollTop] = useState(0);
  const [containerDimensions, setContainerDimensions] = useState<T_Dimension>({
    width: containerRef.current?.offsetWidth || 0,
    height: containerRef.current?.clientHeight || 0,
  });
  const columnCount = useBreakpointColumns({ containerRef });

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      const width = entries[0].contentRect.width;
      const height = entries[0].contentRect.height;

      if (width !== containerDimensions.width || height !== containerDimensions.height) {
        setContainerDimensions({ width, height });
      }
    });

    if (containerRef.current) resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef]);

  const { visibleItems, totalHeight } = useVirtualization({
    photos,
    containerWidth: containerDimensions.width,
    columnCount,
    containerHeight: containerDimensions.height,
    scrollTop,
    extraViewportArea: 0.5,
  });

  const handleScroll = useCallback<Required<DOMAttributes<HTMLDivElement>>['onScroll']>((e) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  return (
    <GridContainer data-test="grid-container" ref={containerRef} onScroll={handleScroll}>
      <div style={{ height: totalHeight }}>
        {visibleItems.map(({ photo, id, ...positions }) => (
          <GridItem
            key={id}
            viewport={containerRef}
            photo={photo}
            optimalSrc={getOptimalImageSize(photo, containerDimensions.width)}
            position={positions}
            onClick={onNavigate(photo.id)}
          />
        ))}
      </div>
      <Show visible={!!visibleItems.length}>{loadMoreTrigger}</Show>
    </GridContainer>
  );
};
