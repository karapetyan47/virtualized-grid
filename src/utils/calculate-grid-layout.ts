import { C_Gap } from '@/core/constants/grid';
import { I_Photo } from '@/core/types/pexels';
import { I_GridItem } from '@/core/types/virtualization';

export const calculateGridLayout = (
  photos: I_Photo[],
  columnCount: number,
  containerWidth: number
): I_GridItem[] => {
  const columnWidth = (containerWidth - (columnCount + 1) * C_Gap) / columnCount;
  const columnHeights: number[] = Array(columnCount).fill(0);
  const newItems: I_GridItem[] = new Array(photos.length);

  for (let i = 0; i < photos.length; i++) {
    const photo = photos[i];
    const shortestColumn = columnHeights.indexOf(Math.min(...columnHeights));
    const aspectRatio = photo.height / photo.width || 1;
    const height = columnWidth * aspectRatio;

    newItems[i] = {
      photo,
      top: columnHeights[shortestColumn],
      left: shortestColumn * (columnWidth + C_Gap) + 2 * C_Gap,
      width: columnWidth,
      height,
      id: `${photo.id}-${i}`,
    };

    columnHeights[shortestColumn] += height + C_Gap;
  }

  return newItems;
};
