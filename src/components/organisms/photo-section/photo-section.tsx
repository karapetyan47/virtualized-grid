import { ColorStrip } from '@/components/atoms/color-strip';
import { PhotoWrapper } from '@/components/atoms/photo-wrapper';
import { LikeIndicator } from '@/components/atoms/like-indicator';
import { ImageContainer } from '@/components/atoms/image-container';
import { Show } from '@/components/atoms/show';
import { ImageRelativeContainer } from '@/components/atoms/image-relative-container';
import { ProgressiveImage } from '@/components/molecules/progressive-image';

interface I_Props {
  src: string;
  alt: string;
  photographer: string;
  color: string;
  liked: boolean;
  placeholderSrc: string;
  width: number;
  height: number;
}

export const PhotoSection = ({
  src,
  alt,
  photographer,
  color,
  liked,
  placeholderSrc,
  width,
  height,
}: I_Props) => {
  return (
    <PhotoWrapper>
      <ImageContainer $height={height} $width={width}>
        <ImageRelativeContainer>
          <ProgressiveImage
            src={src}
            placeholderSrc={placeholderSrc}
            alt={alt || `Photo by ${photographer}`}
            avgColor={color}
          />
        </ImageRelativeContainer>
        <ColorStrip color={color} />
        <Show visible={liked}>
          <LikeIndicator liked={liked}>❤️</LikeIndicator>
        </Show>
      </ImageContainer>
    </PhotoWrapper>
  );
};
