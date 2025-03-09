'use client';

import { Card, CardActionArea, CardMedia } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

import type { SearchMovieItem } from '@/types/apis/movies';
import { generateMovieHerf } from '@/utils/global/link';
import sizes from '@/utils/image/sizes';
import { tmdbPosterLoader } from '@/utils/image/tmdb';

const defaultImg = 'https://fakeimg.pl/154x220';

const MovieListItem: React.FC<{
  movie: SearchMovieItem;
  listCount: number;
}> = ({ movie, listCount }) => {
  const searchParams = useSearchParams();
  return (
    <>
      <Card>
        <CardActionArea
          LinkComponent={Link}
          {...{
            href: {
              pathname: generateMovieHerf(movie.id),
              search: searchParams.toString(),
            },
          }}
        >
          <CardMedia
            sx={{ width: '100%', aspectRatio: 154 / 220, position: 'relative' }}
          >
            <Image
              alt={movie.title}
              fill
              loading={listCount && listCount < 5 ? 'eager' : 'lazy'}
              onError={(e) => (e.currentTarget.src = defaultImg)}
              priority={listCount < 5}
              // screenwidth * 0.3
              sizes={sizes('30vw', '300px')}
              src={movie.poster_path ?? ''}
              loader={tmdbPosterLoader}
            />
          </CardMedia>
        </CardActionArea>
      </Card>
    </>
  );
};

export default React.memo(MovieListItem);
