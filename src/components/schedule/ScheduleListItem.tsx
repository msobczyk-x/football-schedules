"use client";
import config from "@/config";
import type { Schedule } from "@/types/api";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "../ui/card";
import { CalendarClock, Check, Clock } from "lucide-react";
import { useTranslations } from "next-intl";

type ScheduleListItemProps = {
  schedule: Schedule;
};

function ScheduleListItem({ schedule }: ScheduleListItemProps) {
  const t = useTranslations("COMPONENTS.SCHEDULE_LIST_ITEM");
  const router = useRouter();
  const getRedirectLink = (schedule: Schedule) => {
    if (
      config.FINISHED_MATCH_STATUES.includes(schedule.sport_event_status.status)
    ) {
      return `/match/past/${schedule.sport_event.id}`;
    }
    if (
      config.NOT_FINISHED_MATCH_STATUES.includes(
        schedule.sport_event_status.status
      )
    ) {
      return `/match/upcoming/${schedule.sport_event.id}`;
    }
    return "";
  };

  function handleClick() {
    router.push(getRedirectLink(schedule));
  }

  const isFinished = config.FINISHED_MATCH_STATUES.includes(
    schedule.sport_event_status.status
  );

  return (
    <Card
      onClick={handleClick}
      className="relative py-4 px-6 md:h-32 h-64 w-full cursor-pointer overflow-hidden 
        backdrop-blur-md bg-white/10 border border-white/20 
        hover:bg-white/20 transition-all duration-300 
        shadow-lg hover:shadow-xl rounded-xl"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-20 rounded-xl" />

      <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-blue-500/20 blur-2xl" />
      <div className="absolute -left-8 -top-8 w-24 h-24 rounded-full bg-purple-500/20 blur-2xl" />

      <CardContent className="p-0 flex flex-col h-full justify-between relative z-10">
        <div className="flex justify-between items-start">
          <div className="text-lg font-semibold text-white text-balance">
            {schedule.sport_event.competitors?.[0]?.name || "Team A"}
            <span className="mx-2 text-white/70">vs</span>
            {schedule.sport_event.competitors?.[1]?.name || "Team B"}
          </div>
          <div className="flex items-center">
            {isFinished ? (
              <span className="flex items-center text-green-400 text-sm">
                <Check size={16} className="mr-1" /> {t("STATUS.COMPLETED")}
              </span>
            ) : (
              <span className="flex items-center text-amber-400 text-sm">
                <Clock size={16} className="mr-1" /> {t("STATUS.UPCOMING")}
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-between items-end mt-2">
          <div className="flex items-center text-white/80 text-sm">
            <CalendarClock size={14} className="mr-1" />
            {schedule.sport_event.start_time
              ? new Date(schedule.sport_event.start_time).toLocaleString()
              : "TBD"}
          </div>

          <div className="text-xs font-medium text-white/60">
            {schedule.sport_event.sport_event_context.competition.name}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ScheduleListItem;
