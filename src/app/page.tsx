import React from 'react';

import SearchSection from '@/components/movies/search';
import SearchResults from '@/components/movies/search-results';

const Page: React.FC = () => {
  return (
    <>
      <SearchSection />
      <SearchResults />
    </>
  );
};

export default Page;
