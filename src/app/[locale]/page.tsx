import ScheduleList from "@/components/schedule/ScheduleList";
import { getSchedules } from "@/utils/api";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import config from "@/config";
import { formatDate } from "@/utils/formatDate";

export default async function Home() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
      },
    },
  });
  const currentDate = formatDate(new Date());
  const { DEFAULT_PAGE_OFFSET, DEFAULT_PAGE_LIMIT } = config;
  const defaultParams = {
    date: currentDate,
    start: DEFAULT_PAGE_OFFSET,
    limit: DEFAULT_PAGE_LIMIT,
  };

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["schedules", currentDate],
    queryFn: () => getSchedules(defaultParams),
    initialPageParam: defaultParams,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ScheduleList />
    </HydrationBoundary>
  );
}
