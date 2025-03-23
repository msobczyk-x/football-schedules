"use client";
import { SportEventData } from "@/types/api";
import { Clock } from "lucide-react";
import { useTranslations } from "next-intl";
import { FormattedDate } from "../common/FormattedDate";
export default function MatchHeader({
  matchData,
}: {
  matchData: SportEventData;
}) {
  const t = useTranslations("COMPONENTS.MATCH_HEADER");
  const { sport_event } = matchData;
  const homeTeam = sport_event.competitors.find(
    (comp) => comp.qualifier === "home"
  );
  const awayTeam = sport_event.competitors.find(
    (comp) => comp.qualifier === "away"
  );

  return (
    <div className="relative backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-purple-500/10 rounded-xl"></div>
      <div className="absolute -right-4 -bottom-4 w-32 h-32 rounded-full bg-blue-500/20 blur-2xl"></div>
      <div className="relative z-10">
        <h1 className="text-2xl font-bold text-white text-center mb-2">
          {homeTeam?.name || t("HOME_TEAM")} vs{" "}
          {awayTeam?.name || t("AWAY_TEAM")}
        </h1>
        <div className="flex items-center justify-center text-white/70 space-x-2">
          <Clock size={16} />
          <FormattedDate timestamp={sport_event.start_time} />
        </div>
        <div className="text-center text-white/70 mt-1">
          {sport_event.venue?.name || t("VENUE_NOT_SPECIFIED")}
        </div>
      </div>
    </div>
  );
}
