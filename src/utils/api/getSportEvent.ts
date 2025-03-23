import { SportEventData } from "@/types/api";

export default async function getSportEvent(
  id: string
): Promise<SportEventData> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/match/${id}`,
    { cache: "default", next: { revalidate: 3600 * 24 } }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch sport event");
  }

  return response.json();
}
