'use client';

import FavoriteIcon from '@mui/icons-material/Favorite';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import React from 'react';

import type { SearchMovieItem } from '@/types/apis/movies';

const defaultImg = 'https://fakeimg.pl/154x220/?text=Oops';

const getScoreColor = (score: number) => {
  if (!score || Number.isNaN(score)) return 'textSecondary';
  if (score < 5) return 'error';
  if (score < 7) return 'warning';
  return 'success';
};

const MovieScore: React.FC<{ score?: number }> = ({ score }) => {
  const formattedScore =
    score && !Number.isNaN(score) ? score.toFixed(1) : 'NA';
  return (
    <Stack alignItems="center" direction="row" spacing={1}>
      <Typography>評分 :</Typography>
      <Typography color={getScoreColor(score ?? 0)} fontWeight="700">
        {formattedScore}
      </Typography>
    </Stack>
  );
};

const MovieListItem: React.FC<{
  movie: SearchMovieItem;
  listCount?: number;
}> = ({ movie, listCount }) => {
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <CardMedia sx={{ width: 154, height: 220 }}>
        <Image
          alt={movie.title}
          height={220}
          loading={listCount && listCount < 3 ? 'eager' : 'lazy'} //
          onError={(e) => {
            e.currentTarget.src = defaultImg;
          }}
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w154${movie.poster_path}`
              : defaultImg
          }
          unoptimized
          width={154}
        />
      </CardMedia>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Stack spacing="8px">
          <Typography component="div" minHeight="28px" variant="h5">
            {movie.title}
          </Typography>
          <Typography
            color="textSecondary"
            component="p"
            sx={{
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              WebkitLineClamp: 5,
              height: '100px',
            }}
            variant="caption"
          >
            {movie.overview}
          </Typography>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          mt="auto"
          spacing={1}
        >
          <MovieScore score={movie.vote_average} />
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography color="textSecondary">
              發行日期: {movie.release_date === '' ? 'NA' : movie.release_date}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default MovieListItem;
