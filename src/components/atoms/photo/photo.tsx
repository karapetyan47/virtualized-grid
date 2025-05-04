import styled from 'styled-components';

export const StyledImage = styled.img<{ $loaded: boolean; $placeholder: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: ${(props) => (props.$placeholder ? 'blur(10px)' : 'none')};
  opacity: ${(props) => (props.$loaded ? 1 : 0)};
  transition:
    opacity 0.3s ease-in-out,
    filter 0.3s ease-in-out;
`;
