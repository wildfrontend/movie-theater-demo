'use client';

import { Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';
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
    <Stack direction="row" alignItems="center" spacing={1}>
      <Typography variant="caption">評分 :</Typography>
      <Typography
        variant="caption"
        fontWeight="700"
        color={getScoreColor(score ?? 0)}
      >
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
          loading={listCount && listCount < 3 ? 'eager' : 'lazy'} //
          unoptimized
          width={154}
          height={220}
          onError={(e) => {
            e.currentTarget.src = defaultImg;
          }}
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w154${movie.poster_path}`
              : defaultImg
          }
          alt={movie.title}
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
          <Typography minHeight="28px" variant="h5" component="div">
            {movie.title}
          </Typography>
          <Typography
            variant="caption"
            component="p"
            color="textSecondary"
            sx={{
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              WebkitLineClamp: 5,
              height: '100px',
            }}
          >
            {movie.overview}
          </Typography>
        </Stack>
        <Stack
          mt="auto"
          direction="row"
          spacing={1}
          justifyContent="space-between"
        >
          <MovieScore score={movie.vote_average} />
          <Typography variant="caption" color="textSecondary">
            發行日期: {movie.release_date === '' ? 'NA' : movie.release_date}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default MovieListItem;
