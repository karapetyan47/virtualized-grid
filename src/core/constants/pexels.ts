export const C_PexelsApiKey = (() => {
  if (typeof import.meta.env.VITE_APP_PEXELS_API_KEY === 'undefined') {
    throw new Error('VITE_APP_PEXELS_API_KEY env variable missed');
  }

  return import.meta.env.VITE_APP_PEXELS_API_KEY;
})();

export const C_PexelsApiUrl = 'https://api.pexels.com/v1';
