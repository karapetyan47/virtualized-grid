import { C_ErrorMessage, C_ErrorTitle } from './constants';

import { Error as ErrorComponent } from '@/components/atoms/error';
import { Show } from '@/components/atoms/show';
const { ErrorContainer, ErrorHeading, ErrorMessage, ErrorStack } = ErrorComponent;

interface I_Props {
  title?: string;
  message?: string;
  error?: Error | null;
}

export const ErrorElement = ({
  title = C_ErrorTitle,
  message = C_ErrorMessage,
  error,
}: I_Props) => {
  return (
    <ErrorContainer>
      <ErrorHeading>{title}</ErrorHeading>
      <ErrorMessage>{message}</ErrorMessage>
      <Show visible={!!error}>
        <ErrorStack>{error?.toString()}</ErrorStack>
      </Show>
    </ErrorContainer>
  );
};
