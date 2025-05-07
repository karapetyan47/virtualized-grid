import { styled } from 'styled-components';

const StyledEmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px;
  text-align: center;
  width: 100%;
`;

const StyledEmptyIconContainer = styled.div`
  margin-bottom: 16px;
  color: ${({ theme }) => theme.colors.gray[400]};

  svg {
    width: 64px;
    height: 64px;
  }
`;

const StyledEmptyTitle = styled.h3`
  margin: 0 0 8px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray[900]};
  font-size: 20px;
`;

const StyledEmptyMessage = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.gray[500]};
  font-size: 16px;
  max-width: 480px;
`;

export const Empty = Object.assign(
  {},
  {
    EmptyContainer: StyledEmptyContainer,
    EmptyIconContainer: StyledEmptyIconContainer,
    EmptyMessage: StyledEmptyMessage,
    EmptyTitle: StyledEmptyTitle,
  }
);
