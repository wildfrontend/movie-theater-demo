import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import type {
  GetSearchMoviesQueryParams,
  GetSearchMoviesResponse,
} from '@/types/apis/movies';
import axios from '@/utils/axios';

import {
  movieCreditQueryOptions,
  movieDetailQueryOptions,
  movieReviewsQueryOptions,
} from './query-options';

// https://developer.themoviedb.org/reference/search-movie

export const useFetchSearchMovies = ({
  params,
  enabled,
}: Partial<{ params: GetSearchMoviesQueryParams; enabled?: boolean }>) => {
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
    enabled: enabled ?? !!params?.query,
  });
  return query;
};

export const useFetchMovie = (movieId?: PathParamId) => {
  const query = useQuery(movieDetailQueryOptions(movieId));
  return { ...query, detail: query.data?.data };
};

export const useFetchMovieCredits = (movieId?: PathParamId) => {
  const query = useQuery(movieCreditQueryOptions(movieId));
  return { ...query, cast: query.data?.data.cast, crew: query.data?.data.crew };
};

export const useFetchMovieReviews = (movieId?: PathParamId) => {
  const query = useQuery(movieReviewsQueryOptions(movieId));
  return { ...query, reviews: query.data?.data.results };
};
