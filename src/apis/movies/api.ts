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

export const useFetchMovie = ({
  movieId,
  enabled,
}: {
  movieId: PathParamId;
  enabled: boolean;
}) => {
  const query = useQuery(movieDetailQueryOptions(movieId, enabled));
  return query;
};

export const useFetchMovieCredits = ({
  movieId,
  enabled,
}: {
  movieId: PathParamId;
  enabled?: boolean;
}) => {
  const query = useQuery(movieCreditQueryOptions(movieId, enabled));
  return query;
};

export const useFetchMovieReviews = ({
  movieId,
  enabled,
}: {
  movieId: PathParamId;
  enabled: boolean;
}) => {
  const query = useQuery(movieReviewsQueryOptions(movieId, enabled));
  return query;
};
