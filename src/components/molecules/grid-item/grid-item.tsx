import { memo, RefObject } from 'react';

import { T_Position } from '@/core/types/virtualization';
import { I_Photo } from '@/core/types/pexels';
import { Show } from '@/components/atoms/show';
import { FallbackGridPhoto } from '@/components/atoms/fallback-grid-photo';
import { GridPhoto } from '@/components/atoms/grid-photo';
import { GridPhotoContainer } from '@/components/atoms/grid-photo-container';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

interface I_Props {
  photo: I_Photo;
  position: T_Position;
  viewport: RefObject<HTMLElement | null>;
}

export const GridItem = memo(({ photo, position, viewport }: I_Props) => {
  const { targetRef, isIntersecting } = useIntersectionObserver({
    root: viewport.current,
    rootMargin: '200px',
    threshold: 0.01,
  });

  return (
    <GridPhotoContainer
      ref={targetRef}
      $top={position.top}
      $left={position.left}
      $width={position.width}
      $height={position.height}
    >
      <Show visible={isIntersecting} fallback={<FallbackGridPhoto $avgColor={photo.avg_color} />}>
        <GridPhoto src={photo.src.medium} alt={photo.alt} $visible={!!position?.width} />
      </Show>
    </GridPhotoContainer>
  );
});
