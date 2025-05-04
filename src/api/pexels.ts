import { baseFetcher } from './base-fetcher';

import { I_PexelsResponse, I_Photo } from '@/core/types/pexels';

export const fetchCuratedPhotos = async (
  page: number = 1,
  perPage: number = 30
): Promise<I_PexelsResponse> => {
  return baseFetcher<I_PexelsResponse>(`/curated?page=${page}&per_page=${perPage}`);
};

export const fetchPhotoById = async (id: number): Promise<I_Photo> => {
  return baseFetcher<I_Photo>(`/photos/${id}`);
};
