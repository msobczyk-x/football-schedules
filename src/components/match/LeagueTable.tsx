import { SportEventData, SoccerStandingsResponse } from "@/types/api";
import { TableIcon, Calendar } from "lucide-react";
import { useTranslations } from "next-intl";

export default function LeagueTable({
  standingsData,
  matchData,
}: {
  standingsData: SoccerStandingsResponse | null;
  matchData: SportEventData;
}) {
  const t = useTranslations("COMPONENTS.LEAGUE_TABLE");
  if (
    !standingsData ||
    !standingsData.standings ||
    standingsData.standings.length === 0
  ) {
    return (
      <div className="relative backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 shadow-lg">
        <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-green-500/10 blur-2xl"></div>
        <div className="relative z-10 text-center py-8">
          <TableIcon size={48} className="mx-auto mb-4 text-white/40" />
          <h2 className="text-lg font-semibold text-white/80 mb-2">
            {t("NO_DATA")}
          </h2>
          <p className="text-white/60 max-w-md mx-auto">{t("NO_DATA_DESC")}</p>
        </div>
      </div>
    );
  }

  const totalStandings = standingsData.standings.find(
    (standing) => standing.type === "total"
  );
  if (
    !totalStandings ||
    !totalStandings.groups ||
    totalStandings.groups.length === 0
  ) {
    return (
      <div className="relative backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 shadow-lg">
        <div className="relative z-10 text-center py-8">
          <h2 className="text-lg font-semibold text-white/80 mb-2">
            {t("NO_STANDINGS")}
          </h2>
        </div>
      </div>
    );
  }

  const standingGroup = totalStandings.groups[0];
  const teamStandings = standingGroup.standings;

  const homeTeamId = matchData.sport_event.competitors.find(
    (comp) => comp.qualifier === "home"
  )?.id;
  const awayTeamId = matchData.sport_event.competitors.find(
    (comp) => comp.qualifier === "away"
  )?.id;

  return (
    <div className="relative backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 shadow-lg">
      <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-green-500/10 blur-2xl"></div>
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-white/80">
            {standingGroup.name}
          </h2>
          <div className="text-white/60 text-sm">
            <Calendar size={14} className="inline mr-1" />
            {`${t("UPDATED", {
              date: new Date(standingsData.generated_at).toLocaleDateString(),
            })}`}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-white/60 border-b border-white/10">
                <th className="text-left py-2 px-2">#</th>
                <th className="text-left py-2 px-2">{t("TEAM")}</th>
                <th className="text-center py-2 px-2">{t("MP")}</th>
                <th className="text-center py-2 px-2">{t("W")}</th>
                <th className="text-center py-2 px-2">{t("D")}</th>
                <th className="text-center py-2 px-2">{t("L")}</th>
                <th className="text-center py-2 px-2">{t("GF")}</th>
                <th className="text-center py-2 px-2">{t("GA")}</th>
                <th className="text-center py-2 px-2">{t("GD")}</th>
                <th className="text-center py-2 px-2">{t("PTS")}</th>
                <th className="text-left py-2 px-2">{t("FORM")}</th>
              </tr>
            </thead>
            <tbody>
              {teamStandings.map((team) => {
                const isTeamInMatch =
                  team.competitor.id === homeTeamId ||
                  team.competitor.id === awayTeamId;

                return (
                  <tr
                    key={team.competitor.id}
                    className={`border-b border-white/5 ${
                      isTeamInMatch ? "bg-white/10" : ""
                    }`}
                  >
                    <td className="py-2 px-2 text-white/80">{team.rank}</td>
                    <td className="py-2 px-2">
                      <div className="flex items-center">
                        <div className="font-medium text-white">
                          {team.competitor.name}
                        </div>
                      </div>
                    </td>
                    <td className="py-2 px-2 text-center text-white/80">
                      {team.played}
                    </td>
                    <td className="py-2 px-2 text-center text-white/80">
                      {team.win}
                    </td>
                    <td className="py-2 px-2 text-center text-white/80">
                      {team.draw}
                    </td>
                    <td className="py-2 px-2 text-center text-white/80">
                      {team.loss}
                    </td>
                    <td className="py-2 px-2 text-center text-white/80">
                      {team.goals_for}
                    </td>
                    <td className="py-2 px-2 text-center text-white/80">
                      {team.goals_against}
                    </td>
                    <td className="py-2 px-2 text-center text-white/80">
                      {team.goals_diff}
                    </td>
                    <td className="py-2 px-2 text-center font-medium text-white">
                      {team.points}
                    </td>
                    <td className="py-2 px-2">
                      <div className="flex">
                        {team.competitor.form.split("").map((result, index) => {
                          let bgColor;
                          switch (result.toUpperCase()) {
                            case "W":
                              bgColor = "bg-green-500/70";
                              break;
                            case "D":
                              bgColor = "bg-yellow-500/70";
                              break;
                            case "L":
                              bgColor = "bg-red-500/70";
                              break;
                            default:
                              bgColor = "bg-gray-500/40";
                          }

                          return (
                            <div
                              key={index}
                              className={`w-5 h-5 ${bgColor} rounded-full flex items-center justify-center text-xs text-white mr-1`}
                            >
                              {result.toUpperCase()}
                            </div>
                          );
                        })}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex flex-wrap gap-4 text-xs text-white/70">
          {[
            { outcome: "promotion", label: t("PROMOTION") },
            { outcome: "relegation", label: t("RELEGATION") },
          ].map((outcome, index) => {
            const teamWithOutcome = teamStandings.find(
              (team) => team.current_outcome === outcome.outcome
            );

            if (!teamWithOutcome) return null;

            return (
              <div key={index} className="flex items-center">
                <div className={`w-3 h-3 mr-1 rounded-full bg-white/20`}></div>
                <span>{outcome.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
