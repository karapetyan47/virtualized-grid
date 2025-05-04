import { styled } from 'styled-components';

export const StyledImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  object-fit: contain;
  max-height: ${({ theme }) => theme.sizes.maxImageHeight};
`;
