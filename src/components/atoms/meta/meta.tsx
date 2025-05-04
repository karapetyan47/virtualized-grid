import styled from 'styled-components';

const StyledMetaInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.gapSmall};
`;

const StyledMetaItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.gapTiny};
`;

const StyledMetaLabel = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textMuted};
  min-width: 100px;
`;

const StyledMetaValue = styled.span`
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const Meta = Object.assign(
  {},
  {
    MetaInfo: StyledMetaInfo,
    MetaItem: StyledMetaItem,
    MetaLabel: StyledMetaLabel,
    MetaValue: StyledMetaValue,
  }
);
