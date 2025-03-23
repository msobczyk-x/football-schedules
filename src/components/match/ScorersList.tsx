import type { SportEventData, CompetitorStatistics } from "@/types/api";
import { Trophy } from "lucide-react";
import { useTranslations } from "next-intl";
export default function ScorersList({
  matchData,
}: {
  matchData: SportEventData;
}) {
  const t = useTranslations("COMPONENTS.SCORERS_LIST");
  const { statistics, sport_event } = matchData;

  const homeTeamStats = statistics?.totals?.competitors.find(
    (comp) => comp.qualifier === "home"
  );
  const awayTeamStats = statistics?.totals?.competitors.find(
    (comp) => comp.qualifier === "away"
  );

  const homeTeam = sport_event.competitors.find(
    (comp) => comp.qualifier === "home"
  );
  const awayTeam = sport_event.competitors.find(
    (comp) => comp.qualifier === "away"
  );

  const getScorers = (teamStats?: CompetitorStatistics) => {
    if (!teamStats?.players) return [];

    return teamStats.players
      .filter((player) => player.statistics.goals_scored > 0)
      .map((player) => ({
        name: player.name,
        goals: player.statistics.goals_scored,
        minute: 0,
        isOwnGoal: player.statistics.own_goals > 0,
        isPenalty: false,
      }));
  };

  const homeScorers = getScorers(homeTeamStats);
  const awayScorers = getScorers(awayTeamStats);

  const hasScorers = homeScorers.length > 0 || awayScorers.length > 0;

  if (!hasScorers) {
    return (
      <div className="relative backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 shadow-lg">
        <div className="absolute -left-8 -bottom-8 w-32 h-32 rounded-full bg-yellow-500/10 blur-2xl"></div>
        <div className="relative z-10 text-center">
          <h2 className="text-lg font-semibold text-white/80 mb-6 flex items-center justify-center">
            <Trophy size={18} className="mr-2 text-yellow-400" />
            {t("GOAL_SCORERS")}
          </h2>
          <p className="text-white/60">{t("NO_INFO_AVAILABLE")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 shadow-lg">
      <div className="absolute -left-8 -bottom-8 w-32 h-32 rounded-full bg-yellow-500/10 blur-2xl"></div>
      <div className="relative z-10">
        <h2 className="text-lg font-semibold text-white/80 text-center mb-6 flex items-center justify-center">
          <Trophy size={18} className="mr-2 text-yellow-400" />
          {t("GOAL_SCORERS")}
        </h2>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="text-white/80 font-medium border-b border-white/10 pb-2">
              {homeTeam?.name || t("HOME_TEAM")}
            </h3>
            {homeScorers.length > 0 ? (
              homeScorers.map((scorer, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="text-white">
                    {scorer.name}
                    {scorer.isPenalty && (
                      <span className="text-white/60 text-xs ml-1">{`(${t(
                        "P"
                      )})`}</span>
                    )}
                    {scorer.isOwnGoal && (
                      <span className="text-white/60 text-xs ml-1">{`(${t(
                        "OG"
                      )})`}</span>
                    )}
                    {scorer.goals > 1 && (
                      <span className="text-white/60 text-xs ml-1">
                        ({scorer.goals})
                      </span>
                    )}
                  </div>
                  {scorer.minute > 0 && (
                    <div className="text-white/60 text-sm">{scorer.minute}</div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-white/60 italic">{t("NO_GOALS")}</div>
            )}
          </div>

          <div className="space-y-3">
            <h3 className="text-white/80 font-medium border-b border-white/10 pb-2">
              {awayTeam?.name || t("AWAY_TEAM")}
            </h3>
            {awayScorers.length > 0 ? (
              awayScorers.map((scorer, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="text-white">
                    {scorer.name}
                    {scorer.isPenalty && (
                      <span className="text-white/60 text-xs ml-1">{`(${t(
                        "P"
                      )})`}</span>
                    )}
                    {scorer.isOwnGoal && (
                      <span className="text-white/60 text-xs ml-1">{`(${t(
                        "OG"
                      )})`}</span>
                    )}
                    {scorer.goals > 1 && (
                      <span className="text-white/60 text-xs ml-1">
                        ({scorer.goals})
                      </span>
                    )}
                  </div>
                  {scorer.minute > 0 && (
                    <div className="text-white/60 text-sm">{scorer.minute}</div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-white/60 italic">{t("NO_GOALS")}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
