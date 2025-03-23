"use client";
import React, { useRef, useEffect, useState, useLayoutEffect } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useSchedulesInfiniteQuery } from "@/hooks/useSchedulesInfiniteQuery";
import ListHeader from "./ListHeader";
import ScheduleListItem from "./ScheduleListItem";
import ScheduleSkeletonLoading from "./ScheduleSkeletonLoading";
import ScheduleListLoading from "./ScheduleListLoading";
import { ScrollArea } from "../ui/scroll-area";
import { useTranslations } from "next-intl";

export default function ScheduleList() {
  const [mounted, setMounted] = useState(false);
  const [containerHeight, setContainerHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const t = useTranslations("COMPONENTS.SCHEDULE_LIST");
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    isLoading: loadingSchedule,
    error,
  } = useSchedulesInfiniteQuery();

  const parentRef = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const allSchedules = data ? data.pages.flatMap((page) => page.schedules) : [];

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? allSchedules.length + 1 : allSchedules.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => (isMobile ? 256 : 128),
    overscan: 12,
    gap: 24,
  });

  useLayoutEffect(() => {
    setMounted(true);

    // There was an issue with getting window object on SSR
    // Set isMobile based on window width after component is mounted
    setIsMobile(window.innerWidth < 640);

    const calculateHeight = () => {
      if (containerRef.current) {
        const headerHeight =
          document.querySelector("header")?.offsetHeight || 0;

        const containerTop = containerRef.current.getBoundingClientRect().top;
        const viewportHeight = window.innerHeight;

        const availableHeight = viewportHeight - containerTop - headerHeight;

        setContainerHeight(availableHeight);
      }
    };

    // Also update isMobile state on resize
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
      calculateHeight();
    };

    calculateHeight();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();

    if (!lastItem) {
      return;
    }

    if (
      lastItem.index >= allSchedules.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    hasNextPage,
    fetchNextPage,
    allSchedules.length,
    isFetchingNextPage,
    rowVirtualizer.getVirtualItems(),
  ]);

  const isLoading = !mounted || status === "pending" || loadingSchedule;

  return (
    <div
      ref={containerRef}
      className="w-full flex flex-col mx-auto gap-4 justify-center items-center "
    >
      <ListHeader />

      <div className="relative w-full ">
        {status === "error" ? (
          <span>
            {t("ERROR")} Error: {error.message}
          </span>
        ) : (
          <>
            {isLoading && (
              <div className="absolute inset-0 z-10 ">
                <ScheduleListLoading />
              </div>
            )}

            <ScrollArea
              ref={parentRef}
              style={{
                height: containerHeight
                  ? `${containerHeight}px`
                  : "calc(100vh - 200px)",
                width: `100%`,
                overflow: isLoading ? "hidden" : "auto",
              }}
              className={`rounded-md ${isLoading ? "pointer-events-none" : ""}`}
            >
              <div
                style={{
                  height: `${rowVirtualizer.getTotalSize()}px`,
                  width: "100%",
                  position: "relative",
                }}
              >
                {!isLoading &&
                  rowVirtualizer.getVirtualItems().map((virtualRow) => {
                    const isLoaderRow =
                      virtualRow.index > allSchedules.length - 1;
                    const schedule = allSchedules[virtualRow.index];

                    return (
                      <div
                        key={virtualRow.index}
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: `${virtualRow.size}px`,
                          transform: `translateY(${virtualRow.start}px)`,
                        }}
                      >
                        {isLoaderRow ? (
                          hasNextPage ? (
                            <ScheduleSkeletonLoading />
                          ) : (
                            t("NO_MORE_DATA")
                          )
                        ) : (
                          <ScheduleListItem schedule={schedule} />
                        )}
                      </div>
                    );
                  })}
              </div>
            </ScrollArea>
          </>
        )}
      </div>
    </div>
  );
}
