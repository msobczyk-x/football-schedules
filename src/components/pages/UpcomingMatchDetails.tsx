"use client";
import { useRouter } from "next/navigation";
import { SoccerStandingsResponse, SportEventData } from "@/types/api";
import { ArrowLeft, Clock, Shirt, Table as TableIcon } from "lucide-react";

import LeagueTable from "../match/LeagueTable";
import MatchHeader from "../match/MatchHeader";
import MatchLineups from "../match/MatchLineups";
import MatchOverview from "../match/MatchOverview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useTranslations } from "next-intl";

type Props = {
  matchData: SportEventData;
  standingsData: SoccerStandingsResponse;
};
export default function UpcomingMatchDetails({
  matchData,
  standingsData,
}: Props) {
  const router = useRouter();
  const t = useTranslations("PAGES.MATCH");
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <button
        onClick={() => router.back()}
        className="flex items-center text-white/80 hover:text-white transition-colors mb-4 group"
      >
        <ArrowLeft
          className="mr-2 group-hover:-translate-x-1 transition-transform"
          size={18}
        />
        {t("BACK_BUTTON")}
      </button>

      <MatchHeader matchData={matchData} />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">
            <span className="mr-2">
              <Clock size={16} />
            </span>
            <span>{t("UPCOMING.OVERVIEW")}</span>
          </TabsTrigger>
          <TabsTrigger value="lineups">
            <span className="mr-2">
              <Shirt size={16} />
            </span>
            <span>{t("UPCOMING.LINEUPS")}</span>
          </TabsTrigger>
          <TabsTrigger value="table">
            <span className="mr-2">
              <TableIcon size={16} />
            </span>
            <span>{t("UPCOMING.TABLE")}</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <MatchOverview matchData={matchData} />
        </TabsContent>
        <TabsContent value="lineups">
          <MatchLineups matchData={matchData} />
        </TabsContent>
        <TabsContent value="table">
          <LeagueTable standingsData={standingsData} matchData={matchData} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
