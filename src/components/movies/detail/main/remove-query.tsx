'use client';

import { useEffect } from 'react';

import useSearhMoviesQueyParams from '@/hooks/movies/search';

const RemoveQueryParams: React.FC = () => {
  const { removeSearch } = useSearhMoviesQueyParams();
  useEffect(() => {
    removeSearch();
  }, [removeSearch]);
  return <></>;
};
export default RemoveQueryParams;
