import { ColorStripSkeleton } from '@/components/atoms/color-strip';
import { ImageWrapperSkeleton } from '@/components/atoms/image-wrapper';
import { SkeletonPulse } from '@/components/atoms/skeleton-pulse';

export const ImageSectionSkeleton = () => (
  <ImageWrapperSkeleton>
    <SkeletonPulse />
    <ColorStripSkeleton>
      <SkeletonPulse />
    </ColorStripSkeleton>
  </ImageWrapperSkeleton>
);
