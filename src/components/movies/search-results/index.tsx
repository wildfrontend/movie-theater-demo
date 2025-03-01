'use client';

import { Container, Grid2 } from '@mui/material';
import React, { useRef } from 'react';

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
      <Grid2 py={2} container spacing={{ xs: 2, md: 3 }} columns={12}>
        {data?.pages?.map((group, i) => {
          return group.data.results.map((item) => {
            return (
              <Grid2 key={item.id} size={{ xs: 12 }}>
                <MovieListItem movie={item} listCount={listCount++} />
              </Grid2>
            );
          });
        })}
      </Grid2>
    </Container>
  );
};

export default SearchResults;
