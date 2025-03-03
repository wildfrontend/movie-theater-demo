import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import {
  type GetSearchMoviesQueryParams,
  VideoType,
} from '@/types/apis/movies';

import {
  movieAccountStatesQueryOptions,
  movieCreditQueryOptions,
  movieDetailQueryOptions,
  movieReviewsQueryOptions,
  movieVideosQueryOptions,
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
  return { ...query, detail: query.data };
};

export const useFetchMovieCredits = (movieId?: PathParamId) => {
  const query = useQuery(movieCreditQueryOptions(movieId));
  return { ...query, cast: query.data?.cast, crew: query.data?.crew };
};

export const useFetchMovieReviews = (movieId?: PathParamId) => {
  const query = useQuery(movieReviewsQueryOptions(movieId));
  return { ...query, reviews: query.data?.results };
};

export const useFetchMovieVideos = (movieId?: PathParamId) => {
  const query = useQuery(movieVideosQueryOptions(movieId));
  return {
    ...query,
    trailer: query.data?.results?.find(
      (item) => item.type === VideoType.trailer
    ),
  };
};

export const useFetchMovieAccountStates = (movieId?: PathParamId) => {
  const query = useQuery(movieAccountStatesQueryOptions(movieId));
  return {
    ...query,
    movieId: query.data?.id,
    isWatchlist: !!query.data?.watchlist,
  };
};
