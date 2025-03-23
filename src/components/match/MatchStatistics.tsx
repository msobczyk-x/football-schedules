import { SportEventData } from "@/types/api";
import StatItem from "./StatItem";
import { useTranslations } from "next-intl";
export default function MatchStatistics({
  matchData,
}: {
  matchData: SportEventData;
}) {
  const t = useTranslations("COMPONENTS.MATCH_STATISTICS");
  const { statistics } = matchData;

  const homeStats = statistics?.totals?.competitors.find(
    (comp) => comp.qualifier === "home"
  )?.statistics;
  const awayStats = statistics?.totals?.competitors.find(
    (comp) => comp.qualifier === "away"
  )?.statistics;

  if (!homeStats || !awayStats) {
    return (
      <div className="relative backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 shadow-lg">
        <div className="absolute -right-4 -top-8 w-32 h-32 rounded-full bg-green-500/10 blur-2xl"></div>
        <div className="relative z-10 text-center">
          <h2 className="text-lg font-semibold text-white/80 mb-6">
            {t("MATCH_STATISTICS")}
          </h2>
          <p className="text-white/60">{t("NO_STATISTICS_AVAILABLE")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 shadow-lg">
      <div className="absolute -right-4 -top-8 w-32 h-32 rounded-full bg-green-500/10 blur-2xl"></div>
      <div className="relative z-10">
        <h2 className="text-lg font-semibold text-white/80 text-center mb-6">
          {t("MATCH_STATISTICS")}
        </h2>

        <div className="space-y-4">
          <StatItem
            label={t("POSSESSION")}
            homeValue={`${homeStats.ball_possession}%`}
            awayValue={`${awayStats.ball_possession}%`}
            homeWidth={homeStats.ball_possession}
            awayWidth={awayStats.ball_possession}
          />

          <StatItem
            label={t("SHOTS_TOTAL")}
            homeValue={homeStats.shots_total}
            awayValue={awayStats.shots_total}
            homeWidth={
              (homeStats.shots_total /
                (homeStats.shots_total + awayStats.shots_total || 1)) *
              100
            }
            awayWidth={
              (awayStats.shots_total /
                (homeStats.shots_total + awayStats.shots_total || 1)) *
              100
            }
          />

          <StatItem
            label={t("SHOTS_ON_TARGET")}
            homeValue={homeStats.shots_on_target}
            awayValue={awayStats.shots_on_target}
            homeWidth={
              (homeStats.shots_on_target /
                (homeStats.shots_on_target + awayStats.shots_on_target || 1)) *
              100
            }
            awayWidth={
              (awayStats.shots_on_target /
                (homeStats.shots_on_target + awayStats.shots_on_target || 1)) *
              100
            }
          />

          <StatItem
            label={t("CORNER_KICKS")}
            homeValue={homeStats.corner_kicks}
            awayValue={awayStats.corner_kicks}
            homeWidth={
              (homeStats.corner_kicks /
                (homeStats.corner_kicks + awayStats.corner_kicks || 1)) *
              100
            }
            awayWidth={
              (awayStats.corner_kicks /
                (homeStats.corner_kicks + awayStats.corner_kicks || 1)) *
              100
            }
          />

          <StatItem
            label={t("YELLOW_CARDS")}
            homeValue={homeStats.yellow_cards}
            awayValue={awayStats.yellow_cards}
            homeWidth={
              (homeStats.yellow_cards /
                (homeStats.yellow_cards + awayStats.yellow_cards || 1)) *
              100
            }
            awayWidth={
              (awayStats.yellow_cards /
                (homeStats.yellow_cards + awayStats.yellow_cards || 1)) *
              100
            }
            color="yellow"
          />

          <StatItem
            label={t("RED_CARDS")}
            homeValue={homeStats.red_cards}
            awayValue={awayStats.red_cards}
            homeWidth={
              (homeStats.red_cards /
                (homeStats.red_cards + awayStats.red_cards || 1)) *
              100
            }
            awayWidth={
              (awayStats.red_cards /
                (homeStats.red_cards + awayStats.red_cards || 1)) *
              100
            }
            color="red"
          />
        </div>
      </div>
    </div>
  );
}
