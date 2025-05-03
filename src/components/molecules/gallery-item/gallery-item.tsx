import { memo, useEffect, useLayoutEffect, useRef, useState } from 'react';

import { T_Position } from '@/core/types/virtualization';
import { I_Photo } from '@/core/types/pexels';

interface I_Props {
  photo: I_Photo;
  position: T_Position;
  onMeasure: (width: number, height: number) => void;
  viewport: HTMLElement | null;
}

export const GalleryItem = memo(({ photo, position, onMeasure, viewport }: I_Props) => {
  const imgRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const observer = useRef<IntersectionObserver>(null);

  useLayoutEffect(() => {
    observer.current = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        root: viewport,
        rootMargin: '200px',
        threshold: 0.01,
      }
    );

    if (imgRef.current) observer.current.observe(imgRef.current);
    return () => observer.current?.disconnect();
  }, [viewport]);

  useEffect(() => {
    if (!isVisible || !imgRef.current) return;

    const img = new window.Image();
    img.src = photo.src.medium;
    img.onload = () => {
      onMeasure(img.naturalWidth, img.naturalHeight);
    };
    img.onerror = () => {
      onMeasure(1, 1);
    };
  }, [isVisible, photo.src.medium, onMeasure]);

  return (
    <div
      ref={imgRef}
      style={{
        position: 'absolute',
        top: position?.top || 0,
        left: position?.left || 0,
        width: position?.width || '100%',
        height: position?.height || '100%',
        transition: 'opacity 0.3s ease',
        willChange: 'transform',
      }}
    >
      {isVisible ? (
        <img
          src={photo.src.medium}
          alt={photo.alt}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: position?.width ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        />
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#f0f0f0',
          }}
        />
      )}
    </div>
  );
});
