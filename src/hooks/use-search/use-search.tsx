import debounce from 'lodash.debounce';
import { useMemo, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router';

import { SearchFunction } from './types';

import { C_SearchDelay } from '@/core/constants/common';

export const useSearch = ({
  afterSearch,
  delay = C_SearchDelay,
  searchKey = 'q',
}: {
  afterSearch?: () => void;
  delay?: number;
  searchKey?: string;
}): [string, (query: string, search: SearchFunction) => void] => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get(searchKey) || '';

  const debouncedSearch = useMemo(() => {
    return debounce((value: string, search: SearchFunction) => {
      setSearchParams(value ? { [searchKey]: value } : {});
      void search(value);
      afterSearch?.();
    }, delay);
  }, [afterSearch, delay, searchKey, setSearchParams]);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleSearch = useCallback(
    (query: string, search: SearchFunction) => {
      debouncedSearch.cancel();
      debouncedSearch(query, search);
    },
    [debouncedSearch]
  );

  return [query, handleSearch];
};
