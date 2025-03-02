import { queryOptions } from '@tanstack/react-query';

import {
  GetMovieCreditsResponse,
  GetMovieDetailResponse,
  GetMovieReviewsResponse,
} from '@/types/apis/movies';
import axios from '@/utils/axios';

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
