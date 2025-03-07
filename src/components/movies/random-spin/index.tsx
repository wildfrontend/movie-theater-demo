'use client';

import { Box, Button, Container, Stack, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';

import RandomSpinSkeleton from './skeleton';

const MovieSlider = dynamic(() => import('./silder'), {
  ssr: false,
  loading: () => {
    return <RandomSpinSkeleton />;
  },
});

const RandomPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  if (isOpen) {
    return <MovieSlider />;
  }
  return (
    <Stack>
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
          <Button
            onClick={() => {
              setIsOpen(true);
            }}
            variant="contained"
          >
            隨機挑選
          </Button>
        </Box>
      </Stack>
    </Stack>
  );
};

const PlaySomethingSection: React.FC = () => {
  return (
    <Box>
      <Container
        maxWidth="lg"
        sx={{
          height: {
            xs: '280px',
            md: '360px',
          },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <RandomPanel />
      </Container>
    </Box>
  );
};

export default PlaySomethingSection;
