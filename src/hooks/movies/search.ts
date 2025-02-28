import { useMemo } from 'react';
import { z } from 'zod';

import useQueryParams from '../global/query-params';

const useSearhMoviesQueyParams = () => {
  const { urlSearchParams, setQueryParams } = useQueryParams<{
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
  return {
    search,
    setSearch,
  };
};

export default useSearhMoviesQueyParams;
