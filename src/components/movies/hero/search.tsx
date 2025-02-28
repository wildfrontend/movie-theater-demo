import SearchIcon from '@mui/icons-material/Search';
import { IconButton, InputBase, Paper } from '@mui/material';
import React from 'react';

const SearchMovies: React.FC = () => {
  return (
    <Paper sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
      <InputBase
        sx={{ p: '4px', flex: 1 }}
        placeholder="Search Movies"
        inputProps={{ 'aria-label': 'search movies' }}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchMovies;
