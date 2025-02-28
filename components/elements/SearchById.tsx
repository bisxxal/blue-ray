import React, { useState, useEffect } from 'react';
import { CiSearch } from "react-icons/ci";
 
interface SearchInputProps {
  placeholder?: string;
  onSearch: (value: string) => void;
  debounceTime?: number;
  urldata?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ placeholder = 'Search...', onSearch, debounceTime = 300  , urldata }) => {
  const [searchTerm, setSearchTerm] = useState(urldata || '');

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
      value={searchTerm || urldata}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="py-1 outline-none w-full bg-transparent "
      />
      </div>
  );
};

export default SearchInput;
