import { baseFetcher } from './base-fetcher';

import { I_PexelsResponse } from '@/core/types/pexels';

export const fetchCuratedPhotos = async (
  page: number = 1,
  perPage: number = 30
): Promise<I_PexelsResponse> => {
  return baseFetcher<I_PexelsResponse>(`/curated?page=${page}&per_page=${perPage}`);
};
