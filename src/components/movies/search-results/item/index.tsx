'use client';

import { Card, CardActionArea, CardMedia } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import React, { useState } from 'react';

import { movieDetailQueryOptions } from '@/apis/movies/query-options';
import type { SearchMovieItem } from '@/types/apis/movies';

import MovieInfo from '../info';

const defaultImg = 'https://fakeimg.pl/154x220/?text=Oops';

const MovieListItem: React.FC<{
  movie: SearchMovieItem;
  listCount: number;
}> = ({ movie, listCount }) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  return (
    <>
      <Card>
        <CardActionArea
          onClick={() => setIsOpen(true)}
          onMouseEnter={async () => {
            await queryClient.prefetchQuery(movieDetailQueryOptions(movie.id));
          }}
        >
          <CardMedia
            sx={{ width: '100%', aspectRatio: 154 / 220, position: 'relative' }}
          >
            <Image
              alt={movie.title}
              fill
              loading={listCount && listCount < 5 ? 'eager' : 'lazy'} //
              onError={(e) => {
                e.currentTarget.src = defaultImg;
              }}
              priority={listCount < 5}
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                  : defaultImg
              }
              unoptimized
            />
          </CardMedia>
        </CardActionArea>
      </Card>
      <MovieInfo
        isOpen={isOpen}
        movie={movie}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};

export default MovieListItem;
