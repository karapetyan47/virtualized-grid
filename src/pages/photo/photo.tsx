import { useNavigate, useParams } from 'react-router';
import { useLocation } from 'react-router';
import { useCallback } from 'react';

import { DetailedPhotoView } from '@/components/templates/detailed-photo-view';
import { fetchPhotoById } from '@/api/pexels';
import { useFetch } from '@/hooks/use-fetch/use-fetch';
import { Show } from '@/components/atoms/show';
import { ErrorElement } from '@/components/molecules/error-element';

export const Photo = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { data, isLoading, error } = useFetch({
    fetcher: fetchPhotoById,
    initialArgs: Number(id),
  });

  const handleBack = useCallback(() => {
    const searchParam = state ? `?q=${state}` : '';
    void navigate(`../${searchParam}`);
  }, [navigate, state]);

  return (
    <Show
      visible={!error}
      fallback={<ErrorElement message={(error as { message: string })?.message || undefined} />}
    >
      <DetailedPhotoView photo={data} onBack={handleBack} loading={isLoading} />
    </Show>
  );
};
