type StatItemProps = {
  label: string;
  homeValue: number | string;
  awayValue: number | string;
  homeWidth: number;
  awayWidth: number;
  color?: "default" | "yellow" | "red";
};

export default function StatItem({
  label,
  homeValue,
  awayValue,
  homeWidth,
  awayWidth,
  color = "default",
}: StatItemProps) {
  const getBarColor = () => {
    switch (color) {
      case "yellow":
        return "from-yellow-500/70 to-yellow-600/70";
      case "red":
        return "from-red-500/70 to-red-600/70";
      default:
        return "from-blue-500/70 to-purple-500/70";
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-sm">
        <span className="text-white font-medium">{homeValue}</span>
        <span className="text-white/70">{label}</span>
        <span className="text-white font-medium">{awayValue}</span>
      </div>

      <div className="flex h-2 w-full rounded-full overflow-hidden bg-white/5">
        <div
          className={`h-full bg-gradient-to-r ${getBarColor()}`}
          style={{ width: `${homeWidth}%` }}
        />
        <div
          className="h-full bg-white/20"
          style={{ width: `${awayWidth}%` }}
        />
      </div>
    </div>
  );
}
