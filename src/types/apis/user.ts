import { MovieItem } from './movies';

export enum WatchlistSortType {
  asc = 'created_at.asc',
  desc = 'created_at.desc',
}
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
