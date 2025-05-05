import { fireEvent } from '@testing-library/react';
import { useRef } from 'react';
import React from 'react';

import { VirtualizedGrid } from '../virtualized-grid';

import { I_Photo } from '@/core/types/pexels';
import { renderWithProviders } from '@/test/utils/render-with-providers';
import { C_MockPhotos } from '@/test/mocks/photos';

jest.mock('@/hooks/use-virtualization', () => ({
  useVirtualization: ({ photos }: { photos: I_Photo[] }) => ({
    visibleItems: photos.map((photo, index) => ({
      photo,
      id: `${photo.id}-${index}`,
      top: index * 300,
      left: 0,
      width: 200,
      height: 300,
    })),
    totalHeight: photos.length * 300,
  }),
}));

jest.mock('@/hooks/use-breackpoint-columns', () => ({
  useBreakpointColumns: () => 3,
}));

const VirtualizedGridWrapper = ({ photos = C_MockPhotos }) => {
  const containerRef = useRef(null);
  return <VirtualizedGrid photos={photos} containerRef={containerRef} />;
};

describe('VirtualizedGrid', () => {
  it('should render grid items for each visible photo', () => {
    renderWithProviders(<VirtualizedGridWrapper />);

    const gridItems = document.querySelectorAll('div[data-test=grid-item]');
    expect(gridItems.length).toBe(C_MockPhotos.length);
  });

  it('should navigate when grid item is clicked', () => {
    renderWithProviders(<VirtualizedGridWrapper />);

    const firstGridItem = document.querySelector('div[data-test=grid-item]');
    fireEvent.click(firstGridItem!);

    expect(global.mockNavigate).toHaveBeenCalledWith(String(C_MockPhotos[0].id));
  });

  it('should update on scroll', () => {
    const setScrollTopMock = jest.fn();
    jest
      .spyOn(React, 'useState')
      .mockImplementation((initialState: number = 0) => [initialState, setScrollTopMock]);

    renderWithProviders(<VirtualizedGridWrapper />);

    const gridContainer = document.querySelector('div[data-test=grid-container]');
    fireEvent.scroll(gridContainer!, { target: { scrollTop: 100 } });

    expect(setScrollTopMock).toHaveBeenCalledWith(100);
  });

  it('should handle empty photos array', () => {
    renderWithProviders(<VirtualizedGridWrapper photos={[]} />);

    const gridItems = document.querySelectorAll('div[data-test=grid-item]');
    expect(gridItems.length).toBe(0);
  });
});
