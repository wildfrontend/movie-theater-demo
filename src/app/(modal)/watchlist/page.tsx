import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';
import React, { Suspense } from 'react';

import { watchlistQueryOptions } from '@/apis/user/query-options';
import Watchlist from '@/components/movies/movies/watchlist';
import WatchlistSkeleton from '@/components/movies/movies/watchlist/skeleton';
import PlaySomethingSection from '@/components/movies/random-spin';
import { getQueryClient } from '@/utils/global/react-query';

export const metadata: Metadata = {
  title: 'Watchlist',
};

const Page: React.FC<{
  searchParams: Promise<{
    sortBy?: string;
  }>;
}> = async ({ searchParams }) => {
  const { sortBy } = await searchParams;
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
      <PlaySomethingSection />
      <Suspense fallback={<WatchlistSkeleton />}>
        <Watchlist />
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;
