import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';
import React, { Suspense } from 'react';

import {
  movieDetailQueryOptions,
  movieVideosQueryOptions,
} from '@/apis/movies/query-options';
import { watchlistQueryOptions } from '@/apis/user/query-options';
import MovieInfo from '@/components/movies/info/main';
import Watchlist from '@/components/movies/movies/watchlist';
import WatchlistSkeleton from '@/components/movies/movies/watchlist/skeleton';
import PlaySomethingSection from '@/components/movies/play-someting';
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

  if (movieId) {
    await Promise.all([
      queryClient.prefetchQuery(movieDetailQueryOptions(movieId)),
      queryClient.prefetchQuery(movieVideosQueryOptions(movieId)),
    ]);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PlaySomethingSection />
      <Suspense fallback={<WatchlistSkeleton />}>
        <Watchlist />
        <MovieInfo />
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;
