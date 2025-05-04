import { useNavigate, useParams } from 'react-router';

import { DetailedPhotoView } from '@/components/organisms/detailed-photo-view';
import { fetchPhotoById } from '@/api/pexels';
import { useFetch } from '@/hooks/use-fetch/use-fetch';

export const Photo = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading } = useFetch({
    fetcher: fetchPhotoById,
    initialArgs: Number(id),
  });

  const handleBack = () => {
    void navigate('../');
  };

  return <DetailedPhotoView photo={data} onBack={handleBack} loading={isLoading} />;
};
