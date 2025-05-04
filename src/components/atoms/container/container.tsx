import { styled } from 'styled-components';

export const StyledDiv = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.containerPaddingMobile};
  background-color: ${({ theme }) => theme.colors.background};

  @media (min-width: 768px) {
    padding: ${({ theme }) => theme.spacing.containerPaddingDesktop};
  }
`;
