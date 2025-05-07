import { useState, useCallback, useEffect, useMemo } from 'react';
import debounce from 'lodash.debounce';

import { C_RecalculationDelay } from './constants';

import { I_Photo } from '@/core/types/pexels';
import { I_GridItem } from '@/core/types/virtualization';
import { calculateGridLayout } from '@/utils/calculate-grid-layout';

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
    setItems(calculateGridLayout(photos, columnCount, containerWidth));
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

      return itemTop < extraBottom && itemBottom > extraTop;
    });
  }, [items, scrollTop, containerHeight, extraViewportArea]);

  const totalHeight = useMemo(() => {
    if (items.length === 0) return 0;
    const lastItem = items[items.length - 1];
    return lastItem.top + lastItem.height;
  }, [items]);

  return { visibleItems, totalHeight };
};
