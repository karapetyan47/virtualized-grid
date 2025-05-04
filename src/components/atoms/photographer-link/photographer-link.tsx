import { styled } from 'styled-components';

export const StyledLink = styled.a`
  color: ${({ theme }) => theme.colors.link};
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.linkHover};
    text-decoration: underline;
  }
`;
