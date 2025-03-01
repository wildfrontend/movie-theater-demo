'use client';

import {
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  Stack,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import type { SearchMovieItem } from '@/types/apis/movies';
import { generateMovieHerf } from '@/utils/link';

import MovieScore from './score';

const defaultImg = 'https://fakeimg.pl/400x225?text=Oops';

const MovieInfo: React.FC<{
  movie: SearchMovieItem;
  isOpen: boolean;
  onClose: () => void;
}> = ({ movie, isOpen, onClose }) => {
  return (
    <Dialog
      onClose={onClose}
      open={isOpen}
      slotProps={{
        paper: { sx: { maxWidth: '480px', maxHeight: '540px' } },
      }}
    >
      <CardMedia
        sx={{ width: '100%', aspectRatio: 400 / 225, position: 'relative' }}
      >
        <Image
          alt={movie.title}
          fill
          loading="eager"
          onError={(e) => {
            e.currentTarget.src = defaultImg;
          }}
          src={
            movie.backdrop_path
              ? `https://image.tmdb.org/t/p/w400${movie.backdrop_path}`
              : defaultImg
          }
          style={{ objectFit: 'cover' }}
          unoptimized
        />
      </CardMedia>
      <CardContent
        sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}
      >
        <Typography gutterBottom variant="h5">
          {movie.title}
        </Typography>
        <Stack
          direction="row"
          justifyContent="space-between"
          py="8px"
          spacing="8px"
        >
          <MovieScore score={movie.vote_average} variant="caption" />
          <Stack alignItems="center" direction="row" spacing={1}>
            <Typography color="textSecondary" variant="caption">
              發行日期: {movie.release_date === '' ? 'NA' : movie.release_date}
            </Typography>
          </Stack>
        </Stack>
        <Typography
          sx={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            WebkitLineClamp: 5,
            height: '100px',
          }}
          variant="body2"
        >
          {movie.overview}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'end' }}>
        <Button
          size="small"
          variant="contained"
          LinkComponent={Link}
          href={generateMovieHerf(movie.id)}
        >
          詳情
        </Button>
        <Button color="error" onClick={onClose} size="small">
          關閉
        </Button>
      </CardActions>
    </Dialog>
  );
};

export default MovieInfo;
