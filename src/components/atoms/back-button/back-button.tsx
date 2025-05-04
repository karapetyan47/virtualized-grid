import { styled } from 'styled-components';

export const StyledButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.gapTiny};
  background: none;
  border: none;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textPrimary};
  cursor: pointer;
  padding: ${({ theme }) => `${theme.spacing.gapTiny} 0`};
  margin-bottom: ${({ theme }) => theme.spacing.gapMedium};
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.link};
  }
`;
