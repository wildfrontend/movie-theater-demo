import { useMemo } from 'react';
import { z } from 'zod';

import useQueryParams from '../global/query-params';

const useWatchlistQueyParams = () => {
  const { urlSearchParams, setQueryParams, removeQueryParams } =
    useQueryParams<{
      sortBy: string;
    }>();

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
    sortBy,
    setSortBy,
    removeSortBy,
  };
};

export default useWatchlistQueyParams;
