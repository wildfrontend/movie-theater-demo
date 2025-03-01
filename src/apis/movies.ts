import { useInfiniteQuery } from '@tanstack/react-query';

import {
  GetSearchMoviesQueryParams,
  GetSearchMoviesResponse,
} from '@/types/apis/movies';
import axios from '@/utils/axios';

// https://developer.themoviedb.org/reference/search-movie

export const useFetchSearchMovies = ({
  params,
}: Partial<{ params: GetSearchMoviesQueryParams }>) => {
  const query = useInfiniteQuery({
    queryKey: ['movies', 'search', params],
    queryFn: ({ signal, pageParam }) => {
      return axios.get<GetSearchMoviesResponse>('/search/movie', {
        signal,
        params: {
          ...params,
          page: pageParam,
        },
      });
    },
    initialPageParam: 1,
    getPreviousPageParam: (firstPage) => {
      const value = firstPage.data.page - 1;
      return value < 0 ? undefined : value;
    },
    getNextPageParam: (lastPage) => {
      const totalPage = lastPage.data.total_pages;
      const value = lastPage.data.page + 1;
      return value <= totalPage ? value : undefined;
    },
  });
  return query;
};
