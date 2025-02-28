import { Box, Container, Typography } from '@mui/material';
import React from 'react';

import SearchInput from './input';

const SearchSection: React.FC = () => {
  return (
    <Box sx={{ backgroundColor: '#f5f5f5', padding: '64px 0' }}>
      <Container maxWidth="md">
        {/* 標題區塊 */}
        <Box mb={3} textAlign="center">
          <Typography component="h2" gutterBottom variant="h4">
            歡迎！
          </Typography>
          <Typography color="textSecondary" variant="h6">
            上百萬部電影在等你探索。立即瀏覽吧！
          </Typography>
        </Box>
        <SearchInput />
      </Container>
    </Box>
  );
};

export default SearchSection;
