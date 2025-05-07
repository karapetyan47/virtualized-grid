import { styled } from 'styled-components';

import { C_Spin } from './constants';

export const StyledDiv = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: ${({ theme }) => theme.radius.round};
  animation: ${C_Spin} 1s linear infinite;
`;
