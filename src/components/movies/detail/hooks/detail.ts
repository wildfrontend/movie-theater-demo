'use client';

import { useParams } from 'next/navigation';

import {
  useFetchMovie,
  useFetchMovieCredits,
  useFetchMovieReviews,
} from '@/apis/movies/api';

export const useMovieDetail = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const data = useFetchMovie(movieId);
  return { ...data, movieId: data.data?.id ?? movieId };
};

export const useMovieReview = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const data = useFetchMovieReviews(movieId);
  return data;
};

export const useMovieCredits = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const data = useFetchMovieCredits(movieId);
  return data;
};
