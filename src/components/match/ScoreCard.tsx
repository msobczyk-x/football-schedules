import { SportEventData } from "@/types/api";
import { useTranslations } from "next-intl";
export default function ScoreCard({
  matchData,
}: {
  matchData: SportEventData;
}) {
  const t = useTranslations("COMPONENTS.SCORE_CARD");
  const { sport_event, sport_event_status } = matchData;
  const homeTeam = sport_event.competitors.find(
    (comp) => comp.qualifier === "home"
  );
  const awayTeam = sport_event.competitors.find(
    (comp) => comp.qualifier === "away"
  );

  const halftimeScore = sport_event_status.period_scores?.find(
    (period) => period.type === "regular_period" && period.number === 1
  );

  const homeHalftimeScore = halftimeScore?.home_score || 0;
  const awayHalftimeScore = halftimeScore?.away_score || 0;

  return (
    <div className="relative backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 shadow-lg">
      <div className="absolute -left-4 -top-4 w-24 h-24 rounded-full bg-purple-500/20 blur-2xl"></div>
      <div className="relative z-10">
        <h2 className="text-lg font-semibold text-white/80 text-center mb-6">
          {t("FINAL_SCORE")}
        </h2>

        <div className="flex justify-between items-center">
          <div className="text-center space-y-4 w-1/3">
            <div className="w-16 h-16 mx-auto rounded-full bg-white/10 p-1 flex items-center justify-center text-white font-bold text-xl">
              {homeTeam?.abbreviation ||
                homeTeam?.name?.substring(0, 3) ||
                t("HT")}
            </div>
            <h3 className="text-white font-medium">
              {homeTeam?.name || t("HOME_TEAM")}
            </h3>
          </div>

          <div className="flex items-center justify-center space-x-6 w-1/3">
            <div className="text-4xl font-bold text-white">
              {sport_event_status.home_score}
            </div>
            <div className="text-white/50">-</div>
            <div className="text-4xl font-bold text-white">
              {sport_event_status.away_score}
            </div>
          </div>

          <div className="text-center space-y-4 w-1/3">
            <div className="w-16 h-16 mx-auto rounded-full bg-white/10 p-1 flex items-center justify-center text-white font-bold text-xl">
              {awayTeam?.abbreviation ||
                awayTeam?.name?.substring(0, 3) ||
                t("AT")}
            </div>
            <h3 className="text-white font-medium">
              {awayTeam?.name || t("AWAY_TEAM")}
            </h3>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 flex justify-center items-center">
          <div className="px-4 py-2 bg-white/5 rounded-lg flex items-center">
            <span className="text-white/70 text-sm">{t("HALF_TIME")}</span>
            <span className="text-white ml-2 font-medium">
              {homeHalftimeScore} - {awayHalftimeScore}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
