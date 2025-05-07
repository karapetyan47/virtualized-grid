import { styled } from 'styled-components';

export const StyledDiv = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: 0 2px 4px ${({ theme }) => theme.colors.shadow};
  z-index: 100;
  display: flex;
  justify-content: center;
`;
