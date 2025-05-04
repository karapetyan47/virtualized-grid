import styled from 'styled-components';

export const StyledDiv = styled.div.attrs<{
  $top: number;
  $left: number;
  $width: number;
  $height: number;
}>((props) => ({
  style: {
    top: props.$top,
    left: props.$left,
    width: props.$width,
    height: props.$height,
  },
}))`
  position: absolute;
  overflow: hidden;
  transition: opacity 0.3s ease;
  will-change: transform;
  cursor: pointer;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radius.md};
  transition: transform 0.2s ease-in-out;
  outline: none;

  &:hover,
  &:focus-visible {
    transform: scale(1.02);

    .photo-info {
      opacity: 1;
    }
  }
`;
