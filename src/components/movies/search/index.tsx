'use client';

import { Box, Container, Typography } from '@mui/material';
import React, { Suspense } from 'react';

import SearchInput from './input';
import SearchInputSkeleton from './skeleton';
import Trailer from './trailer';

const SearchSection: React.FC = () => {
  return (
    <Trailer>
      <Container maxWidth="lg" style={{ zIndex: 1 }}>
        <Box mb={3} textAlign="center">
          <Typography component="h2" gutterBottom variant="h4">
            歡迎！
          </Typography>
          <Typography color="textSecondary" variant="h6">
            上百萬部電影在等你探索。立即瀏覽吧！
          </Typography>
        </Box>
        <Suspense fallback={<SearchInputSkeleton />}>
          <SearchInput />
        </Suspense>
      </Container>
    </Trailer>
  );
};

export default SearchSection;
