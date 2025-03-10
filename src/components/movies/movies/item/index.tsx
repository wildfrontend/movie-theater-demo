'use client';

import { Card, CardActionArea, CardMedia } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react';

import type { SearchMovieItem } from '@/types/apis/movies';
import { generateMovieHerf } from '@/utils/global/link';
import tmdbLoader from '@/utils/image/tmdb';

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
              loader={movie.poster_path ? tmdbLoader : undefined}
              loading={listCount && listCount < 5 ? 'eager' : 'lazy'}
              onError={(e) => (e.currentTarget.src = defaultImg)}
              priority={listCount < 5}
              sizes={`(max-width: 600px) 20vw, 1024w`}
              src={movie.poster_path ?? defaultImg}
            />
          </CardMedia>
        </CardActionArea>
      </Card>
    </>
  );
};

export default React.memo(MovieListItem);
