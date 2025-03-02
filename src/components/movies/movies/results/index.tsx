'use client';

import { Container, Stack, Typography } from '@mui/material';
import { Button, Grid2 } from '@mui/material';
import React from 'react';

import { useFetchSearchMovies } from '@/apis/movies/api';
import useMovieIdQueyParams from '@/hooks/movies/item';
import useSearhMoviesQueyParams from '@/hooks/movies/search';

import ResultsEmpty from '../empty';
import MovieListItem from '../item';

const SearchResults: React.FC = () => {
  const { search } = useSearhMoviesQueyParams();
  const { movieId } = useMovieIdQueyParams();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isFetched,
  } = useFetchSearchMovies({
    params: {
      query: search,
      language: search ? 'zh-TW' : undefined,
    },
    enabled: !!search && !!!movieId,
  });
  let listCount = 1;
  if (!isFetched) {
    return <ResultsEmpty />;
  }
  return (
    <Container maxWidth="lg">
      <Stack pt="32px" spacing="16px">
        <Typography fontWeight="bold" variant="h2">
          搜尋結果
        </Typography>
        <Grid2 columns={12} container py={2} spacing={{ xs: 2, md: 3 }}>
          {data?.pages?.map((group, i) => {
            return group.data.results.map((item) => {
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
      </Stack>
    </Container>
  );
};

export default SearchResults;
