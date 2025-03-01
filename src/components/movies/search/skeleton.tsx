import SearchIcon from '@mui/icons-material/Search';
import { IconButton, OutlinedInput } from '@mui/material';
import React from 'react';

const SearchInputSkeleton: React.FC = () => {
  return (
    <OutlinedInput
      endAdornment={
        <IconButton aria-label="search" sx={{ p: '10px' }} type="button">
          <SearchIcon />
        </IconButton>
      }
      fullWidth
      inputProps={{ 'aria-label': 'search input' }}
      placeholder="尋找電影......"
      size="small"
    />
  );
};
export default SearchInputSkeleton;
