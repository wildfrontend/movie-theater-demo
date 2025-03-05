import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import React, { Suspense } from 'react';

import {
  movieDetailQueryOptions,
  movieVideosQueryOptions,
  popularMoviesQueryOptions,
  searchMoviesQueryOptions,
} from '@/apis/movies/query-options';
import MovieInfo from '@/components/movies/info/main';
import SearchResults from '@/components/movies/movies/results';
import ResultsSkeleton from '@/components/movies/movies/results/skeleton';
import SearchSection from '@/components/movies/search';
import { getQueryClient } from '@/utils/react-query';

const Page: React.FC<{
  searchParams: Promise<{
    search?: string;
    movieId?: string;
  }>;
}> = async ({ searchParams }) => {
  const { search, movieId } = await searchParams;
  const queryClient = getQueryClient();

  if (search) {
    await queryClient.prefetchInfiniteQuery(
      searchMoviesQueryOptions({ params: { query: search } })
    );
  } else {
    await queryClient.prefetchInfiniteQuery(popularMoviesQueryOptions());
  }

  if (movieId) {
    await Promise.all([
      queryClient.prefetchQuery(movieDetailQueryOptions(movieId)),
      queryClient.prefetchQuery(movieVideosQueryOptions(movieId)),
    ]);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SearchSection />
      <Suspense fallback={<ResultsSkeleton />}>
        <SearchResults />
        <MovieInfo />
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;
