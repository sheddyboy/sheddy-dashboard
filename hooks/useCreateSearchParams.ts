import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function useCreateSearchParams() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      console.log("query");
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );
  const navigateToSearchQuery = (name: string, value: string) => {
    console.log("navigate-query");
    return router.push(pathname + "?" + createQueryString(name, value));
  };

  const removeSearchQuery = (name: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(name);
    router.push(pathname + "?" + params);
  };

  return {
    createQueryString,
    navigateToSearchQuery,
    removeSearchQuery,
    searchParams,
  };
}
