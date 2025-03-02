import React, { Suspense } from 'react';

import MovieInfo from '@/components/movies/info/main';
import SearchResults from '@/components/movies/results/list';
import SearchSection from '@/components/movies/search';

const Page: React.FC = () => {
  return (
    <>
      <SearchSection />
      <Suspense fallback={<div>Loading..</div>}>
        <SearchResults />
      </Suspense>
      <Suspense fallback={<div>Loading..</div>}>
        <MovieInfo />
      </Suspense>
    </>
  );
};

export default Page;
