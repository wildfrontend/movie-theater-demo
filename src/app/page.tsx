import React, { Suspense } from 'react';

import SearchSection from '@/components/movies/search';
import SearchResults from '@/components/movies/search-results/list';

const Page: React.FC = () => {
  return (
    <>
      <SearchSection />
      <Suspense fallback={<div>Loading..</div>}>
        <SearchResults />
      </Suspense>
    </>
  );
};

export default Page;
