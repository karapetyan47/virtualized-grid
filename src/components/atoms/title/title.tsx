import { styled } from 'styled-components';

export const StyledH1 = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSizeLarge};
  font-weight: 700;
  margin: 0;
  color: ${({ theme }) => theme.colors.textPrimary};
`;
