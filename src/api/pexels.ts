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

export const searchPhotos = async ({
  query,
  page = 1,
  perPage = 30,
}: {
  query: string;
  page: number;
  perPage?: number;
}): Promise<I_PexelsResponse> => {
  const encodedQuery = encodeURIComponent(query);
  return baseFetcher<I_PexelsResponse>(
    `/search?query=${encodedQuery}&page=${page}&per_page=${perPage}`
  );
};
