import { NextRequest, NextResponse } from "next/server";
import type { ApiErrorResponse, ScheduleResponse } from "@/types/api";

const options = {
  method: "GET",
  headers: { accept: "application/json" },
  cache: "default" as RequestCache,
  next: {
    revalidate: 3600 * 24,
  },
};

export async function GET(
  request: NextRequest
): Promise<NextResponse<ScheduleResponse | ApiErrorResponse>> {
  const searchParams = request.nextUrl.searchParams;
  const date = searchParams.get("date");
  const start = searchParams.get("start");
  const limit = searchParams.get("limit");

  const queryParams = new URLSearchParams();

  if (!date || !start || !limit) {
    return NextResponse.json(
      { error: "Missing query parameters" } as ApiErrorResponse,
      { status: 400 }
    );
  }

  if (start) queryParams.append("start", start);
  if (limit) queryParams.append("limit", limit);
  const apiKey = process.env.SPORTRADAR_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "API key is missing" } as ApiErrorResponse,
      { status: 500 }
    );
  }
  queryParams.append("api_key", apiKey);
  let url = `${process.env.SPORTRADAR_API_URL}/schedules/${date}/schedules.json`;
  console.log("url", url);
  const queryString = queryParams.toString();
  if (queryString) {
    url += `?${queryString}`;
  }

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      console.log("response", response);
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching schedule data:", error);
    return NextResponse.json(
      { error: "Failed to fetch schedule data" } as ApiErrorResponse,
      { status: 500 }
    );
  }
}
