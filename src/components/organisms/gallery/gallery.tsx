import { useState, useRef, useCallback, useMemo, DOMAttributes } from 'react';

import { GalleryItem } from '@/components/molecules/gallery-item';
import { T_Dimension, T_Position } from '@/core/types/virtualization';
import { usePexelsAPI } from '@/hooks/use-pexels-api/use-pexels-api';

export const Gallery = () => {
  const { photos, loadMore } = usePexelsAPI();
  const [dimensions, setDimensions] = useState<Record<number, T_Dimension>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const columnCount = 4;
  const gap = 8;
  const viewportRef = useRef<HTMLDivElement>(null);

  const [positions, totalHeight] = useMemo(() => {
    const containerWidth = containerRef.current?.offsetWidth || 0;
    const columnWidth = (containerWidth - 12 - (columnCount - 1) * gap) / columnCount;
    const newHeights: number[] = Array(columnCount).fill(0);
    const newPositions: T_Position[] = [];

    photos.forEach(({ id }, index) => {
      const shortestColumn = newHeights.indexOf(Math.min(...newHeights));
      const aspectRatio = dimensions[id]?.height / dimensions[id]?.width || 1;
      const height = columnWidth * aspectRatio;

      newPositions[index] = {
        top: newHeights[shortestColumn],
        left: shortestColumn * (columnWidth + gap),
        width: columnWidth,
        height,
      };

      newHeights[shortestColumn] += height + gap;
    });

    // columnHeights.current = newHeights;
    const totalHeight = Math.max(...newHeights) || 0;

    return [newPositions, totalHeight];
  }, [photos, dimensions, columnCount, gap]);

  const [startIndex, endIndex] = useMemo(() => {
    const viewportHeight = containerRef.current?.offsetHeight || 0;
    const buffer = viewportHeight;
    const startIndex = positions.findIndex(
      (pos) => pos.top + pos.height > Math.max(0, scrollTop - buffer)
    );
    const endIndex = positions.findIndex((pos) => pos.top > scrollTop + viewportHeight + buffer);

    return [startIndex, endIndex];
  }, [positions, scrollTop]);

  const virtualizedPhotos = useMemo(() => {
    return photos.slice(
      Math.max(0, startIndex - 5),
      endIndex === -1 ? photos.length : Math.min(endIndex + 5, photos.length)
    );
  }, [endIndex, photos, startIndex]);

  const handleScroll = useCallback<Required<DOMAttributes<HTMLDivElement>>['onScroll']>((e) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  const handleMeasure = useCallback(
    (id: number) => (width: number, height: number) => {
      if (!dimensions[id] || dimensions[id].width !== width || dimensions[id].height !== height) {
        setDimensions((prev) => ({ ...prev, [id]: { width, height } }));
      }
    },
    [dimensions]
  );

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      style={{
        height: '100vh',
        overflowY: 'auto',
        position: 'relative',
      }}
    >
      <div ref={viewportRef} style={{ height: totalHeight }}>
        {virtualizedPhotos.map((photo, i) => {
          const index = Math.max(0, startIndex - 5) + i;
          return (
            <GalleryItem
              viewport={containerRef.current}
              key={photo.id}
              photo={photo}
              position={positions[index]}
              onMeasure={handleMeasure(photo.id)}
            />
          );
        })}
      </div>
      <button
        onClick={() => {
          loadMore()
            .then()
            .catch(() => {});
        }}
      >
        LoadMore
      </button>
    </div>
  );
};
