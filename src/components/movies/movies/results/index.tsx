'use client';

import {
  Button,
  ButtonGroup,
  Container,
  Stack,
  Typography,
} from '@mui/material';
import { Grid2 } from '@mui/material';
import React from 'react';
import { InView } from 'react-intersection-observer';

import { useFetchSearchMovies } from '@/apis/movies/api';
import FailedPanel from '@/components/error/failed';
import useMovieIdQueyParams from '@/hooks/movies/item';
import useSearhMoviesQueyParams from '@/hooks/movies/search';

import MovieListItem from '../item';
import MoviesEmpty from '../list/empty';
import { LoadMoreSkeleton } from '../list/skeleton';
import ResultsEmpty from '../popluar';
import ResultsSkeleton from './skeleton';

const SearchResults: React.FC = () => {
  const { search } = useSearhMoviesQueyParams();
  const { movieId } = useMovieIdQueyParams();
  const {
    data,
    fetchNextPage,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    isFetched,
    isFetching,
    error,
  } = useFetchSearchMovies({
    params: {
      query: search,
    },
    enabled: !!search && !movieId,
  });

  let listCount = 1;

  if (isLoading) {
    return <ResultsSkeleton />;
  }
  if (error) {
    return <FailedPanel error={error} />;
  }
  if (!isFetched) {
    return <ResultsEmpty />;
  }
  if ((data?.pages?.[0]?.results?.length ?? 0) === 0) {
    return <MoviesEmpty />;
  }
  return (
    <Container maxWidth="lg">
      <Stack pt="32px" spacing="16px">
        <Typography fontWeight="bold" variant="h2">
          搜尋結果
        </Typography>
        <Stack direction="row" justifyContent="end">
          <ButtonGroup aria-label="sort" variant="contained">
            <Button>由上往下</Button>
            <Button>由下往上</Button>
          </ButtonGroup>
        </Stack>
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
          {isFetchingNextPage && <LoadMoreSkeleton />}
        </Grid2>
        {hasNextPage && (
          <InView
            as="div"
            delay={300}
            onChange={(inView) => {
              if (inView && hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
              }
            }}
          />
        )}
        {!hasNextPage && (
          <Typography component="span" fontWeight="bold" variant="h4">
            已經顯示所有結果
          </Typography>
        )}
      </Stack>
    </Container>
  );
};

export default SearchResults;
