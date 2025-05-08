import { styled } from 'styled-components';

export const StyledDiv = styled.div<{ $liked: boolean }>`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: ${({ theme }) => theme.sizes.likeSize};
  height: ${({ theme }) => theme.sizes.likeSize};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.$liked ? props.theme.colors.liked : props.theme.colors.likeNeutral};
  border-radius: ${({ theme }) => theme.radius.round};
  color: ${(props) => (props.$liked ? 'white' : props.theme.colors.textPrimary)};
  box-shadow: ${({ theme }) => `0 2px 8px ${theme.colors.shadow}`};
`;
