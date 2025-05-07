import { styled } from 'styled-components';

export const StyledInput = styled.input`
  width: 100%;
  max-width: 600px;
  padding: 0.75rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: ${({ theme }) => theme.colors.focusedBorderColor};
  }
`;
