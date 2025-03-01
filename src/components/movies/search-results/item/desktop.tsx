'use client';

import {
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import React from 'react';

import type { SearchMovieItem } from '@/types/apis/movies';

import MovieScore from './score';

const defaultImg = 'https://fakeimg.pl/154x220/?text=Oops';

const DesktopMovieListItem: React.FC<{
  movie: SearchMovieItem;
  listCount: number;
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
          <Stack alignItems="center" direction="row" spacing={1}>
            <Typography color="textSecondary">
              發行日期: {movie.release_date === '' ? 'NA' : movie.release_date}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default DesktopMovieListItem;
