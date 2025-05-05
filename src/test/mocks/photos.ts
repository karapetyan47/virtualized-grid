import { I_Photo } from '@/core/types/pexels';

export const C_MockPhoto = {
  id: 1,
  width: 1000,
  height: 1500,
  url: 'https://example.com/photo1',
  photographer: 'Test Photographer',
  photographer_url: 'https://example.com/photographer',
  photographer_id: 101,
  avg_color: '#FFFFFF',
  src: {
    original: 'https://example.com/original',
    large2x: 'https://example.com/large2x',
    large: 'https://example.com/large',
    medium: 'https://example.com/medium',
    small: 'https://example.com/small',
    portrait: 'https://example.com/portrait',
    landscape: 'https://example.com/landscape',
    tiny: 'https://example.com/tiny',
  },
  liked: false,
  alt: 'Test Photo',
};

export const C_MockPhotos = [
  {
    id: 1,
    width: 800,
    height: 600,
    url: 'https://example.com/photo1',
    photographer: 'Jane Doe',
    photographer_url: 'https://example.com/photographer1',
    photographer_id: 101,
    avg_color: '#CCCCCC',
    src: {
      original: 'https://example.com/original1',
      large2x: 'https://example.com/large2x1',
      large: 'https://example.com/large1',
      medium: 'https://example.com/medium1',
      small: 'https://example.com/small1',
      portrait: 'https://example.com/portrait1',
      landscape: 'https://example.com/landscape1',
      tiny: 'https://example.com/tiny1',
    },
    liked: false,
    alt: 'Test Photo 1',
  },
  {
    id: 2,
    width: 600,
    height: 800,
    url: 'https://example.com/photo2',
    photographer: 'John Smith',
    photographer_url: 'https://example.com/photographer2',
    photographer_id: 102,
    avg_color: '#333333',
    src: {
      original: 'https://example.com/original2',
      large2x: 'https://example.com/large2x2',
      large: 'https://example.com/large2',
      medium: 'https://example.com/medium2',
      small: 'https://example.com/small2',
      portrait: 'https://example.com/portrait2',
      landscape: 'https://example.com/landscape2',
      tiny: 'https://example.com/tiny2',
    },
    liked: true,
    alt: 'Test Photo 2',
  },
];

export const C_MockEmptyPhotos: I_Photo[] = [];
