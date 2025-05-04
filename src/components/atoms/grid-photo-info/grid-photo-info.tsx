import { styled } from 'styled-components';

export const StyledDiv = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${({ theme }) => `linear-gradient(transparent, ${theme.colors.shadow})`};
  color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.gapSmall};
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.gapTiny};
`;
