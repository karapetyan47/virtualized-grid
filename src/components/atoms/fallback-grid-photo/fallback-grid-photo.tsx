import styled from 'styled-components';

export const StyledDiv = styled.div.attrs<{ $avgColor: string }>((props) => ({
  style: {
    backgroundColor: props.$avgColor || props.theme.colors.imageFallback,
  },
}))`
  width: 100%;
  height: 100%;
`;
