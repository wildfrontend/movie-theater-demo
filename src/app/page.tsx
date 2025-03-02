import React, { Suspense } from 'react';

import MovieInfo from '@/components/movies/info/main';
import SearchSection from '@/components/movies/search';
import SearchResults from '@/components/movies/movies/results';

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
