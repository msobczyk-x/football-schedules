import ScheduleSkeletonLoading from "./ScheduleSkeletonLoading";

export default function ScheduleListLoading() {
  return (
    <div className="flex flex-col gap-6">
      {Array.from({ length: 12 }).map((_, index: number) => (
        <ScheduleSkeletonLoading key={index} />
      ))}
    </div>
  );
}
