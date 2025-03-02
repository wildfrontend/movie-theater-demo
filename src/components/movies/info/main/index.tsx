'use client';

import CloseIcon from '@mui/icons-material/Close';
import {
  Chip,
  Dialog,
  DialogContent,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { useMemo } from 'react';

import { useFetchMovie } from '@/apis/movies/api';
import useMovieIdQueyParams from '@/hooks/movies/item';

import MovieCredits from '../credits';
import MovieReviews from '../reviews';
import MovieAttribute from './attributes';
import MovieHeadline from './headline';
import MovieStatus from './status';

export const useMovieDetail = () => {
  const { movieId } = useMovieIdQueyParams();
  const movie = useFetchMovie(movieId);
  return movie;
};

const MovieInfo: React.FC<{}> = ({}) => {
  const { movieId, removeMovieId } = useMovieIdQueyParams();
  const { detail } = useMovieDetail();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const onClose = () => {
    removeMovieId();
  };
  const isOpen = useMemo(() => !!movieId, [movieId]);
  return (
    <Dialog
      fullScreen={isMobile}
      onClose={onClose}
      open={isOpen}
      scroll="body"
      slotProps={{
        paper: {
          sx: {
            width: '100%',
            maxWidth: {
              md: '875px',
            },
          },
        },
      }}
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
          <Typography fontWeight="bold" gutterBottom variant="h4">
            {detail?.title}
          </Typography>
          <MovieAttribute />
          <Stack direction="row" spacing="8px">
            {detail?.genres.map((genre) => (
              <Chip key={genre.id} label={genre.name} />
            ))}
          </Stack>
          <MovieStatus />
          <Typography fontWeight="bold" gutterBottom variant="h5">
            概要
          </Typography>
          <Typography variant="body1">{detail?.overview}</Typography>
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
