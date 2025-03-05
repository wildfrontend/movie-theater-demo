import { Box, Button, Container, Stack, Typography } from '@mui/material';
import React from 'react';

const PlaySomethingSection: React.FC = () => {
  return (
    <Box sx={{ padding: '64px 0' }}>
      <Container maxWidth="lg">
        <Box mb={3} textAlign="center">
          <Typography component="h2" gutterBottom variant="h4">
            不知道想看甚麼嗎?
          </Typography>
          <Typography color="textSecondary" variant="h6">
            隨機挑選其中一部吧，點擊下面按鈕來開始!
          </Typography>
        </Box>
        <Stack direction="row" justifyContent="center">
          <Box>
            <Button variant="contained">隨機挑選</Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default PlaySomethingSection;
