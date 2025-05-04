import { styled } from 'styled-components';

const StyledErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.gapLarge};
  margin: ${({ theme }) => theme.spacing.gapLarge} auto;
  max-width: 800px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => `0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px ${theme.colors.shadow}`};
`;

const StyledErrorHeading = styled.h2`
  color: ${({ theme }) => theme.colors.danger};
  margin-bottom: ${({ theme }) => theme.spacing.gapMedium};
`;

const StyledErrorMessage = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing.gapMedium};
  text-align: center;
`;

const StyledErrorStack = styled.pre`
  padding: ${({ theme }) => theme.spacing.gapMedium};
  border-radius: ${({ theme }) => theme.radius.sm};
  overflow-x: auto;
  width: 100%;
  font-size: 0.85rem;
`;

export const Error = Object.assign(
  {},
  {
    ErrorContainer: StyledErrorContainer,
    ErrorHeading: StyledErrorHeading,
    ErrorMessage: StyledErrorMessage,
    ErrorStack: StyledErrorStack,
  }
);
