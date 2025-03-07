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

import { useFetchWatchlist } from '@/apis/user/api';
import FailedPanel from '@/components/error/failed';
import useWatchlistQueyParams from '@/hooks/user/watchlist';
import { WatchlistSortType } from '@/types/apis/user';

import MovieListItem from '../item';
import { LoadMoreSkeleton } from '../list/skeleton';
import WatchlistEmpty from './empty';
import WatchlistSkeleton from './skeleton';

export const useWatchlist = () => {
  const { sortBy, setSortBy } = useWatchlistQueyParams();
  const query = useFetchWatchlist({
    params: {
      sort_by: sortBy,
    },
  });
  return {
    ...query,
    setSortBy,
  };
};

const Watchlist: React.FC = () => {
  const {
    data,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    error,
    fetchNextPage,
    setSortBy,
  } = useWatchlist();

  let listCount = 1;

  if (isLoading) {
    return <WatchlistSkeleton />;
  }
  if (error) {
    return <FailedPanel error={error} />;
  }
  if ((data?.pages?.[0]?.results?.length ?? 0) === 0) {
    return <WatchlistEmpty />;
  }
  return (
    <Container maxWidth="lg">
      <Stack pt="32px" spacing="16px">
        <Typography fontWeight="bold" variant="h2">
          待看清單
        </Typography>
        <Stack direction="row" justifyContent="end">
          <ButtonGroup aria-label="sort" variant="contained">
            <Button
              onClick={() => {
                setSortBy(WatchlistSortType.asc);
              }}
            >
              由新至舊
            </Button>
            <Button
              onClick={() => {
                setSortBy(WatchlistSortType.desc);
              }}
            >
              由舊往新
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
      </Stack>
    </Container>
  );
};

export default Watchlist;
