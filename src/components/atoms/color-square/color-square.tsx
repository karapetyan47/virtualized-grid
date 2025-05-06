import styled from 'styled-components';

export const StyledDiv = styled.div.attrs<{ $color: string }>((props) => ({
  style: {
    backgroundColor: props.$color,
  },
}))`
  width: 1rem;
  height: 1rem;
  border-radius: 2px;
  border: ${({ theme }) => `1px solid ${theme.colors.shadow}`};
`;
