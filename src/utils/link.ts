import { compile } from 'path-to-regexp';

import pagePath from '@/constants/global/path';

export const generateMovieHerf = (movieId: PathParamId) => {
  return compile(pagePath.movieDetail)({
    movieId: `${movieId}`,
  });
};
