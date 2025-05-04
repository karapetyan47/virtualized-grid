import { InfoSection } from '@/components/atoms/info-section';
import { Meta, SkeletonMetaItem } from '@/components/atoms/meta';
import { SkeletonPulse } from '@/components/atoms/skeleton-pulse';
import { TitleSkeleton } from '@/components/atoms/title';

export const DetailSectionSkeleton = () => (
  <InfoSection>
    <TitleSkeleton>
      <SkeletonPulse />
    </TitleSkeleton>

    <Meta.MetaInfo>
      {[...Array(4)].map((_, index) => (
        <SkeletonMetaItem key={index}>
          <SkeletonPulse />
        </SkeletonMetaItem>
      ))}
    </Meta.MetaInfo>
  </InfoSection>
);
