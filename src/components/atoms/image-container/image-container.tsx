import { styled } from 'styled-components';

export const StyledDiv = styled.div<{ $width: number; $height: number }>`
  position: relative;
  max-height: ${({ theme }) => theme.sizes.maxImageHeight};
  min-height: 300px;
  max-width: ${(props) =>
    `calc(${props.$width} / ${props.$height} * ${props.theme.sizes.maxImageHeight})`};
  min-width: ${(props) => `calc(${props.$width} / ${props.$height} * 300px)`};
  margin: 0 auto;
`;
