import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';
import React, { Suspense } from 'react';

import {
  movieDetailQueryOptions,
  movieVideosQueryOptions,
} from '@/apis/movies/query-options';
import { watchlistQueryOptions } from '@/apis/user/query-options';
import MovieInfo from '@/components/movies/info/main';
import MoviesSkeleton from '@/components/movies/movies/list/skeleton';
import Watchlist from '@/components/movies/movies/watchlist';
import { getQueryClient } from '@/utils/react-query';

export const metadata: Metadata = {
  title: 'The Movie Datebase - Watchlist',
  description: 'Interview demo',
};

const Page: React.FC<{
  searchParams: Promise<{
    sortBy?: string;
    movieId?: string;
  }>;
}> = async ({ searchParams }) => {
  const { sortBy, movieId } = await searchParams;
  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery(
    watchlistQueryOptions({
      params: {
        sort_by: sortBy,
      },
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<MoviesSkeleton />}>
        <Watchlist />
        <MovieInfo />
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;
