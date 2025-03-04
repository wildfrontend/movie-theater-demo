export type MovieItem = {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

/**
 * ANCHOR Popular movies
 */

export type GetPopularMoviesResponse = {
  page: number;
  results: MovieItem[];
  total_pages: number;
  total_results: number;
};

/**
 * ANCHOR Search movies
 */

export enum SearchMoviesSortType {
  asc = 'created_at.asc',
  desc = 'created_at.desc',
}

export type GetSearchMoviesQueryParams = UrlQueryParams<{
  query: string;
  page: number;
  include_adult: boolean;
  region: string;
  language: string;
  year: number;
}>;

export type SearchMovieItem = MovieItem;

export type GetSearchMoviesResponse = {
  page: number;
  results: SearchMovieItem[];
  total_pages: number;
  total_results: number;
};

/**
 * ANCHOR Movie Details
 */

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface GetMovieDetailResponse {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: any | null;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string | null;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

/**
 * ANCHOR Movie Cast
 */

export interface CastMember {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface CrewMember {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
  department: string;
  job: string;
}

export interface GetMovieCreditsResponse {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
}

/**
 * ANCHOR Movie Reviews
 */

export interface AuthorDetails {
  name: string;
  username: string;
  avatar_path: string | null;
  rating: number | null;
}

export interface MovieReview {
  author: string;
  author_details: AuthorDetails;
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}

export interface GetMovieReviewsResponse {
  id: number;
  page: number;
  results: MovieReview[];
  total_pages: number;
  total_results: number;
}

/**
 * ANCHOR Movie Videos
 */

export enum VideoType {
  trailer = 'Trailer',
  teaser = 'Teaser',
  clip = 'Clip',
  featurette = 'Featurette',
}

export enum VideoSiteType {}

export interface VideoItem {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: VideoSiteType;
  size: number;
  type: VideoType;
  official: boolean;
  published_at: string;
  id: string;
}

export interface GetMovieVideosResponse {
  id: number;
  results: VideoItem[];
}

export interface GetMovieAccountStatusResponse {
  id: number;
  favorite: boolean;
  rated: boolean;
  watchlist: boolean;
}
