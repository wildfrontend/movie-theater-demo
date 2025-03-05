import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Stack,
  Typography,
} from '@mui/material';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';
import React from 'react';

import {
  movieDetailQueryOptions,
  movieVideosQueryOptions,
} from '@/apis/movies/query-options';
import MovieCredits from '@/components/movies/detail/credits';
import MovieAttribute from '@/components/movies/detail/main/attributes';
import MovieGenres from '@/components/movies/detail/main/genres';
import MovieHeadline from '@/components/movies/detail/main/headline';
import MovieOverview from '@/components/movies/detail/main/overview';
// import RemoveQueryParams from '@/components/movies/detail/main/remove-query';
import MovieStatus from '@/components/movies/detail/main/status';
import MovieTitle from '@/components/movies/detail/main/title';
import MovieReviews from '@/components/movies/detail/reviews';
import { getQueryClient } from '@/utils/react-query';

export const metadata: Metadata = {
  title: 'The Movie Datebase - Detail',
  description: 'Interview demo',
};

const Page: React.FC<{
  params: Promise<{
    movieId: string;
  }>;
}> = async ({ params }) => {
  const { movieId } = await params;
  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery(movieDetailQueryOptions(movieId)),
    queryClient.prefetchQuery(movieVideosQueryOptions(movieId)),
  ]);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Container
        maxWidth="md"
        sx={{
          pt: '32px',
          px: {
            xs: '0px',
          },
        }}
      >
        <Card>
          <CardMedia>
            <MovieHeadline />
          </CardMedia>
          <CardContent>
            <Stack spacing="16px">
              <MovieTitle />
              <MovieAttribute />
              <MovieGenres />
              <MovieStatus />
              <Typography fontWeight="bold" gutterBottom variant="h5">
                概要
              </Typography>
              <MovieOverview />
              <Typography fontWeight="bold" variant="h5">
                演出
              </Typography>
              <MovieCredits />
              <Typography fontWeight="bold" variant="h5">
                評論
              </Typography>
              <MovieReviews />
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </HydrationBoundary>
  );
};

export default Page;
