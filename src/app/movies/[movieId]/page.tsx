import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';
import React, { Suspense } from 'react';

import {
  movieDetailQueryOptions,
  movieVideosQueryOptions,
} from '@/apis/movies/query-options';
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

  return <HydrationBoundary state={dehydrate(queryClient)}></HydrationBoundary>;
};

export default Page;
