import { Photo } from '@/components/atoms/photo';
import { FallbackGridPhoto } from '@/components/atoms/fallback-grid-photo';
import { useLoadImage } from '@/hooks/use-load-image';

interface I_Props {
  src: string | null;
  placeholderSrc: string;
  alt: string;
  avgColor: string;
}

export const ProgressiveImage = ({ src, placeholderSrc, alt, avgColor }: I_Props) => {
  const { loadedSrc, isLoaded, error } = useLoadImage({ src, placeholderSrc });

  if (error) {
    return <FallbackGridPhoto $avgColor={avgColor} />;
  }

  return (
    <>
      <Photo
        src={placeholderSrc}
        alt={alt}
        $loaded={true}
        $placeholder={true}
        aria-hidden={isLoaded}
      />
      <Photo src={loadedSrc} alt={alt} $loaded={isLoaded} $placeholder={false} />
    </>
  );
};
