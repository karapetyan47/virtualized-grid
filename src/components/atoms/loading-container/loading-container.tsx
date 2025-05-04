import { PropsWithChildren, ReactNode } from 'react';

interface I_Props {
  loading: boolean;
  loader: ReactNode;
}

export const LoadingContainer = ({ children, loader, loading }: PropsWithChildren<I_Props>) =>
  loading ? loader : children;
