'use client';

import {
  CardContent,
  CardMedia,
  Chip,
  Dialog,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Image from 'next/image';
import React, { useMemo } from 'react';

import { useFetchMovie } from '@/apis/movies/api';
import type { SearchMovieItem } from '@/types/apis/movies';
import dayjs from '@/utils/dayjs';

import MovieCredits from './credit';

const defaultImg = 'https://fakeimg.pl/400x225?text=Oops';

const MovieInfo: React.FC<{
  movie: SearchMovieItem;
  isOpen: boolean;
  onClose: () => void;
}> = ({ movie, isOpen, onClose }) => {
  const { data, isFetching } = useFetchMovie({
    movieId: movie.id,
    enabled: isOpen,
  });
  const detail = useMemo(() => data?.data, [data]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Dialog
      disableEnforceFocus
      fullScreen={isMobile}
      onClose={onClose}
      open={isOpen}
      scroll="body"
      slotProps={{
        paper: {
          sx: {
            width: '100%',
            maxWidth: '875px',
          },
        },
      }}
    >
      <CardMedia
        sx={{ width: '100%', aspectRatio: 780 / 439, position: 'relative' }}
      >
        <Image
          alt={movie.title}
          fill
          loading="eager"
          onError={(e) => {
            e.currentTarget.src = defaultImg;
          }}
          src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
          style={{ objectFit: 'cover' }}
          unoptimized
        />
      </CardMedia>
      <CardContent component={Stack} spacing="8px">
        <Typography fontWeight="bold" gutterBottom variant="h4">
          {movie.title}
        </Typography>
        <Stack
          direction="row"
          divider={<Typography variant="caption">•</Typography>}
          px="4px"
          spacing="4px"
        >
          <Typography variant="caption">
            {dayjs(movie.release_date).format('YYYY/MM/DD')}
          </Typography>
          {(detail?.origin_country?.length ?? 0) > 0 && (
            <Stack divider={<Typography variant="caption">,</Typography>}>
              {detail?.origin_country.map((country) => {
                return (
                  <Typography key={country} variant="caption">
                    {country}
                  </Typography>
                );
              })}
            </Stack>
          )}
          {detail?.runtime && (
            <Typography variant="caption">
              {dayjs
                .duration(detail?.runtime, 'minutes')
                .format('H 小時 mm 分鐘')}
            </Typography>
          )}
        </Stack>
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
        <MovieCredits movieId={movie.id} />
      </CardContent>
    </Dialog>
  );
};

export default MovieInfo;
