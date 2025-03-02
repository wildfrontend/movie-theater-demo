import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import type {
  GetSearchMoviesQueryParams,
} from '@/types/apis/movies';

import {
  movieCreditQueryOptions,
  movieDetailQueryOptions,
  movieReviewsQueryOptions,
  popularMoviesQueryOptions,
  searchMoviesQueryOptions,
} from './query-options';

export const useFetchPopularMovies = () => {
  const query = useInfiniteQuery(popularMoviesQueryOptions());
  return query;
};

// https://developer.themoviedb.org/reference/search-movie

export const useFetchSearchMovies = ({
  params,
  enabled,
}: Partial<{ params: GetSearchMoviesQueryParams; enabled?: boolean }>) => {
  const query = useInfiniteQuery(searchMoviesQueryOptions({ params, enabled }));
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
