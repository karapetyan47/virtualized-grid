import { getOptimalImageSize } from '../get-optimal-image-size';

import { C_MockPhoto } from '@/test/mocks/photos';

describe('getOptimalImageSize', () => {
  it('should return small image for container width <= 300px', () => {
    const result = getOptimalImageSize(C_MockPhoto, 300);
    expect(result).toBe(C_MockPhoto.src.small);
  });

  it('should return medium image for container width <= 600px', () => {
    const result = getOptimalImageSize(C_MockPhoto, 500);
    expect(result).toBe(C_MockPhoto.src.medium);
  });

  it('should return large image for container width <= 1200px', () => {
    const result = getOptimalImageSize(C_MockPhoto, 1000);
    expect(result).toBe(C_MockPhoto.src.large);
  });

  it('should return large2x image for container width > 1200px', () => {
    const result = getOptimalImageSize(C_MockPhoto, 1500);
    expect(result).toBe(C_MockPhoto.src.large2x);
  });

  it('should handle edge cases at breakpoints', () => {
    expect(getOptimalImageSize(C_MockPhoto, 300)).toBe(C_MockPhoto.src.small);
    expect(getOptimalImageSize(C_MockPhoto, 301)).toBe(C_MockPhoto.src.medium);

    expect(getOptimalImageSize(C_MockPhoto, 600)).toBe(C_MockPhoto.src.medium);
    expect(getOptimalImageSize(C_MockPhoto, 601)).toBe(C_MockPhoto.src.large);

    expect(getOptimalImageSize(C_MockPhoto, 1200)).toBe(C_MockPhoto.src.large);
    expect(getOptimalImageSize(C_MockPhoto, 1201)).toBe(C_MockPhoto.src.large2x);
  });
});
