'use client';

import SearchIcon from '@mui/icons-material/Search';
import { IconButton, OutlinedInput } from '@mui/material';
import React, { useCallback, useState } from 'react';

import useSearhMoviesQueyParams from '@/hooks/movies/search';

const SearchInput: React.FC = () => {
  const { search, setSearch, removeSearch } = useSearhMoviesQueyParams();
  const [value, setValue] = useState(search ?? '');

  const onSearch = useCallback(() => {
    if (value === '') {
      removeSearch();
    } else {
      setSearch(value);
    }
  }, [value, setSearch, removeSearch]);

  return (
    <OutlinedInput
      endAdornment={
        <IconButton
          aria-label="search"
          onClick={onSearch}
          sx={{ p: '10px' }}
          type="button"
        >
          <SearchIcon />
        </IconButton>
      }
      fullWidth
      inputProps={{ 'aria-label': 'search input' }}
      onChange={(e) => setValue(e.target.value)} // 移除 console.log
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          onSearch();
        }
      }}
      placeholder="尋找電影......"
      size="small"
      value={value}
    />
  );
};

export default SearchInput;
