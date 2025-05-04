import styled from 'styled-components';

export const StyledDiv = styled.div<{ $avgColor: string }>`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.$avgColor || '#f0f0f0'};
`;
