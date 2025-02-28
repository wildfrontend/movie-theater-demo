import { useQuery } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';

import { GetNowPlayingMoviesQueryParams } from '@/types/apis/movies';
import axios from '@/utils/axios';

// https://developer.themoviedb.org/reference/search-movie
export const searchMovies = (config: AxiosRequestConfig) => {
  return axios.get('/search/movie', config);
};

export const useFetchNowPlayingMovies = (
  params?: GetNowPlayingMoviesQueryParams
) => {
  const query = useQuery({
    queryKey: ['movies', 'now-playing', params],
    queryFn: ({ signal }) => {
      return axios.get('/movie/now_playing', { signal, params });
    },
  });
  return query;
};
