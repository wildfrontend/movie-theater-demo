import { useMemo } from 'react';
import { z } from 'zod';

import useQueryParams from '../global/query-params';

const useSearchMoviesQueyParams = () => {
  const { urlSearchParams, setQueryParams, removeQueryParams } =
    useQueryParams<{
      search: string;
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
  return {
    search,
    setSearch,
    removeSearch,
  };
};

export default useSearchMoviesQueyParams;
