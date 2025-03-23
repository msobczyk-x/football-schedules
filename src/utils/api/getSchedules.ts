import { ScheduleResponse } from "@/types/api";

type GetSchedulesParams = {
  date: string;
  start: number;
  limit: number;
};
export default async function getSchedules(
  params: GetSchedulesParams
): Promise<ScheduleResponse> {
  const { date, start, limit } = params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/schedules?date=${date}&start=${start}&limit=${limit}`,
    { cache: "default", next: { revalidate: 3600 * 24 } }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch schedules");
  }

  return response.json();
}
