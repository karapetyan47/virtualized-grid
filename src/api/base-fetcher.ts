import { C_PexelsApiKey, C_PexelsApiUrl } from '@/core/constants/pexels';

export const baseFetcher = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const headers = {
    Authorization: C_PexelsApiKey,
    ...options.headers,
  };

  try {
    const response = await fetch(`${C_PexelsApiUrl}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error('Error fetching from API:', error);
    throw error;
  }
};
