import { MatchDetailsError } from "@/components/match";
import PastMatchDetails from "@/components/pages/PastMatchDetails";
import getSportEvent from "@/utils/api/getSportEvent";
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const parsedId = decodeURIComponent(id);
  const eventData = await getSportEvent(parsedId);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {eventData ? (
        <PastMatchDetails data={eventData} />
      ) : (
        <MatchDetailsError />
      )}
    </div>
  );
}
