import { WatchlistSortType } from '@/constants/enums/movies';

import type { MovieItem } from './movies';

export type GetWatchlistQueryParams = UrlQueryParams<{
  language: string;
  page: string;
  sort_by: WatchlistSortType;
}>;

export type GetWatchlistResponse = {
  page: number;
  results: MovieItem[];
  total_pages: number;
  total_results: number;
};
