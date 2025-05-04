import { styled } from 'styled-components';

export const StyledDiv = styled.div`
  position: relative;
  border-radius: ${({ theme }) => theme.radius.md};
  overflow: hidden;
  box-shadow: ${({ theme }) => `0 4px 12px ${theme.colors.shadow}`};
  flex: 2;
`;
