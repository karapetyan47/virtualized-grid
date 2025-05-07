import { Spinner } from '@/components/atoms/spinner';
import { SpinnerContainer } from '@/components/atoms/spinner-container';

export const LoadingSpinner = () => {
  return (
    <SpinnerContainer>
      <Spinner role="progressbar" aria-label="Loading..." />
    </SpinnerContainer>
  );
};
