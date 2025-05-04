import { ColorStrip } from '@/components/atoms/color-strip';
import { ImageWrapper } from '@/components/atoms/image-wrapper';
import { LikeIndicator } from '@/components/atoms/like-indicator';
import { MainImage } from '@/components/atoms/main-image';
import { Show } from '@/components/atoms/show';

interface I_DataProps {
  src: string;
  alt: string;
  photographer: string;
  color: string;
  liked: boolean;
}

export const ImageSection = ({ src, alt, photographer, color, liked }: I_DataProps) => {
  return (
    <ImageWrapper>
      <MainImage src={src} alt={alt || `Photo by ${photographer}`} />
      <ColorStrip color={color} />
      <Show visible={liked}>
        <LikeIndicator liked={liked}>❤️</LikeIndicator>
      </Show>
    </ImageWrapper>
  );
};
