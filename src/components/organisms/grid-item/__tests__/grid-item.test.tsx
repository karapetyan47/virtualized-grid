import { screen, fireEvent } from '@testing-library/react';

import { GridItem } from '../grid-item';

import { renderWithProviders } from '@/test/utils/render-with-providers';
import { C_MockPhoto } from '@/test/mocks/photos';

jest.mock('@/hooks/use-intersection-observer', () => ({
  useIntersectionObserver: () => ({
    targetRef: { current: null },
    isIntersecting: true,
  }),
}));

jest.mock('@/components/molecules/progressive-image', () => ({
  ProgressiveImage: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} data-testid="progressive-image" />
  ),
}));

const C_MockPosition = {
  top: 100,
  left: 200,
  width: 300,
  height: 450,
};

const C_MockViewportRef = {
  current: document.createElement('div'),
};

describe('GridItem', () => {
  const C_DefaultProps = {
    photo: C_MockPhoto,
    position: C_MockPosition,
    viewport: C_MockViewportRef,
    onClick: jest.fn(),
    optimalSrc: C_MockPhoto.src.medium,
  };

  it('should render with correct position and dimensions', () => {
    renderWithProviders(<GridItem {...C_DefaultProps} />);

    const container = document.querySelector('[data-top="100"][data-left="200"]');
    expect(container).toBeInTheDocument();
    expect(container).toHaveStyle({
      width: `${C_MockPosition.width}px`,
      height: `${C_MockPosition.height}px`,
    });
  });

  it('should render photographer name', () => {
    renderWithProviders(<GridItem {...C_DefaultProps} />);

    expect(screen.getByText(C_MockPhoto.photographer)).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    renderWithProviders(<GridItem {...C_DefaultProps} />);

    const container = document.querySelector('[data-top="100"][data-left="200"]');
    fireEvent.click(container!);

    expect(C_DefaultProps.onClick).toHaveBeenCalledTimes(1);
  });

  it('should render ProgressiveImage with correct props', () => {
    renderWithProviders(<GridItem {...C_DefaultProps} />);

    const image = screen.getByTestId('progressive-image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', C_DefaultProps.optimalSrc);
    expect(image).toHaveAttribute('alt', C_MockPhoto.alt);
  });
});
