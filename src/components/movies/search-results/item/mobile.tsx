'use client';

import {
  Card,
  CardActionArea,
  CardMedia,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import type { SearchMovieItem } from '@/types/apis/movies';

import MovieInfo from './info';

const defaultImg = 'https://fakeimg.pl/154x220/?text=Oops';

const MobileMovieListItem: React.FC<{
  movie: SearchMovieItem;
  listCount: number;
}> = ({ movie, listCount }) => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  const isNotMobile = useMediaQuery(theme.breakpoints.up('sm'));

  useEffect(() => {
    if (isNotMobile) {
      setIsOpen(false);
    }
  }, [isNotMobile]);

  return (
    <>
      <Card>
        <CardActionArea onClick={() => setIsOpen(true)}>
          <CardMedia
            sx={{ width: '100%', aspectRatio: 154 / 220, position: 'relative' }}
          >
            <Image
              alt={movie.title}
              priority={listCount < 5}
              fill
              loading={listCount && listCount < 5 ? 'eager' : 'lazy'} //
              onError={(e) => {
                e.currentTarget.src = defaultImg;
              }}
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w154${movie.poster_path}`
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

export default MobileMovieListItem;
