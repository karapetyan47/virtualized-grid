import { ChangeEvent, useState } from 'react';

import { SearchContainer } from '@/components/atoms/search-container';
import { SearchInput } from '@/components/atoms/search-input';

interface I_Props {
  onSearch: (query: string) => void;
  initialValue?: string;
}

export const SearchBar = ({ onSearch, initialValue = '' }: I_Props) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    onSearch(newValue);
  };

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Search photos..."
        aria-label="Search photos"
      />
    </SearchContainer>
  );
};
