import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Stack,
  Typography,
} from '@mui/material';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { Metadata, ResolvingMetadata } from 'next';
import React from 'react';

import {
  movieCreditQueryOptions,
  movieDetailQueryOptions,
  movieReviewsQueryOptions,
  movieVideosQueryOptions,
} from '@/apis/movies/query-options';
import { getMovieDetailBySSR } from '@/apis/movies/server';
import MovieCredits from '@/components/movies/detail/credits';
import MovieAttribute from '@/components/movies/detail/main/attributes';
import MovieGenres from '@/components/movies/detail/main/genres';
import MovieHeadline from '@/components/movies/detail/main/headline';
import MovieOverview from '@/components/movies/detail/main/overview';
import ScrollTop from '@/components/movies/detail/main/scroll-top';
import MovieStatus from '@/components/movies/detail/main/status';
import MovieTitle from '@/components/movies/detail/main/title';
import MovieReviews from '@/components/movies/detail/reviews';
import { getQueryClient } from '@/utils/global/react-query';

type Props = {
  params: Promise<{ movieId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { movieId } = await params;
  const movie = await getMovieDetailBySSR(movieId);

  let previousImages = undefined;

  if (movie?.backdrop_path) {
    previousImages = {
      url: `https://image.tmdb.org/t/p/w780${movie?.backdrop_path}`,
    };
  }

  return {
    title: movie?.title,
    description:
      (movie?.overview.length ?? 0) > 150
        ? movie?.overview.slice(0, 150) + `...`
        : movie?.overview,
    openGraph: {
      images: previousImages,
    },
  };
}

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
    queryClient.prefetchQuery(movieCreditQueryOptions(movieId)),
    queryClient.prefetchQuery(movieReviewsQueryOptions(movieId)),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ScrollTop />
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
