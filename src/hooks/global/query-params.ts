import { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { usePathname } from 'next/navigation';
import { useRouter, useSearchParams } from 'next/navigation';

function useQueryParams<T = {}>() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlSearchParams = new URLSearchParams(
    Array.from(searchParams.entries())
  );

  function setQueryParams(params: Partial<T>, options?: NavigateOptions) {
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        urlSearchParams.set(key, String(value));
      } else {
        urlSearchParams.delete(key);
      }
    });

    const search = urlSearchParams.toString();
    const query = search ? `?${search}` : '';

    // consider add scroll = false to imporve ux
    router.replace(`${pathname}${query}`, options);
  }

  function removeQueryParams(key: string, options?: NavigateOptions) {
    urlSearchParams.delete(key);
    const search = urlSearchParams.toString();
    const query = search ? `?${search}` : '';

    // consider add scroll = false to imporve ux
    router.replace(`${pathname}${query}`, options);
  }

  return { urlSearchParams, setQueryParams, removeQueryParams };
}

export default useQueryParams;
