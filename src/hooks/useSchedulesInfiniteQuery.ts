import { getSchedules } from "@/utils/api";
import { useInfiniteQuery } from "@tanstack/react-query";
import config from "@/config";
import { formatDate } from "@/utils/formatDate";
import { useQueryState } from "nuqs";

export function useSchedulesInfiniteQuery() {
  const { DEFAULT_PAGE_OFFSET, DEFAULT_PAGE_LIMIT } = config;
  const currentDate = formatDate(new Date());
  const [date] = useQueryState("date", { defaultValue: currentDate });

  return useInfiniteQuery({
    queryKey: ["schedules", date],
    queryFn: ({ pageParam }) => getSchedules(pageParam),
    initialPageParam: {
      date: date,
      start: DEFAULT_PAGE_OFFSET,
      limit: DEFAULT_PAGE_LIMIT,
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.schedules.length < DEFAULT_PAGE_LIMIT) {
        return undefined;
      }

      return {
        date: date,
        start: allPages.length * DEFAULT_PAGE_LIMIT,
        limit: DEFAULT_PAGE_LIMIT,
      };
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
}
