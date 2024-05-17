import React, { useState, useEffect } from 'react';
import { Button, Input, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { useSearchContext } from '../Contexts/SearchContext';

interface SearchBarProps {
  initialQuery?: string;
  onSearch?: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ initialQuery = '', onSearch }) => {
  const [query, setQuery] = useState(initialQuery);
  const navigate = useNavigate();
  const { setQuery: setSearchContextQuery, setSelectedCategory } = useSearchContext();

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query);
    }
    setSearchContextQuery(query);
    navigate('/search');
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
      setSelectedCategory(null);
    }
  };

  const handleSearchButtonClick = () => {
    handleSearch();
    setSelectedCategory(null);
  }

  return (
    <InputGroup mr={6}>
      <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.500" />} />
      <Input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleSearchChange}
        onKeyPress={handleKeyPress}
        className='search-bar'
      />
      { query && query.length > 0 && (
      <InputRightElement width='3rem' mr={1}>
        <Button onClick={handleSearchButtonClick} size='sm' variant='ghost'>
          Search
        </Button> 
      </InputRightElement>
      )}
    </InputGroup>
  );
};

export default SearchBar;
