import UpcomingMatchDetails from "@/components/pages/UpcomingMatchDetails";
import getSeasonDetails from "@/utils/api/getSeasonDetails";
import getSportEvent from "@/utils/api/getSportEvent";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const parsedId = decodeURIComponent(id);
  const eventData = await getSportEvent(parsedId);
  const seasonData = await getSeasonDetails(
    eventData.sport_event.sport_event_context.season.id
  );
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <UpcomingMatchDetails matchData={eventData} standingsData={seasonData} />
    </div>
  );
}
