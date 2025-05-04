import { ArrowLeft } from 'lucide-react';

import { I_Photo } from '@/core/types/pexels';
import { Container } from '@/components/atoms/container';
import { BackButton } from '@/components/atoms/back-button';
import { PhotoContainer } from '@/components/atoms/photo-container';
import { ImageSection, ImageSectionSkeleton } from '@/components/molecules/image-section';
import { DetailSectionSkeleton, DetailsSection } from '@/components/molecules/details-section';

interface I_Props {
  photo?: I_Photo | null;
  onBack: () => void;
  loading?: boolean;
}

export const DetailedPhotoView = ({ photo, onBack, loading = false }: I_Props) => {
  const dimensions = photo ? `${photo.width} × ${photo.height}` : '';
  const dataLoading = loading || !photo;

  return (
    <Container>
      <BackButton onClick={onBack}>
        <ArrowLeft size={18} />
        Back to Gallery
      </BackButton>

      <PhotoContainer>
        {dataLoading ? (
          <>
            <DetailSectionSkeleton />
            <ImageSectionSkeleton />
          </>
        ) : (
          <>
            <DetailsSection
              title={photo.alt}
              photographerUrl={photo.photographer_url}
              photographer={photo.photographer}
              dimensions={dimensions}
              color={photo.avg_color}
              id={photo.id}
            />
            <ImageSection
              src={photo.src.large2x}
              alt={photo.alt}
              photographer={photo.photographer}
              color={photo.avg_color}
              liked={photo.liked}
            />
          </>
        )}
      </PhotoContainer>
    </Container>
  );
};
