import { styled } from 'styled-components';

export const StyledDiv = styled.div<{ $color: string }>`
  height: ${({ theme }) => theme.sizes.colorStripHeight};
  width: 100%;
  background-color: ${(props) => props.$color};
`;
