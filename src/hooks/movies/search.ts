import { useMemo } from 'react';
import { z } from 'zod';

import useQueryParams from '../global/query-params';

const useSearchMoviesQueyParams = () => {
  const { urlSearchParams, setQueryParams, removeQueryParams } =
    useQueryParams<{
      search: string;
      sortBy: string;
    }>();

  const search = useMemo(
    () =>
      z.coerce
        .string()
        .optional()
        .transform((val) => (val === 'null' ? undefined : val))
        .parse(urlSearchParams.get('search')),
    [urlSearchParams]
  );

  const setSearch = (search: string) => {
    setQueryParams({ search });
  };

  const removeSearch = () => {
    if (urlSearchParams.has('search')) {
      removeQueryParams('search');
    }
  };

  const sortBy = useMemo(
    () =>
      z.coerce
        .string()
        .optional()
        .transform((val) => (val === 'null' ? undefined : val))
        .parse(urlSearchParams.get('sortBy')),
    [urlSearchParams]
  );

  const setSortBy = (sortBy: string) => {
    setQueryParams({ sortBy });
  };

  const removeSortBy = () => {
    if (urlSearchParams.has('sortBy')) {
      removeQueryParams('sortBy');
    }
  };

  return {
    search,
    setSearch,
    removeSearch,
    sortBy,
    setSortBy,
    removeSortBy,
  };
};

export default useSearchMoviesQueyParams;
