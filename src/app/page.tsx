import React, { Suspense } from 'react';

import MovieInfo from '@/components/movies/info/main';
import SearchSection from '@/components/movies/search';
import SearchResults from '@/components/movies/search-results/list';

const Page: React.FC = () => {
  return (
    <>
      <SearchSection />
      <Suspense fallback={<div>Loading..</div>}>
        <SearchResults />
        <MovieInfo />
      </Suspense>
    </>
  );
};

export default Page;
