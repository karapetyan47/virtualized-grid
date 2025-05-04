import { styled } from 'styled-components';

import { C_Shimmer } from './constants';

export const StyledDiv = styled.div`
  background: ${({ theme }) =>
    `linear-gradient(90deg, ${theme.colors.skeletonStart} 25%, ${theme.colors.skeletonMiddle} 50%, ${theme.colors.skeletonStart} 75%)`};
  background-size: 200px 100%;
  animation: ${C_Shimmer} + ${({ theme }) => ` ${theme.animation.shimmerDuration} infinite linear`};
  border-radius: 4px;
  height: 100%;
  width: 100%;
`;
