import { useState, useEffect } from 'react';

import { imageLoader } from '@/utils/image-loader';

interface I_Props {
  placeholderSrc: string;
  src: string | null;
}

export const useLoadImage = ({ src, placeholderSrc }: I_Props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(placeholderSrc);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadImage = async () => {
      try {
        await imageLoader.loadImage(placeholderSrc);
        if (!isMounted) return;

        if (src) {
          const fullImage = await imageLoader.loadImage(src);
          if (!isMounted) return;

          setCurrentSrc(fullImage.src);
        }
        setIsLoaded(true);
      } catch (err) {
        if (!isMounted) return;
        setError(true);
        console.error('Error loading image:', err);
      }
    };

    setIsLoaded(false);
    setError(false);
    void loadImage();

    return () => {
      isMounted = false;
    };
  }, [src, placeholderSrc]);

  return { loadedSrc: currentSrc, isLoaded, error };
};
