import { useCallback } from 'react';

import { Photo } from '@/components/atoms/photo';
import { FallbackGridPhoto } from '@/components/atoms/fallback-grid-photo';
import { useLoadImage } from '@/hooks/use-load-image';

interface I_Props {
  src: string | null;
  placeholderSrc: string;
  alt: string;
  avgColor: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
}

export const ProgressiveImage = ({
  src,
  placeholderSrc,
  alt,
  avgColor,
  width,
  height,
  priority = false,
  sizes = '100vw',
}: I_Props) => {
  const { loadedSrc, isLoaded, error } = useLoadImage({ src, placeholderSrc });

  const handleOnLoad = useCallback(() => {
    if (window.performance && performance.mark) {
      performance.mark(`img-loaded-${loadedSrc?.split('/').pop()}`);
    }
  }, [loadedSrc]);

  if (error) {
    return <FallbackGridPhoto data-test="fallback" $avgColor={avgColor} />;
  }

  return (
    <>
      <Photo
        src={placeholderSrc}
        alt=""
        aria-hidden="true"
        $loaded={true}
        $placeholder={true}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        sizes={sizes}
        width={width}
        height={height}
      />
      <Photo
        src={loadedSrc}
        alt={alt}
        $loaded={isLoaded}
        $placeholder={false}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        sizes={sizes}
        width={width}
        height={height}
        onLoad={handleOnLoad}
      />
    </>
  );
};
