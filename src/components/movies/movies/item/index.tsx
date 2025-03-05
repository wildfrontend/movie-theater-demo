'use client';

import { Card, CardActionArea, CardMedia } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import type { SearchMovieItem } from '@/types/apis/movies';
import { generateMovieHerf } from '@/utils/link';

const defaultImg = 'https://fakeimg.pl/154x220';

const MovieListItem: React.FC<{
  movie: SearchMovieItem;
  listCount: number;
}> = ({ movie, listCount }) => {
  const [imageError, setImageError] = useState(false);
  return (
    <>
      <Card>
        <CardActionArea
          LinkComponent={Link}
          {...{
            href: {
              pathname: generateMovieHerf(movie.id),
              search: typeof window !== 'undefined' ? window.location.search : undefined,
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
