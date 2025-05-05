import { renderHook } from '@testing-library/react';
import { act } from 'react';

import { useBreakpointColumns } from '../use-breakpoint-columns';

describe('useBreakpointColumns', () => {
  const mockRef = {
    current: {} as HTMLElement & { offsetWidth: number },
  };
  beforeEach(() => {
    mockRef.current.offsetWidth = 800;
  });

  it('should return correct column count for given width', () => {
    const { result } = renderHook(() => useBreakpointColumns({ containerRef: mockRef }));

    expect(result.current).toBe(4);
  });

  it('should update columns when width changes', () => {
    const { result, rerender } = renderHook(() => useBreakpointColumns({ containerRef: mockRef }));

    expect(result.current).toBe(4);

    mockRef.current.offsetWidth = 1200;

    act(() => {
      window.dispatchEvent(new Event('resize'));
    });

    rerender();

    expect(result.current).toBe(5);
  });

  it('should handle custom breakpoints', () => {
    const C_CustomBreakpoints = {
      0: 1,
      500: 2,
      1000: 3,
    };

    const { result } = renderHook(() =>
      useBreakpointColumns({
        containerRef: mockRef,
        breakpoints: C_CustomBreakpoints,
      })
    );

    expect(result.current).toBe(2);

    mockRef.current.offsetWidth = 1100;

    act(() => {
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toBe(3);
  });

  it('should handle null containerRef', () => {
    const nullRef = { current: null };

    const { result } = renderHook(() => useBreakpointColumns({ containerRef: nullRef }));

    expect(result.current).toBe(1);
  });

  it('should use smallest breakpoint when width is less than any breakpoint', () => {
    mockRef.current.offsetWidth = 100;

    const { result } = renderHook(() => useBreakpointColumns({ containerRef: mockRef }));

    expect(result.current).toBe(1);
  });

  it('should cleanup resize event listener on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

    const { unmount } = renderHook(() => useBreakpointColumns({ containerRef: mockRef }));

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
  });
});
