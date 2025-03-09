import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import type { Metadata, ResolvingMetadata } from 'next';
import React from 'react';

import {
  movieDetailQueryOptions,
  movieVideosQueryOptions,
} from '@/apis/movies/query-options';
import { getMovieDetailBySSR } from '@/apis/movies/server';
import MovieModalPage from '@/components/movies/detail/modal-page';
import { getQueryClient } from '@/utils/global/react-query';

type Props = {
  params: Promise<{ movieId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const { movieId } = await params;

  // fetch data
  const movie = await getMovieDetailBySSR(movieId);

  // optionally access and extend (rather than replace) parent metadata
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
  ]);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MovieModalPage />
    </HydrationBoundary>
  );
};

export default Page;
