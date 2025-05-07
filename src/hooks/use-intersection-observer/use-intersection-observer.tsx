import { useCallback, useEffect, useRef, useState } from 'react';

interface I_Props {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
  enabled?: boolean;
}

export const useIntersectionObserver = ({
  threshold = 0,
  root = null,
  rootMargin = '300px',
  enabled = true,
}: I_Props) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const nodeRef = useRef<Element | null>(null);

  const callbackRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }

      nodeRef.current = node;

      if (node && enabled && typeof IntersectionObserver !== 'undefined') {
        observerRef.current = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (entry.target === node) {
                setIsIntersecting(entry.isIntersecting);
                setEntry(entry);
              }
            }
          },
          {
            root,
            rootMargin,
            threshold,
          }
        );

        observerRef.current.observe(node);
      }
    },
    [enabled, root, rootMargin, threshold]
  );

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, []);

  return { targetRef: callbackRef, isIntersecting, entry };
};
