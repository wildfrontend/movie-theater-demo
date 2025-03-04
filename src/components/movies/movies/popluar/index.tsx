import { Container, Grid2, Stack, Typography } from '@mui/material';
import { InView } from 'react-intersection-observer';

import { useFetchPopularMovies } from '@/apis/movies/api';
import FailedPanel from '@/components/error/failed';

import MovieListItem from '../item';
import MoviesEmpty from '../list/empty';
import { LoadMoreSkeleton } from '../list/skeleton';

const ResultsEmpty: React.FC = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isFetched,

    error,
  } = useFetchPopularMovies();
  let listCount = 1;

  if (error) {
    return <FailedPanel error={error} />;
  }

  if (data?.pages.length === 0) {
    return <MoviesEmpty />;
  }

  return (
    <Container maxWidth="lg">
      <Stack pt="32px" spacing="16px">
        <Typography fontWeight="bold" variant="h2">
          時下熱門電影
        </Typography>
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
          {!hasNextPage && (
            <Typography component="span" fontWeight="bold" variant="h4">
              已經顯示所有結果
            </Typography>
          )}
        </Grid2>
      </Stack>
    </Container>
  );
};

export default ResultsEmpty;
