'use client';

import { Card, CardActionArea, CardMedia } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import React, { useState } from 'react';

import { movieDetailQueryOptions } from '@/apis/movies/query-options';
import useMovieIdQueyParams from '@/hooks/movies/item';
import type { SearchMovieItem } from '@/types/apis/movies';

const defaultImg = 'https://fakeimg.pl/154x220';

const MovieListItem: React.FC<{
  movie: SearchMovieItem;
  listCount: number;
}> = ({ movie, listCount }) => {
  const { movieId, setMovieId } = useMovieIdQueyParams();
  const queryClient = useQueryClient();
  const [imageError, setImageError] = useState(false);
  return (
    <>
      <Card>
        <CardActionArea
          onClick={() => {
            setMovieId(movie.id);
          }}
          onMouseEnter={async () => {
            const queryKey = movieDetailQueryOptions(movie.id).queryKey;
            if (!queryClient.getQueryData(queryKey)) {
              await queryClient.prefetchQuery(
                movieDetailQueryOptions(movie.id)
              );
            }
          }}
          onTouchStart={async () => {
            const queryKey = movieDetailQueryOptions(movie.id).queryKey;
            if (!queryClient.getQueryData(queryKey)) {
              await queryClient.prefetchQuery(
                movieDetailQueryOptions(movie.id)
              );
            }
          }}
        >
          <CardMedia
            sx={{ width: '100%', aspectRatio: 154 / 220, position: 'relative' }}
          >
            <Image
              alt={movie.title}
              fill
              loading={listCount && listCount < 5 ? 'eager' : 'lazy'}
              onError={() => setImageError(true)}
              priority={listCount < 5}
              src={
                imageError || !movie.poster_path
                  ? defaultImg
                  : `https://image.tmdb.org/t/p/w300${movie.poster_path}`
              }
              unoptimized
            />
          </CardMedia>
        </CardActionArea>
      </Card>
    </>
  );
};

export default MovieListItem;
