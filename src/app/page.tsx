import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import React, { Suspense } from 'react';

import {
  popularMoviesQueryOptions,
  searchMoviesQueryOptions,
} from '@/apis/movies/query-options';
import SearchResults from '@/components/movies/movies/results';
import ResultsSkeleton from '@/components/movies/movies/results/skeleton';
import SearchSection from '@/components/movies/search';
import { getQueryClient } from '@/utils/react-query';

const Page: React.FC<{
  searchParams: Promise<{
    search?: string;
  }>;
}> = async ({ searchParams }) => {
  const { search } = await searchParams;
  const queryClient = getQueryClient();
  if (search) {
    await queryClient.prefetchInfiniteQuery(
      searchMoviesQueryOptions({ params: { query: search } })
    );
  } else {
    await queryClient.prefetchInfiniteQuery(popularMoviesQueryOptions());
  }
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SearchSection />
      <Suspense fallback={<ResultsSkeleton />}>
        <SearchResults />
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;
