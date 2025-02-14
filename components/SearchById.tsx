import React, { useState, useEffect } from 'react';

interface SearchInputProps {
  placeholder?: string;
  onSearch: (value: string) => void;
  debounceTime?: number;
}

const SearchInput: React.FC<SearchInputProps> = ({ placeholder = 'Search...', onSearch, debounceTime = 300 }) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearch(searchTerm);
    }, debounceTime);

    return () => clearTimeout(timeout);
  }, [searchTerm, debounceTime, onSearch]);

  return (
    <input
      type="text"
      placeholder={placeholder}
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="p-2 bg-transparent border rounded-md w-64"
    />
  );
};

export default SearchInput;
