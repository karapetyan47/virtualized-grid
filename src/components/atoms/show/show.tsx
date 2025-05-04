import { PropsWithChildren, ReactNode } from 'react';

interface I_Props {
  visible: boolean;
  fallback?: null | ReactNode;
}

export const Show = ({ children, visible, fallback = null }: PropsWithChildren<I_Props>) => {
  return visible ? children : fallback;
};
