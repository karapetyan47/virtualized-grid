import { useState, useCallback, useEffect, useMemo } from 'react';
import debounce from 'lodash.debounce';

import { C_RecalculationDelay } from './constants';

import { I_Photo } from '@/core/types/pexels';
import { I_GridItem } from '@/core/types/virtualization';
import { C_Gap } from '@/core/constants/grid';

interface I_Props {
  photos: I_Photo[];
  containerWidth: number;
  columnCount: number;
  containerHeight: number;
  scrollTop: number;
  extraViewportArea?: number;
}

export const useVirtualization = ({
  photos,
  containerWidth,
  columnCount,
  containerHeight,
  scrollTop,
  extraViewportArea = 5,
}: I_Props) => {
  const [items, setItems] = useState<I_GridItem[]>([]);

  const calculateLayout = useCallback(() => {
    const columnWidth = (containerWidth - (columnCount + 1) * C_Gap) / columnCount;
    const columnHeights: number[] = Array(columnCount).fill(0);
    const newItems: I_GridItem[] = [];

    photos.forEach((photo) => {
      const shortestColumn = columnHeights.indexOf(Math.min(...columnHeights));
      const aspectRatio = photo.height / photo.width || 1;
      const height = columnWidth * aspectRatio;

      newItems.push({
        photo,
        top: columnHeights[shortestColumn],
        left: shortestColumn * (columnWidth + C_Gap),
        width: columnWidth,
        height,
      });

      columnHeights[shortestColumn] += height + C_Gap;
    });

    setItems(newItems);
  }, [columnCount, containerWidth, photos]);

  const debouncedCalculateLayout = useMemo(
    () => debounce(calculateLayout, C_RecalculationDelay),
    [calculateLayout]
  );

  useEffect(() => {
    debouncedCalculateLayout();
    return () => debouncedCalculateLayout.cancel();
  }, [debouncedCalculateLayout]);

  const visibleItems = useMemo(() => {
    if (items.length === 0) return [];

    const viewportTop = scrollTop;
    const viewportBottom = scrollTop + containerHeight;

    const extraTop = viewportTop - containerHeight * extraViewportArea;
    const extraBottom = viewportBottom + containerHeight * extraViewportArea;

    return items.filter((item) => {
      const itemTop = item.top;
      const itemBottom = item.top + item.height;

      return (
        (itemTop >= extraTop && itemTop <= extraBottom) ||
        (itemBottom >= extraTop && itemBottom <= extraBottom) ||
        (itemTop <= extraTop && itemBottom >= extraBottom)
      );
    });
  }, [items, scrollTop, containerHeight, extraViewportArea]);

  const totalHeight = useMemo(() => {
    if (items.length === 0) return 0;
    const lastItem = items[items.length - 1];
    return lastItem.top + lastItem.height;
  }, [items]);

  return { visibleItems, totalHeight };
};
