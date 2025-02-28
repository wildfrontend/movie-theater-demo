import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Button,
  Container,
  IconButton,
  InputBase,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';

const SearchSection = () => {
  return (
    <Box sx={{ backgroundColor: '#f5f5f5', padding: '64px 0' }}>
      <Container maxWidth="md">
        {/* 標題區塊 */}
        <Box textAlign="center" mb={3}>
          <Typography variant="h4" component="h2" gutterBottom>
            歡迎！
          </Typography>
          <Typography variant="h6" color="textSecondary">
            上百萬部電影在等你探索。立即瀏覽吧！
          </Typography>
        </Box>
        {/* 搜尋框 */}

        <OutlinedInput
          size="small"
          placeholder="尋找電影......"
          fullWidth
          endAdornment={
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          }
        />
      </Container>
    </Box>
  );
};

export default SearchSection;
