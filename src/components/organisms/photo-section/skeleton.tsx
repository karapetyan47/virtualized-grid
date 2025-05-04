import { ColorStripSkeleton } from '@/components/atoms/color-strip';
import { PhotoWrapperSkeleton } from '@/components/atoms/photo-wrapper';
import { SkeletonPulse } from '@/components/atoms/skeleton-pulse';

export const PhotoSectionSkeleton = () => (
  <PhotoWrapperSkeleton>
    <SkeletonPulse />
    <ColorStripSkeleton>
      <SkeletonPulse />
    </ColorStripSkeleton>
  </PhotoWrapperSkeleton>
);
