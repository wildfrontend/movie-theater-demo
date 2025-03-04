'use client';

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
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

import { useFetchWatchlist } from '@/apis/user/api';
import FailedPanel from '@/components/error/failed';
import useWatchlistQueyParams from '@/hooks/user/watchlist';
import { WatchlistSortType } from '@/types/apis/user';

import MovieListItem from '../item';
import MoviesEmpty from '../list/empty';
import { LoadMoreSkeleton } from '../list/skeleton';

const Watchlist: React.FC = () => {
  const { sortBy, setSortBy, removeSortBy } = useWatchlistQueyParams();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetched,
    error,
  } = useFetchWatchlist({
    params: {
      sort_by: sortBy,
    },
  });

  let listCount = 1;

  if (error) {
    return <FailedPanel error={error} />;
  }
  if (!isFetched) {
    return <MoviesEmpty />;
  }
  return (
    <Container maxWidth="lg">
      <Stack pt="32px" spacing="16px">
        <Typography fontWeight="bold" variant="h2">
          待看清單
        </Typography>
        <Stack direction="row" justifyContent="end">
          <ButtonGroup variant="contained" aria-label="sort">
            <Button
              onClick={() => {
                setSortBy(WatchlistSortType.asc);
              }}
            >
              由上往下
            </Button>
            <Button
              onClick={() => {
                setSortBy(WatchlistSortType.desc);
              }}
            >
              由下往上
            </Button>
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
          {hasNextPage && (
            <InView
              as="div"
              onChange={(inView) => {
                if (inView && hasNextPage && !isFetchingNextPage) {
                  fetchNextPage();
                }
              }}
            />
          )}
          {isFetchingNextPage && <LoadMoreSkeleton />}
        </Grid2>
      </Stack>
    </Container>
  );
};

export default Watchlist;
