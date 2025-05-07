import styled from 'styled-components';

import { C_Gap } from '@/core/constants/grid';

export const StyledDiv = styled.div`
  height: ${({ theme }) => `calc(100vh - 20px - ${theme.sizes.searchBarHeight})`};
  margin: 10px 0;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  padding: 0 ${C_Gap}px;
`;
