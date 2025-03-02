'use client';

import { Button, Grid2 } from '@mui/material';
import React from 'react';

import { useFetchPopularMovies } from '@/apis/movies/api';

import MovieListItem from '../item';

const PopularMovies: React.FC = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isFetched,
  } = useFetchPopularMovies();
  let listCount = 1;
  return (
    <Grid2 columns={12} container py={2} spacing={{ xs: 2, md: 3 }}>
      {data?.pages?.map((group, i) => {
        return group?.results.map((item) => {
          return (
            <Grid2 key={item.id} size={{ xs: 6, sm: 4, md: 3 }}>
              <MovieListItem listCount={listCount++} movie={item} />
            </Grid2>
          );
        });
      })}
      <div>
        <Button
          disabled={!hasNextPage || isFetchingNextPage}
          onClick={() => hasNextPage && fetchNextPage()}
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
              ? 'Load More'
              : 'Nothing more to load'}
        </Button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
    </Grid2>
  );
};

export default PopularMovies;
