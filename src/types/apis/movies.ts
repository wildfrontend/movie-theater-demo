/**
 * ANCHOR Now Playing movies
 */
export type GetNowPlayingMoviesQueryParams = UrlQueryParams<{
  language: string; // en-US;
  page: number; // 1,
  region: string; // ISO-3166-1 code
}>;

type DateRange = {
  maximum: string;
  minimum: string;
};

type MovieItem = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type GetNowPlayingMoviesResponse = {
  dates: DateRange;
  page: number;
  results: MovieItem[];
  total_pages: number;
  total_results: number;
};
