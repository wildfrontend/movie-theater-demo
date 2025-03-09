import { Container, Grid2, Stack, Typography } from '@mui/material';
import { InView } from 'react-intersection-observer';

import { useFetchPopularMovies } from '@/apis/movies/api';
import FailedPanel from '@/components/error/failed';

import MovieListItem from '../item';
import MoviesEmpty from '../list/empty';
import LoadMoreSkeleton from '../list/skeleton';
import PopluarSkeleton from './skeleton';

const ResultsEmpty: React.FC = () => {
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
  } = useFetchPopularMovies();

  let listCount = 1;

  if (isLoading) {
    return <PopluarSkeleton />;
  }
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
            return group?.results?.map((item) => {
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

export default ResultsEmpty;
