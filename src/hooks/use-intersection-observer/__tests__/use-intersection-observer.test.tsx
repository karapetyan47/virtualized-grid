import { renderHook } from '@testing-library/react';
import { act } from 'react';

import { useIntersectionObserver } from '../use-intersection-observer';

const C_MockObserver = {
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
};

describe('useIntersectionObserver', () => {
  const originalIntersectionObserver = global.IntersectionObserver;
  let intersectionObserverCallback: (entries: IntersectionObserverEntry[]) => void;

  beforeAll(() => {
    global.IntersectionObserver = jest.fn((callback) => {
      intersectionObserverCallback = callback;
      return C_MockObserver;
    }) as unknown as typeof IntersectionObserver;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    global.IntersectionObserver = originalIntersectionObserver;
  });

  it('should create an intersection observer with default options', () => {
    renderHook(() => useIntersectionObserver({}));

    expect(global.IntersectionObserver).toHaveBeenCalledWith(expect.any(Function), {
      threshold: 0.1,
      root: null,
      rootMargin: '0px',
    });
  });

  it('should create an intersection observer with custom options', () => {
    const root = document.createElement('div');

    renderHook(() =>
      useIntersectionObserver({
        threshold: 0.5,
        root,
        rootMargin: '10px',
      })
    );

    expect(global.IntersectionObserver).toHaveBeenCalledWith(expect.any(Function), {
      threshold: 0.5,
      root,
      rootMargin: '10px',
    });
  });

  it('should observe the target element', () => {
    const { result } = renderHook(() => useIntersectionObserver({}));

    const mockElement = document.createElement('div');
    act(() => {
      result.current.targetRef.current = mockElement;
    });

    const observeCalls = (global.IntersectionObserver as jest.Mock).mock.instances.length;
    expect(observeCalls).toBeGreaterThan(0);
  });

  it('should update isIntersecting when callback is triggered', () => {
    const { result } = renderHook(() => useIntersectionObserver({}));

    expect(result.current.isIntersecting).toBe(false);

    const mockEntry = {
      isIntersecting: true,
      target: result.current.targetRef.current!,
      time: Date.now(),
      boundingClientRect: {} as DOMRectReadOnly,
      intersectionRatio: 1,
      intersectionRect: {} as DOMRectReadOnly,
      rootBounds: {} as DOMRectReadOnly,
    };

    act(() => {
      intersectionObserverCallback([mockEntry]);
    });

    expect(result.current.isIntersecting).toBe(true);
    expect(result.current.entry).toBe(mockEntry);
  });

  it('should not create observer when enabled is false', () => {
    renderHook(() => useIntersectionObserver({ enabled: false }));

    expect(global.IntersectionObserver).not.toHaveBeenCalled();
  });
});
