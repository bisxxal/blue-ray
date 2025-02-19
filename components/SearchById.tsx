import React, { useState, useEffect } from 'react';
import { CiSearch } from "react-icons/ci";
 
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
    <div className='p-2 flex items-center gap-2 bg-transparent border rounded-full inputbg w-72'>
    <CiSearch size={22}/>
    <input
      type="text"
      placeholder={placeholder}
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="py-1 outline-none w-full bg-transparent "
      />
      </div>
  );
};

export default SearchInput;
