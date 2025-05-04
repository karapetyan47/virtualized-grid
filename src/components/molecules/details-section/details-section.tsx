import { ColorSquare } from '@/components/atoms/color-square';
import { InfoSection } from '@/components/atoms/info-section';
import { Meta } from '@/components/atoms/meta';
import { PhotographerLink } from '@/components/atoms/photographer-link';
import { Title } from '@/components/atoms/title';

const { MetaInfo, MetaItem, MetaLabel, MetaValue } = Meta;

interface I_Props {
  title: string;
  photographerUrl: string;
  photographer: string;
  dimensions: string;
  color: string;
  id: number;
}

export const DetailsSection = ({
  title,
  photographerUrl,
  photographer,
  dimensions,
  color,
  id,
}: I_Props) => {
  return (
    <InfoSection>
      <div>
        <Title>{title || 'Untitled Photo'}</Title>
      </div>

      <MetaInfo>
        <MetaItem>
          <MetaLabel>Photographer:</MetaLabel>
          <MetaValue>
            <PhotographerLink href={photographerUrl} target="_blank" rel="noopener noreferrer">
              {photographer}
            </PhotographerLink>
          </MetaValue>
        </MetaItem>

        <MetaItem>
          <MetaLabel>Dimensions:</MetaLabel>
          <MetaValue>{dimensions}</MetaValue>
        </MetaItem>

        <MetaItem>
          <MetaLabel>Color:</MetaLabel>
          <MetaValue>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <ColorSquare $color={color} />
              {color}
            </div>
          </MetaValue>
        </MetaItem>

        <MetaItem>
          <MetaLabel>ID:</MetaLabel>
          <MetaValue>{id}</MetaValue>
        </MetaItem>
      </MetaInfo>
    </InfoSection>
  );
};
