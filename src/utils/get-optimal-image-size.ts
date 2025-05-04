import { I_Photo } from '@/core/types/pexels';

export const getOptimalImageSize = (photo: I_Photo, containerWidth: number): string => {
  if (containerWidth <= 300) {
    return photo.src.small;
  } else if (containerWidth <= 600) {
    return photo.src.medium;
  } else if (containerWidth <= 1200) {
    return photo.src.large;
  } else {
    return photo.src.large2x;
  }
};
