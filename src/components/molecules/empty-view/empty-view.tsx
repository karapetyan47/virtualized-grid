import { PackageSearch } from 'lucide-react';

import { Empty } from '@/components/atoms/empty';

interface I_Props {
  title?: string;
  message?: string;
}

export const EmptyView: React.FC<I_Props> = ({
  title = 'No data found',
  message = "There's nothing here yet.",
}) => {
  return (
    <Empty.EmptyContainer>
      <Empty.EmptyIconContainer>
        <PackageSearch />
      </Empty.EmptyIconContainer>

      <Empty.EmptyTitle>{title}</Empty.EmptyTitle>

      {message && <Empty.EmptyMessage>{message}</Empty.EmptyMessage>}
    </Empty.EmptyContainer>
  );
};
