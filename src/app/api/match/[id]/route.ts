import { NextRequest, NextResponse } from "next/server";
import type { ApiErrorResponse, SportEventResponse } from "@/types/api";

const options = {
  method: "GET",
  headers: { accept: "application/json" },
  cache: "default" as RequestCache,
  next: {
    revalidate: 3600 * 24,
  },
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<SportEventResponse | ApiErrorResponse>> {
  const { id: matchId } = await params;

  if (!matchId) {
    return NextResponse.json(
      { error: "Missing match ID" } as ApiErrorResponse,
      { status: 400 }
    );
  }

  const apiKey = process.env.SPORTRADAR_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "API key is missing" } as ApiErrorResponse,
      { status: 500 }
    );
  }

  const queryParams = new URLSearchParams();
  queryParams.append("api_key", apiKey);

  let url = `${process.env.SPORTRADAR_EXTENDED_API_URL}/sport_events/${matchId}/summary.json`;
  if (queryParams.toString()) {
    url += `?${queryParams.toString()}`;
  }
  console.log("Fetching match data from:", url);

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      console.error(
        "API error response:",
        response.status,
        response.statusText
      );
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching match data:", error);
    return NextResponse.json(
      { error: "Failed to fetch match data" } as ApiErrorResponse,
      { status: 500 }
    );
  }
}
