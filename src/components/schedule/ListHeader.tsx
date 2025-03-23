"use client";
import { formatDate } from "@/utils/formatDate";
import { useQueryState } from "nuqs";
import { useMemo } from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ListHeader() {
  const t = useTranslations("COMPONENTS.LIST_HEADER");
  const currentDate = useMemo(() => formatDate(new Date()), []);

  const availableDates = useMemo(() => {
    const dates = [];
    const today = new Date();

    for (let i = 7; i > 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      dates.push(formatDate(date));
    }

    dates.push(formatDate(today));

    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(formatDate(date));
    }

    return dates;
  }, []);

  const [date, setDate] = useQueryState("date", { defaultValue: currentDate });

  const currentIndex = availableDates.findIndex((d) => d === date);

  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < availableDates.length - 1;

  const goToPrevious = () => {
    if (hasPrevious) {
      setDate(availableDates[currentIndex - 1]);
    }
  };

  const goToNext = () => {
    if (hasNext) {
      setDate(availableDates[currentIndex + 1]);
    }
  };

  const getPreviousButtonText = () => {
    if (!hasPrevious) return "";

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (availableDates[currentIndex - 1] === formatDate(yesterday)) {
      return t("YESTERDAY");
    }
    return t("PREVIOUS");
  };

  const getNextButtonText = () => {
    if (!hasNext) return "";

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (availableDates[currentIndex + 1] === formatDate(tomorrow)) {
      return t("TOMORROW");
    }
    return t("NEXT");
  };

  const isToday = date === currentDate;

  return (
    <div className="flex items-center justify-between w-full py-3 px-5 backdrop-blur-md bg-white/10 border border-white/20 rounded-xl mb-4 shadow-md">
      {hasPrevious ? (
        <button
          onClick={goToPrevious}
          disabled={!hasPrevious}
          className={`${
            !hasPrevious ? "invisible" : ""
          } w-16 sm:w-32 text-left flex items-center group transition-all duration-300 text-white/80 hover:text-white`}
        >
          <ChevronLeft
            size={18}
            className="mr-1 group-hover:-translate-x-1 transition-transform duration-300"
          />
          <span className="hidden sm:block text-sm font-medium">
            {getPreviousButtonText()}
          </span>
        </button>
      ) : (
        <div className="w-32"></div>
      )}
      <div className="relative z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-md rounded-full"></div>
        <div
          className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-full ${
            isToday ? "bg-blue-500/30" : "bg-white/10"
          } border border-white/30 backdrop-blur-sm relative z-10`}
        >
          <Calendar size={16} className="text-white/80" />
          <h3 className="font-semibold text-white">{date}</h3>
        </div>
      </div>
      {hasNext ? (
        <button
          onClick={goToNext}
          disabled={!hasNext}
          className={`${
            !hasNext ? "invisible" : ""
          } w-16 sm:w-32 text-right flex items-center justify-end group transition-all duration-300 text-white/80 hover:text-white`}
        >
          <span className="text-sm hidden sm:block font-medium">
            {getNextButtonText()}
          </span>
          <ChevronRight
            size={18}
            className="ml-1 group-hover:translate-x-1 transition-transform duration-300 "
          />
        </button>
      ) : (
        <div className="w-32"></div>
      )}
    </div>
  );
}
