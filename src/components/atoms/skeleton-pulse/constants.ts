import { keyframes } from 'styled-components';

export const C_Shimmer = keyframes`
0% {
  background-position: ${({ theme }) => `-${theme.animation.shimmerSize} 0`};
}
100% {
  background-position: ${({ theme }) => `${theme.animation.shimmerSize} 0`};
}
`;
