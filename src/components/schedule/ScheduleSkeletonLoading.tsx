import { Skeleton } from "../ui/skeleton";

export default function ScheduleSkeletonLoading() {
  return (
    <Skeleton className="w-full md:h-32 h-64 rounded-xl px-6 py-4 relative">
      <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-blue-500/10 blur-2xl" />
      <div className="absolute -left-8 -top-8 w-24 h-24 rounded-full bg-purple-500/10 blur-2xl" />

      <div className="flex flex-col h-full justify-between">
        <div className="flex justify-between items-start">
          <div className="h-6 w-48 bg-white/10 rounded-md" />
          <div className="h-5 w-24 bg-white/10 rounded-md" />
        </div>

        <div className="flex justify-between items-end mt-2">
          <div className="h-4 w-32 bg-white/10 rounded-md" />
          <div className="h-4 w-20 bg-white/10 rounded-md" />
        </div>
      </div>
    </Skeleton>
  );
}
