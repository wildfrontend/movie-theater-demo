'use client';

import { Container, Grid2 } from '@mui/material';
import React from 'react';

import { useFetchSearchMovies } from '@/apis/movies';
import useSearhMoviesQueyParams from '@/hooks/movies/search';

import MovieListItem from './item';

const SearchResults: React.FC = () => {
  const { search } = useSearhMoviesQueyParams();
  const { data, isFetching } = useFetchSearchMovies({
    params: {
      query: search,
      language: search ? 'zh-TW' : undefined,
    },
  });
  let listCount = 0;
  return (
    <Container maxWidth="lg">
      <Grid2 columns={12} container py={2} spacing={{ xs: 2, md: 3 }}>
        {data?.pages?.map((group, i) => {
          return group.data.results.map((item) => {
            return (
              <Grid2 key={item.id} size={{ xs: 12 }}>
                <MovieListItem listCount={listCount++} movie={item} />
              </Grid2>
            );
          });
        })}
      </Grid2>
    </Container>
  );
};

export default SearchResults;
