import { renderHook } from '@testing-library/react';

import { useVirtualization } from '../use-virtualization';

import { C_MockPhotos, C_MockEmptyPhotos } from '@/test/mocks/photos';

jest.mock('lodash.debounce', () => {
  return (fn: (...args: unknown[]) => unknown): jest.Mock => {
    const mockFn = jest.fn(fn) as jest.Mock & { cancel: jest.Mock };
    mockFn.cancel = jest.fn();
    return mockFn;
  };
});

describe('useVirtualization', () => {
  const C_DefaultProps = {
    photos: C_MockPhotos,
    containerWidth: 1000,
    columnCount: 3,
    containerHeight: 800,
    scrollTop: 0,
  };

  it('should calculate layout correctly', () => {
    const { result } = renderHook(() => useVirtualization(C_DefaultProps));

    expect(result.current.visibleItems).toHaveLength(C_MockPhotos.length);
    expect(result.current.totalHeight).toBeGreaterThan(0);
  });

  it('should filter visible items based on scroll position', () => {
    const { result, rerender } = renderHook(
      ({ scrollTop, extraViewportArea }) =>
        useVirtualization({
          ...C_DefaultProps,
          scrollTop,
          extraViewportArea,
        }),
      {
        initialProps: { scrollTop: 0, extraViewportArea: 0 },
      }
    );

    const initialVisibleItems = result.current.visibleItems.length;

    rerender({ scrollTop: 2000, extraViewportArea: 0 });

    expect(result.current.visibleItems.length).toBeLessThanOrEqual(initialVisibleItems);
  });

  it('should recalculate layout when dependencies change', () => {
    const { result, rerender } = renderHook(
      ({ columnCount }) =>
        useVirtualization({
          ...C_DefaultProps,
          columnCount,
        }),
      {
        initialProps: { columnCount: 3 },
      }
    );

    const initialLayout = {
      visibleItems: JSON.parse(JSON.stringify(result.current.visibleItems)),
      totalHeight: result.current.totalHeight,
    };

    rerender({ columnCount: 2 });

    expect(result.current.visibleItems[1].left).not.toEqual(initialLayout.visibleItems[1].left);
    expect(result.current.totalHeight).not.toEqual(initialLayout.totalHeight);
  });

  it('should handle empty photos array', () => {
    const { result } = renderHook(() =>
      useVirtualization({
        ...C_DefaultProps,
        photos: C_MockEmptyPhotos,
      })
    );

    expect(result.current.visibleItems).toHaveLength(0);
    expect(result.current.totalHeight).toBe(0);
  });
});
