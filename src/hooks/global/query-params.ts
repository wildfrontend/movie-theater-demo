import { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

function useQueryParams<T = {}>() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlSearchParams = useMemo(() => {
    return new URLSearchParams(Array.from(searchParams.entries()));
  }, [searchParams]);

  const setQueryParams = useCallback(
    (params: Partial<T>, options?: NavigateOptions) => {
      const newSearchParams = new URLSearchParams(urlSearchParams);

      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          newSearchParams.set(key, String(value));
        } else {
          newSearchParams.delete(key);
        }
      });

      const search = newSearchParams.toString();
      const query = search ? `?${search}` : '';

      router.replace(`${pathname}${query}`, { ...options });
    },
    [router, pathname, urlSearchParams]
  );

  const removeQueryParams = useCallback(
    (key: string, options?: NavigateOptions) => {
      const newSearchParams = new URLSearchParams(urlSearchParams);
      newSearchParams.delete(key);

      const search = newSearchParams.toString();
      const query = search ? `?${search}` : '';

      router.replace(`${pathname}${query}`, { ...options });
    },
    [router, pathname, urlSearchParams]
  );

  return { urlSearchParams, setQueryParams, removeQueryParams };
}

export default useQueryParams;
