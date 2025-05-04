import { useState, useCallback, DOMAttributes, useEffect, ReactNode, RefObject } from 'react';

import { T_Dimension } from '@/core/types/virtualization';
import { useVirtualization } from '@/hooks/use-virtualization';
import { useBreakpointColumns } from '@/hooks/use-breackpoint-columns';
import { GridContainer } from '@/components/atoms/grid-container';
import { GridItem } from '@/components/molecules/grid-item';
import { I_Photo } from '@/core/types/pexels';

interface I_Props {
  photos: I_Photo[];
  loadMoreTrigger?: ReactNode;
  containerRef: RefObject<HTMLDivElement | null>;
}

export const VirtualizedGrid = ({ photos, loadMoreTrigger, containerRef }: I_Props) => {
  const [scrollTop, setScrollTop] = useState(0);
  const columnCount = useBreakpointColumns({ containerRef });

  const handleScroll = useCallback<Required<DOMAttributes<HTMLDivElement>>['onScroll']>((e) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  const [containerDimensions, setContainerDimensions] = useState<T_Dimension>({
    width: containerRef.current?.offsetWidth || 0,
    height: containerRef.current?.clientHeight || 0,
  });
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
  }, [containerDimensions, containerRef]);

  const { visibleItems, totalHeight } = useVirtualization({
    photos,
    containerWidth: containerDimensions.width,
    columnCount,
    containerHeight: containerDimensions.height,
    scrollTop,
    extraViewportArea: 0.5,
  });

  return (
    <GridContainer ref={containerRef} onScroll={handleScroll}>
      <div style={{ height: totalHeight }}>
        {visibleItems.map(({ photo, id, ...positions }) => {
          return <GridItem viewport={containerRef} key={id} photo={photo} position={positions} />;
        })}
      </div>
      {loadMoreTrigger}
    </GridContainer>
  );
};
