import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';

import {
  GetMovieCreditsResponse,
  GetMovieDetailResponse,
  GetMovieReviewsResponse,
  GetPopularMoviesResponse,
  GetSearchMoviesQueryParams,
  GetSearchMoviesResponse,
} from '@/types/apis/movies';
import axios from '@/utils/axios';

export const popularMoviesQueryOptions = () => {
  return infiniteQueryOptions({
    queryKey: ['movies', 'popular'],
    queryFn: ({ signal, pageParam }) => {
      return axios.get<GetPopularMoviesResponse>('/movie/popular', {
        signal,
        params: {
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
};

export const searchMoviesQueryOptions = ({
  params,
  enabled,
}: Partial<{ params: GetSearchMoviesQueryParams; enabled?: boolean }>) => {
  return infiniteQueryOptions({
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
};

export const movieDetailQueryOptions = (movieId?: PathParamId) => {
  return queryOptions({
    queryKey: ['movies', 'movie', movieId],
    queryFn: ({ signal }) => {
      return axios.get<GetMovieDetailResponse>(`/movie/${movieId}`, {
        signal,
        params: {
          language: 'zh-TW',
        },
      });
    },
    enabled: !!movieId,
  });
};

export const movieCreditQueryOptions = (movieId?: PathParamId) =>
  queryOptions({
    queryKey: ['movies', 'movie', 'credits', movieId],
    queryFn: ({ signal }) => {
      return axios.get<GetMovieCreditsResponse>(`/movie/${movieId}/credits`, {
        signal,
        params: {
          language: 'zh-TW',
        },
      });
    },
    enabled: !!movieId,
  });

export const movieReviewsQueryOptions = (movieId?: PathParamId) =>
  queryOptions({
    queryKey: ['movies', 'movie', 'reviews', movieId],
    queryFn: ({ signal }) => {
      return axios.get<GetMovieReviewsResponse>(`/movie/${movieId}/reviews`, {
        signal,
        params: {
          language: 'zh-TW',
        },
      });
    },
    enabled: !!movieId,
  });
