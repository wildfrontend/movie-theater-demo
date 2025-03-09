import { GetMovieDetailResponse } from '@/types/apis/movies';
import serverFetch from '@/utils/global/fetch';

export const getMovieDetailBySSR = async (movieId: PathParamId) => {
  try {
    const movie = await serverFetch<GetMovieDetailResponse>(
      `/movie/${movieId}`,
      {
        cache: 'reload',
      }
    );
    return movie;
  } catch (error) {
    return undefined;
  }
};
