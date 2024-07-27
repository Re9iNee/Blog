"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

type Props = {
  key: string;
  defaultValue: string;
};
function useSetURLParams({ key, defaultValue }: Props) {
  const { push } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setToUrl = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams);

      if (value !== defaultValue) {
        params.set(key, value);
      } else {
        params.delete(key);
      }

      push(`${pathname}?${params.toString()}`);
    },
    [pathname, searchParams, push, key, defaultValue],
  );

  return { setToUrl };
}
export default useSetURLParams;

export function useSetManyUrlParams() {
  const { push } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const set = useCallback(
    (params: { key: string; value: string }[]) => {
      const newParams = new URLSearchParams(searchParams);

      params.forEach(({ key, value }) => {
        newParams.set(key, value);
      });

      push(`${pathname}?${newParams.toString()}`, { scroll: false });
    },
    [searchParams, pathname, push],
  );

  return { set };
}
