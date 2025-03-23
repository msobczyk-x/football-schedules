import { SoccerStandingsResponse } from "@/types/api";

export default async function getSeasonDetails(
  id: string
): Promise<SoccerStandingsResponse> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/season/${id}`,
    { cache: "default", next: { revalidate: 3600 * 24 } }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch season details");
  }

  return response.json();
}
