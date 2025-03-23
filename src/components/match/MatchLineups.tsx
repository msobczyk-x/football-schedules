import { SportEventData } from "@/types/api";
import { Shirt } from "lucide-react";
import { useTranslations } from "next-intl";
export default function MatchLineups({
  matchData,
}: {
  matchData: SportEventData;
}) {
  const t = useTranslations("COMPONENTS.MATCH_LINEUPS");
  const { sport_event, statistics } = matchData;
  const homeTeam = sport_event.competitors.find(
    (comp) => comp.qualifier === "home"
  );
  const awayTeam = sport_event.competitors.find(
    (comp) => comp.qualifier === "away"
  );

  const homeStats = statistics?.totals?.competitors.find(
    (comp) => comp.qualifier === "home"
  );
  const awayStats = statistics?.totals?.competitors.find(
    (comp) => comp.qualifier === "away"
  );

  const lineupsConfirmed =
    sport_event.sport_event_conditions?.lineups?.confirmed;

  if (!lineupsConfirmed || !homeStats?.players || !awayStats?.players) {
    return (
      <div className="relative backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 shadow-lg">
        <div className="absolute -left-8 -bottom-8 w-32 h-32 rounded-full bg-yellow-500/10 blur-2xl"></div>
        <div className="relative z-10 text-center py-8">
          <Shirt size={48} className="mx-auto mb-4 text-white/40" />
          <h2 className="text-lg font-semibold text-white/80 mb-2">
            {t("LINEUPS_NOT_CONFIRMED")}
          </h2>
          <p className="text-white/60 max-w-md mx-auto">
            {t("LINEUPS_NOT_CONFIRMED_DESC")}
          </p>
        </div>
      </div>
    );
  }

  const homePlayers = {
    starters: homeStats.players.filter((player) => player.starter),
    bench: homeStats.players.filter((player) => !player.starter),
  };

  const awayPlayers = {
    starters: awayStats.players.filter((player) => player.starter),
    bench: awayStats.players.filter((player) => !player.starter),
  };

  return (
    <div className="relative backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 shadow-lg">
      <div className="absolute -left-8 -bottom-8 w-32 h-32 rounded-full bg-yellow-500/10 blur-2xl"></div>
      <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-blue-500/10 blur-2xl"></div>
      <div className="relative z-10">
        <h2 className="text-lg font-semibold text-white/80 text-center mb-6">
          {t("TEAM_LINEUPS")}
        </h2>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-white font-medium text-center border-b border-white/10 pb-2 mb-4">
              {homeTeam?.name}
            </h3>

            <h4 className="text-white/70 font-bold text-sm mb-2">
              {t("STARTING_XI")}
            </h4>
            <div className="space-y-2 mb-6">
              {homePlayers.starters.map((player, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-sm"
                >
                  <div className="text-white">{player.name}</div>
                </div>
              ))}
            </div>

            <h4 className="text-white/70 font-bold text-sm mb-2">
              {t("SUBSTITUTES")}
            </h4>
            <div className="space-y-2">
              {homePlayers.bench.map((player, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-sm"
                >
                  <div className="text-white/80">{player.name}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-medium text-center border-b border-white/10 pb-2 mb-4">
              {awayTeam?.name}
            </h3>

            <h4 className="text-white/70 font-bold text-sm mb-2">
              {t("STARTING_XI")}
            </h4>
            <div className="space-y-2 mb-6">
              {awayPlayers.starters.map((player, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-sm"
                >
                  <div className="text-white">{player.name}</div>
                </div>
              ))}
            </div>

            <h4 className="text-white/70 font-bold text-sm mb-2">
              {t("SUBSTITUTES")}
            </h4>
            <div className="space-y-2">
              {awayPlayers.bench.map((player, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-sm"
                >
                  <div className="text-white/80">{player.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
