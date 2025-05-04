import styled from 'styled-components';

export const StyledDiv = styled.div.attrs<{ $avgColor: string }>((props) => ({
  style: {
    backgroundColor: props.$avgColor || '#f0f0f0',
  },
}))`
  width: 100%;
  height: 100%;
`;
