import { SportEventData } from "@/types/api";
import { useTranslations } from "next-intl";
export default function MatchOverview({
  matchData,
}: {
  matchData: SportEventData;
}) {
  const t = useTranslations("COMPONENTS.MATCH_OVERVIEW");
  const { sport_event } = matchData;
  const referee = sport_event.sport_event_conditions?.referees?.find(
    (ref) => ref.type === "main"
  );

  return (
    <div className="relative backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl"></div>
      <div className="relative z-10">
        <h2 className="text-lg font-semibold text-white/80 text-center mb-6">
          {t("MATCH_INFORMATION")}
        </h2>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center">
            <span className="text-white/60 w-28">{t("DATE_TIME")}</span>
            <span className="text-white">
              {new Date(sport_event.start_time).toLocaleDateString()}{" "}
              {new Date(sport_event.start_time).toLocaleTimeString()}
            </span>
          </div>

          <div className="flex items-center">
            <span className="text-white/60 w-28">{t("CONFIRMED")}</span>
            <span className="text-white">
              {sport_event.start_time_confirmed ? t("YES") : t("NO")}
            </span>
          </div>

          <div className="flex items-center">
            <span className="text-white/60 w-28">{t("STADIUM")}</span>
            <span className="text-white">
              {sport_event.venue?.name || t("NOT_SPECIFIED")}
            </span>
          </div>

          <div className="flex items-center">
            <span className="text-white/60 w-28">{t("LOCATION")}</span>
            <span className="text-white">
              {}
              {sport_event.venue?.city_name
                ? `${sport_event.venue?.city_name}, `
                : ""}
              {sport_event.venue?.country_name || t("NOT_SPECIFIED")}
            </span>
          </div>

          <div className="flex items-center">
            <span className="text-white/60 w-28">{t("CAPACITY")}</span>
            <span className="text-white">
              {sport_event.venue?.capacity?.toLocaleString() ||
                t("NOT_SPECIFIED")}
            </span>
          </div>

          <div className="flex items-center">
            <span className="text-white/60 w-28">{t("REFEREE")}</span>
            <span className="text-white">
              {referee?.name || t("NOT_ASSIGNED")}
            </span>
          </div>

          <div className="flex items-center">
            <span className="text-white/60 w-28">{t("COMPETITION")}</span>
            <span className="text-white">
              {sport_event.sport_event_context?.competition?.name ||
                t("NOT_SPECIFIED")}
            </span>
          </div>

          <div className="flex items-center">
            <span className="text-white/60 w-28">{t("SEASON")}</span>
            <span className="text-white">
              {sport_event.sport_event_context?.season?.name ||
                t("NOT_SPECIFIED")}
            </span>
          </div>
        </div>

        {sport_event.channels && sport_event.channels.length > 0 && (
          <div className="mt-6 pt-4 border-t border-white/10">
            <h3 className="text-white/80 font-medium mb-3">
              {t("BROADCAST_INFORMATIOn")}
            </h3>
            <div className="space-y-2">
              {sport_event.channels.map((channel, index) => (
                <div key={index} className="flex items-center">
                  <span className="text-white/60 w-28">
                    {channel.country || t("GLOBAL")}:
                  </span>
                  <span className="text-white">{channel.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {sport_event.sport_event_conditions?.weather && (
          <div className="mt-6 pt-4 border-t border-white/10">
            <h3 className="text-white/80 font-medium mb-3">
              {t("WHEATHER_FORECAST")}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <span className="text-white/60 w-28">{t("CONDITIONS")}</span>
                <span className="text-white">
                  {sport_event.sport_event_conditions.weather
                    .overall_conditions &&
                    t(
                      `WHEATHER.${sport_event.sport_event_conditions.weather.overall_conditions.toUpperCase()}`
                    )}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-white/60 w-28">{t("PITCH")}</span>
                <span className="text-white">
                  {sport_event.sport_event_conditions.weather
                    .pitch_conditions &&
                    t(
                      `WHEATHER.${sport_event.sport_event_conditions.weather.pitch_conditions.toUpperCase()}`
                    )}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
