'use client';

import SearchIcon from '@mui/icons-material/Search';
import { IconButton, OutlinedInput } from '@mui/material';
import React, { useState } from 'react';

import useSearhMoviesQueyParams from '@/hooks/movies/search';

const SearchInput: React.FC = () => {
  const { search, setSearch } = useSearhMoviesQueyParams();
  const [value, setValue] = useState(search ?? '');
  return (
    <OutlinedInput
      endAdornment={
        <IconButton
          aria-label="search"
          onClick={() => setSearch(value)}
          sx={{ p: '10px' }}
          type="button"
        >
          <SearchIcon />
        </IconButton>
      }
      fullWidth
      inputProps={{ 'aria-label': 'search input' }}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          setSearch(value);
        }
      }}
      placeholder="尋找電影......"
      size="small"
      value={value}
    />
  );
};
export default SearchInput;
