'use client';

import {
  Button,
  ButtonGroup,
  Container,
  Grid2,
  Stack,
  Typography,
} from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';
import { InView } from 'react-intersection-observer';

import { useFetchSearchMovies } from '@/apis/movies/api';
import FailedPanel from '@/components/error/failed';
import { SearchMoviesSortType } from '@/constants/enums/movies';
import useSearchMoviesQueyParams from '@/hooks/movies/search';
import dayjs from '@/utils/global/dayjs';

import MovieListItem from '../item';
import MoviesEmpty from '../list/empty';
import LoadMoreSkeleton from '../list/skeleton';
import ResultsEmpty from '../popluar';
import ResultsSkeleton from './skeleton';

const useSortBy = () => {
  const [sortBy, setSortBy] = useState<string | undefined>(undefined);

  const setNewestSort = useCallback(() => {
    setSortBy(SearchMoviesSortType.newest);
  }, []);

  const setOldestSort = useCallback(() => {
    setSortBy(SearchMoviesSortType.oldest);
  }, []);

  return {
    sortBy,
    setNewestSort,
    setOldestSort,
  };
};

const SearchResults: React.FC = () => {
  const { search } = useSearchMoviesQueyParams();
  const {
    data,
    fetchNextPage,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    isFetched,
    error,
  } = useFetchSearchMovies({
    params: {
      query: search,
    },
    enabled: !!search,
  });

  const { sortBy, setNewestSort, setOldestSort } = useSortBy();

  const movies = useMemo(() => {
    if (!data?.pages) return [];
    const results = data.pages.flatMap((group) => group?.results || []);
    return results.sort((a, b) => {
      const dateA = a.release_date ? new Date(a.release_date).getTime() : 0;
      const dateB = b.release_date ? new Date(b.release_date).getTime() : 0;
      if (sortBy === SearchMoviesSortType.oldest) {
        return dateA - dateB;
      }
      if (sortBy === SearchMoviesSortType.newest) {
        return dateB - dateA;
      }
      return 0;
    });
  }, [data, sortBy]);

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
  if ((movies?.length ?? 0) === 0) {
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
            <Button onClick={setNewestSort}>由新至舊</Button>
            <Button onClick={setOldestSort}>由舊至新</Button>
          </ButtonGroup>
        </Stack>
        <Grid2 columns={12} container py={2} spacing={{ xs: 2, md: 3 }}>
          {movies.map((item) => {
            return (
              <Grid2 key={item.id} size={{ xs: 6, sm: 4, md: 3 }}>
                <MovieListItem listCount={listCount++} movie={item} />
              </Grid2>
            );
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
