import { SportEventData } from "@/types/api";
import { useTranslations } from "next-intl";
export default function MatchInfo({
  matchData,
}: {
  matchData: SportEventData;
}) {
  const t = useTranslations("COMPONENTS.MATCH_INFO");
  const { sport_event } = matchData;
  const referee = sport_event.sport_event_conditions?.referees?.find(
    (ref) => ref.type === "main"
  );

  return (
    <div className="relative backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl"></div>
      <div className="relative z-10">
        <h2 className="text-lg font-semibold text-white/80 text-center mb-6">
          {t("MATCH_INFO")}
        </h2>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center">
            <span className="text-white/60 w-24">{t("REFEREE")}</span>
            <span className="text-white">
              {referee?.name || t("NOT_SPECIFIED")}
            </span>
          </div>

          <div className="flex items-center">
            <span className="text-white/60 w-24">{t("LOCATION")}</span>
            <span className="text-white">
              {sport_event.venue?.name || t("NOT_SPECIFIED")}
            </span>
          </div>

          <div className="flex items-center">
            <span className="text-white/60 w-24">{t("DATE")}</span>
            <span className="text-white">
              {new Date(sport_event.start_time).toLocaleDateString()}
            </span>
          </div>

          <div className="flex items-center">
            <span className="text-white/60 w-24">{t("ATTENDANCE")}</span>
            <span className="text-white">
              {sport_event.sport_event_conditions?.attendance?.count?.toLocaleString() ||
                t("NOT_SPECIFIED")}
            </span>
          </div>

          <div className="flex items-center">
            <span className="text-white/60 w-24">{t("COMPETITION")}</span>
            <span className="text-white">
              {sport_event.sport_event_context?.competition?.name ||
                t("NOT_SPECIFIED")}
            </span>
          </div>

          <div className="flex items-center">
            <span className="text-white/60 w-24">{t("SEASON")}</span>
            <span className="text-white">
              {sport_event.sport_event_context?.season?.name ||
                t("NOT_SPECIFIED")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
