import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

import { GetWatchlistQueryParams } from '@/types/apis/user';
import axios from '@/utils/axios';

import { watchlistQueryOptions } from './query-options';

export const addToWatchlist = ({
  movieId,
  watchlist,
}: {
  movieId?: PathParamId;
  watchlist: boolean;
}) => {
  return axios.post(`/account/21848892/watchlist`, {
    media_type: 'movie',
    media_id: movieId,
    watchlist: watchlist,
  });
};

export const useFetchWatchlist = ({
  params,
}: Partial<{ params: GetWatchlistQueryParams }>) => {
  const query = useInfiniteQuery(watchlistQueryOptions({ params }));
  return query;
};
