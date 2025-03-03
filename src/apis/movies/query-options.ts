import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';

import {
  GetMovieAccountStatusResponse,
  GetMovieCreditsResponse,
  GetMovieDetailResponse,
  GetMovieReviewsResponse,
  GetMovieVideosResponse,
  GetPopularMoviesResponse,
  GetSearchMoviesQueryParams,
  GetSearchMoviesResponse,
} from '@/types/apis/movies';
import axios from '@/utils/axios';

export const popularMoviesQueryOptions = () => {
  return infiniteQueryOptions({
    queryKey: ['movies', 'popular'],
    queryFn: async ({ signal, pageParam }) => {
      const res = await axios.get<GetPopularMoviesResponse>('/movie/popular', {
        signal,
        params: {
          page: pageParam,
        },
      });
      return res.data;
    },
    initialPageParam: 1,
    getPreviousPageParam: (firstPage) => {
      const value = firstPage.page - 1;
      return value < 0 ? undefined : value;
    },
    getNextPageParam: (lastPage) => {
      const totalPage = lastPage.total_pages;
      const value = lastPage.page + 1;
      return value <= totalPage ? value : undefined;
    },
  });
};

export const searchMoviesQueryOptions = ({
  params,
  enabled,
}: Partial<{ params: GetSearchMoviesQueryParams; enabled?: boolean }>) => {
  return infiniteQueryOptions({
    queryKey: ['movies', 'search', params?.query],
    queryFn: async ({ signal, pageParam }) => {
      const res = await axios.get<GetSearchMoviesResponse>('/search/movie', {
        signal,
        params: {
          ...params,
          language: 'zh-TW',
          page: pageParam,
        },
      });
      return res.data;
    },
    initialPageParam: 1,
    getPreviousPageParam: (firstPage) => {
      const value = firstPage.page - 1;
      return value < 0 ? undefined : value;
    },
    getNextPageParam: (lastPage) => {
      const totalPage = lastPage.total_pages;
      const value = lastPage.page + 1;
      return value <= totalPage ? value : undefined;
    },
    enabled: enabled ?? !!params?.query,
  });
};

export const movieDetailQueryOptions = (movieId?: PathParamId) => {
  return queryOptions({
    queryKey: ['movies', 'movie', movieId],
    queryFn: async ({ signal }) => {
      const res = await axios.get<GetMovieDetailResponse>(`/movie/${movieId}`, {
        signal,
        params: {
          language: 'zh-TW',
        },
      });
      return res.data;
    },
    enabled: !!movieId,
  });
};

export const movieCreditQueryOptions = (movieId?: PathParamId) =>
  queryOptions({
    queryKey: ['movies', 'movie', 'credits', movieId],
    queryFn: async ({ signal }) => {
      const res = await axios.get<GetMovieCreditsResponse>(
        `/movie/${movieId}/credits`,
        {
          signal,
          params: {
            language: 'zh-TW',
          },
        }
      );
      return res.data;
    },
    enabled: !!movieId,
  });

export const movieReviewsQueryOptions = (movieId?: PathParamId) =>
  queryOptions({
    queryKey: ['movies', 'movie', 'reviews', movieId],
    queryFn: async ({ signal }) => {
      const res = await axios.get<GetMovieReviewsResponse>(
        `/movie/${movieId}/reviews`,
        {
          signal,
          params: {
            language: 'zh-TW',
          },
        }
      );
      return res.data;
    },
    enabled: !!movieId,
  });

export const movieVideosQueryOptions = (movieId?: PathParamId) =>
  queryOptions({
    queryKey: ['movies', 'movie', 'videos', movieId],
    queryFn: async ({ signal }) => {
      const res = await axios.get<GetMovieVideosResponse>(
        `/movie/${movieId}/videos`,
        {
          signal,
        }
      );
      return res.data;
    },
    enabled: !!movieId,
  });

export const movieAccountStatesQueryOptions = (movieId?: PathParamId) =>
  queryOptions({
    queryKey: ['movies', 'movie', 'status', movieId],
    queryFn: async ({ signal }) => {
      const res = await axios.get<GetMovieAccountStatusResponse>(
        `/movie/${movieId}/account_states`,
        {
          signal,
        }
      );
      return res.data;
    },
    enabled: !!movieId,
  });
