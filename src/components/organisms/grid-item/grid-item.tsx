import { memo, RefObject } from 'react';

import { T_Position } from '@/core/types/virtualization';
import { I_Photo } from '@/core/types/pexels';
import { Show } from '@/components/atoms/show';
import { FallbackGridPhoto } from '@/components/atoms/fallback-grid-photo';
import { GridPhotoContainer } from '@/components/atoms/grid-photo-container';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { GridPhotoInfo } from '@/components/atoms/grid-photo-info';
import { ProgressiveImage } from '@/components/molecules/progressive-image';

interface I_Props {
  photo: I_Photo;
  position: T_Position;
  viewport: RefObject<HTMLElement | null>;
  onClick: () => void;
  optimalSrc: string;
}

export const GridItem = memo(({ photo, position, viewport, optimalSrc, onClick }: I_Props) => {
  const { targetRef, isIntersecting } = useIntersectionObserver({
    root: viewport.current,
    rootMargin: '200px',
    threshold: 0.01,
  });

  return (
    <GridPhotoContainer
      data-test="grid-item"
      data-top={position.top}
      data-left={position.left}
      ref={targetRef}
      $top={position.top}
      $left={position.left}
      $width={position.width}
      $height={position.height}
      onClick={onClick}
    >
      <Show visible={isIntersecting} fallback={<FallbackGridPhoto $avgColor={photo.avg_color} />}>
        <>
          <ProgressiveImage
            src={optimalSrc || null}
            placeholderSrc={photo.src.tiny}
            alt={photo.alt}
            avgColor={photo.avg_color}
          />
          <GridPhotoInfo className="photo-info">
            <span>{photo.photographer}</span>
          </GridPhotoInfo>
        </>
      </Show>
    </GridPhotoContainer>
  );
});
