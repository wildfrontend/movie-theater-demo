type UrlQueryParams<T> = { [P in keyof T]?: T[P] | string | undefined | null };

type PathParamId = string | number;
