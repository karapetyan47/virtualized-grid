import { screen } from '@testing-library/react';

import { PhotoSection } from '../photo-section';

import { renderWithProviders } from '@/test/utils/render-with-providers';
import { C_MockPhoto } from '@/test/mocks/photos';
import { theme } from '@/core/constants/theme';

jest.mock('@/components/molecules/progressive-image', () => ({
  ProgressiveImage: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} data-testid="progressive-image" />
  ),
}));

describe('PhotoSection', () => {
  const C_DefaultProps = {
    src: C_MockPhoto.src.original,
    alt: C_MockPhoto.alt,
    photographer: C_MockPhoto.photographer,
    color: C_MockPhoto.avg_color,
    liked: C_MockPhoto.liked,
    placeholderSrc: C_MockPhoto.src.tiny,
    width: C_MockPhoto.width,
    height: C_MockPhoto.height,
  };

  it('should render with correct dimensions', () => {
    renderWithProviders(<PhotoSection {...C_DefaultProps} />);

    const container = document.querySelector('[data-test="image-container"]');
    expect(container).toBeInTheDocument();
    expect(container).toHaveStyle({
      maxHeight: theme.sizes.maxImageHeight,
      minHeight: '300px',
      maxWidth: `calc(${C_DefaultProps.width} / ${C_DefaultProps.height} * ${theme.sizes.maxImageHeight})`,
      minWidth: `calc(${C_DefaultProps.width} / ${C_DefaultProps.height} * 300px)`,
    });
  });

  it('should render photographer name', () => {
    renderWithProviders(<PhotoSection {...C_DefaultProps} />);

    expect(screen.getByAltText(C_MockPhoto.alt)).toBeInTheDocument();
  });

  it('should render ProgressiveImage with correct props', () => {
    renderWithProviders(<PhotoSection {...C_DefaultProps} />);

    const image = screen.getByTestId('progressive-image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', C_DefaultProps.src);
    expect(image).toHaveAttribute('alt', C_MockPhoto.alt);
  });
});
