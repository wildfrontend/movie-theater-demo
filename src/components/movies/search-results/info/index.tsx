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
import React from 'react';

import { useFetchMovie } from '@/apis/movies/api';
import useMovieIdQueyParams from '@/hooks/movies/item';
import type { SearchMovieItem } from '@/types/apis/movies';

import MovieAttribute from './attributes';
import MovieCredits from './credit';
import MovieHeadline from './headline';

export const useMovieDetail = () => {
  const { movieId } = useMovieIdQueyParams();
  const movie = useFetchMovie(movieId);
  return movie;
};

const MovieInfo: React.FC<{
  movie: SearchMovieItem;
  onClose: () => void;
}> = ({ movie, onClose }) => {
  const { detail } = useMovieDetail();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Dialog
      fullScreen={isMobile}
      onClose={onClose}
      open
      scroll="body"
      slotProps={{
        paper: {
          sx: {
            width: '100%',
            maxWidth: '875px',
            minHeight: { xs: '50vh', md: '70vh' },
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
        <Stack spacing="8px">
          <Typography fontWeight="bold" gutterBottom variant="h4">
            {movie.title}
          </Typography>
          <MovieAttribute />
          <Stack direction="row" py="8px" spacing="8px">
            {detail?.genres.map((genre) => (
              <Chip key={genre.id} label={genre.name} />
            ))}
          </Stack>
          <Typography fontWeight="bold" gutterBottom variant="h5">
            概要
          </Typography>
          <Typography variant="caption">{movie.overview}</Typography>
          <Typography fontWeight="bold" variant="h5">
            演出
          </Typography>
          <MovieCredits />
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default MovieInfo;
