'use client';

import CloseIcon from '@mui/icons-material/Close';
import {
  Dialog,
  DialogContent,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React from 'react';

import useMovieIdQueyParams from '@/hooks/movies/item';

import MovieCredits from '../credits';
import MovieReviews from '../reviews';
import MovieAttribute from './attributes';
import MovieGenres from './genres';
import MovieHeadline from './headline';
import MovieOverview from './overview';
import MovieStatus from './status';
import MovieTitle from './title';

const MovieInfo: React.FC<{}> = ({ }) => {
  const { movieId, removeMovieId } = useMovieIdQueyParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const onClose = () => {
    removeMovieId();
  };
  return (
    <Dialog
      fullScreen={isMobile}
      maxWidth="md"
      onClose={onClose}
      open={!!movieId}
      scroll="body"
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          zIndex: 1,
          color: 'white',
        }}
      >
        <CloseIcon />
      </IconButton>
      <MovieHeadline />
      <DialogContent>
        <Stack spacing="16px">
          <MovieTitle />
          <MovieAttribute />
          <MovieGenres />
          <MovieStatus />
          <Typography fontWeight="bold" gutterBottom variant="h5">
            概要
          </Typography>
          <MovieOverview />
          <Typography fontWeight="bold" variant="h5">
            演出
          </Typography>
          <MovieCredits />
          <Typography fontWeight="bold" variant="h5">
            評論
          </Typography>
          <MovieReviews />
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default MovieInfo;
