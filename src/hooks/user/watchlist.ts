import { useMemo } from 'react';
import { z } from 'zod';

import useQueryParams from '../global/query-params';

const useWatchlistQueyParams = () => {
  const { urlSearchParams, setQueryParams } = useQueryParams<{
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
  return {
    sortBy,
    setSortBy,
  };
};

export default useWatchlistQueyParams;
