import { useMemo } from 'react';
import { z } from 'zod';

import useQueryParams from '../global/query-params';

const useMovieIdQueyParams = () => {
  const { urlSearchParams, setQueryParams, removeQueryParams } =
    useQueryParams<{
      movieId: PathParamId;
    }>();

  const movieId = useMemo(
    () =>
      z.coerce
        .string()
        .optional()
        .transform((val) => (val === 'null' ? undefined : val))
        .parse(urlSearchParams.get('movieId')),
    [urlSearchParams]
  );
  const setMovieId = (movieId: PathParamId) => {
    setQueryParams({ movieId });
  };
  const removeMovieId = () => {
    removeQueryParams('movieId');
  };
  return {
    movieId,
    setMovieId,
    removeMovieId,
  };
};

export default useMovieIdQueyParams;
