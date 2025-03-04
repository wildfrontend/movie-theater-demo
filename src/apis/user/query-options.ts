import { infiniteQueryOptions } from '@tanstack/react-query';
import { cache } from 'react';

import {
  GetWatchlistQueryParams,
  GetWatchlistResponse,
} from '@/types/apis/user';
import axios from '@/utils/axios';

export const watchlistQueryOptions = ({
  params,
}: Partial<{ params: GetWatchlistQueryParams }>) => {
  return infiniteQueryOptions({
    queryKey: ['user', 'watchlist', params],
    queryFn: async ({ signal, pageParam }) => {
      const res = await axios.get<GetWatchlistResponse>(
        '/account/21848892/watchlist/movies',
        {
          signal,
          params: {
            ...params,
            language: 'zh-TW',
            page: pageParam,
          },
        }
      );
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
